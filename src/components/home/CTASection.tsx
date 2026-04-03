"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { fadeInUp } from "@/lib/animations";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    fadeInUp(section.querySelector(".cta-content") as Element, {
      trigger: section,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <div className="cta-content">
          <h2 className="text-[clamp(32px,6vw,64px)] font-bold tracking-[-2px] leading-tight mb-6">
            Un projet en tête ?
            <br />
            <span className="gradient-text">Donnons-lui vie.</span>
          </h2>
          <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
            Discutons de vos besoins et construisons ensemble une communication
            qui se remarque.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
            >
              Démarrer un projet
            </Link>
            <a
              href="mailto:contact@paper34.fr"
              className="rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
            >
              contact@paper34.fr
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
