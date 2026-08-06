"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { staggerReveal } from "@/lib/animations";
import LineReveal from "@/components/fx/LineReveal";

// Services disposant d'une page dédiée : on y envoie directement depuis
// l'accueil plutôt que vers l'ancre de /services (un clic gagné).
const DEDICATED_PAGES: Record<string, string> = {
  web: "/services/creation-site-web",
  "reseaux-sociaux": "/services/reseaux-sociaux",
  design: "/services/graphisme",
  print: "/services/graphisme",
  tenue: "/services/graphisme",
};

export default function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;
    const items = cards.querySelectorAll(".service-card");
    staggerReveal(Array.from(items), { trigger: cards, stagger: 0.1 });

    // Spotlight : halo bleu qui suit le curseur sur chaque carte.
    // Desktop uniquement — inactif au toucher et en reduced-motion.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const cleanups: (() => void)[] = [];
    items.forEach((card) => {
      const spot = card.querySelector<HTMLElement>(".card-spot");
      if (!spot) return;
      const move = (e: Event) => {
        const ev = e as MouseEvent;
        const r = card.getBoundingClientRect();
        spot.style.background = `radial-gradient(260px circle at ${ev.clientX - r.left}px ${ev.clientY - r.top}px, rgba(0,113,227,.14), transparent 70%)`;
        spot.style.opacity = "1";
      };
      const leave = () => (spot.style.opacity = "0");
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-bg-primary"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            Ce que je fais
          </p>
          <h2 className="text-[clamp(28px,5vw,56px)] font-bold tracking-[-2px] leading-tight">
            <LineReveal>Tous vos besoins,</LineReveal>
            <LineReveal delay={0.1}>
              <span className="gradient-text">un seul interlocuteur.</span>
            </LineReveal>
          </h2>
        </div>

        {/* Services grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              href={DEDICATED_PAGES[service.id] ?? `/services#${service.id}`}
              className="service-card group relative rounded-2xl border border-border bg-bg-card p-6 transition-all duration-300 hover:bg-bg-card-hover hover:border-border-hover hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
            >
              {/* Spotlight curseur */}
              <span
                className="card-spot pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500"
                aria-hidden
              />
              <div className="relative mb-4 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-accent/20">
                <img
                  src={service.icon}
                  alt=""
                  className="w-6 h-6 brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <h3 className="relative text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="relative text-sm text-text-secondary leading-relaxed">
                {service.description}
              </p>
              <div className="relative mt-4 flex items-center gap-1 text-xs text-accent opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                En savoir plus
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
