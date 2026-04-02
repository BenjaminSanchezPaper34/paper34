"use client";

import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { fadeInUp } from "@/lib/animations";

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    fadeInUp(section.querySelector(".testimonials-content") as Element, {
      trigger: section,
    });
  }, []);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-bg-primary">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="testimonials-content">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Témoignages
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px]">
              Ce qu&apos;ils en disent
            </h2>
          </div>

          {/* Testimonial card */}
          <div className="relative bg-bg-card rounded-3xl border border-border p-8 md:p-12 min-h-[280px] flex flex-col justify-center">
            {/* Quote icon */}
            <svg
              className="absolute top-6 left-8 w-10 h-10 text-accent/20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
            </svg>

            {TESTIMONIALS.map((testimonial, i) => (
              <div
                key={testimonial.name}
                className={`transition-all duration-500 absolute inset-0 p-8 md:p-12 flex flex-col justify-center ${
                  active === i
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
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

                <p className="text-lg md:text-xl leading-relaxed text-text-primary mb-8">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                <div>
                  <p className="font-semibold text-text-primary">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  active === i
                    ? "bg-accent w-6"
                    : "bg-text-tertiary hover:bg-text-secondary"
                }`}
                aria-label={`Témoignage ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
