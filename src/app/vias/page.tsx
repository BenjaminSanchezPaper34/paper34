"use client";

/**
 * Proposition d'identité visuelle — Commune de Vias (Hérault).
 *
 * SCAFFOLD : structure narrative façon case study d'agence (méthode Graphéine).
 * Les visuels sont des PLACEHOLDERS à remplacer par le design Illustrator :
 *   - <ViasMark /> → ton vrai logo (SVG)
 *   - palette CSS (objet `palette` ci-dessous) → tes vraies couleurs
 *   - sections « typographie » / « applications » → tes vrais specimens & mockups
 *
 * Tout le reste (mise en page, animations, narration) est prêt.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, fadeInUp, staggerReveal } from "@/lib/animations";

/* ─── PALETTE (placeholder méditerranéen — à remplacer par tes couleurs) ─── */
const palette = {
  sea: "#0a3d56", // bleu profond (Méditerranée / Canal)
  azur: "#1c7ea4", // bleu clair
  sun: "#f0a92e", // doré soleil
  sand: "#e6d8bd", // sable
  ink: "#10242e", // presque noir
  paper: "#f7f3ea", // blanc cassé chaud
};

const cssVars = {
  "--sea": palette.sea,
  "--azur": palette.azur,
  "--sun": palette.sun,
  "--sand": palette.sand,
  "--ink": palette.ink,
  "--paper": palette.paper,
} as React.CSSProperties;

/* ─── Logo placeholder (soleil + vagues + wordmark) — REMPLACER ─── */
function ViasMark({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <circle cx="60" cy="44" r="20" fill={color} />
      <path
        d="M18 78c8 0 8 8 16 8s8-8 16-8 8 8 16 8 8-8 16-8 8 8 16 8 8-8 8-8"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M18 96c8 0 8 8 16 8s8-8 16-8 8 8 16 8 8-8 16-8 8 8 16 8"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-bold tracking-[-0.04em] ${className}`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      Vias
    </span>
  );
}

export default function ViasPage() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      fadeInUp(".v-hero-mark", { y: 30, duration: 1.1 });
      fadeInUp(".v-hero-title", { y: 40, delay: 0.15 });
      fadeInUp(".v-hero-sub", { y: 20, delay: 0.35 });

      // Reveals génériques par section
      document.querySelectorAll<HTMLElement>(".v-reveal").forEach((el) => {
        fadeInUp(el, { y: 40 });
      });
      document.querySelectorAll<HTMLElement>(".v-stagger").forEach((group) => {
        const items = Array.from(group.children) as Element[];
        staggerReveal(items, { trigger: group, stagger: 0.12 });
      });

      // Parallaxe douce sur le logo héro
      gsap.to(".v-hero-mark", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: ".v-hero", start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={root}
      style={cssVars}
      className="min-h-screen bg-[var(--paper)] text-[var(--ink)] overflow-hidden"
    >
      {/* Bandeau signature Paper34 */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 text-xs uppercase tracking-[0.2em] text-[var(--ink)]/60 mix-blend-multiply pointer-events-none">
        <span>Proposition spontanée</span>
        <a
          href="https://www.paper34.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto hover:text-[var(--sea)] transition-colors"
        >
          Paper34
        </a>
      </div>

      {/* ═══ HERO ═══ */}
      <section className="v-hero relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6">
        <ViasMark className="v-hero-mark w-28 h-28 md:w-36 md:h-36 mb-8 text-[var(--sea)]" color="var(--sea)" />
        <h1
          className="v-hero-title font-bold tracking-[-0.04em] leading-[0.9]"
          style={{ fontSize: "clamp(3.5rem, 14vw, 11rem)", color: "var(--sea)" }}
        >
          Vias
        </h1>
        <p className="v-hero-sub mt-6 text-lg md:text-2xl text-[var(--ink)]/70 max-w-xl">
          Une identité visuelle, entre canal et Méditerranée.
        </p>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--ink)]/40">
          <span className="text-[11px] uppercase tracking-[0.2em]">Découvrir</span>
          <span className="w-px h-10 bg-[var(--ink)]/30 animate-pulse" />
        </div>
      </section>

      {/* ═══ LE CONTEXTE / LE DÉFI ═══ */}
      <section className="bg-[var(--sea)] text-[var(--paper)] py-28 md:py-40 px-6">
        <div className="mx-auto max-w-4xl">
          <p className="v-reveal text-[var(--sun)] text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            Le contexte
          </p>
          <h2
            className="v-reveal font-bold tracking-[-0.02em] leading-[1.05] mb-10"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            Vias mérite une image à la hauteur de son territoire.
          </h2>
          <div className="v-stagger grid md:grid-cols-2 gap-8 text-[var(--paper)]/80 text-lg leading-relaxed">
            <p>
              Entre le Canal du Midi classé à l&apos;UNESCO, les plages du
              lido et un vignoble généreux, Vias possède une richesse rare —
              mais une image éclatée, sans signe fort qui la rassemble.
            </p>
            <p>
              L&apos;enjeu : créer une marque de territoire <strong className="text-[var(--paper)]">simple,
              moderne et protégeable</strong>, qui parle aussi bien aux habitants
              qu&apos;aux visiteurs, du village au bord de mer.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ LE CONCEPT ═══ */}
      <section className="py-28 md:py-40 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="v-reveal text-[var(--azur)] text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            Le concept
          </p>
          <h2
            className="v-reveal font-bold tracking-[-0.02em] leading-[1.1] mb-8"
            style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.25rem)", color: "var(--sea)" }}
          >
            L&apos;eau comme fil conducteur.
          </h2>
          <p className="v-reveal text-lg md:text-xl text-[var(--ink)]/70 leading-relaxed max-w-2xl mx-auto">
            Le logotype puise dans l&apos;élément qui définit Vias : l&apos;eau,
            du Canal du Midi à la grande bleue. Un soleil qui se lève sur des
            ondes apaisées — un signe lumineux, chaleureux, méditerranéen, qui
            se mémorise en un clin d&apos;œil.
            <span className="block mt-4 text-base text-[var(--ink)]/40 italic">
              (Texte d&apos;intention — à ajuster selon ton parti pris créatif.)
            </span>
          </p>
        </div>
      </section>

      {/* ═══ LE LOGO (révélation) ═══ */}
      <section className="bg-[var(--sand)] py-32 md:py-48 px-6">
        <div className="mx-auto max-w-5xl flex flex-col items-center">
          <div className="v-reveal flex flex-col items-center gap-6">
            <ViasMark className="w-40 h-40 md:w-56 md:h-56 text-[var(--sea)]" color="var(--sea)" />
            <Wordmark className="text-[var(--sea)]" />
          </div>
          <p className="v-reveal mt-12 text-center text-[var(--ink)]/60 max-w-md">
            Le logotype principal — à décliner sur l&apos;ensemble des supports
            de la commune.
          </p>
        </div>
      </section>

      {/* ═══ LA CONSTRUCTION ═══ */}
      <section className="py-28 md:py-40 px-6">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-14 items-center">
          <div className="v-reveal">
            <p className="text-[var(--azur)] text-sm font-semibold uppercase tracking-[0.2em] mb-6">
              La construction
            </p>
            <h2
              className="font-bold tracking-[-0.02em] leading-[1.1] mb-6"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--sea)" }}
            >
              Une géométrie maîtrisée.
            </h2>
            <p className="text-lg text-[var(--ink)]/70 leading-relaxed">
              Chaque courbe est tracée sur une grille rigoureuse : proportions,
              espaces de protection et tailles minimales garantissent un logo
              impeccable à toutes les échelles, du tampon à la signalétique.
            </p>
          </div>
          {/* Placeholder grille de construction — remplacer par l'export AI */}
          <div className="v-reveal relative aspect-square rounded-2xl border border-[var(--ink)]/10 bg-[var(--paper)] grid place-items-center overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--azur) 1px, transparent 1px), linear-gradient(90deg, var(--azur) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <ViasMark className="relative w-32 h-32 text-[var(--sea)]" color="var(--sea)" />
          </div>
        </div>
      </section>

      {/* ═══ LES DÉCLINAISONS ═══ */}
      <section className="bg-[var(--ink)] text-[var(--paper)] py-28 md:py-40 px-6">
        <div className="mx-auto max-w-5xl">
          <p className="v-reveal text-[var(--sun)] text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            Les déclinaisons
          </p>
          <h2
            className="v-reveal font-bold tracking-[-0.02em] mb-12"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Un système souple, partout cohérent.
          </h2>
          <div className="v-stagger grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { bg: "var(--paper)", fg: "var(--sea)", label: "Principal" },
              { bg: "var(--sea)", fg: "var(--paper)", label: "Négatif" },
              { bg: "var(--sun)", fg: "var(--ink)", label: "Soleil" },
              { bg: "var(--azur)", fg: "var(--paper)", label: "Azur" },
            ].map((v) => (
              <div key={v.label} className="rounded-2xl p-8 flex flex-col items-center gap-4" style={{ background: v.bg }}>
                <ViasMark className="w-16 h-16" color={v.fg} />
                <span className="text-xs uppercase tracking-[0.15em]" style={{ color: v.fg, opacity: 0.7 }}>
                  {v.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LA PALETTE ═══ */}
      <section className="py-28 md:py-40 px-6">
        <div className="mx-auto max-w-5xl">
          <p className="v-reveal text-[var(--azur)] text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            La palette
          </p>
          <h2
            className="v-reveal font-bold tracking-[-0.02em] mb-12"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--sea)" }}
          >
            Les couleurs de Vias.
          </h2>
          <div className="v-stagger grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { name: "Bleu Canal", hex: palette.sea, note: "Profondeur, patrimoine" },
              { name: "Azur", hex: palette.azur, note: "Méditerranée, fraîcheur" },
              { name: "Soleil", hex: palette.sun, note: "Lumière, accueil" },
              { name: "Sable", hex: palette.sand, note: "Lido, douceur" },
              { name: "Encre", hex: palette.ink, note: "Textes, contraste" },
              { name: "Papier", hex: palette.paper, note: "Respiration, fonds" },
            ].map((c) => (
              <div key={c.name} className="rounded-2xl overflow-hidden border border-[var(--ink)]/10">
                <div className="h-28" style={{ background: c.hex }} />
                <div className="p-4 bg-[var(--paper)]">
                  <p className="font-semibold text-[var(--ink)]">{c.name}</p>
                  <p className="text-xs text-[var(--ink)]/50 uppercase tracking-wide mt-0.5">{c.hex}</p>
                  <p className="text-sm text-[var(--ink)]/60 mt-1">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LA TYPOGRAPHIE ═══ */}
      <section className="bg-[var(--sand)] py-28 md:py-40 px-6">
        <div className="mx-auto max-w-5xl">
          <p className="v-reveal text-[var(--azur)] text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            La typographie
          </p>
          <h2
            className="v-reveal font-bold tracking-[-0.02em] mb-10"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--sea)" }}
          >
            Une voix claire et institutionnelle.
          </h2>
          {/* Specimen placeholder — remplacer par ta vraie typo */}
          <div className="v-reveal rounded-2xl bg-[var(--paper)] p-10 md:p-16 border border-[var(--ink)]/10">
            <p style={{ fontSize: "clamp(4rem, 14vw, 9rem)", color: "var(--sea)" }} className="font-bold leading-none tracking-[-0.03em]">
              Aa
            </p>
            <p className="mt-6 text-2xl text-[var(--ink)]/70 tracking-wide">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </p>
            <p className="mt-2 text-2xl text-[var(--ink)]/50 tracking-wide">
              abcdefghijklmnopqrstuvwxyz 0123456789
            </p>
            <p className="mt-8 text-sm text-[var(--ink)]/40 italic">
              (Specimen provisoire — à remplacer par la police retenue.)
            </p>
          </div>
        </div>
      </section>

      {/* ═══ LES APPLICATIONS ═══ */}
      <section className="py-28 md:py-40 px-6">
        <div className="mx-auto max-w-6xl">
          <p className="v-reveal text-[var(--azur)] text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            Les applications
          </p>
          <h2
            className="v-reveal font-bold tracking-[-0.02em] mb-12"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--sea)" }}
          >
            Une identité qui vit partout.
          </h2>
          <div className="v-stagger grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { label: "Signalétique", bg: "var(--sea)", fg: "var(--paper)" },
              { label: "Papeterie", bg: "var(--paper)", fg: "var(--sea)", border: true },
              { label: "Kakémono", bg: "var(--azur)", fg: "var(--paper)" },
              { label: "Véhicules", bg: "var(--ink)", fg: "var(--paper)" },
              { label: "Goodies", bg: "var(--sun)", fg: "var(--ink)" },
              { label: "Web & réseaux", bg: "var(--sand)", fg: "var(--sea)" },
            ].map((m) => (
              <div
                key={m.label}
                className={`aspect-[4/3] rounded-2xl flex flex-col items-center justify-center gap-4 ${m.border ? "border border-[var(--ink)]/10" : ""}`}
                style={{ background: m.bg }}
              >
                <ViasMark className="w-14 h-14" color={m.fg} />
                <span className="text-xs uppercase tracking-[0.15em]" style={{ color: m.fg, opacity: 0.75 }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
          <p className="v-reveal text-sm text-[var(--ink)]/40 italic mt-6 text-center">
            (Mockups schématiques — à remplacer par tes vrais visuels en situation.)
          </p>
        </div>
      </section>

      {/* ═══ CLÔTURE / CTA ═══ */}
      <section className="bg-[var(--sea)] text-[var(--paper)] py-32 md:py-44 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <ViasMark className="v-reveal w-20 h-20 mx-auto mb-10 text-[var(--sun)]" color="var(--sun)" />
          <h2
            className="v-reveal font-bold tracking-[-0.02em] leading-[1.05] mb-8"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            Donnons à Vias une identité dont elle sera fière.
          </h2>
          <p className="v-reveal text-lg text-[var(--paper)]/75 mb-12 max-w-xl mx-auto">
            Cette proposition est une première intention, offerte spontanément.
            Discutons-en : je serais ravi d&apos;affiner cette identité avec
            vous, à l&apos;image de votre commune.
          </p>
          <div className="v-reveal flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:contact@paper34.fr?subject=Identité visuelle Vias"
              className="rounded-full bg-[var(--sun)] text-[var(--ink)] px-8 py-4 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Échanger avec Paper34
            </a>
            <Link
              href="/"
              className="rounded-full border border-[var(--paper)]/30 px-8 py-4 text-sm font-semibold hover:bg-[var(--paper)]/10 transition-colors"
            >
              Découvrir le studio
            </Link>
          </div>
          <p className="v-reveal mt-16 text-xs uppercase tracking-[0.2em] text-[var(--paper)]/40">
            Paper34 · Studio graphique à Agde
          </p>
        </div>
      </section>
    </main>
  );
}
