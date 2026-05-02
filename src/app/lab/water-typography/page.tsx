"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import WaterCalm from "@/components/lab/WaterCalm";

/**
 * Mer calme + typographie qui ondule comme vue à travers l'eau.
 *
 * - Fond : WaterCalm (shader pacifié)
 * - Au-dessus : un bloc de texte "9 estados…" stylisé, avec un filtre
 *   SVG `feTurbulence` + `feDisplacementMap` qui le déforme en continu.
 * - L'amplitude du déplacement (`scale`) augmente avec la proximité
 *   du curseur au bloc texte → la typo réagit au passage.
 * - La baseFrequency oscille lentement → mouvement de "courant".
 *
 * Inspiration mix : le calme de visiteamazonia + l'eau Paper34.
 */

export default function WaterTypographyPage() {
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    function onMove(e: PointerEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
    window.addEventListener("pointermove", onMove);

    const start = performance.now();
    function tick() {
      const t = (performance.now() - start) / 1000;

      // baseFrequency oscille lentement (cycle ~12s) → "courant" continu
      if (turbRef.current) {
        const fx = 0.0085 + Math.sin(t * 0.55) * 0.0028;
        const fy = 0.013 + Math.cos(t * 0.42) * 0.0035;
        turbRef.current.setAttribute("baseFrequency", `${fx} ${fy}`);
      }

      // Distance curseur → bloc texte → scale displacement
      if (dispRef.current && textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        // Distance au point le plus proche du rectangle
        const cx = Math.max(rect.left, Math.min(mouseX, rect.right));
        const cy = Math.max(rect.top, Math.min(mouseY, rect.bottom));
        const dist = Math.hypot(mouseX - cx, mouseY - cy);
        // Map [0..400px] → [boost..0]
        const proximity = Math.max(0, 1 - dist / 400);
        const baseScale = 9;
        const boost = 26 * proximity * proximity;
        dispRef.current.setAttribute("scale", String(baseScale + boost));
      }

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02060f] text-white">
      {/* Fond : eau calme */}
      <WaterCalm />

      {/* Filtre SVG qui déforme la typo */}
      <svg
        className="absolute pointer-events-none"
        style={{ width: 0, height: 0, position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="water-typo"
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.0085 0.013"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale="9"
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
            Eau calme · typo qui ondule
          </span>
        </header>

        <section className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Bloc principal stylisé : la typo qui sera déformée */}
          <div
            ref={textRef}
            className="text-center max-w-4xl"
            style={{ filter: "url(#water-typo)" }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/55 mb-6">
              Approchez la souris du texte
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
              La typo n&apos;est pas dans un canvas : c&apos;est du vrai texte
              HTML, sélectionnable, accessible, indexable. Le filtre SVG la
              déforme uniquement à la composition.
            </p>
          </div>
        </section>

        <footer className="px-6 py-5 text-center text-[11px] text-white/40">
          Mer calme : ripples uniquement sur mouvement franc · clic = splash.
        </footer>
      </div>
    </main>
  );
}
