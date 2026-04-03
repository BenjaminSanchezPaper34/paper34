"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { TESTIMONIALS, CONTACT_INFO } from "@/lib/constants";
import { fadeInUp } from "@/lib/animations";

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    fadeInUp(section.querySelector(".testimonials-content") as Element, {
      trigger: section,
    });
  }, []);

  // Auto-advance (pause quand l'utilisateur navigue manuellement)
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused]);

  const goTo = useCallback((index: number) => {
    setActive(index);
    setPaused(true);
    // Reprend l'auto-advance après 10s d'inactivité
    setTimeout(() => setPaused(false), 10000);
  }, []);

  const prev = useCallback(() => {
    goTo(active === 0 ? TESTIMONIALS.length - 1 : active - 1);
  }, [active, goTo]);

  const next = useCallback(() => {
    goTo((active + 1) % TESTIMONIALS.length);
  }, [active, goTo]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-bg-primary">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="testimonials-content">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              T&eacute;moignages
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px]">
              Ce qu&apos;ils en <span className="gradient-text">disent</span>
            </h2>
          </div>

          {/* Testimonial card with arrows */}
          <div className="relative">
            {/* Left arrow */}
            <button
              onClick={prev}
              className="absolute -left-4 md:-left-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              aria-label="Pr&eacute;c&eacute;dent"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right arrow */}
            <button
              onClick={next}
              className="absolute -right-4 md:-right-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              aria-label="Suivant"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Card — hauteur auto, s'adapte au contenu */}
            <div className="relative bg-bg-card rounded-3xl border border-border p-8 md:p-12 overflow-hidden">
              {/* Quote icon */}
              <svg
                className="absolute top-6 left-8 w-10 h-10 text-accent/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
              </svg>

              {/* Seul l'avis actif est rendu — hauteur auto */}
              <div key={active} className="animate-[fadeSlide_0.4s_ease-out]">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: TESTIMONIALS[active].rating }).map((_, j) => (
                    <svg
                      key={j}
                      className="w-4 h-4 text-accent"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-lg md:text-xl leading-relaxed text-text-primary mb-6">
                  &ldquo;{TESTIMONIALS[active].text}&rdquo;
                </p>

                <div>
                  <p className="font-semibold text-text-primary">
                    {TESTIMONIALS[active].name}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {TESTIMONIALS[active].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dots + CTA */}
          <div className="flex flex-col items-center gap-6 mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    active === i
                      ? "bg-accent w-6"
                      : "bg-text-tertiary hover:bg-text-secondary"
                  }`}
                  aria-label={`T\u00e9moignage ${i + 1}`}
                />
              ))}
            </div>

            {/* Laisser un avis */}
            <a
              href={CONTACT_INFO.googleReview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-text-secondary transition-all duration-300 hover:text-text-primary hover:border-border-hover hover:bg-white/5"
            >
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Laisser un avis Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
