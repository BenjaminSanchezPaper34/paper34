"use client";

import { useEffect, useRef } from "react";
import { STATS } from "@/lib/constants";
import { counterAnimation, gsap } from "@/lib/animations";

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    countersRef.current.forEach((el, i) => {
      if (!el) return;
      counterAnimation(el, STATS[i].value, {
        trigger: section,
        duration: 2 + i * 0.2,
      });
    });

    // Fade in the whole section
    gsap.fromTo(
      section.querySelectorAll(".stat-item"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-bg-secondary"
    >
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="stat-item text-center">
              <div className="text-[clamp(36px,6vw,64px)] font-bold tracking-[-2px] mb-2">
                <span
                  ref={(el) => { countersRef.current[i] = el; }}
                >
                  0
                </span>
                <span className="text-accent">{stat.suffix}</span>
              </div>
              <p className="text-sm text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
