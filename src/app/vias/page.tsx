"use client";

/**
 * Proposition d'identité visuelle — Commune de Vias (Hérault).
 *
 * SCAFFOLD : étude de cas narrative façon agence (méthodes Graphéine / Hymn).
 * La narration s'appuie sur le VRAI patrimoine de Vias :
 *   - Église fortifiée Saint-Jean-Baptiste (XIVe s., MH 1907)
 *   - Canal du Midi (UNESCO) + ouvrages du Libron (franchissement hydraulique)
 *   - Blason : « d'or aux trois pals de gueules, au chef d'azur fleurdelisé »
 *     → la palette est ANCRÉE sur ces couleurs héraldiques (or / gueules / azur)
 *   - Terre volcanique (Roque-Haute, basalte), lido & Méditerranée, vignoble
 *   - Nom attesté depuis 922 (villa Aviatio)
 *
 * Visuels en PLACEHOLDER à remplacer par le design Illustrator :
 *   - <ViasMark /> → ton vrai logo (SVG)
 *   - objet `palette` ci-dessous → tes vrais hex (un seul point de swap)
 *   - section « racines » → tes photos du patrimoine
 *   - sections « typographie » / « applications » → tes specimens & mockups
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, fadeInUp, staggerReveal } from "@/lib/animations";

/* ─── PALETTE — héritée du blason de Vias (à affiner sur tes valeurs) ───
   Blasonnement : d'or aux trois pals de gueules, au chef d'azur
   chargé de trois fleurs de lys d'or.                                    */
const palette = {
  sea: "#0e3148", // Bleu Canal — Canal du Midi, fonds profonds
  azur: "#1c5d9e", // Azur — le chef du blason, la Méditerranée
  gueules: "#b5322b", // Gueules — les trois pals rouges du blason
  sun: "#e0a129", // Or — le champ du blason, le soleil du Sud
  sand: "#e5d9c3", // Pierre — l'église fortifiée, le lido
  ink: "#17150f", // Basalte — la terre volcanique, les textes
  paper: "#f7f3ea", // Papier — respiration, fonds clairs
};

const cssVars = {
  "--sea": palette.sea,
  "--azur": palette.azur,
  "--gueules": palette.gueules,
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
      fadeInUp(".v-hero-kicker", { y: 16, duration: 0.9 });
      fadeInUp(".v-hero-title", { y: 40, delay: 0.1 });
      fadeInUp(".v-hero-mark", { y: 30, delay: 0.25, duration: 1.1 });
      fadeInUp(".v-hero-sub", { y: 20, delay: 0.4 });

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
        <p className="v-hero-kicker text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--ink)]/50 mb-8">
          Commune de Vias · Hérault
        </p>
        <h1
          className="v-hero-title font-bold tracking-[-0.04em] leading-[0.9]"
          style={{ fontSize: "clamp(3.5rem, 14vw, 11rem)", color: "var(--sea)" }}
        >
          Vias
        </h1>
        <ViasMark className="v-hero-mark w-16 h-16 md:w-20 md:h-20 mt-8 text-[var(--sun)]" color="var(--sun)" />
        <p className="v-hero-sub mt-8 text-lg md:text-2xl text-[var(--ink)]/70 max-w-xl leading-snug">
          Une identité née de mille ans d&apos;histoire, tournée vers demain.
        </p>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--ink)]/40">
          <span className="text-[11px] uppercase tracking-[0.2em]">Découvrir</span>
          <span className="w-px h-10 bg-[var(--ink)]/30 animate-pulse" />
        </div>
      </section>

      {/* ═══ LE TERRITOIRE / LE CONTEXTE ═══ */}
      <section className="bg-[var(--sea)] text-[var(--paper)] py-28 md:py-40 px-6">
        <div className="mx-auto max-w-4xl">
          <p className="v-reveal text-[var(--sun)] text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            Le territoire
          </p>
          <h2
            className="v-reveal font-bold tracking-[-0.02em] leading-[1.05] mb-10"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            Peu de communes ont autant à raconter.
          </h2>
          <div className="v-stagger grid md:grid-cols-2 gap-8 text-[var(--paper)]/80 text-lg leading-relaxed">
            <p>
              Une église fortifiée du XIV<sup>e</sup> siècle, le Canal du Midi
              classé à l&apos;UNESCO, un blason vieux de plus de mille ans, une
              terre née du volcan et bordée par la Méditerranée. Vias ne manque
              pas d&apos;histoire — il lui manque un signe qui la rassemble.
            </p>
            <p>
              Aujourd&apos;hui, son image se disperse : un logo ici, une autre
              couleur là. L&apos;enjeu est simple — offrir à Vias une marque{" "}
              <strong className="text-[var(--paper)]">claire, moderne et
              protégeable</strong>, fidèle à son âme et lisible par tous, du
              vieux village au bord de mer.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ L'AMBITION / LE CAP (alignée sur la vision de la nouvelle mairie) ═══ */}
      <section className="py-28 md:py-40 px-6">
        <div className="mx-auto max-w-4xl">
          <p className="v-reveal text-[var(--gueules)] text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            L&apos;ambition
          </p>
          <h2
            className="v-reveal font-bold tracking-[-0.02em] leading-[1.05] mb-10"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--sea)" }}
          >
            Le moment de réaffirmer le cœur de Vias.
          </h2>
          <div className="v-stagger grid md:grid-cols-2 gap-8 text-[var(--ink)]/75 text-lg leading-relaxed mb-16">
            <p>
              Pendant deux mandats, Vias a bâti une station balnéaire reconnue,
              moteur de son attractivité estivale. Une vraie réussite — et une
              base solide pour écrire la suite.
            </p>
            <p>
              Aujourd&apos;hui, un nouveau cap se dessine : redonner toute sa
              place au{" "}
              <strong className="text-[var(--sea)]">centre-ville historique</strong>,
              au village et à son patrimoine. Une identité forte est le meilleur
              moyen de porter cette ambition — réunir la plage et la pierre, la
              saison et le quotidien, sous un même signe.
            </p>
          </div>
          {/* Punchline — le défi créatif */}
          <p
            className="v-reveal font-bold tracking-[-0.02em] leading-[1.15] text-center border-t border-[var(--ink)]/10 pt-14"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.75rem)", color: "var(--sea)" }}
          >
            Donner à un héritage de mille ans le langage d&apos;aujourd&apos;hui
            — sans jamais en trahir l&apos;âme.
          </p>
        </div>
      </section>

      {/* ═══ LES RACINES / LE PATRIMOINE ═══ */}
      <section className="bg-[var(--sand)] py-28 md:py-40 px-6">
        <div className="mx-auto max-w-6xl">
          <p className="v-reveal text-[var(--gueules)] text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            Les racines
          </p>
          <h2
            className="v-reveal font-bold tracking-[-0.02em] leading-[1.1] mb-6"
            style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.25rem)", color: "var(--sea)" }}
          >
            Avant de dessiner, écouter.
          </h2>
          <p className="v-reveal text-lg text-[var(--ink)]/70 leading-relaxed max-w-2xl mb-14">
            Une identité juste ne s&apos;invente pas : elle se puise dans le
            lieu, sa pierre, ses symboles. Vias porte un nom attesté depuis 922.
            Voici ce dont son image peut hériter.
          </p>

          <div className="v-stagger grid sm:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                tag: "Le monument",
                title: "L'église fortifiée",
                body:
                  "Saint-Jean-Baptiste, XIVe siècle, classée Monument historique depuis 1907. Une silhouette de pierre qui veille sur le vieux village.",
              },
              {
                tag: "L'eau",
                title: "Le Canal du Midi & le Libron",
                body:
                  "Le canal de Riquet, classé à l'UNESCO. À Vias, les ouvrages du Libron — un système hydraulique unique — laissent la rivière franchir le canal.",
              },
              {
                tag: "Le symbole",
                title: "Le blason",
                body:
                  "D'or aux trois pals de gueules, au chef d'azur fleurdelisé. Les couleurs de Vias existent déjà : or, rouge et azur, héritées des armoiries.",
              },
              {
                tag: "La terre & la mer",
                title: "Du volcan au lido",
                body:
                  "Née d'un ancien volcan (Roque-Haute, basalte noir), portée par la vigne, ouverte sur la Méditerranée et les plages du lido.",
              },
            ].map((c) => (
              <article key={c.title} className="flex flex-col">
                {/* Emplacement photo — déposer une image du patrimoine */}
                <div className="aspect-[4/3] rounded-2xl bg-[var(--paper)] border border-[var(--ink)]/10 grid place-items-center text-center px-6">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/30">
                    Photo — {c.title}
                  </span>
                </div>
                <div className="pt-5">
                  <p className="text-[var(--gueules)] text-xs font-semibold uppercase tracking-[0.18em] mb-2">
                    {c.tag}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--sea)] mb-2 tracking-[-0.01em]">
                    {c.title}
                  </h3>
                  <p className="text-[var(--ink)]/70 leading-relaxed">{c.body}</p>
                </div>
              </article>
            ))}
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
            Un héritage qui regarde devant.
          </h2>
          <p className="v-reveal text-lg md:text-xl text-[var(--ink)]/70 leading-relaxed max-w-2xl mx-auto">
            Le parti pris : une identité qui semble avoir toujours existé, tout
            en parlant le langage du présent. Ni carte postale figée, ni logo
            hors-sol — un signe contemporain qui porte la mémoire de la pierre,
            le mouvement de l&apos;eau et la lumière du Sud.
            <span className="block mt-5 text-base text-[var(--ink)]/40 italic">
              (Intention créative — la forme définitive est en cours de dessin.)
            </span>
          </p>
        </div>
      </section>

      {/* ═══ LE LOGO (révélation) ═══ */}
      <section className="bg-[var(--sea)] py-32 md:py-48 px-6">
        <div className="mx-auto max-w-5xl flex flex-col items-center">
          <p className="v-reveal text-[var(--sun)] text-sm font-semibold uppercase tracking-[0.2em] mb-12">
            Le logo
          </p>
          <div className="v-reveal flex flex-col items-center gap-7">
            <ViasMark className="w-40 h-40 md:w-56 md:h-56 text-[var(--paper)]" color="var(--paper)" />
            <Wordmark className="text-[var(--paper)]" />
          </div>
          <p className="v-reveal mt-12 text-center text-[var(--paper)]/60 max-w-md">
            Le logotype principal — à décliner sur l&apos;ensemble des supports
            de la commune.
          </p>
        </div>
      </section>

      {/* ═══ AVANT / APRÈS ═══ */}
      <section className="bg-[var(--sand)] py-28 md:py-40 px-6">
        <div className="mx-auto max-w-6xl">
          <p className="v-reveal text-[var(--gueules)] text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            Avant / Après
          </p>
          <h2
            className="v-reveal font-bold tracking-[-0.02em] leading-[1.05] mb-6"
            style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.25rem)", color: "var(--sea)" }}
          >
            Une marque qui raconte enfin tout Vias.
          </h2>
          <p className="v-reveal text-lg text-[var(--ink)]/70 leading-relaxed max-w-2xl mb-14">
            La marque actuelle a fidèlement accompagné l&apos;essor de la station
            balnéaire. Une nouvelle page s&apos;ouvre — celle d&apos;une identité
            qui embrasse aussi le village, le canal et mille ans d&apos;histoire.
          </p>

          <div className="v-stagger grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
            {/* AVANT — logo actuel + limites */}
            <div className="rounded-2xl bg-[var(--paper)] border border-[var(--ink)]/10 p-8 md:p-10 flex flex-col">
              <span className="inline-flex self-start items-center text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink)]/50 border border-[var(--ink)]/15 rounded-full px-3 py-1 mb-8">
                Avant
              </span>
              <div className="flex-1 grid place-items-center min-h-[120px] mb-8">
                {/* Logo officiel actuel de Vias — vectoriel (asset client) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/vias/logo-actuel.svg"
                  alt="Logo actuel de la commune de Vias"
                  className="w-auto max-h-20 md:max-h-24"
                />
              </div>
              <ul className="space-y-3 text-[var(--ink)]/70 text-[15px] leading-relaxed">
                {[
                  "Tournée « Méditerranée » : tout sur la plage, rien sur le patrimoine ni le village.",
                  "Couleurs primaires très saturées et motif de vague convenu — une esthétique des années 2000.",
                  "Deux typographies hétérogènes, peu lisibles à petite taille.",
                  "Pas de symbole autonome ni de version simple (favicon, tampon, monochrome).",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--ink)]/25 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* APRÈS — nouvelle direction */}
            <div className="rounded-2xl bg-[var(--sea)] text-[var(--paper)] p-8 md:p-10 flex flex-col">
              <span className="inline-flex self-start items-center text-xs font-semibold uppercase tracking-[0.18em] text-[var(--sea)] bg-[var(--sun)] rounded-full px-3 py-1 mb-8">
                Après
              </span>
              <div className="flex-1 grid place-items-center min-h-[120px] mb-8">
                <div className="flex flex-col items-center gap-3">
                  <ViasMark className="w-20 h-20 text-[var(--paper)]" color="var(--paper)" />
                  <Wordmark className="text-[var(--paper)] text-4xl" />
                </div>
              </div>
              <ul className="space-y-3 text-[var(--paper)]/80 text-[15px] leading-relaxed">
                {[
                  "Ancrée dans tout le territoire : la pierre, le canal et la mer réunis.",
                  "Palette héritée du blason — sobre, intemporelle, premium.",
                  "Un symbole fort et une typographie cohérente.",
                  "Déclinable partout : du tampon à la signalétique, en couleur comme en monochrome.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--sun)] shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="v-reveal text-sm text-[var(--ink)]/40 italic mt-6 text-center">
            (Logo « après » provisoire — remplacé par ton dessin final.)
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
              { bg: "var(--sun)", fg: "var(--ink)", label: "Or" },
              { bg: "var(--gueules)", fg: "var(--paper)", label: "Gueules" },
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

      {/* ═══ LA PALETTE (ancrée sur le blason) ═══ */}
      <section className="py-28 md:py-40 px-6">
        <div className="mx-auto max-w-5xl">
          <p className="v-reveal text-[var(--azur)] text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            La palette
          </p>
          <h2
            className="v-reveal font-bold tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--sea)" }}
          >
            Des couleurs qui ne s&apos;inventent pas.
          </h2>
          <p className="v-reveal text-lg text-[var(--ink)]/70 leading-relaxed max-w-2xl mb-12">
            Elles se lisent déjà sur le blason de Vias — l&apos;or, le gueules et
            l&apos;azur — prolongées par la pierre du patrimoine et le basalte du
            terroir.
          </p>
          <div className="v-stagger grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { name: "Or", hex: palette.sun, note: "Le champ du blason. Lumière, soleil, accueil." },
              { name: "Gueules", hex: palette.gueules, note: "Les pals du blason. Énergie, vigne, caractère." },
              { name: "Azur", hex: palette.azur, note: "Le chef du blason. Ciel, Méditerranée, fraîcheur." },
              { name: "Bleu Canal", hex: palette.sea, note: "Le Canal du Midi. Profondeur, patrimoine." },
              { name: "Pierre", hex: palette.sand, note: "L'église & le lido. Douceur, intemporel." },
              { name: "Basalte", hex: palette.ink, note: "La terre volcanique. Contraste, textes." },
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
            Une voix entre deux époques.
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
              { label: "Kakémono", bg: "var(--gueules)", fg: "var(--paper)" },
              { label: "Véhicules", bg: "var(--ink)", fg: "var(--paper)" },
              { label: "Goodies", bg: "var(--sun)", fg: "var(--ink)" },
              { label: "Web & réseaux", bg: "var(--azur)", fg: "var(--paper)" },
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
            Cette proposition est une intention, offerte spontanément — par
            attachement à ce territoire. J&apos;aimerais la faire grandir avec
            vous, jusqu&apos;à la charte complète : logo, déclinaisons,
            signalétique, papeterie et supports numériques.
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
            Paper34 · Studio graphique à Agde — à deux pas de Vias
          </p>
        </div>
      </section>
    </main>
  );
}
