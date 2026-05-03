"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import WaterCalm from "@/components/lab/WaterCalm";

/**
 * Eau calme + typographie qui réagit aux ondulations du curseur.
 *
 * Architecture (v3, fix perf + reactivité) :
 *   - Un VRAI <canvas> dans le DOM (positionné hors-écran) contient la
 *     displacement map. Mis à jour en JS chaque frame.
 *   - <feImage href="#disp-source"> y fait référence. Plus de toDataURL
 *     (qui bloquait le main thread à 60fps).
 *   - Un attribut "data-t" est tickté sur le <filter> chaque frame
 *     pour forcer Chrome à re-évaluer le filtre (sinon il snapshot la
 *     première frame du canvas).
 *   - WaterCalm écoute pointermove en parallèle → mêmes ripples sync.
 *   - Halo radial continu autour du curseur dans la disp map → la typo
 *     réagit au survol même immobile.
 */

type Ripple = { x: number; y: number; t: number; angle: number };

const DISP_W = 240;
const DISP_H = 120;
const DISP_ID = "ripple-disp-source";

export default function WaterTypographyPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const filterRef = useRef<SVGFilterElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const filter = filterRef.current;
    if (!canvas || !filter) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // ─── Ripples partagés (logique identique à WaterCalm) ─────────
    const ripples: Ripple[] = [];
    let lastSpawnX = -1,
      lastSpawnY = -1,
      lastSpawnTime = 0;
    let prevX = 0.5,
      prevY = 0.5;
    let prevT = performance.now();
    // mouseX/Y = cible (mise à jour par pointermove).
    // haloX/Y = position lissée affichée (lerp chaque frame).
    let mouseX = -9999,
      mouseY = -9999;
    let haloX = -9999,
      haloY = -9999;

    const start = performance.now();
    const nowSec = () => (performance.now() - start) / 1000;

    function addRipple(nx: number, ny: number, vel: number, sx: number, sy: number) {
      const t = nowSec();
      const dx = nx - lastSpawnX;
      const dy = ny - lastSpawnY;
      if (dx * dx + dy * dy < 0.003 && t - lastSpawnTime < 0.25) return;
      if (vel < 0.5) return;
      lastSpawnX = nx;
      lastSpawnY = ny;
      lastSpawnTime = t;
      const vx = nx - prevX;
      const vy = ny - prevY;
      const angle = vx * vx + vy * vy > 1e-7 ? Math.atan2(vy, vx) : 0;
      ripples.push({ x: sx, y: sy, t, angle });
      if (ripples.length > 60) ripples.splice(0, ripples.length - 60);
    }

    function onMove(e: PointerEvent) {
      const nx = e.clientX / window.innerWidth;
      const ny = 1 - e.clientY / window.innerHeight;
      const now = performance.now();
      const dt = Math.max(1, now - prevT);
      const v = (Math.hypot(nx - prevX, ny - prevY) / dt) * 1000;
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Premier event : initialise le halo sur la position pour éviter
      // un slide depuis -9999 lors du premier hover.
      if (haloX < -9000) {
        haloX = mouseX;
        haloY = mouseY;
      }
      addRipple(nx, ny, v, e.clientX, e.clientY);
      prevX = nx;
      prevY = ny;
      prevT = now;
    }
    function onClick(e: PointerEvent) {
      const cx = e.clientX,
        cy = e.clientY;
      const nx = cx / window.innerWidth;
      const ny = 1 - cy / window.innerHeight;
      lastSpawnTime = -1;
      addRipple(nx, ny, 99, cx, cy);
      lastSpawnTime = -1;
      addRipple(nx + 0.005, ny, 99, cx + 5, cy);
      lastSpawnTime = -1;
      addRipple(nx - 0.005, ny, 99, cx - 5, cy);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onClick);

    // ─── Render disp map dans le canvas DOM ─────────────────────
    const img = ctx.createImageData(DISP_W, DISP_H);

    function renderDispMap(t: number) {
      if (!ctx || !textRef.current) return;
      const bbox = textRef.current.getBoundingClientRect();
      if (bbox.width <= 0 || bbox.height <= 0) return;

      const scaleX = DISP_W / bbox.width;
      const scaleY = DISP_H / bbox.height;
      const data = img.data;

      // Reset à neutre (128, 128, 0, 255) = pas de déplacement
      for (let i = 0; i < DISP_W * DISP_H; i++) {
        data[i * 4] = 128;
        data[i * 4 + 1] = 128;
        data[i * 4 + 2] = 0;
        data[i * 4 + 3] = 255;
      }

      // Élague les ripples morts
      while (ripples.length > 0 && t - ripples[0].t > 4.5) ripples.shift();

      const speed = 0.34 * Math.max(DISP_W, DISP_H);

      // ─── Couche 1 : ripples actifs (paquets d'ondes) ────────
      for (let r = 0; r < ripples.length; r++) {
        const rip = ripples[r];
        const age = t - rip.t;
        if (age > 4.0) continue;
        const cx = (rip.x - bbox.left) * scaleX;
        const cy = (rip.y - bbox.top) * scaleY;
        const front = age * speed;
        const decay = Math.exp(-age * 0.85);
        const ringHalf = 60;
        const minR = Math.max(0, front - ringHalf);
        const maxR = front + ringHalf;
        const x0 = Math.max(0, Math.floor(cx - maxR));
        const y0 = Math.max(0, Math.floor(cy - maxR));
        const x1 = Math.min(DISP_W, Math.ceil(cx + maxR));
        const y1 = Math.min(DISP_H, Math.ceil(cy + maxR));
        if (x1 <= x0 || y1 <= y0) continue;

        const c = Math.cos(rip.angle);
        const s = Math.sin(rip.angle);

        for (let y = y0; y < y1; y++) {
          for (let x = x0; x < x1; x++) {
            const dx = x - cx;
            const dy = y - cy;
            const localX = (c * dx + s * dy) * 0.6;
            const localY = -s * dx + c * dy;
            const d = Math.hypot(localX, localY);
            if (d < minR || d > maxR) continue;
            const diff = d - front;
            // Approximation gaussienne quadratique — bcp + rapide qu'exp
            const env = Math.max(0, 1 - (diff * diff) / 3600);
            const wave = Math.sin(diff * 0.18) * env * decay;
            if (Math.abs(wave) < 0.01) continue;
            const inv = d > 0.001 ? 1 / d : 0;
            const dispX = dx * inv * wave * 0.95;
            const dispY = dy * inv * wave * 0.95;
            const idx = (y * DISP_W + x) * 4;
            const newR = data[idx] + dispX * 127;
            const newG = data[idx + 1] + dispY * 127;
            data[idx] = newR < 0 ? 0 : newR > 255 ? 255 : newR;
            data[idx + 1] = newG < 0 ? 0 : newG > 255 ? 255 : newG;
          }
        }
      }

      // ─── Couche 2 : halo continu du curseur (effet loupe) ────
      // Position lissée (lerp) pour gommer la sparseness des
      // pointermove à vitesse lente — sinon le halo saute.
      if (haloX > -9000) {
        const cxh = (haloX - bbox.left) * scaleX;
        const cyh = (haloY - bbox.top) * scaleY;
        const haloR = 50;
        const xh0 = Math.max(0, Math.floor(cxh - haloR));
        const yh0 = Math.max(0, Math.floor(cyh - haloR));
        const xh1 = Math.min(DISP_W, Math.ceil(cxh + haloR));
        const yh1 = Math.min(DISP_H, Math.ceil(cyh + haloR));
        if (xh1 > xh0 && yh1 > yh0) {
          const haloR2 = haloR * haloR;
          for (let y = yh0; y < yh1; y++) {
            for (let x = xh0; x < xh1; x++) {
              const dx = x - cxh;
              const dy = y - cyh;
              const d2 = dx * dx + dy * dy;
              if (d2 > haloR2) continue;
              // Falloff quadratique au lieu d'exp (rapide)
              const norm = 1 - d2 / haloR2;
              const falloff = norm * norm;
              const d = Math.sqrt(d2);
              const inv = d > 0.001 ? 1 / d : 0;
              const dispX = dx * inv * falloff * 0.9;
              const dispY = dy * inv * falloff * 0.9;
              const idx = (y * DISP_W + x) * 4;
              const newR = data[idx] + dispX * 127;
              const newG = data[idx + 1] + dispY * 127;
              data[idx] = newR < 0 ? 0 : newR > 255 ? 255 : newR;
              data[idx + 1] = newG < 0 ? 0 : newG > 255 ? 255 : newG;
            }
          }
        }
      }

      ctx.putImageData(img, 0, 0);
    }

    let tickCount = 0;
    let raf = 0;
    function tick() {
      // Lissage halo vers cible (gomme les saccades à vitesse lente)
      if (haloX > -9000) {
        haloX += (mouseX - haloX) * 0.22;
        haloY += (mouseY - haloY) * 0.22;
      }
      renderDispMap(nowSec());
      // Kick le filtre : Chrome cache la première frame du canvas source
      // tant qu'aucun attribut du <filter> ne change. On change un noop.
      filter!.setAttribute("data-t", String(tickCount++ & 0xffff));
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onClick);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02060f] text-white">
      {/* Fond : eau calme — écoute pointermove indépendamment, mêmes ripples */}
      <WaterCalm />

      {/* Canvas DOM réel : la disp map. Hors-écran mais rendue par le navigateur. */}
      <canvas
        ref={canvasRef}
        id={DISP_ID}
        width={DISP_W}
        height={DISP_H}
        style={{
          position: "fixed",
          left: "-10000px",
          top: 0,
          opacity: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Filtre SVG qui pointe vers le canvas DOM via #id */}
      <svg
        className="absolute pointer-events-none"
        style={{ width: 0, height: 0, position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter
            ref={filterRef}
            id="ripple-typo"
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={`#${DISP_ID}`}
              xlinkHref={`#${DISP_ID}`}
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="dispMap"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="dispMap"
              scale="80"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="relative z-10 min-h-screen flex flex-col pointer-events-none">
        <header className="px-6 py-5 flex items-center justify-between text-xs">
          <Link
            href="/lab"
            className="text-white/60 hover:text-white transition-colors pointer-events-auto"
          >
            ← Lab
          </Link>
          <span className="text-white/50 uppercase tracking-[0.2em]">
            Typo qui réagit aux ondulations
          </span>
        </header>

        <section className="flex-1 flex flex-col items-center justify-center px-6">
          <div
            ref={textRef}
            className="text-center max-w-4xl"
            style={{ filter: "url(#ripple-typo)" }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/55 mb-6">
              Survolez ou bougez à travers le texte
            </p>
            <h1
              className="font-bold tracking-[-2px] leading-[0.95] mb-8"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              }}
            >
              9 estados.
              <br />
              772 cidades.
              <br />
              <span className="gradient-text">28 millions d&apos;habitants.</span>
            </h1>
            <p className="text-base md:text-lg text-white/75 max-w-xl mx-auto">
              Les ondes qui parcourent l&apos;eau en fond déforment réellement
              la typographie au-dessus. Survol = loupe d&apos;eau. Mouvement
              franc = vague qui passe.
            </p>
          </div>
        </section>

        <footer className="px-6 py-5 text-center text-[11px] text-white/40">
          Mer calme · clic = splash partagé · sync eau ↔ texte.
        </footer>
      </div>
    </main>
  );
}
