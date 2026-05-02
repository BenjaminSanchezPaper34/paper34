"use client";

import { useEffect, useRef } from "react";

/**
 * Surface d'eau animée + ondulations radiales au curseur.
 *
 * Shader WebGL fullscreen :
 *   - Surface de base : FBM (bruit fractal) en mouvement lent → ondulation organique
 *   - Caustiques : highlights bleu/blanc calculés depuis le gradient de la surface
 *   - Ripples : tableau d'ondes radiales injectées au passage du curseur,
 *     chaque ripple est un paquet d'onde circulaire qui s'éloigne du point
 *     d'impact en s'estompant (~3 secondes de vie).
 *   - Profondeur : dégradé bleu sombre (haut) → turquoise (bas), comme vu
 *     d'au-dessus dans l'eau peu profonde.
 *
 * Pensé pour une page d'accueil "jet ski / sports nautiques".
 */

const MAX_RIPPLES = 12;

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
  uniform vec2 uMouse;        // 0..1 (déjà flippé Y depuis JS)
  uniform float uTime;
  uniform vec3 uRipples[${MAX_RIPPLES}]; // xy en uv (avec aspect intégré côté JS), z = birthTime (-1 = vide)

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.0 + vec2(13.7, 7.3);
      a *= 0.5;
    }
    return v;
  }

  // Surface de base (hauteur)
  float waterHeight(vec2 p) {
    float t = uTime * 0.18;
    vec2 q = vec2(fbm(p * 2.0 + t), fbm(p * 2.0 - t * 0.7));
    return fbm(p * 1.4 + q * 0.6 + t * 0.4);
  }

  // Somme des ondes ripple pour un point p (en espace aspect-corrigé)
  float rippleHeight(vec2 p) {
    float total = 0.0;
    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      vec3 r = uRipples[i];
      if (r.z < 0.0) continue;
      float age = uTime - r.z;
      if (age < 0.0 || age > 3.5) continue;
      vec2 rp = r.xy;
      float d = distance(p, rp);
      float speed = 0.45;
      float front = age * speed;
      float diff = d - front;
      // paquet d'ondes : sinusoïde * gaussienne sur le front * decay temporel
      float wave = sin(diff * 28.0) * exp(-diff * diff * 60.0) * exp(-age * 1.1);
      total += wave;
    }
    return total;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / uRes.y;
    vec2 p = vec2(uv.x * aspect, uv.y);
    vec2 mp = vec2(uMouse.x * aspect, uMouse.y);

    float baseH = waterHeight(p);
    float ripple = rippleHeight(p);
    float H = baseH + ripple * 0.55;

    // Gradient pour caustiques (différences finies)
    float eps = 0.004;
    float hx = waterHeight(p + vec2(eps, 0.0)) - waterHeight(p - vec2(eps, 0.0));
    float hy = waterHeight(p + vec2(0.0, eps)) - waterHeight(p - vec2(0.0, eps));
    vec2 grad = vec2(hx, hy) / (2.0 * eps);
    float gMag = length(grad);
    // Caustiques : zones de "concentration" de lumière → faible gradient
    float caustic = pow(clamp(1.0 - gMag * 0.7, 0.0, 1.0), 7.0);

    // Profondeur : sombre en haut, plus clair en bas (vue plongeante)
    vec3 deep    = vec3(0.015, 0.06, 0.18);
    vec3 mid     = vec3(0.04, 0.30, 0.55);
    vec3 shallow = vec3(0.25, 0.70, 0.85);
    vec3 col = mix(deep, mid, smoothstep(0.0, 0.8, uv.y));
    col = mix(col, shallow, smoothstep(0.55, 0.95, H));

    // Caustiques : addition lumineuse
    col += vec3(0.55, 0.85, 1.0) * caustic * 0.55;

    // Reflets de surface (hauteurs élevées) + boost ripple
    col += vec3(0.85, 0.95, 1.0) * smoothstep(0.65, 0.95, H) * 0.35;
    col += vec3(0.8, 0.95, 1.0) * max(ripple, 0.0) * 0.8;

    // Mousse / écume sur les crêtes très claires
    float foam = smoothstep(0.85, 1.0, H + ripple * 0.5);
    col = mix(col, vec3(0.95, 0.98, 1.0), foam * 0.4);

    // Halo doux autour du curseur (= jet ski)
    float dM = distance(p, mp);
    float halo = smoothstep(0.18, 0.0, dM);
    col += vec3(0.7, 0.9, 1.0) * halo * 0.15;

    // Vignette douce
    float vig = smoothstep(1.2, 0.45, distance(uv, vec2(0.5)));
    col *= mix(0.75, 1.0, vig);

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

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

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

    // Ring buffer de ripples (x, y, birthTime). z<0 = vide.
    const ripples = new Float32Array(MAX_RIPPLES * 3);
    for (let i = 0; i < MAX_RIPPLES; i++) ripples[i * 3 + 2] = -1;
    let nextSlot = 0;

    let mx = 0.5,
      my = 0.5;
    let lastSpawnX = -1,
      lastSpawnY = -1,
      lastSpawnTime = 0;

    const start = performance.now();
    function nowSec() {
      return (performance.now() - start) / 1000;
    }

    function addRipple(nx: number, ny: number) {
      const t = nowSec();
      // espacement minimum pour ne pas saturer
      const dx = nx - lastSpawnX;
      const dy = ny - lastSpawnY;
      if (dx * dx + dy * dy < 0.0008 && t - lastSpawnTime < 0.18) return;
      lastSpawnX = nx;
      lastSpawnY = ny;
      lastSpawnTime = t;
      // espace aspect-corrigé pour cohérence côté shader
      const aspect = canvas!.width / canvas!.height;
      const idx = nextSlot * 3;
      ripples[idx] = nx * aspect;
      ripples[idx + 1] = ny;
      ripples[idx + 2] = t;
      nextSlot = (nextSlot + 1) % MAX_RIPPLES;
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = 1 - (e.clientY - rect.top) / rect.height; // flip Y pour shader
      mx = nx;
      my = ny;
      addRipple(nx, ny);
    }
    function onClick(e: PointerEvent) {
      // gros splash au clic : on injecte 3 ripples rapprochés
      const rect = canvas!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = 1 - (e.clientY - rect.top) / rect.height;
      lastSpawnTime = -1; // bypass spacing
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
      gl!.uniform3fv(uRipples, ripples);
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
