"use client";

import { useEffect, useRef } from "react";

/**
 * Fond décoratif : plusieurs sphères ASCII rendues sur un canvas.
 * Inspiration Hitem3D — orbes en wireframe ASCII qui tournent lentement
 * en arrière-plan. Pure déco, pointer-events: none.
 */

type Orb = {
  cx: number; // 0..1 fraction de la largeur
  cy: number; // 0..1 fraction de la hauteur
  r: number; // rayon en px
  speed: number; // vitesse de rotation
  density: number; // densité ASCII (espace entre points)
  opacity: number;
  phase: number;
};

const ORBS: Orb[] = [
  { cx: 0.18, cy: 0.28, r: 180, speed: 0.15, density: 10, opacity: 0.55, phase: 0 },
  { cx: 0.82, cy: 0.7, r: 240, speed: -0.12, density: 11, opacity: 0.45, phase: 1.2 },
  { cx: 0.5, cy: 0.45, r: 320, speed: 0.08, density: 13, opacity: 0.32, phase: 2.4 },
];

const CHARS = " .·:•○●@";

export default function AsciiOrbsBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas || !ctx) return;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const start = performance.now();
    function frame(now: number) {
      if (!ctx) return;
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const orb of ORBS) {
        const cx = orb.cx * w;
        const cy = orb.cy * h;
        const r = orb.r;
        const angle = t * orb.speed + orb.phase;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const step = orb.density;

        // Échantillonnage sphère : on parcourt une grille (lat, lon)
        const latSteps = Math.max(12, Math.floor(r / step));
        const lonSteps = latSteps * 2;
        for (let i = 1; i < latSteps; i++) {
          const phi = (i / latSteps) * Math.PI; // 0..PI
          const sinPhi = Math.sin(phi);
          const cosPhi = Math.cos(phi);
          for (let j = 0; j < lonSteps; j++) {
            const theta = (j / lonSteps) * Math.PI * 2; // 0..2PI
            // Coords 3D unitaires
            let x = sinPhi * Math.cos(theta);
            let y = cosPhi;
            let z = sinPhi * Math.sin(theta);
            // Rotation autour de l'axe Y
            const xr = x * cosA + z * sinA;
            const zr = -x * sinA + z * cosA;
            x = xr;
            z = zr;
            // Projection : on garde uniquement la face avant (z > 0 visible)
            // mais on dessine aussi l'arrière en plus pâle pour wireframe
            const front = z > 0;
            const screenX = cx + x * r;
            const screenY = cy + y * r;
            // Choix du caractère selon profondeur
            const depth = (z + 1) / 2; // 0..1
            const idx = Math.floor(depth * (CHARS.length - 1));
            const ch = CHARS[idx];
            const alpha = orb.opacity * (front ? 0.9 : 0.25) * (0.4 + depth * 0.6);
            ctx.fillStyle = `rgba(0, 113, 227, ${alpha.toFixed(3)})`;
            ctx.fillText(ch, screenX, screenY);
          }
        }
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
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
