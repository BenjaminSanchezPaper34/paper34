"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * Liquid Glass — lentille qui refracte réellement le contenu de la page.
 *
 * Approche : on ne triche pas avec une simulation. Le overlay utilise
 * `backdrop-filter: url(#liquid-glass)` qui applique un filtre SVG
 * `feTurbulence` + `feDisplacementMap` à ce qui est dessous. Les pixels
 * des éléments DOM (titres, image, dégradé) sont VRAIMENT déplacés par
 * le filtre. Le filtre est animé en JS (baseFrequency oscillante) pour
 * que le verre "vive" même curseur immobile.
 *
 * Inspiration Apple Liquid Glass + visite Amazonia : le contenu réagit
 * au passage du curseur, pas juste un effet posé en surface.
 */

export default function LiquidGlassPage() {
  const lensRef = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    let raf = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let lx = mx;
    let ly = my;

    function onMove(e: PointerEvent) {
      mx = e.clientX;
      my = e.clientY;
    }
    window.addEventListener("pointermove", onMove);

    const start = performance.now();
    function tick() {
      // Suivi du curseur avec easing (effet "verre qui glisse")
      lx += (mx - lx) * 0.18;
      ly += (my - ly) * 0.18;
      if (lensRef.current) {
        lensRef.current.style.transform = `translate3d(${lx - 110}px, ${ly - 110}px, 0)`;
      }
      // Animation continue du filtre = surface du verre qui ondule
      const t = (performance.now() - start) / 1000;
      if (turbRef.current) {
        const fx = 0.011 + Math.sin(t * 0.7) * 0.004;
        const fy = 0.022 + Math.cos(t * 0.5) * 0.005;
        turbRef.current.setAttribute("baseFrequency", `${fx} ${fy}`);
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
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Filtre SVG : turbulence + déplacement → vraie réfraction du backdrop */}
      <svg
        className="absolute pointer-events-none"
        style={{ width: 0, height: 0, position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="liquid-glass"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.011 0.022"
              numOctaves="2"
              seed="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="55"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Filtre plus subtil pour les boutons / petits éléments */}
          <filter id="liquid-glass-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.03"
              numOctaves="2"
              seed="2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              scale="20"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Décor : dégradé conique flouté pour dramatiser la réfraction */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-[15%] left-[20%] w-[60vw] h-[60vw] rounded-full"
          style={{
            background:
              "conic-gradient(from 90deg, #00e0ff, #0044ff, #c800ff, #ff0080, #ff8a00, #00e0ff)",
            filter: "blur(90px)",
            opacity: 0.55,
          }}
        />
        <div
          className="absolute bottom-[10%] right-[15%] w-[50vw] h-[50vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, #00ffaa 0%, #0088ff 50%, transparent 80%)",
            filter: "blur(100px)",
            opacity: 0.4,
          }}
        />
      </div>

      {/* Contenu DOM réel — c'est lui qui sera déformé par la lentille */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="px-6 py-5 flex items-center justify-between text-xs">
          <Link
            href="/lab"
            className="text-white/60 hover:text-white transition-colors"
          >
            ← Lab
          </Link>
          <span className="text-white/50 uppercase tracking-[0.2em]">
            Liquid glass · réfraction du DOM réel
          </span>
        </header>

        <section className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/55 mb-6">
              Bougez la souris sur le titre
            </p>
            <h1
              className="font-bold tracking-[-3px] leading-[0.9] mb-8"
              style={{
                fontSize: "clamp(3.5rem, 12vw, 9rem)",
              }}
            >
              Glass
              <br />
              <span className="gradient-text">qui pense.</span>
            </h1>
            <p className="text-base md:text-lg text-white/75 max-w-xl mx-auto mb-10">
              La lentille n&apos;est pas un fond animé, elle{" "}
              <strong className="text-white">déforme réellement</strong> les
              pixels du contenu derrière elle. Texte, dégradé, boutons : tout
              ondule au passage.
            </p>

            {/* Boutons réels qui sont eux aussi refractés */}
            <div className="flex items-center justify-center gap-3 pointer-events-auto">
              <button
                className="rounded-full bg-white text-black px-8 py-3.5 text-sm font-semibold hover:bg-white/90 transition-colors"
                type="button"
              >
                Réserver une session
              </button>
              <button
                className="rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold hover:bg-white/10 transition-colors backdrop-blur"
                type="button"
              >
                Voir la flotte
              </button>
            </div>
          </div>
        </section>

        <footer className="px-6 py-5 text-center text-[11px] text-white/40">
          Prototype Paper34 — la lentille est un{" "}
          <code className="text-white/60">backdrop-filter</code> SVG, pas une
          simulation.
        </footer>
      </div>

      {/* La lentille : elle refracte tout ce qui est derrière elle */}
      <div
        ref={lensRef}
        className="fixed top-0 left-0 w-[220px] h-[220px] rounded-full pointer-events-none z-30"
        style={{
          backdropFilter:
            "url(#liquid-glass) blur(1px) brightness(1.05) saturate(1.25)",
          WebkitBackdropFilter:
            "blur(1px) brightness(1.05) saturate(1.25)",
          background:
            "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.35), rgba(255,255,255,0.06) 55%, rgba(255,255,255,0) 75%)",
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -8px 18px rgba(0,0,0,0.35), 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.18)",
          willChange: "transform",
        }}
      />
    </main>
  );
}
