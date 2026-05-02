"use client";

import { useEffect, useRef } from "react";
import {
  type WakePoint,
  type WakeOptions,
  drawWake,
  DEFAULT_WAKE_OPTIONS,
} from "@/lib/wake-render";

type Props = {
  options?: Partial<WakeOptions>;
  /** Espacement minimum entre 2 points enregistrés (px) */
  minSpacing?: number;
  /** Filtre CSS sur le canvas pour le rendu soyeux (blur, etc) */
  cssFilter?: string;
};

/**
 * Sillage qui suit le curseur. Inspiration : trace d'un jet ski sur l'eau.
 * Architecture : positions du curseur enregistrées avec timestamp →
 * lissage Catmull-Rom → polygone à largeur variable → blur CSS.
 */
export default function WakeTrail({
  options,
  minSpacing = 4,
  cssFilter = "blur(6px) saturate(1.4) brightness(1.15)",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const opts: WakeOptions = { ...DEFAULT_WAKE_OPTIONS, ...options };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0,
      h = 0;
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

    const points: WakePoint[] = [];
    let lastX = -9999,
      lastY = -9999;
    const start = performance.now();
    const nowSec = () => (performance.now() - start) / 1000;

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = x - lastX;
      const dy = y - lastY;
      if (dx * dx + dy * dy < minSpacing * minSpacing) return;
      lastX = x;
      lastY = y;
      points.push({ x, y, t: nowSec() });
      // Cap pour éviter la fuite mémoire
      if (points.length > 400) points.splice(0, points.length - 400);
    }
    window.addEventListener("pointermove", onMove);

    let raf = 0;
    function frame() {
      if (!ctx) return;
      // Clear total : on redessine le sillage entier depuis les points actifs
      ctx.clearRect(0, 0, w, h);
      // Élague les points morts pour limiter la liste
      const t = nowSec();
      const cutoff = t - opts.lifetime - 0.2;
      while (points.length > 0 && points[0].t < cutoff) points.shift();
      drawWake(ctx, points, t, opts);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [options, minSpacing]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ filter: cssFilter }}
      aria-hidden="true"
    />
  );
}
