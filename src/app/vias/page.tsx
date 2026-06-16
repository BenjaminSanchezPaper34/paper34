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
 *   - <ViasLogo /> → logo officiel client (4 variantes dans /public/vias)
 *   - objet `palette` ci-dessous → tes vrais hex (un seul point de swap)
 *   - typographie : Young Serif (titres) · Cal Sans (.v-cal : accents) · Lexend (texte),
 *     chargées via layout.tsx ; base = Lexend, titres via règle #vias dans <style>
 *   - section « applications » → tes vrais mockups
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, fadeInUp, staggerReveal } from "@/lib/animations";
import { ViasHeroLogo } from "./ViasHeroLogo";

/* ─── PALETTE — héritée du blason de Vias (à affiner sur tes valeurs) ───
   Blasonnement : d'or aux trois pals de gueules, au chef d'azur
   chargé de trois fleurs de lys d'or.                                    */
const palette = {
  sea: "#0f3e56", // Bleu Vias — la couleur du logo (Canal & Méditerranée)
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
/* Logo officiel Vias (assets client dans /public/vias). Variantes :
   bleu / blanc (horizontal) · compact-bleu / compact-blanc (icône + mot empilés). */
function ViasLogo({
  variant = "bleu",
  className = "",
  alt = "Vias",
}: {
  variant?: string;
  className?: string;
  alt?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/vias/logo-${variant}.svg`} alt={alt} className={className} />
  );
}

export default function ViasPage() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero : la typo d'abord, puis chaque arche une à une
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".v-hero-kicker", { autoAlpha: 0, y: 14, duration: 0.6 }, 0.1)
          .fromTo(
            ".v-word",
            { autoAlpha: 0, filter: "blur(12px)" },
            { autoAlpha: 1, filter: "blur(0px)", duration: 0.9 },
            0.35
          )
          .from(".v-arch", { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.12 }, 0.8)
          .from(".v-hero-sub", { autoAlpha: 0, y: 14, duration: 0.6 }, 1.6);
      }

      // Reveals génériques par section
      document.querySelectorAll<HTMLElement>(".v-reveal").forEach((el) => {
        fadeInUp(el, { y: 40 });
      });
      document.querySelectorAll<HTMLElement>(".v-stagger").forEach((group) => {
        const items = Array.from(group.children) as Element[];
        staggerReveal(items, { trigger: group, stagger: 0.12 });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={root}
      id="vias"
      style={cssVars}
      className="min-h-screen bg-[var(--paper)] text-[var(--ink)] overflow-hidden font-[family-name:var(--font-lexend),sans-serif]"
    >
      {/* Système typo : titres Young Serif · accents Cal Sans (.v-cal) · lecture Lexend (base) */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "#vias h1,#vias h2,#vias h3,#vias .v-display{font-family:var(--font-young-serif),Georgia,serif;font-weight:400}#vias .v-cal{font-family:var(--font-cal-sans),sans-serif}",
        }}
      />

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

      {/* ═══ HERO (vidéo carnaval en fond, assombrie) ═══ */}
      <section className="v-hero relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Poster (fallback + prefers-reduced-motion) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/vias/hero-poster.jpg)" }}
          aria-hidden="true"
        />
        {/* Vidéo muette, en boucle (hébergée sur R2). Masquée si reduced-motion. */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/vias/hero-poster.jpg"
          aria-hidden="true"
        >
          <source
            src="https://pub-054d5e4ec36144bea38e07a1452fe2b0.r2.dev/vias/hero.mp4"
            type="video/mp4"
          />
        </video>
        {/* Voile sombre pour faire ressortir le logo et le texte */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[var(--sea)]/80 via-[var(--ink)]/65 to-[var(--sea)]/85"
          aria-hidden="true"
        />

        {/* Contenu */}
        <div className="relative z-10 flex flex-col items-center">
          <p className="v-hero-kicker v-cal text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--paper)]/70 mb-20 md:mb-24">
            Commune de Vias · Hérault
          </p>
          <h1 className="v-hero-title flex justify-center text-[var(--paper)]">
            <ViasHeroLogo className="w-[230px] sm:w-[280px] md:w-[340px] h-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]" />
          </h1>
          <p className="v-hero-sub mt-20 md:mt-24 text-lg md:text-2xl text-[var(--paper)]/85 max-w-xl leading-snug">
            De la mer aux monuments — une identité pour tout Vias.
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[var(--paper)]/50">
          <span className="text-[11px] uppercase tracking-[0.2em]">Découvrir</span>
          <span className="w-px h-10 bg-[var(--paper)]/40 animate-pulse" />
        </div>
      </section>

      {/* ═══ LE TERRITOIRE / LE CONTEXTE ═══ */}
      <section className="bg-[var(--sea)] text-[var(--paper)] py-28 md:py-40 px-6">
        <div className="mx-auto max-w-4xl">
          <p className="v-reveal text-[var(--sun)] v-cal text-sm font-semibold uppercase tracking-[0.2em] mb-6">
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
          <p className="v-reveal text-[var(--gueules)] v-cal text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            L&apos;ambition
          </p>
          <h2
            className="v-reveal font-bold tracking-[-0.02em] leading-[1.05] mb-10"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--sea)" }}
          >
Un patrimoine aussi riche que la mer.
          </h2>
          <div className="v-stagger grid md:grid-cols-2 gap-8 text-[var(--ink)]/75 text-lg leading-relaxed mb-16">
            <p>
              Pendant deux mandats, Vias a bâti une station balnéaire reconnue —
              une vraie force, et son moteur économique. Le déséquilibre n&apos;est
              pas la mer : c&apos;est que le développement et le commerce se sont
              concentrés presque exclusivement sur le bord de mer.
            </p>
            <p>
              Le nouveau cap : revenir à l&apos;essentiel, sans rien renier.
              Garder la mer comme signature, et asseoir enfin un{" "}
              <strong className="text-[var(--sea)]">patrimoine tout aussi riche</strong>{" "}
              — centre-ville historique, monuments, pierre volcanique — longtemps
              resté dans son ombre. Une identité forte porte les deux à parts
              égales.
            </p>
          </div>
          {/* Punchline — le défi créatif */}
          <p
            className="v-reveal v-display tracking-[-0.01em] leading-[1.15] text-center border-t border-[var(--ink)]/10 pt-14"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.75rem)", color: "var(--sea)" }}
          >
            Donner à un héritage de mille ans le langage d&apos;aujourd&apos;hui
            — sans jamais en trahir l&apos;âme.
          </p>
        </div>
      </section>

      {/* ═══ LE CONCEPT ═══ */}
      <section className="bg-[var(--sand)] py-28 md:py-40 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="v-reveal text-[var(--azur)] v-cal text-sm font-semibold uppercase tracking-[0.2em] mb-6">
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
            en parlant le langage du présent. Un signe contemporain qui tisse les
            trois forces de Vias — ses monuments et son cœur médiéval, la pierre
            volcanique de sa terre, et la Méditerranée qui ne s&apos;efface pas.
            Le patrimoine retrouvé, la mer conservée.
            <span className="block mt-5 text-base text-[var(--ink)]/40 italic">
              (Intention créative — la forme définitive est en cours de dessin.)
            </span>
          </p>
        </div>
      </section>

      {/* ═══ LE LOGO (révélation) ═══ */}
      <section className="bg-[var(--sea)] py-32 md:py-48 px-6">
        <div className="mx-auto max-w-5xl flex flex-col items-center">
          <p className="v-reveal text-[var(--sun)] v-cal text-sm font-semibold uppercase tracking-[0.2em] mb-12">
            Le logo
          </p>
          <div className="v-reveal w-full flex justify-center">
            <ViasLogo
              variant="blanc"
              alt="Vias"
              className="w-[82%] max-w-2xl h-auto"
            />
          </div>
          <p className="v-reveal mt-12 text-center text-[var(--paper)]/70 max-w-lg leading-relaxed">
            Une arcade d&apos;arches dressées — les monuments, le vieux village,
            la pierre — portée par un bleu profond de Méditerranée. Le patrimoine
            et la mer réunis dans un seul signe.
          </p>
        </div>
      </section>

      {/* ═══ AVANT / APRÈS ═══ */}
      <section className="bg-[var(--sand)] py-28 md:py-40 px-6">
        <div className="mx-auto max-w-6xl">
          <p className="v-reveal text-[var(--gueules)] v-cal text-sm font-semibold uppercase tracking-[0.2em] mb-6">
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
                  "Centrée sur la seule plage : rien des monuments, du patrimoine, du village.",
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
                <ViasLogo
                  variant="blanc"
                  alt="Vias"
                  className="w-full max-w-[300px] h-auto"
                />
              </div>
              <ul className="space-y-3 text-[var(--paper)]/80 text-[15px] leading-relaxed">
                {[
                  "Les trois forces réunies : monuments, pierre volcanique et mer.",
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
            <p className="text-[var(--azur)] v-cal text-sm font-semibold uppercase tracking-[0.2em] mb-6">
              La construction
            </p>
            <h2
              className="font-bold tracking-[-0.02em] leading-[1.1] mb-6"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--sea)" }}
            >
              Une géométrie maîtrisée.
            </h2>
            <p className="text-lg text-[var(--ink)]/70 leading-relaxed">
              Chaque arche repose sur une même ligne de base, alignée sur des
              axes verticaux et une hauteur de référence. Cette rigueur garantit
              un logo impeccable à toutes les échelles — du tampon à la
              signalétique.
            </p>
          </div>
          {/* Planche de construction : guides calés sur le vecteur réel */}
          <div className="v-reveal rounded-2xl border border-[var(--ink)]/10 bg-[var(--paper)] p-6 md:p-10">
            <ViasLogo
              variant="construction"
              alt="Grille de construction du logo Vias"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ═══ LE SYMBOLE (fonctionne seul) ═══ */}
      <section className="bg-[var(--sand)] py-28 md:py-40 px-6">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-14 items-center">
          <div className="v-reveal">
            <p className="text-[var(--gueules)] v-cal text-sm font-semibold uppercase tracking-[0.2em] mb-6">
              Le symbole
            </p>
            <h2
              className="font-bold tracking-[-0.02em] leading-[1.1] mb-6"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--sea)" }}
            >
              Un signe qui tient debout seul.
            </h2>
            <p className="text-lg text-[var(--ink)]/70 leading-relaxed">
              Détaché du mot, le motif des arches reste immédiatement
              reconnaissable. Il devient avatar, favicon, application, tampon ou
              marquage de véhicule — partout où le format est court.
            </p>
          </div>
          <div className="v-reveal flex flex-col items-center gap-8">
            <div className="w-full max-w-sm aspect-square bg-[var(--sea)] rounded-3xl grid place-items-center p-12">
              <ViasLogo variant="symbole-blanc" alt="Symbole Vias" className="w-[62%] h-auto" />
            </div>
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-[var(--paper)] grid place-items-center shadow-sm">
                <ViasLogo variant="symbole-bleu" alt="" className="w-12" />
              </div>
              <div className="w-20 h-20 rounded-2xl bg-[var(--sun)] grid place-items-center">
                <ViasLogo variant="symbole-bleu" alt="" className="w-12" />
              </div>
              <div className="w-12 h-12 rounded-lg bg-[var(--paper)] grid place-items-center">
                <ViasLogo variant="symbole-bleu" alt="" className="w-8" />
              </div>
            </div>
            <p className="v-cal text-xs uppercase tracking-[0.15em] text-[var(--ink)]/45">
              Avatar · Application · Favicon
            </p>
          </div>
        </div>
      </section>

      {/* ═══ LES DÉCLINAISONS ═══ */}
      <section className="bg-[var(--ink)] text-[var(--paper)] py-28 md:py-40 px-6">
        <div className="mx-auto max-w-5xl">
          <p className="v-reveal text-[var(--sun)] v-cal text-sm font-semibold uppercase tracking-[0.2em] mb-6">
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
              { bg: "var(--paper)", fg: "var(--sea)", label: "Principal", variant: "compact-bleu" },
              { bg: "var(--sea)", fg: "var(--paper)", label: "Négatif", variant: "compact-blanc" },
              { bg: "var(--sun)", fg: "var(--ink)", label: "Or", variant: "compact-bleu" },
              { bg: "var(--gueules)", fg: "var(--paper)", label: "Gueules", variant: "compact-blanc" },
            ].map((v) => (
              <div key={v.label} className="rounded-2xl p-6 flex flex-col items-center gap-4" style={{ background: v.bg }}>
                <ViasLogo variant={v.variant} alt="" className="h-16 w-auto" />
                <span className="v-cal text-xs uppercase tracking-[0.15em]" style={{ color: v.fg, opacity: 0.7 }}>
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
          <p className="v-reveal text-[var(--azur)] v-cal text-sm font-semibold uppercase tracking-[0.2em] mb-6">
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

      {/* ═══ LA TYPOGRAPHIE (système à trois voix) ═══ */}
      <section className="bg-[var(--sand)] py-28 md:py-40 px-6">
        <div className="mx-auto max-w-6xl">
          <p className="v-reveal text-[var(--azur)] v-cal text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            La typographie
          </p>
          <h2
            className="v-reveal tracking-[-0.01em] mb-6"
            style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.25rem)", color: "var(--sea)" }}
          >
            Trois voix, une même époque.
          </h2>
          <p className="v-reveal text-lg text-[var(--ink)]/70 leading-relaxed max-w-2xl mb-14">
            Un serif de caractère pour la mémoire, une sans chaleureuse pour les
            repères, et une lecture limpide pour le quotidien. Ensemble, elles
            disent « médiéval contemporain » — et c’est tout Vias.
          </p>

          <div className="v-stagger grid sm:grid-cols-3 gap-5 md:gap-6 items-stretch">
            {/* YOUNG SERIF — titrage */}
            <div className="rounded-2xl bg-[var(--paper)] border border-[var(--ink)]/10 p-7 md:p-8 flex flex-col">
              <div className="flex items-baseline justify-between mb-6">
                <span className="v-cal text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gueules)]">
                  Titrage
                </span>
                <span className="text-sm text-[var(--ink)]/45">Young Serif</span>
              </div>
              <p
                style={{ fontFamily: "var(--font-young-serif), serif", fontSize: "clamp(4rem, 12vw, 6.5rem)", color: "var(--sea)" }}
                className="leading-none"
              >
                Ag
              </p>
              <p
                style={{ fontFamily: "var(--font-young-serif), serif", color: "var(--sea)" }}
                className="mt-6 text-xl md:text-2xl leading-tight"
              >
                Pierre &amp; mémoire
              </p>
              <p className="mt-auto pt-6 text-[15px] text-[var(--ink)]/65 leading-relaxed">
                Empattements francs, écho médiéval mais dessin actuel — pour les
                grands titres.
              </p>
            </div>

            {/* CAL SANS — accents & interface */}
            <div className="rounded-2xl bg-[var(--sea)] text-[var(--paper)] p-7 md:p-8 flex flex-col">
              <div className="flex items-baseline justify-between mb-6">
                <span className="v-cal text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sun)]">
                  Accents
                </span>
                <span className="text-sm text-[var(--paper)]/55">Cal Sans</span>
              </div>
              <p
                style={{ fontFamily: "var(--font-cal-sans), sans-serif", fontSize: "clamp(4rem, 12vw, 6.5rem)" }}
                className="leading-none text-[var(--paper)]"
              >
                Ag
              </p>
              <p
                style={{ fontFamily: "var(--font-cal-sans), sans-serif" }}
                className="mt-6 text-xl md:text-2xl leading-tight text-[var(--paper)]"
              >
                Labels &amp; boutons
              </p>
              <p className="mt-auto pt-6 text-[15px] text-[var(--paper)]/70 leading-relaxed">
                Géométrique et chaleureuse — pour les intitulés, repères et
                l’interface.
              </p>
            </div>

            {/* LEXEND — lecture */}
            <div className="rounded-2xl bg-[var(--paper)] border border-[var(--ink)]/10 p-7 md:p-8 flex flex-col">
              <div className="flex items-baseline justify-between mb-6">
                <span className="v-cal text-xs font-semibold uppercase tracking-[0.16em] text-[var(--azur)]">
                  Lecture
                </span>
                <span className="text-sm text-[var(--ink)]/45">Lexend</span>
              </div>
              <p
                style={{ fontFamily: "var(--font-lexend), sans-serif", fontSize: "clamp(4rem, 12vw, 6.5rem)", fontWeight: 300, color: "var(--sea)" }}
                className="leading-none"
              >
                Ag
              </p>
              <p
                style={{ fontFamily: "var(--font-lexend), sans-serif" }}
                className="mt-6 text-xl md:text-2xl leading-tight text-[var(--ink)]/80"
              >
                Le confort de lecture
              </p>
              <p className="mt-auto pt-6 text-[15px] text-[var(--ink)]/65 leading-relaxed">
                Variable, dessinée pour la lisibilité — pour tous les paragraphes
                et le corps de texte.
              </p>
            </div>
          </div>

          {/* Le système en situation */}
          <div className="v-reveal mt-5 md:mt-6 rounded-2xl bg-[var(--paper)] border border-[var(--ink)]/10 p-8 md:p-14">
            <p className="v-cal text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink)]/40 mb-6">
              Le système en situation
            </p>
            <h3
              style={{ fontFamily: "var(--font-young-serif), serif", color: "var(--sea)" }}
              className="text-3xl md:text-5xl leading-tight mb-5"
            >
              Mille ans d’histoire, à ciel ouvert.
            </h3>
            <p
              style={{ fontFamily: "var(--font-lexend), sans-serif" }}
              className="text-lg text-[var(--ink)]/75 leading-relaxed max-w-2xl"
            >
              De l’église fortifiée Saint-Jean-Baptiste aux ouvrages du Libron,
              Vias cultive un patrimoine vivant. Le titre en Young Serif pose la
              mémoire, le texte en Lexend la rend limpide, et Cal Sans signale
              les repères.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="v-cal inline-flex rounded-full bg-[var(--sea)] text-[var(--paper)] text-xs font-semibold uppercase tracking-[0.14em] px-4 py-2">
                Découvrir Vias
              </span>
              <span className="v-cal inline-flex rounded-full border border-[var(--ink)]/15 text-[var(--ink)]/70 text-xs font-semibold uppercase tracking-[0.14em] px-4 py-2">
                Démarches en ligne
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LES APPLICATIONS ═══ */}
      <section className="py-28 md:py-40 px-6">
        <div className="mx-auto max-w-6xl">
          <p className="v-reveal text-[var(--azur)] v-cal text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            Les applications
          </p>
          <h2
            className="v-reveal font-bold tracking-[-0.02em] mb-12"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--sea)" }}
          >
            Une identité qui vit partout.
          </h2>
          <div className="v-stagger grid grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5">
            {[
              { src: "mockup-papeterie", label: "Papeterie", span: "col-span-2 lg:col-span-3", ar: "aspect-[16/10]" },
              { src: "mockup-signaletique", label: "Signalétique", span: "col-span-2 lg:col-span-3", ar: "aspect-[16/10]" },
              { src: "mockup-app", label: "Site web pensé pour les smartphones", span: "col-span-2 lg:col-span-2", ar: "aspect-[4/3]" },
              { src: "mockup-polo", label: "Tenues", span: "col-span-1 lg:col-span-2", ar: "aspect-[4/3]" },
              { src: "mockup-tote", label: "Goodies", span: "col-span-1 lg:col-span-2", ar: "aspect-[4/3]" },
            ].map((m) => (
              <figure
                key={m.label}
                className={`${m.span} overflow-hidden rounded-2xl border border-[var(--ink)]/10 bg-[var(--paper)]`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/vias/${m.src}.jpg`}
                  alt={`Logo Vias appliqué — ${m.label}`}
                  loading="lazy"
                  className={`w-full ${m.ar} object-cover`}
                />
                <figcaption className="v-cal text-xs uppercase tracking-[0.15em] text-[var(--ink)]/60 px-4 py-3">
                  {m.label}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="v-reveal text-sm text-[var(--ink)]/40 italic mt-6 text-center">
            Simulations — exemples d&apos;application de l&apos;identité.
          </p>
        </div>
      </section>

      {/* ═══ CLÔTURE / CTA ═══ */}
      <section className="bg-[var(--sea)] text-[var(--paper)] py-32 md:py-44 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <ViasLogo variant="compact-blanc" alt="" className="v-reveal w-28 md:w-32 h-auto mx-auto mb-10" />
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
              className="v-cal rounded-full bg-[var(--sun)] text-[var(--ink)] px-8 py-4 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Échanger avec Paper34
            </a>
            <Link
              href="/"
              className="v-cal rounded-full border border-[var(--paper)]/30 px-8 py-4 text-sm font-semibold hover:bg-[var(--paper)]/10 transition-colors"
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
