"use client";

import Link from "next/link";
import WaterSurface from "@/components/lab/WaterSurface";
import { useFx } from "@/lib/useFx";

const DEMOS = [
  { label: "Fluide", href: "/lab/splash-cinema" },
  { label: "Sillage", href: "/lab/wake-trail" },
  { label: "Eau", href: "/lab/water-ripples" },
  { label: "Trame CMJN", href: "/lab/halftone-cmyk" },
  { label: "Verre liquide", href: "/lab/liquid-glass" },
  { label: "Pose longue", href: "/lab/light-trails" },
];

/**
 * Le lab, en pleine largeur : une surface d'eau photoréaliste (shader WebGL
 * maison) qui réagit au curseur, et les portes vers les autres démos.
 * C'est la preuve par l'exemple : ce qu'on met sur les sites clients est
 * d'abord fabriqué ici. Harnais standard ; mobile = fond statique.
 */
export default function LabShowcase() {
  const { ref, on } = useFx<HTMLElement>("200px 0px");
  return (
    <section ref={ref} className="relative overflow-hidden bg-bg-primary">
      <div className="relative min-h-[72svh] md:min-h-[78vh]">
        {/* Fond : eau WebGL sur desktop, nappe de lumière statique sinon */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,#0a3a5a_0%,#051a30_45%,#000_100%)]" />
          {on && <WaterSurface />}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg-secondary to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-secondary to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[72svh] max-w-6xl flex-col justify-end px-6 pb-16 pt-28 lg:px-8 md:min-h-[78vh]">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Le lab</p>
          <h2 className="font-display text-[clamp(30px,5.2vw,64px)] font-bold tracking-[-0.03em] leading-[1.02] max-w-3xl">
            On teste tout ici avant de le mettre chez vous.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-text-secondary">
            Shaders, fluides, sillages, trames d&apos;impression : chaque effet
            de ce site est né dans notre laboratoire. Bougez la souris.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {DEMOS.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="rounded-full border border-white/15 bg-black/40 px-4 py-2.5 text-sm font-medium text-text-primary backdrop-blur-md transition-colors hover:border-white/30 hover:bg-black/60"
              >
                {d.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
