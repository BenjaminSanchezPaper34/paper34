"use client";

import { useEffect, useRef } from "react";
import {
  type WakePoint,
  type WakeOptions,
  drawWake,
  DEFAULT_WAKE_OPTIONS,
} from "@/lib/wake-render";

type Props = {
  /** Attribut "d" d'un path SVG : la trajectoire que va suivre la tête du wake. */
  pathD: string;
  /** Boîte logique du path SVG (utilisée pour le centrage et le scaling) */
  viewBox: { x: number; y: number; w: number; h: number };
  /** Durée d'un cycle complet de tracé (s). Après, pause + reset + boucle. */
  duration?: number;
  /** Pause entre 2 cycles (s). */
  pauseBetween?: number;
  /** Marge intérieure dans le canvas (px), pour que le tracé respire. */
  padding?: number;
  options?: Partial<WakeOptions>;
  cssFilter?: string;
};

/**
 * Anime un sillage le long d'un chemin SVG. Le "curseur virtuel" suit la
 * trajectoire à vitesse constante (longueur d'arc) ; le wake se construit
 * derrière lui exactement comme avec WakeTrail. Idéal pour de la signature,
 * du texte manuscrit ou un logo dessiné en un trait.
 *
 * Utilise SVGPathElement.getTotalLength() + getPointAtLength() — APIs
 * navigateur natives, pas de dépendance.
 */
export default function WakeSignature({
  pathD,
  viewBox,
  duration = 5,
  pauseBetween = 1.2,
  padding = 60,
  options,
  cssFilter = "blur(5px) saturate(1.4) brightness(1.15)",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const opts: WakeOptions = { ...DEFAULT_WAKE_OPTIONS, ...options };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Crée un SVGPathElement "détaché" pour query getPointAtLength
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    const pathEl = document.createElementNS(svgNS, "path") as SVGPathElement;
    pathEl.setAttribute("d", pathD);
    svg.appendChild(pathEl);
    // L'élément doit être dans le DOM pour que getTotalLength fonctionne sur
    // certains navigateurs : on l'attache caché.
    svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;";
    document.body.appendChild(svg);
    const totalLen = pathEl.getTotalLength();

    let w = 0,
      h = 0;
    let scale = 1;
    let offsetX = 0,
      offsetY = 0;

    function resize() {
      if (!canvas || !ctx) return;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Adapte le viewBox au canvas avec padding, en conservant le ratio
      const availW = Math.max(1, w - padding * 2);
      const availH = Math.max(1, h - padding * 2);
      scale = Math.min(availW / viewBox.w, availH / viewBox.h);
      const drawnW = viewBox.w * scale;
      const drawnH = viewBox.h * scale;
      offsetX = (w - drawnW) / 2 - viewBox.x * scale;
      offsetY = (h - drawnH) / 2 - viewBox.y * scale;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /** Renvoie la position dans le canvas pour une distance le long du path. */
    function pointAt(dist: number): { x: number; y: number } {
      const p = pathEl.getPointAtLength(
        Math.max(0, Math.min(totalLen, dist))
      );
      return { x: p.x * scale + offsetX, y: p.y * scale + offsetY };
    }

    const points: WakePoint[] = [];
    const start = performance.now();
    const nowSec = () => (performance.now() - start) / 1000;
    const cycleLen = duration + pauseBetween;
    let prevHead = 0;

    let raf = 0;
    function frame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const t = nowSec();
      const phase = t % cycleLen;
      const drawing = phase < duration;
      const headFrac = drawing ? phase / duration : 1;
      const headDist = headFrac * totalLen;

      // Si on vient de reboucler : on vide le buffer (sinon on aurait un saut)
      if (headDist < prevHead - 1) {
        points.length = 0;
      }
      prevHead = headDist;

      // Échantillonne plusieurs points entre l'ancienne et la nouvelle position
      // (sinon le wake aurait des trous à grande vitesse de tracé)
      if (drawing) {
        const lastPoint = points[points.length - 1];
        const lastDist = lastPoint
          ? // Approximation : on stocke aussi la distance dans .t mais c'est
            // déjà utilisé pour le timing. On considère que les points sont
            // suffisamment denses si on ajoute toujours le head courant.
            null
          : null;
        // Densité d'échantillonnage : ~1 point tous les 4 px de tracé
        const samplePx = 4;
        const fromDist = Math.max(
          0,
          headDist - (totalLen / duration) * (1 / 60) - samplePx
        );
        for (let d = fromDist; d <= headDist; d += samplePx) {
          const p = pointAt(d);
          points.push({ x: p.x, y: p.y, t });
        }
      }

      // Élagage des points morts
      const cutoff = t - opts.lifetime - 0.2;
      while (points.length > 0 && points[0].t < cutoff) points.shift();
      if (points.length > 1500) points.splice(0, points.length - 1500);

      drawWake(ctx, points, t, opts);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      svg.remove();
    };
  }, [pathD, viewBox, duration, pauseBetween, padding, options]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ filter: cssFilter }}
      aria-hidden="true"
    />
  );
}
