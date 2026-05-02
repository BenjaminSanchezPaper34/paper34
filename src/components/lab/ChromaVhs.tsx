"use client";

import { useEffect, useRef } from "react";

/**
 * Chromatic aberration + scanlines + lens distortion (WebGL).
 *
 * Un fragment shader fullscreen génère une scène procédurale (gradients
 * en mouvement lent), puis applique :
 *   - séparation RGB (canal R décalé d'un côté, B de l'autre)
 *   - scanlines horizontales façon CRT
 *   - distorsion lentille radiale centrée sur le curseur (lens warp)
 *   - grain film + vignettage
 *   - tracking VHS subtil (oscillation verticale du décalage)
 *
 * L'intensité de l'aberration est pilotée par la vitesse du curseur :
 * plus tu bouges vite, plus le RGB se sépare et plus le glitch monte.
 */

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
  uniform vec2 uMouse;     // 0..1
  uniform float uVel;      // 0..1, vitesse normalisée
  uniform float uTime;

  // hash bruit
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  // Scène de base : bandes horizontales de couleurs profondes qui ondulent
  vec3 baseScene(vec2 uv) {
    float t = uTime * 0.15;
    float bands = sin((uv.y + t * 0.4) * 7.0 + sin(uv.x * 3.0 + t) * 0.5);
    float wave = sin(uv.x * 5.0 - t * 0.6) * 0.5 + 0.5;

    vec3 deep = vec3(0.04, 0.03, 0.07);
    vec3 mid  = vec3(0.10, 0.05, 0.20);
    vec3 hi   = vec3(0.05, 0.20, 0.30);
    vec3 col  = mix(deep, mid, smoothstep(-1.0, 1.0, bands));
    col = mix(col, hi, wave * 0.4);

    // Halo doux derrière le curseur
    float d = distance(uv, uMouse);
    col += vec3(0.4, 0.6, 1.0) * smoothstep(0.35, 0.0, d) * 0.25;
    return col;
  }

  void main() {
    vec2 uv = vUv;

    // Distorsion lentille radiale autour du curseur
    vec2 toMouse = uv - uMouse;
    float dist = length(toMouse);
    float lens = (1.0 - smoothstep(0.0, 0.4, dist)) * (0.06 + uVel * 0.08);
    uv -= toMouse * lens;

    // Tracking VHS : décalage horizontal qui dépend de la ligne et du temps
    float scanY = uv.y * uRes.y;
    float jitter = sin(scanY * 0.5 + uTime * 30.0) * 0.0015;
    jitter += (hash(vec2(floor(scanY * 0.5), floor(uTime * 8.0))) - 0.5) * 0.004 * uVel;
    uv.x += jitter;

    // Aberration chromatique : décalage proportionnel à la distance au centre
    // + à la vélocité du curseur
    vec2 dir = normalize(uv - 0.5 + 0.0001);
    float chroma = 0.003 + uVel * 0.012 + smoothstep(0.0, 0.7, dist) * 0.004;
    vec3 col;
    col.r = baseScene(uv + dir * chroma).r;
    col.g = baseScene(uv).g;
    col.b = baseScene(uv - dir * chroma).b;

    // Scanlines CRT
    float scan = 0.85 + 0.15 * sin(scanY * 3.14159);
    col *= scan;

    // Bandes horizontales sombres qui descendent (rolling shutter style)
    float roll = smoothstep(0.0, 0.15, fract(uv.y - uTime * 0.08));
    roll = mix(0.92, 1.0, roll);
    col *= roll;

    // Grain
    float grain = (hash(uv * uRes + uTime * 60.0) - 0.5) * 0.06;
    col += grain;

    // Vignette
    float vig = smoothstep(1.1, 0.4, distance(uv, vec2(0.5)));
    col *= mix(0.55, 1.0, vig);

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

export default function ChromaVhs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl =
      (canvas.getContext("webgl") as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Programme
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // Quad fullscreen
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
    const uVel = gl.getUniformLocation(prog, "uVel");
    const uTime = gl.getUniformLocation(prog, "uTime");

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

    let mx = 0.5,
      my = 0.5;
    let vel = 0;
    let prevX = 0.5,
      prevY = 0.5;
    let prevT = performance.now();

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = 1 - (e.clientY - rect.top) / rect.height; // flip Y pour shader
      const now = performance.now();
      const dt = Math.max(1, now - prevT);
      const v = Math.hypot(nx - prevX, ny - prevY) / dt * 1000;
      vel = Math.min(1, v * 0.4); // normalize
      mx = nx;
      my = ny;
      prevX = nx;
      prevY = ny;
      prevT = now;
    }
    window.addEventListener("pointermove", onMove);

    const start = performance.now();
    let raf = 0;
    function frame() {
      // Décroissance vitesse
      vel *= 0.92;
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform2f(uMouse, mx, my);
      gl!.uniform1f(uVel, vel);
      gl!.uniform1f(uTime, (performance.now() - start) / 1000);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
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
