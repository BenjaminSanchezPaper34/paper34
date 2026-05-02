"use client";

import { useEffect, useRef } from "react";

/**
 * WaterCalm — version pacifiée de WaterSurface.
 *
 * Différences vs WaterSurface :
 *   - 2 couches de vagues seulement (houle + clapot léger), amplitudes /2
 *   - Pas de sun glints hi-freq
 *   - Spéculaire / disque solaire très atténués
 *   - Ripples uniquement sur mouvement franc (gate vélocité)
 *   - Mousse rare
 *
 * Pensé comme fond paisible derrière une typographie qui ondule.
 */

const MAX_RIPPLES = 8;

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
  uniform vec2 uMouse;
  uniform float uTime;
  uniform vec4 uRipples[${MAX_RIPPLES}];

  const vec2 WIND = vec2(0.8, 0.2);
  const vec3 SUN_DIR        = vec3(0.4, 0.5, 0.77);
  const vec3 DEEP_WATER     = vec3(0.004, 0.025, 0.08);
  const vec3 SHALLOW_WATER  = vec3(0.04, 0.20, 0.30);
  const vec3 SKY_TOP        = vec3(0.30, 0.50, 0.78);
  const vec3 SKY_HORIZON    = vec3(0.55, 0.70, 0.85);
  const vec3 SUN_COLOR      = vec3(1.0, 0.95, 0.82);

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
  float fbm3(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * vnoise(p);
      p = p * 2.07 + vec2(13.7, 7.3);
      a *= 0.5;
    }
    return v;
  }

  float waveHeight(vec2 p) {
    float t = uTime;
    float h  = (fbm3(p * 0.7  - WIND * t * 0.06) - 0.5) * 0.55;
    h       += (fbm3(p * 2.0  - WIND * t * 0.18) - 0.5) * 0.18;
    return h;
  }

  float ripples(vec2 p) {
    float total = 0.0;
    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      vec4 r = uRipples[i];
      if (r.z < 0.0) continue;
      float age = uTime - r.z;
      if (age < 0.0 || age > 4.5) continue;
      vec2 toR = p - r.xy;
      float c = cos(r.w), s = sin(r.w);
      vec2 local = vec2(c * toR.x + s * toR.y, -s * toR.x + c * toR.y);
      local.x *= 0.6;
      float d = length(local);
      float front = age * 0.34;
      float diff = d - front;
      float w = sin(diff * 22.0) * exp(-diff * diff * 38.0) * exp(-age * 0.85);
      total += w;
    }
    return total;
  }

  float surface(vec2 p) {
    return waveHeight(p) + ripples(p) * 0.32;
  }

  vec3 surfaceNormal(vec2 p) {
    float eps = 0.004;
    float hL = surface(p - vec2(eps, 0.0));
    float hR = surface(p + vec2(eps, 0.0));
    float hD = surface(p - vec2(0.0, eps));
    float hU = surface(p + vec2(0.0, eps));
    return normalize(vec3((hL - hR) * 0.45, (hD - hU) * 0.45, eps * 5.5));
  }

  vec3 skyColor(vec3 reflectDir) {
    float h = clamp(reflectDir.y, 0.0, 1.0);
    vec3 sky = mix(SKY_HORIZON, SKY_TOP, smoothstep(0.0, 0.7, h));
    float sunDot = max(0.0, dot(reflectDir, normalize(SUN_DIR)));
    // Disque solaire très discret
    sky += SUN_COLOR * pow(sunDot, 64.0) * 0.6;
    return sky;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / uRes.y;
    vec2 p = vec2(uv.x * aspect, uv.y);

    vec3 N = surfaceNormal(p);
    vec3 V = vec3(0.0, 0.0, 1.0);
    float NdotV = max(0.0, dot(N, V));

    float F0 = 0.02;
    float fresnel = F0 + (1.0 - F0) * pow(1.0 - NdotV, 5.0);

    vec3 R = reflect(-V, N);
    vec3 reflection = skyColor(R);

    // Spéculaire très doux
    vec3 sunDirN = normalize(SUN_DIR);
    vec3 H = normalize(sunDirN + V);
    float NdotH = max(0.0, dot(N, H));
    float spec = pow(NdotH, 220.0) * 1.4;
    reflection += SUN_COLOR * spec;

    // Couleur sous l'eau (sans caustiques pour rester sobre)
    float depth = clamp(uv.y * 0.85 + 0.1, 0.0, 1.0);
    vec3 underwater = mix(SHALLOW_WATER, DEEP_WATER, depth);

    vec3 col = mix(underwater, reflection, fresnel);

    // Mousse très discrète : juste un soupçon sur les ripples
    float rip = ripples(p);
    col = mix(col, vec3(0.85, 0.93, 1.0), max(rip, 0.0) * 0.12);

    // Vignette
    float vig = smoothstep(1.25, 0.45, distance(uv, vec2(0.5)));
    col *= mix(0.8, 1.0, vig);

    // Tonemap + gamma
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

export default function WaterCalm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl =
      (canvas.getContext("webgl") as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

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

    function resize() {
      if (!canvas) return;
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const ripples = new Float32Array(MAX_RIPPLES * 4);
    for (let i = 0; i < MAX_RIPPLES; i++) ripples[i * 4 + 2] = -1;
    let nextSlot = 0;

    let mx = 0.5,
      my = 0.5;
    let prevX = 0.5,
      prevY = 0.5;
    let prevT = performance.now();
    let lastSpawnX = -1,
      lastSpawnY = -1,
      lastSpawnTime = 0;

    const start = performance.now();
    const nowSec = () => (performance.now() - start) / 1000;

    function addRipple(nx: number, ny: number, vel: number) {
      const t = nowSec();
      // Espacement physique minimum
      const dx = nx - lastSpawnX;
      const dy = ny - lastSpawnY;
      if (dx * dx + dy * dy < 0.003 && t - lastSpawnTime < 0.25) return;
      // Gate vélocité : on ne spawn pas pour des micro-mouvements
      if (vel < 0.5) return;
      lastSpawnX = nx;
      lastSpawnY = ny;
      lastSpawnTime = t;
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
      const now = performance.now();
      const dt = Math.max(1, now - prevT);
      // Vélocité en "viewport widths per second"
      const v = (Math.hypot(nx - prevX, ny - prevY) / dt) * 1000;
      mx = nx;
      my = ny;
      addRipple(nx, ny, v);
      prevX = nx;
      prevY = ny;
      prevT = now;
    }
    function onClick(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = 1 - (e.clientY - rect.top) / rect.height;
      // Force le spawn (bypass tous les gates)
      lastSpawnTime = -1;
      addRipple(nx, ny, 99);
      lastSpawnTime = -1;
      addRipple(nx + 0.005, ny, 99);
      lastSpawnTime = -1;
      addRipple(nx - 0.005, ny, 99);
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
