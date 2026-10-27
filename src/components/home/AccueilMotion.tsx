"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";

// Tempo commun à l'itération ; aucun état de contenu n'est conditionné à GSAP.
const MOTION = { entry: 0.9, stagger: 0.12, ease: "power3.out" };

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
      });
      // Itération navigation : aucun pin ni animation de blocs réservés.

    }, root);
    // Calcul après chargement des polices : pas de mesure de ligne sur la fonte de secours.
    let active = true;
    document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); context.revert(); };
  }, []);
  return <div ref={root}>{children}</div>;
}
