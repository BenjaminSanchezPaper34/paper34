"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  badge: string;
  tagline: string;
  titlePre?: string;
  highlight?: string;
  titlePost?: string;
  subline: string;
  background?: string;
  /** Couleur de texte principale (titre, p) */
  textColor?: string;
  /** Couleur secondaire (badge, tagline, footer) */
  mutedColor?: string;
  /** L'effet (canvas) à placer derrière le contenu */
  children: ReactNode;
};

/**
 * Squelette de page d'expérience /lab/* :
 * fond plein écran + effet derrière + bloc UI au-dessus (header, hero, footer).
 */
export default function LabScene({
  badge,
  tagline,
  titlePre,
  highlight,
  titlePost,
  subline,
  background = "#000",
  textColor = "#fff",
  mutedColor = "rgba(255,255,255,0.6)",
  children,
}: Props) {
  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background, color: textColor }}
    >
      {children}

      <div className="relative z-10 min-h-screen flex flex-col pointer-events-none">
        <header className="px-6 py-5 flex items-center justify-between text-xs">
          <Link
            href="/lab"
            className="hover:opacity-100 transition-opacity pointer-events-auto"
            style={{ color: mutedColor }}
          >
            ← Lab
          </Link>
          <span
            className="uppercase tracking-[0.2em]"
            style={{ color: mutedColor }}
          >
            {badge}
          </span>
        </header>

        <section className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <p
              className="text-xs uppercase tracking-[0.3em] mb-6"
              style={{ color: mutedColor }}
            >
              {tagline}
            </p>
            <h1
              className="text-5xl md:text-7xl font-bold tracking-[-2px] leading-[0.95] mb-6"
              style={{ color: textColor }}
            >
              {titlePre}
              {highlight && (
                <span className="gradient-text">{highlight}</span>
              )}
              {titlePost}
            </h1>
            <p
              className="text-base md:text-lg max-w-xl mx-auto"
              style={{ color: mutedColor }}
            >
              {subline}
            </p>
          </div>
        </section>

        <footer
          className="px-6 py-5 text-center text-[11px]"
          style={{ color: mutedColor }}
        >
          Prototype Paper34 — bougez la souris.
        </footer>
      </div>
    </main>
  );
}
