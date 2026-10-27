"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";

// Tempo commun à l'itération ; aucun état de contenu n'est conditionné à GSAP.
const MOTION = { entry: 0.9, stagger: 0.12, scrub: 0.8, ease: "power3.out" };

export default function AccueilMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-title-line]", {
          yPercent: 35, opacity: 0, duration: MOTION.entry,
          stagger: MOTION.stagger, ease: MOTION.ease, clearProps: "all",
        });
        gsap.utils.toArray<HTMLElement>("[data-image-reveal]").forEach((el) => {
          gsap.from(el, {
            clipPath: "inset(0 0 14% 0)", duration: MOTION.entry, ease: MOTION.ease,
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
            clearProps: "clipPath",
          });
        });
      });
      // Un seul pin. Le repli CSS reste l'état normal et le contenu reste visible.
      media.add("(min-width: 1024px) and (min-height: 760px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const stage = root.current?.querySelector<HTMLElement>("[data-channel-stage]");
        if (!stage) return;
        const panels = stage.querySelectorAll("[data-channel]");
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: stage, start: "top 90px", end: "+=105%", pin: true,
          scrub: MOTION.scrub, invalidateOnRefresh: true,
        } });
        timeline.from(panels[0], { xPercent: 4, rotation: -2, ease: "power2.inOut" }, 0)
          .from(panels[1], { yPercent: 8, ease: "power2.inOut" }, 0)
          .from(panels[2], { xPercent: -4, rotation: 2, ease: "power2.inOut" }, 0)
          .from("[data-channel-line]", { scaleX: 0, transformOrigin: "left", ease: "power2.inOut" }, 0);
      });
    }, root);
    // Calcul après chargement des polices : pas de mesure de ligne sur la fonte de secours.
    let active = true;
    document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); context.revert(); };
  }, []);
  return <div ref={root}>{children}</div>;
}
