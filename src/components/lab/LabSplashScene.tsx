"use client";

import Link from "next/link";
import SplashCursor from "@/components/lab/SplashCursor";
import AsciiOrbsBg from "@/components/lab/AsciiOrbsBg";

type Color = { r: number; g: number; b: number };

type Props = {
  /** Étiquette en haut à droite (ex. "Encre CMJN · graphiste") */
  badge: string;
  /** Phrase d'accroche dans le hero */
  tagline: string;
  /** Sous-titre */
  subline: string;
  /** Mot du H1 mis en gradient (option) */
  highlight?: string;
  /** Reste du H1 avant le mot highlight */
  titlePre?: string;
  /** Reste du H1 après */
  titlePost?: string;

  /** Palette du fluide */
  colors: Color[];
  /** Intensité dissipation densité (1-3.5 typique) */
  densityDissipation?: number;
  velocityDissipation?: number;
  curl?: number;
  splatRadius?: number;
  splatForce?: number;

  /** Couleur de fond (CSS) */
  background?: string;
  /** Afficher les orbes ASCII en fond */
  withOrbs?: boolean;
};

export default function LabSplashScene({
  badge,
  tagline,
  subline,
  highlight,
  titlePre,
  titlePost,
  colors,
  densityDissipation = 3.5,
  velocityDissipation = 2,
  curl = 3,
  splatRadius = 0.2,
  splatForce = 6000,
  background = "black",
  withOrbs = true,
}: Props) {
  return (
    <main
      className="relative min-h-screen overflow-hidden text-white"
      style={{ background }}
    >
      {withOrbs && <AsciiOrbsBg />}

      <SplashCursor
        colors={colors}
        densityDissipation={densityDissipation}
        velocityDissipation={velocityDissipation}
        curl={curl}
        splatRadius={splatRadius}
        splatForce={splatForce}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="px-6 py-5 flex items-center justify-between text-xs">
          <Link
            href="/lab"
            className="text-white/60 hover:text-white transition-colors"
          >
            ← Lab
          </Link>
          <span className="text-white/50 uppercase tracking-[0.2em]">
            {badge}
          </span>
        </header>

        <section className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">
              {tagline}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-[-2px] leading-[0.95] mb-6">
              {titlePre}
              {highlight && (
                <span className="gradient-text">{highlight}</span>
              )}
              {titlePost}
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto">
              {subline}
            </p>
          </div>
        </section>

        <footer className="px-6 py-5 text-center text-[11px] text-white/40">
          Prototype Paper34 — bougez la souris.
        </footer>
      </div>
    </main>
  );
}
