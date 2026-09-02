"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import LaptopMockup from "@/components/web-portfolio/LaptopMockup";
import { WEB_PROJECTS } from "@/lib/web-projects";
import { staggerReveal } from "@/lib/animations";
import LineReveal from "@/components/fx/LineReveal";

/** Trois sites récents, en vrai (captures des sites en production). */
export default function SitesStrip() {
  const gridRef = useRef<HTMLDivElement>(null);
  const projects = WEB_PROJECTS.slice(0, 3);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    staggerReveal(Array.from(grid.children), { trigger: grid, stagger: 0.12 });
  }, []);

  return (
    <section className="relative py-24 md:py-32 bg-bg-primary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Réalisations</p>
            <h2 className="font-display text-[clamp(28px,4.6vw,54px)] font-bold tracking-[-0.03em] leading-[1.02]">
              <LineReveal>Des sites qui tournent,</LineReveal>
              <LineReveal delay={0.1}>
                <span className="gradient-text">pas des maquettes.</span>
              </LineReveal>
            </h2>
          </div>
          <Link
            href="/services/creation-site-web#realisations"
            className="inline-flex items-center gap-2 self-start rounded-full border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-white/5 hover:border-border-hover md:self-auto"
          >
            Toutes les réalisations
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div ref={gridRef} className="grid gap-8 md:grid-cols-3">
          {projects.map((p) => (
            <div key={p.name}>
              <LaptopMockup project={p} />
              <p className="mt-4 text-sm text-text-secondary">
                <span className="font-semibold text-text-primary">{p.name}</span> · {p.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
