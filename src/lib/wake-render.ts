/**
 * Moteur de rendu de sillage (wake) partagé entre WakeTrail (curseur)
 * et WakeSignature (chemin SVG). Inspiration Igaratipo : on dessine une
 * forme propre en Canvas 2D, le rendu "soyeux" est obtenu via filter CSS
 * (blur + saturate) sur le canvas lui-même.
 *
 * Principe :
 *   1. On reçoit une liste de points avec timestamp (les positions traversées
 *      par la "tête" du sillage).
 *   2. On lisse via spline Catmull-Rom centripète.
 *   3. On construit un polygone à largeur variable :
 *      - largeur max au milieu, tapered aux extrémités (pointe + queue)
 *      - décroissance temporelle (les points anciens rétrécissent jusqu'à 0)
 *   4. Bonus crête d'écume au centre (ligne fine plus claire).
 */

export type WakePoint = { x: number; y: number; t: number };

export type WakeOptions = {
  /** Couleur du corps du sillage (rgba) */
  bodyColor: string;
  /** Couleur de la crête d'écume (rgba) ou null pour désactiver */
  foamColor?: string | null;
  /** Largeur max en px (au point le plus chaud) */
  maxWidth: number;
  /** Largeur de la crête d'écume en px */
  foamWidth: number;
  /** Durée de vie d'un point en secondes (au-delà : invisible) */
  lifetime: number;
  /** Nombre de points "tail" pour le tapering arrière */
  taperTail: number;
  /** Nombre de points "head" pour le tapering avant */
  taperHead: number;
  /** Subdivisions Catmull-Rom par segment (plus = plus lisse) */
  smoothSteps: number;
};

/** Spline Catmull-Rom centripète : génère des points intermédiaires lissés. */
function catmullRom(pts: WakePoint[], steps: number): WakePoint[] {
  if (pts.length < 2) return [...pts];
  const out: WakePoint[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const t2 = t * t;
      const t3 = t2 * t;
      const x =
        0.5 *
        (2 * p1.x +
          (-p0.x + p2.x) * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
      const y =
        0.5 *
        (2 * p1.y +
          (-p0.y + p2.y) * t +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);
      const tt = p1.t + (p2.t - p1.t) * t;
      out.push({ x, y, t: tt });
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

export function drawWake(
  ctx: CanvasRenderingContext2D,
  rawPoints: WakePoint[],
  now: number,
  opts: WakeOptions
) {
  // Filtre les points morts
  const alive = rawPoints.filter((p) => now - p.t < opts.lifetime);
  if (alive.length < 4) return;

  const smooth = catmullRom(alive, opts.smoothSteps);
  const n = smooth.length;

  // Largeurs
  const widths: number[] = new Array(n);
  for (let i = 0; i < n; i++) {
    const headFade = Math.min(1, i / Math.max(1, opts.taperHead));
    const tailFade = Math.min(
      1,
      (n - 1 - i) / Math.max(1, opts.taperTail)
    );
    const age = now - smooth[i].t;
    const ageFade = Math.max(0, 1 - age / opts.lifetime);
    // Ease-out sur ageFade pour rester épais plus longtemps puis fondre
    const ageFadeEased = ageFade * ageFade;
    widths[i] = opts.maxWidth * headFade * tailFade * ageFadeEased;
  }

  // Bords gauche/droit du polygone
  const left: { x: number; y: number }[] = new Array(n);
  const right: { x: number; y: number }[] = new Array(n);
  for (let i = 0; i < n; i++) {
    const prev = smooth[Math.max(0, i - 1)];
    const next = smooth[Math.min(n - 1, i + 1)];
    let tx = next.x - prev.x;
    let ty = next.y - prev.y;
    const len = Math.hypot(tx, ty) || 1;
    tx /= len;
    ty /= len;
    const px = -ty;
    const py = tx;
    const w = widths[i] / 2;
    const cx = smooth[i].x;
    const cy = smooth[i].y;
    left[i] = { x: cx + px * w, y: cy + py * w };
    right[i] = { x: cx - px * w, y: cy - py * w };
  }

  // Polygone rempli
  ctx.beginPath();
  ctx.moveTo(left[0].x, left[0].y);
  for (let i = 1; i < n; i++) ctx.lineTo(left[i].x, left[i].y);
  for (let i = n - 1; i >= 0; i--) ctx.lineTo(right[i].x, right[i].y);
  ctx.closePath();
  ctx.fillStyle = opts.bodyColor;
  ctx.fill();

  // Crête d'écume : ligne fine au centre, plus brillante
  if (opts.foamColor) {
    ctx.beginPath();
    ctx.moveTo(smooth[0].x, smooth[0].y);
    for (let i = 1; i < n; i++) ctx.lineTo(smooth[i].x, smooth[i].y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = opts.foamWidth;
    ctx.strokeStyle = opts.foamColor;
    ctx.stroke();
  }
}

export const DEFAULT_WAKE_OPTIONS: WakeOptions = {
  bodyColor: "rgba(220, 240, 255, 0.85)",
  foamColor: "rgba(255, 255, 255, 0.95)",
  maxWidth: 28,
  foamWidth: 2.2,
  lifetime: 1.6,
  taperTail: 8,
  taperHead: 4,
  smoothSteps: 6,
};
