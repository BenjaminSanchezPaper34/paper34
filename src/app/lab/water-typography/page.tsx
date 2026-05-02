"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import WaterCalm from "@/components/lab/WaterCalm";

/**
 * Eau calme + typographie qui réagit aux ondulations du curseur.
 *
 * Architecture clé : un canvas 2D caché ("disp map") est mis à jour à
 * chaque frame avec les ripples actifs du curseur, encodés en R/G
 * (déplacement X / Y). Ce canvas est la source d'un <feImage> qui
 * alimente le <feDisplacementMap> appliqué au bloc texte.
 *
 * Comme WaterCalm écoute les MÊMES événements pointermove que ce
 * système, l'eau et la typo voient passer les mêmes ondes — quand un
 * ripple traverse une lettre, elle ondule réellement (pas une animation
 * indépendante).
 */

type Ripple = { x: number; y: number; t: number; angle: number };

const DISP_W = 240;
const DISP_H = 120;

export default function WaterTypographyPage() {
  const dispImageRef = useRef<SVGFEImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ─── Setup canvas displacement (mémoire seulement, jamais affiché) ─
    const dispCanvas = document.createElement("canvas");
    dispCanvas.width = DISP_W;
    dispCanvas.height = DISP_H;
    const dispCtx = dispCanvas.getContext("2d", { willReadFrequently: true });
    if (!dispCtx) return;

    // ─── État ripples partagé avec WaterCalm (sync via events identiques) ─
    const ripples: Ripple[] = [];
    let lastSpawnX = -1,
      lastSpawnY = -1,
      lastSpawnTime = 0;
    let prevX = 0.5,
      prevY = 0.5;
    let prevT = performance.now();
    let mouseX = -9999,
      mouseY = -9999;

    const start = performance.now();
    const nowSec = () => (performance.now() - start) / 1000;

    function addRipple(nx: number, ny: number, vel: number, screenX: number, screenY: number) {
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
      ripples.push({ x: screenX, y: screenY, t, angle });
      // Cap
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
      addRipple(nx, ny, v, e.clientX, e.clientY);
      prevX = nx;
      prevY = ny;
      prevT = now;
    }
    function onClick(e: PointerEvent) {
      lastSpawnTime = -1;
      addRipple(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight,
        99,
        e.clientX,
        e.clientY
      );
      lastSpawnTime = -1;
      addRipple(
        e.clientX / window.innerWidth + 0.005,
        1 - e.clientY / window.innerHeight,
        99,
        e.clientX + 5,
        e.clientY
      );
      lastSpawnTime = -1;
      addRipple(
        e.clientX / window.innerWidth - 0.005,
        1 - e.clientY / window.innerHeight,
        99,
        e.clientX - 5,
        e.clientY
      );
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onClick);

    // ─── Render disp map + push to <feImage> ─────────────────────────
    function renderDispMap(t: number) {
      if (!textRef.current || !dispCtx) return;
      const bbox = textRef.current.getBoundingClientRect();
      if (bbox.width <= 0 || bbox.height <= 0) return;

      // Mapping pixel canvas → coords écran (relative à bbox text)
      const scaleX = DISP_W / bbox.width;
      const scaleY = DISP_H / bbox.height;

      // Image neutre (128, 128, 0, 255) = pas de déplacement
      const img = dispCtx.createImageData(DISP_W, DISP_H);
      const data = img.data;
      for (let i = 0; i < DISP_W * DISP_H; i++) {
        data[i * 4] = 128;
        data[i * 4 + 1] = 128;
        data[i * 4 + 2] = 0;
        data[i * 4 + 3] = 255;
      }

      // Élague les ripples morts pour éviter la fuite
      while (ripples.length > 0 && t - ripples[0].t > 4.5) ripples.shift();

      // Vitesse propagation onde dans l'espace canvas (en pixels/sec)
      const speed = 0.34 * Math.max(DISP_W, DISP_H);

      for (const r of ripples) {
        const age = t - r.t;
        if (age > 4.0) continue;
        // Position du ripple dans l'espace canvas
        const cx = (r.x - bbox.left) * scaleX;
        const cy = (r.y - bbox.top) * scaleY;
        const front = age * speed;
        const decay = Math.exp(-age * 0.85);
        // Bbox d'influence : on n'itère que là où l'onde peut être visible
        // (front ± fenêtre gaussienne)
        const ringHalf = 60; // demi-largeur de l'enveloppe gaussienne en px canvas
        const minR = Math.max(0, front - ringHalf);
        const maxR = front + ringHalf;
        const x0 = Math.max(0, Math.floor(cx - maxR));
        const y0 = Math.max(0, Math.floor(cy - maxR));
        const x1 = Math.min(DISP_W, Math.ceil(cx + maxR));
        const y1 = Math.min(DISP_H, Math.ceil(cy + maxR));
        if (x1 <= x0 || y1 <= y0) continue;

        // Anisotropie : matrice de rotation pour le squash directionnel
        const c = Math.cos(r.angle);
        const s = Math.sin(r.angle);

        for (let y = y0; y < y1; y++) {
          for (let x = x0; x < x1; x++) {
            const dx = x - cx;
            const dy = y - cy;
            // Repère local (rotation), squash X dans la direction de motion
            const localX = (c * dx + s * dy) * 0.6;
            const localY = -s * dx + c * dy;
            const d = Math.hypot(localX, localY);
            if (d < minR || d > maxR) continue;
            const diff = d - front;
            const wave =
              Math.sin(diff * 0.18) *
              Math.exp(-(diff * diff) / 4500) *
              decay;
            // Direction du déplacement = radiale sortante
            const inv = d > 0.001 ? 1 / d : 0;
            const ux = dx * inv;
            const uy = dy * inv;
            const dispX = ux * wave * 0.95;
            const dispY = uy * wave * 0.95;
            const idx = (y * DISP_W + x) * 4;
            // Additionne aux 128 existants (multi-ripples se cumulent)
            const newR = data[idx] + dispX * 127;
            const newG = data[idx + 1] + dispY * 127;
            data[idx] = newR < 0 ? 0 : newR > 255 ? 255 : newR;
            data[idx + 1] = newG < 0 ? 0 : newG > 255 ? 255 : newG;
          }
        }
      }

      dispCtx.putImageData(img, 0, 0);
      // Push vers <feImage>
      const url = dispCanvas.toDataURL("image/png");
      if (dispImageRef.current) {
        dispImageRef.current.setAttribute("href", url);
        dispImageRef.current.setAttribute(
          "http://www.w3.org/1999/xlink",
          url
        );
      }
    }

    // Throttle disp map updates à ~30fps (toDataURL est cher)
    let lastDispUpdate = 0;
    let raf = 0;
    function tick() {
      const now = performance.now();
      if (now - lastDispUpdate > 33) {
        renderDispMap(nowSec());
        lastDispUpdate = now;
      }
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

      {/* Filtre SVG : feImage = canvas disp map mis à jour en JS */}
      <svg
        className="absolute pointer-events-none"
        style={{ width: 0, height: 0, position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="ripple-typo"
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
            colorInterpolationFilters="sRGB"
          >
            {/* Source : displacement map dynamique (canvas R/G) */}
            <feImage
              ref={dispImageRef}
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
              scale="70"
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
              Bougez la souris à travers le texte
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
              Les mêmes ripples qui parcourent l&apos;eau en fond
              déforment la typographie au-dessus. Quand une vague traverse une
              lettre, elle ondule pour de vrai.
            </p>
          </div>
        </section>

        <footer className="px-6 py-5 text-center text-[11px] text-white/40">
          Mer calme : aucune ondulation au repos · clic = splash partagé.
        </footer>
      </div>
    </main>
  );
}
