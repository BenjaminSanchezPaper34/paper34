"use client";

import Link from "next/link";
import { useState } from "react";
import WakeSignature from "@/components/lab/WakeSignature";

/**
 * Trois paths de démonstration (signatures continues à un seul trait).
 * À terme on pourrait générer ça depuis du texte avec opentype.js.
 */
const PRESETS = [
  {
    label: "Flourish",
    viewBox: { x: 0, y: 0, w: 1000, h: 300 },
    d: "M 60 200 C 120 60, 220 60, 280 200 C 320 280, 360 180, 420 140 C 480 80, 560 80, 620 160 C 660 220, 740 60, 800 160 C 840 220, 920 240, 950 160 C 980 100, 940 40, 900 80",
  },
  {
    label: "Vague longue",
    viewBox: { x: 0, y: 0, w: 1200, h: 280 },
    d: "M 40 140 Q 140 20, 240 140 T 440 140 T 640 140 T 840 140 T 1040 140 T 1180 100",
  },
  {
    label: "Boucle signature",
    viewBox: { x: 0, y: 0, w: 1000, h: 320 },
    d: "M 100 220 C 80 120, 200 80, 260 180 C 290 240, 220 280, 180 240 C 220 200, 320 200, 380 220 C 460 240, 480 100, 560 120 C 620 140, 600 240, 540 240 C 580 220, 720 180, 780 240 C 840 290, 920 240, 940 160 C 950 120, 880 80, 850 120",
  },
];

export default function WakeSignaturePage() {
  const [idx, setIdx] = useState(0);
  const preset = PRESETS[idx];

  return (
    <main
      className="relative min-h-screen overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, #0a3a5a 0%, #051a30 45%, #02060f 100%)",
      }}
    >
      {/* L'effet : la signature se trace en wake */}
      <WakeSignature
        key={idx} // remount au changement de preset → reset propre
        pathD={preset.d}
        viewBox={preset.viewBox}
        duration={5.5}
        pauseBetween={1.2}
        padding={120}
        options={{
          maxWidth: 40,
          lifetime: 2.2,
          bodyColor: "rgba(180, 230, 255, 0.85)",
          foamColor: "rgba(255, 255, 255, 0.98)",
          foamWidth: 2.5,
          smoothSteps: 4,
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col pointer-events-none">
        <header className="px-6 py-5 flex items-center justify-between text-xs">
          <Link
            href="/lab"
            className="text-white/60 hover:text-white transition-colors pointer-events-auto"
          >
            ← Lab
          </Link>
          <span className="text-white/50 uppercase tracking-[0.2em]">
            Wake signature · texte manuscrit
          </span>
        </header>

        <section className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">
            La signature s&apos;écrit en sillage
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-[-1px] leading-tight mb-6">
            Le trait, <span className="gradient-text">vivant.</span>
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-8">
            Une trajectoire SVG (signature, lettre, logo) est suivie point par
            point — chaque position laisse derrière elle un sillage à largeur
            variable, comme une vraie trace dans l&apos;eau.
          </p>

          {/* Sélecteur de preset */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {PRESETS.map((p, i) => (
              <button
                key={p.label}
                onClick={() => setIdx(i)}
                className={`text-xs rounded-full px-4 py-2 border transition-colors ${
                  idx === i
                    ? "bg-white text-black border-white"
                    : "bg-white/5 text-white/70 border-white/20 hover:border-white/50"
                }`}
                type="button"
              >
                {p.label}
              </button>
            ))}
          </div>
        </section>

        <footer className="px-6 py-5 text-center text-[11px] text-white/40">
          Prototype Paper34 — moteur partagé avec /lab/wake-trail.
        </footer>
      </div>
    </main>
  );
}
