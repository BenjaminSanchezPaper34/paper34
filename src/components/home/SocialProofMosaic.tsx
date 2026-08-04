"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, fadeInUp } from "@/lib/animations";
import { MANAGED_ACCOUNTS } from "@/lib/instagram-accounts";

/**
 * Variante « mosaïque » de la preuve sociale (test de mise en page).
 *
 * Deux bandes de posts qui dérivent en sens opposés au fil du scroll,
 * avec des tuiles de tailles et de hauteurs volontairement inégales :
 * l'œil circule au lieu de balayer une grille. Chaque tuile a en plus
 * sa propre vitesse de parallaxe verticale, ce qui crée la profondeur.
 *
 * Dégradations prévues : sans JS ou en `prefers-reduced-motion`, les
 * bandes restent lisibles et scrollables horizontalement à la main.
 */

/** Rythme des tuiles : hauteur, décalage vertical, inclinaison. */
const RHYTHM = [
  { h: "h-56 md:h-72", offset: "mt-0", tilt: "-rotate-1" },
  { h: "h-44 md:h-56", offset: "mt-10 md:mt-16", tilt: "rotate-1" },
  { h: "h-64 md:h-80", offset: "mt-2 md:mt-4", tilt: "rotate-0" },
  { h: "h-48 md:h-60", offset: "mt-14 md:mt-20", tilt: "-rotate-2" },
  { h: "h-52 md:h-64", offset: "mt-6 md:mt-8", tilt: "rotate-2" },
  { h: "h-60 md:h-72", offset: "mt-0", tilt: "-rotate-1" },
  { h: "h-44 md:h-52", offset: "mt-12 md:mt-16", tilt: "rotate-1" },
];

export default function SocialProofMosaic() {
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);

  const accounts = MANAGED_ACCOUNTS.filter((a) => a.feed && a.feed.length > 0);

  // Tous les posts hors avis, entrelacés par compte pour varier les univers.
  const posts = accounts
    .flatMap((a) =>
      (a.feed ?? [])
        .filter((item) => !item.review)
        .map((item, i) => ({ ...item, account: a, rank: i }))
    )
    .sort((x, y) => x.rank - y.rank);

  const half = Math.ceil(posts.length / 2);
  const rowA = posts.slice(0, half);
  const rowB = posts.slice(half);

  const headline = accounts.find((a) => a.stats?.views6m)?.stats?.views6m;

  useEffect(() => {
    if (headerRef.current) fadeInUp(headerRef.current, { y: 30 });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !sectionRef.current) return;

    // Amplitude réduite sur mobile : moins de place, donc moins de dérive.
    const amp = window.innerWidth < 768 ? 60 : 160;
    const ctx = gsap.context(() => {
      const common = {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
        ease: "none",
      };

      if (rowARef.current) {
        gsap.fromTo(rowARef.current, { x: amp }, { x: -amp, ...common });
      }
      if (rowBRef.current) {
        gsap.fromTo(rowBRef.current, { x: -amp * 1.4 }, { x: amp * 1.4, ...common });
      }

      // Parallaxe verticale par tuile : vitesses légèrement différentes.
      const tiles = sectionRef.current!.querySelectorAll<HTMLElement>(".mosaic-tile");
      tiles.forEach((tile, i) => {
        const depth = ((i % 4) + 1) * 8; // 8 → 32 px
        gsap.fromTo(
          tile,
          { y: depth },
          {
            y: -depth,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.6,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (posts.length === 0) return null;

  const renderRow = (
    items: typeof posts,
    ref: React.RefObject<HTMLDivElement | null>,
    offsetIndex: number
  ) => (
    <div
      ref={ref}
      className="flex items-start gap-4 md:gap-6 px-6 lg:px-8 w-max will-change-transform"
    >
      {items.map((item, i) => {
        const r = RHYTHM[(i + offsetIndex) % RHYTHM.length];
        return (
          <a
            key={`${item.account.handle}-${item.img}`}
            href={item.post ?? `https://www.instagram.com/${item.account.handle}/`}
            target="_blank"
            rel="noopener noreferrer"
            className={`mosaic-tile group relative flex-shrink-0 ${r.offset}`}
            aria-label={`Voir ce post de ${item.account.name} sur Instagram`}
          >
            <div
              className={`relative overflow-hidden rounded-2xl ${r.h} aspect-[4/5] ${r.tilt} transition-transform duration-500 ease-out group-hover:rotate-0 group-hover:scale-[1.04]`}
            >
              <img
                src={item.img}
                alt={`Publication récente pour ${item.account.name}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {item.video && (
                <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center pointer-events-none">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <polygon points="6 4 20 12 6 20 6 4" />
                  </svg>
                </span>
              )}
              {/* Signature du compte, révélée au survol */}
              <span className="absolute inset-x-0 bottom-0 p-3 pt-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="block text-[11px] font-semibold text-white truncate">
                  @{item.account.handle}
                </span>
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-bg-secondary overflow-hidden"
    >
      {/* Halo d'ambiance derrière la mosaïque */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[56rem] max-h-[56rem] rounded-full bg-accent/10 blur-[120px] pointer-events-none"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20"
        >
          <div>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Réseaux sociaux
            </p>
            <h2 className="text-[clamp(28px,5vw,56px)] font-bold tracking-[-2px] leading-tight">
              J&apos;anime leurs comptes
              <br />
              <span className="gradient-text">au quotidien.</span>
            </h2>
            {headline && (
              <p className="text-lg text-text-secondary mt-5 max-w-lg">
                Stratégie, shooting, publication — jusqu&apos;à{" "}
                <strong className="text-text-primary font-semibold">
                  {headline} de vues sur les 6 derniers mois
                </strong>{" "}
                pour un seul compte. Voici leurs dernières publications.
              </p>
            )}
          </div>

          <Link
            href="/services/reseaux-sociaux"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
          >
            Voir les comptes et les chiffres
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Deux bandes qui dérivent en sens opposés */}
      <div className="relative space-y-4 md:space-y-8">
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {renderRow(rowA, rowARef, 0)}
        </div>
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {renderRow(rowB, rowBRef, 3)}
        </div>
      </div>
    </section>
  );
}
