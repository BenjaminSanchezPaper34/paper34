"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { OFFER_PILLARS } from "@/lib/constants";
import { gsap, ScrollTrigger } from "@/lib/animations";
import LineReveal from "@/components/fx/LineReveal";

/**
 * L'offre en quatre piliers — cartes empilées au scroll (scroll lock doux).
 *
 * Chaque carte est `sticky` sous la nav ; la suivante vient se poser dessus
 * pendant que la précédente recule légèrement et s'assombrit. Un chapitre
 * par carte : le lecteur ne peut pas les manquer. C'est LA section scroll
 * lock de la page (max 1 par page — règle studio).
 *
 * Mobile / reduced-motion : empilement normal, sans sticky ni recul —
 * le pin est fragile avec la barre d'adresse et n'apporte rien au pouce.
 */
export default function OfferStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!desktop || reduced) return;

    const cards = Array.from(stack.querySelectorAll<HTMLElement>(".offer-card"));
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        // Quand la carte suivante recouvre celle-ci, celle-ci recule et s'éteint
        gsap.fromTo(
          card.querySelector(".offer-card-inner"),
          { scale: 1, opacity: 1 },
          {
            scale: 0.96,
            opacity: 0.45,
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top top+=112",
              scrub: true,
            },
          }
        );
      });
    }, stack);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      id="offre"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-bg-secondary scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-14 md:mb-20">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            L&apos;offre
          </p>
          <h2 className="font-display text-[clamp(30px,5.2vw,60px)] font-bold tracking-[-0.03em] leading-[1.02]">
            <LineReveal>Quatre façons de faire</LineReveal>
            <LineReveal delay={0.1}>
              <span className="gradient-text">tourner votre activité.</span>
            </LineReveal>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mt-6">
            Un seul interlocuteur, du logo à l&apos;application. Chaque pilier
            tient debout seul — ensemble, ils font une image qui ne se contredit
            jamais.
          </p>
        </div>

        {/* Pile de cartes */}
        <div ref={stackRef} className="relative space-y-6 md:space-y-10">
          {OFFER_PILLARS.map((p, i) => (
            <article
              key={p.id}
              className="offer-card md:sticky"
              style={{ top: `calc(6rem + ${i * 1.25}rem)` }}
            >
              <div className="offer-card-inner relative overflow-hidden rounded-3xl border border-border bg-bg-card p-8 md:p-12 md:min-h-[32rem] flex flex-col justify-between will-change-transform">
                {/* Numéro en filigrane */}
                <span
                  className="font-display pointer-events-none absolute -right-2 -top-6 text-[clamp(120px,18vw,240px)] font-bold leading-none tracking-[-0.05em] text-white/[0.035] select-none"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>

                <div className="relative grid gap-8 md:grid-cols-12 md:gap-12">
                  <div className="md:col-span-7">
                    <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
                      {p.verb}
                    </p>
                    <h3 className="font-display text-[clamp(26px,3.6vw,44px)] font-bold tracking-[-0.03em] leading-[1.05] mb-5">
                      {p.title}
                    </h3>
                    <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl">
                      {p.description}
                    </p>
                  </div>
                  <ul className="md:col-span-5 md:pt-12 grid gap-3 content-start">
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-3 rounded-xl border border-border bg-bg-primary/60 px-4 py-3 text-sm md:text-base text-text-primary"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative mt-10 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow"
                  >
                    {p.cta}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <span className="text-sm text-text-tertiary">
                    {i + 1} / {OFFER_PILLARS.length}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Renvoi vers le détail complet */}
        <p className="mt-14 text-center text-text-secondary">
          Le détail de chaque prestation, du flocage aux tableaux de bord :{" "}
          <Link href="/services" className="inline-block py-3 text-accent hover:text-accent-hover underline underline-offset-4 transition-colors">
            tous les services
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
