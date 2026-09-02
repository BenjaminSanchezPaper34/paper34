"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/animations";
import Magnetic from "@/components/fx/Magnetic";
import WakeSignature from "@/components/lab/WakeSignature";
import WakeTrail from "@/components/lab/WakeTrail";

/**
 * Hero — la vitrine tech du studio, sans vidéo.
 *
 * Le fond est vivant par lui-même : un sillage lumineux (moteur « wake » du
 * lab, canvas 2D) trace en boucle une vague qui traverse l'écran, et un
 * second sillage suit le curseur. Les deux sont dans les bleus Paper34 —
 * l'unique couleur du site, ici en matière lumineuse.
 *
 * Harnais standard : les canvas ne sont montés que sur pointeur précis sans
 * `prefers-reduced-motion`, et démontés dès que le hero sort de l'écran
 * (zéro rAF pendant le reste du scroll). Mobile : fond dégradé statique.
 */

// Vague qui traverse tout le hero, tracée en boucle (viewBox large → étirée
// sur la largeur de l'écran par WakeSignature).
const WAVE = {
  viewBox: { x: 0, y: 0, w: 1400, h: 400 },
  // Confinée au tiers bas du hero : la lumière passe SOUS le texte, jamais dessus.
  d: "M -40 330 C 120 250, 260 250, 400 330 S 660 400, 800 320 S 1060 240, 1200 320 S 1380 390, 1460 300",
};

// Bleus Paper34 en matière lumineuse : corps bleu électrique, crête claire.
const WAKE_OPTIONS = {
  bodyColor: "rgba(0, 113, 227, 0.42)",
  foamColor: "rgba(200, 228, 255, 0.8)",
  maxWidth: 64,
  foamWidth: 2,
  lifetime: 3.4,
  taperTail: 10,
  taperHead: 5,
  smoothSteps: 5,
};

const TRAIL_OPTIONS = {
  bodyColor: "rgba(0, 119, 237, 0.5)",
  foamColor: "rgba(255, 255, 255, 0.85)",
  maxWidth: 36,
  foamWidth: 1.6,
  lifetime: 1.4,
  taperTail: 8,
  taperHead: 4,
  smoothSteps: 6,
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Harnais : canvas réservés au desktop précis sans reduced-motion…
  const [fxCapable, setFxCapable] = useState(false);
  // …et seulement pendant que le hero est à l'écran.
  const [inView, setInView] = useState(true);
  const fxOn = fxCapable && inView;

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setFxCapable(fine.matches && motionOk.matches);
    update();
    fine.addEventListener("change", update);
    motionOk.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      motionOk.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: "100px 0px",
    });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const scroll = scrollRef.current;
    if (!section || !title || !subtitle || !cta || !scroll) return;

    // L'entrée est en CSS pur (keyframes hero-in-*, voir globals.css) : elle
    // démarre au premier paint, sans attendre l'hydratation — le LCP n'est
    // plus retardé par le JS. Ici : uniquement le storytelling au scroll.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Sortie au scroll : le texte s'efface et recule (fromTo → réversible)
      gsap.fromTo(
        title,
        { opacity: 1, scale: 1, y: 0 },
        {
          opacity: 0,
          scale: 0.95,
          y: -50,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
        }
      );
      gsap.fromTo(
        subtitle,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -30,
          ease: "none",
          scrollTrigger: { trigger: section, start: "20% top", end: "60% top", scrub: true },
        }
      );
      gsap.fromTo(
        cta,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: section, start: "20% top", end: "50% top", scrub: true },
        }
      );
      gsap.fromTo(
        scroll,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: section, start: "5% top", end: "15% top", scrub: true },
        }
      );
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* Fond : lumière bleue en matière. Dégradé statique partout (et seul
          sur mobile / reduced-motion), sillages canvas par-dessus sur desktop. */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-[58%] h-[70vh] w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]" />
        <div className="absolute left-[20%] top-[30%] h-[40vh] w-[40vw] rounded-full bg-accent/5 blur-[120px]" />
        {fxOn && (
          <>
            <WakeSignature
              pathD={WAVE.d}
              viewBox={WAVE.viewBox}
              duration={7}
              pauseBetween={0.6}
              padding={0}
              options={WAKE_OPTIONS}
              cssFilter="blur(10px) saturate(1.3) brightness(1.1)"
            />
            <WakeTrail options={TRAIL_OPTIONS} cssFilter="blur(5px) saturate(1.4) brightness(1.15)" />
          </>
        )}
        {/* Fondu vers la section suivante */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg-primary to-transparent" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24 pb-20">
        <p className="hero-in-fade [animation-delay:.1s] text-accent text-sm font-semibold uppercase tracking-widest mb-6">
          Studio graphique · Agde
        </p>
        <h1
          ref={titleRef}
          className="font-display text-[clamp(38px,7.2vw,92px)] font-bold leading-[0.98] tracking-[-0.03em] mb-7"
        >
          <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
            <span className="hero-word hero-in-rise inline-block">De la carte de visite</span>
          </span>
          <br />
          <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
            <span className="hero-word hero-in-rise [animation-delay:.27s] gradient-text inline-block">à ChatGPT.</span>
          </span>
        </h1>
        <p
          ref={subtitleRef}
          className="hero-in-fade [animation-delay:.45s] text-[clamp(16px,2.1vw,21px)] text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Identité, print, photo, vidéo, réseaux et sites web : un seul studio pour
          être vu partout où vos clients vous cherchent — Google, Maps, Apple Plans
          et les IA.
        </p>
        <div
          ref={ctaRef}
          className="hero-in-fade [animation-delay:.65s] flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Magnetic>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow"
            >
              Demander un devis
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/portfolio"
              className="inline-block rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
            >
              Voir les réalisations
            </Link>
          </Magnetic>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div
        ref={scrollRef}
        className="hero-in-fade [animation-delay:1s] absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-text-tertiary uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-text-tertiary to-transparent animate-bounce" />
      </div>
    </section>
  );
}
