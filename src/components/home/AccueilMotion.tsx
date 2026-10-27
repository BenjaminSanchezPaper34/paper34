"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";

/**
 * Chorégraphie de l'accueil (GSAP seul, un seul pin par page).
 * Fail-visible : le HTML est lisible sans JS ; GSAP part de l'état final et ne fait qu'y revenir.
 * Tout est coupé en prefers-reduced-motion ; le pin n'existe qu'au bureau à pointeur fin.
 */
const MOTION = { entry: 1.1, stagger: 0.08, ease: "power3.out", soft: "power2.out" };
const DESKTOP_PIN = "(min-width: 1024px) and (min-height: 640px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export default function AccueilMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero : le titre monte ligne à ligne derrière son masque, la feuille s'allume.
        const intro = gsap.timeline({ defaults: { ease: MOTION.ease } });
        intro
          .from("[data-hero-visual]", { opacity: 0, scale: 1.06, duration: 1.8, ease: MOTION.soft })
          .from("[data-title-line]", { yPercent: 105, duration: MOTION.entry, stagger: 0.12 }, 0.15)
          .from("[data-hero-item]", { opacity: 0, y: 16, duration: 0.7, stagger: MOTION.stagger }, 0.55);


        // Reveals d'entrée, une fois, sans rejouer.
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, { opacity: 0, y: 32, duration: 0.9, ease: MOTION.ease, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        });

        // Méthode : la jauge de traits se remplit, une tête lumineuse suit le front, chaque étape s'allume à son passage.
        const track = document.querySelector<HTMLElement>("[data-gauge-track]");
        if (track) {
          const st = { trigger: track, start: "top 70%", end: "bottom 55%", scrub: 0.6 };
          gsap.fromTo("[data-gauge-lit]", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", ease: "none", scrollTrigger: st });
          gsap.fromTo("[data-gauge-head]", { top: "0%" }, { top: "100%", ease: "none", scrollTrigger: { ...st } });
          gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
            gsap.fromTo(step, { opacity: 0.35 }, { opacity: 1, ease: "none", scrollTrigger: { trigger: step, start: "top 72%", end: "top 52%", scrub: true } });
          });
        }
      });

      // Au scroll (tablette et bureau), la feuille s'éloigne et tourne ; le texte s'efface plus vite qu'elle.
      // Au téléphone le hero est plus haut que l'écran : on ne fait pas pâlir le bouton qu'on vient d'atteindre.
      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to("[data-hero-visual]", {
          yPercent: 14, rotate: -5, opacity: 0.25, ease: "none",
          scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-text]", {
          yPercent: -8, opacity: 0, ease: "none",
          scrollTrigger: { trigger: "[data-hero]", start: "35% top", end: "bottom top", scrub: true },
        });
      });

      // Pic de la page (seul pin) : les six supports convergent vers un seul interlocuteur.
      media.add(DESKTOP_PIN, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-orbit]");
        const core = document.querySelector<HTMLElement>("[data-core]");
        if (!core || !items.length) return;
        // Écart entre le centre d'un mot et celui du noyau (offsets : indépendants des transforms en cours).
        const delta = (el: HTMLElement, axis: "x" | "y") => axis === "x"
          ? core.offsetLeft + core.offsetWidth / 2 - (el.offsetLeft + el.offsetWidth / 2)
          : core.offsetTop + core.offsetHeight / 2 - (el.offsetTop + el.offsetHeight / 2);
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: "[data-converge]", start: "top top", end: "+=170%", pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true },
        });
        tl.from(core, { scale: 0.35, opacity: 0, duration: 0.6 }, 0)
          .to(items, {
            x: (_, el: HTMLElement) => delta(el, "x"),
            y: (_, el: HTMLElement) => delta(el, "y"),
            scale: 0.4, opacity: 0, duration: 1, stagger: 0.06,
          }, 0.25)
          .to(core, { "--glow": 1, duration: 0.5 }, 0.95)
          .from("[data-pillar]", { opacity: 0, y: 24, duration: 0.5, stagger: 0.25 }, 1.2)
          .to({}, { duration: 0.4 });
      });
    }, root);
    // Mesures après chargement des polices : pas de calcul de ligne sur la fonte de secours.
    let active = true;
    document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); context.revert(); };
  }, []);
  return <div ref={root}>{children}</div>;
}
