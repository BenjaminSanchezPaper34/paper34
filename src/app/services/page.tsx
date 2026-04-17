"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { fadeInUp, staggerReveal } from "@/lib/animations";

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      fadeInUp(heroRef.current, { y: 30 });
    }
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".service-detail");
      staggerReveal(Array.from(cards), { trigger: gridRef.current, stagger: 0.15 });
    }
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 bg-bg-primary">
        <div ref={heroRef} className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Services
          </p>
          <h1 className="text-[clamp(36px,7vw,72px)] font-bold tracking-[-2px] leading-tight mb-6">
            Tout ce dont vous avez besoin,{" "}
            <span className="gradient-text">rien de superflu.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Du concept à la réalisation, je prends en charge l&apos;ensemble de votre
            communication pour un résultat cohérent et impactant.
          </p>
        </div>
      </section>

      {/* Services detail */}
      <section className="pb-24 md:pb-32 bg-bg-primary">
        <div ref={gridRef} className="mx-auto max-w-7xl px-6 lg:px-8 space-y-8">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              id={service.id}
              className={`service-detail rounded-3xl border border-border bg-bg-card p-8 md:p-12 scroll-mt-24 ${
                i % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Icon + number */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-3">
                    <img
                      src={service.icon}
                      alt=""
                      className="w-8 h-8 brightness-0 invert opacity-80"
                    />
                  </div>
                  <span className="text-xs text-text-tertiary font-mono">
                    0{i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-[-1px] mb-3">
                    {service.title}
                  </h2>
                  <p className="text-text-secondary leading-relaxed mb-6 max-w-2xl">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm text-text-secondary"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  {service.id === "web" && (
                    <Link
                      href="/services/creation-site-web"
                      className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
                    >
                      D&eacute;couvrir mes r&eacute;alisations web
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                  {service.id === "reseaux-sociaux" && (
                    <Link
                      href="/services/reseaux-sociaux"
                      className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
                    >
                      En savoir plus
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-16 text-center">
          <p className="text-text-secondary mb-6">
            Vous avez un projet ? Parlons-en.
          </p>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
          >
            Me contacter
          </Link>
        </div>
      </section>
    </>
  );
}
