"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { staggerReveal } from "@/lib/animations";

export default function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;
    const items = cards.querySelectorAll(".service-card");
    staggerReveal(Array.from(items), { trigger: cards, stagger: 0.1 });
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
            Tous vos besoins,
            <br />
            <span className="text-text-secondary">un seul interlocuteur.</span>
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
              href={`/services#${service.id}`}
              className="service-card group relative rounded-2xl border border-border bg-bg-card p-6 transition-all duration-300 hover:bg-bg-card-hover hover:border-border-hover hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
            >
              <div className="mb-4 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-accent/20">
                <img
                  src={service.icon}
                  alt=""
                  className="w-6 h-6 brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
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
