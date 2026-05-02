"use client";

import { useEffect, useRef } from "react";

/**
 * WaterSurface — refonte photoréaliste.
 *
 * Pipeline single fragment shader avec :
 *   1. Multi-couches de vagues directionnelles (vent dominant) :
 *      grande houle + clapot + ridules. Chaque couche se déplace
 *      dans sa propre direction à sa propre vitesse.
 *   2. Ripples anisotropes injectés au curseur, avec rotation et
 *      étirement perpendiculaire à la direction de mouvement (pour
 *      simuler le sillage allongé).
 *   3. Calcul de normale par différences finies sur la surface.
 *   4. Modèle d'éclairage : Fresnel Schlick + spéculaire Phong haute
 *      puissance + réflexion ciel procédural avec direction soleil.
 *   5. Caustiques en réseau via abs(fbm - 0.5) avec domain warping.
 *   6. Sun glints sur micro-noise pour les paillettes brillantes.
 *   7. Beer-Lambert depth tint (eau profonde absorbe le rouge).
 *   8. Mousse sélective : crête haute + slope fort + texture noisy.
 *   9. Tonemap Reinhard + gamma 2.2.
 *
 * DPR clampé à 1.5 pour rester fluide à 60 fps sur shader lourd.
 */

const MAX_RIPPLES = 14;

const VERT = /* glsl */ `
  attribute vec2 aPos;
  varying vec2 vUv;
  void main() {
    vUv = aPos * 0.5 + 0.5;
    gl_Position = vec4(aPos, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform vec2 uRes;
  uniform vec2 uMouse;       // 0..1, Y déjà flippé côté JS
  uniform float uTime;
  // Ripples : x, y (espace aspect-corrigé), z = birthTime, w = angle direction
  uniform vec4 uRipples[${MAX_RIPPLES}];

  // Direction du vent (dominante des vagues)
  const vec2 WIND = vec2(0.85, 0.18);
  // Direction du soleil (light direction in world space, vers le ciel)
  const vec3 SUN_DIR = vec3(0.42, 0.55, 0.72);
  // Couleurs eau
  const vec3 DEEP_WATER     = vec3(0.005, 0.04, 0.13);
  const vec3 SHALLOW_WATER  = vec3(0.07, 0.42, 0.55);
  const vec3 SUN_COLOR      = vec3(1.0, 0.96, 0.82);
  const vec3 SKY_TOP        = vec3(0.45, 0.72, 0.95);
  const vec3 SKY_HORIZON    = vec3(0.85, 0.92, 0.98);

  // Bruit cheap, hash deterministe
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  // FBM tronqué (4 octaves max)
  float fbm4(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * vnoise(p);
      p = p * 2.07 + vec2(13.7, 7.3);
      a *= 0.5;
    }
    return v;
  }
  float fbm3(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * vnoise(p);
      p = p * 2.07 + vec2(13.7, 7.3);
      a *= 0.5;
    }
    return v;
  }

  // ─── Hauteur de surface ─────────────────────────────────────────
  // Trois couches : grande houle (lente, large), clapot (moyen),
  // ridules (rapide, perpendiculaire au vent pour casser l'unicité).
  float waveHeight(vec2 p) {
    float t = uTime;
    // Note : on utilise (p - WIND * t * speed) pour que le motif
    // se déplace VISUELLEMENT dans la direction du vent.
    float h  = (fbm4(p * 0.9  - WIND * t * 0.10) - 0.5) * 1.10;  // houle
    h       += (fbm3(p * 2.5  - WIND * t * 0.32) - 0.5) * 0.42;  // clapot
    h       += (fbm3(p * 6.5  - vec2(-WIND.y, WIND.x) * t * 0.60) - 0.5) * 0.18; // ridules
    return h;
  }

  // ─── Ripples anisotropes (tableau dynamique) ────────────────────
  float ripples(vec2 p) {
    float total = 0.0;
    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      vec4 r = uRipples[i];
      if (r.z < 0.0) continue;
      float age = uTime - r.z;
      if (age < 0.0 || age > 3.6) continue;
      vec2 toR = p - r.xy;
      // Rotation locale dans le repère du mouvement, puis squash
      // perpendiculaire à la direction → wave allongé en aval/amont.
      float c = cos(r.w), s = sin(r.w);
      vec2 local = vec2(c * toR.x + s * toR.y, -s * toR.x + c * toR.y);
      local.x *= 0.55; // squash dans la direction de motion
      float d = length(local);
      float speed = 0.45;
      float front = age * speed;
      float diff = d - front;
      float w = sin(diff * 32.0) * exp(-diff * diff * 55.0) * exp(-age * 0.95);
      total += w;
    }
    return total;
  }

  float surface(vec2 p) {
    return waveHeight(p) + ripples(p) * 0.42;
  }

  // ─── Normale par différences finies ─────────────────────────────
  vec3 surfaceNormal(vec2 p) {
    float eps = 0.0035;
    float hL = surface(p - vec2(eps, 0.0));
    float hR = surface(p + vec2(eps, 0.0));
    float hD = surface(p - vec2(0.0, eps));
    float hU = surface(p + vec2(0.0, eps));
    // Le facteur Z contrôle l'amplitude perçue (plus haut = surface plus calme)
    return normalize(vec3((hL - hR) * 0.55, (hD - hU) * 0.55, eps * 4.5));
  }

  // ─── Caustiques en réseau (web pattern via abs+warp) ────────────
  float caustics(vec2 p) {
    float t = uTime * 0.22;
    vec2 q = p * 3.4;
    // Domain warp : déforme l'espace avant échantillonnage
    q += vec2(fbm3(q + t), fbm3(q + 5.2 - t)) * 0.42;
    // abs(noise - 0.5) crée des "lignes de focalisation" (caustiques)
    float c = abs(fbm3(q + t * 0.7) - 0.5) * 2.0;
    return pow(1.0 - c, 8.0);
  }

  // ─── Sky reflection ─────────────────────────────────────────────
  // Renvoie la couleur du ciel pour une direction reflectDir donnée.
  vec3 skyColor(vec3 reflectDir) {
    float h = clamp(reflectDir.y, 0.0, 1.0);
    vec3 sky = mix(SKY_HORIZON, SKY_TOP, smoothstep(0.0, 0.7, h));
    // Disque solaire net + halo doux
    float sunDot = max(0.0, dot(reflectDir, normalize(SUN_DIR)));
    float sunDisc = smoothstep(0.9985, 0.9995, sunDot);
    float sunGlow = pow(sunDot, 24.0) * 0.45;
    sky += SUN_COLOR * (sunDisc * 6.0 + sunGlow);
    return sky;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / uRes.y;
    vec2 p = vec2(uv.x * aspect, uv.y);

    // Normale et profondeur
    vec3 N = surfaceNormal(p);
    vec3 V = vec3(0.0, 0.0, 1.0); // caméra plongeante
    float NdotV = max(0.0, dot(N, V));

    // Fresnel Schlick : F0=0.02 pour l'eau
    float F0 = 0.02;
    float fresnel = F0 + (1.0 - F0) * pow(1.0 - NdotV, 5.0);

    // Réflexion : direction du rayon réfléchi
    vec3 R = reflect(-V, N);
    vec3 reflection = skyColor(R);

    // Spéculaire dur (sun glint sur la facette)
    vec3 sunDirN = normalize(SUN_DIR);
    vec3 H = normalize(sunDirN + V);
    float NdotH = max(0.0, dot(N, H));
    float spec = pow(NdotH, 220.0) * 8.0;
    reflection += SUN_COLOR * spec;

    // ─── Couleur sous l'eau (Beer-Lambert + caustiques) ───────────
    // depth = profondeur perçue : plus on monte dans l'écran (uv.y haut),
    // plus la "tranche d'eau" est épaisse (point de vue plongeant).
    float depth = clamp(uv.y * 0.85 + 0.1, 0.0, 1.0);
    vec3 underwater = mix(SHALLOW_WATER, DEEP_WATER, depth);

    // Caustiques : visibles surtout en eau peu profonde
    float c = caustics(p);
    underwater += vec3(0.55, 0.85, 1.0) * c * 0.55 * (1.0 - depth * 0.65);

    // Subsurface scattering : lueur verte/bleue où la vague s'amincit
    float surfH = waveHeight(p);
    float sss = smoothstep(-0.05, 0.25, surfH) * (1.0 - fresnel);
    underwater += vec3(0.05, 0.2, 0.15) * sss * 0.4;

    // ─── Combinaison finale (eau = mix surface réflective / volume) ─
    vec3 col = mix(underwater, reflection, fresnel);

    // ─── Mousse / écume ────────────────────────────────────────────
    // Apparaît où : crête haute + slope élevé (les vagues "cassent")
    float rip = ripples(p);
    float crest = smoothstep(0.45, 0.85, surfH + rip * 0.6);
    float slopeMag = length(vec2(N.x, N.y));
    float slope = smoothstep(0.35, 0.95, slopeMag * 4.5);
    float foamMask = crest * slope;
    // Texture noisy pour éviter une mousse trop lisse
    float foamTex = fbm3(p * 28.0 + uTime * 0.45);
    foamMask *= smoothstep(0.35, 0.7, foamTex);
    col = mix(col, vec3(0.96, 0.99, 1.0), foamMask * 0.8);

    // Mousse aussi sur les ripples très récents (sillage frais = mousse)
    col = mix(col, vec3(0.96, 0.99, 1.0), max(rip, 0.0) * 0.55);

    // ─── Sun glints (paillettes hi-freq) ──────────────────────────
    // Pin-pricks brillants de spéculaire sur micro-facettes
    float micro = vnoise(p * 80.0 + uTime * 1.5);
    float glintMask = smoothstep(0.86, 0.96, micro) * smoothstep(0.5, 1.0, NdotH);
    col += SUN_COLOR * glintMask * 1.2;

    // ─── Halo doux sous le curseur (jet ski) ──────────────────────
    vec2 mp = vec2(uMouse.x * aspect, uMouse.y);
    float dM = distance(p, mp);
    float halo = smoothstep(0.22, 0.0, dM);
    col += vec3(0.7, 0.9, 1.0) * halo * 0.12;

    // ─── Vignette douce ──────────────────────────────────────────
    float vig = smoothstep(1.25, 0.45, distance(uv, vec2(0.5)));
    col *= mix(0.8, 1.0, vig);

    // ─── Tonemap Reinhard + gamma 2.2 ────────────────────────────
    col = col / (col + vec3(1.0));
    col = pow(col, vec3(1.0 / 2.2));

    gl_FragColor = vec4(col, 1.0);
  }
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
  }
  return sh;
}

export default function WaterSurface() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl =
      (canvas.getContext("webgl") as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    // DPR clampé à 1.5 — shader assez lourd
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRipples = gl.getUniformLocation(prog, "uRipples[0]");

    let w = 0,
      h = 0;
    function resize() {
      if (!canvas) return;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Buffer de ripples (x, y, birthTime, dirAngle). z<0 = vide.
    const ripples = new Float32Array(MAX_RIPPLES * 4);
    for (let i = 0; i < MAX_RIPPLES; i++) ripples[i * 4 + 2] = -1;
    let nextSlot = 0;

    let mx = 0.5,
      my = 0.5;
    let lastSpawnX = -1,
      lastSpawnY = -1,
      lastSpawnTime = 0;
    let prevX = 0.5,
      prevY = 0.5;

    const start = performance.now();
    const nowSec = () => (performance.now() - start) / 1000;

    function addRipple(nx: number, ny: number) {
      const t = nowSec();
      const dx = nx - lastSpawnX;
      const dy = ny - lastSpawnY;
      if (dx * dx + dy * dy < 0.0008 && t - lastSpawnTime < 0.18) return;
      lastSpawnX = nx;
      lastSpawnY = ny;
      lastSpawnTime = t;
      // Direction de mouvement actuelle (atan2 → angle)
      const vx = nx - prevX;
      const vy = ny - prevY;
      let angle = 0;
      if (vx * vx + vy * vy > 1e-7) angle = Math.atan2(vy, vx);
      const aspect = canvas!.width / canvas!.height;
      const idx = nextSlot * 4;
      ripples[idx] = nx * aspect;
      ripples[idx + 1] = ny;
      ripples[idx + 2] = t;
      ripples[idx + 3] = angle;
      nextSlot = (nextSlot + 1) % MAX_RIPPLES;
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = 1 - (e.clientY - rect.top) / rect.height;
      mx = nx;
      my = ny;
      addRipple(nx, ny);
      prevX = nx;
      prevY = ny;
    }
    function onClick(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = 1 - (e.clientY - rect.top) / rect.height;
      // Splash : 3 ripples concentriques dans 3 directions différentes
      lastSpawnTime = -1;
      addRipple(nx, ny);
      lastSpawnTime = -1;
      addRipple(nx + 0.005, ny + 0.005);
      lastSpawnTime = -1;
      addRipple(nx - 0.005, ny - 0.005);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onClick);

    let raf = 0;
    function frame() {
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform2f(uMouse, mx, my);
      gl!.uniform1f(uTime, nowSec());
      gl!.uniform4fv(uRipples, ripples);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onClick);
      const ext = gl.getExtension("WEBGL_lose_context");
      ext?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
