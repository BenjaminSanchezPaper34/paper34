"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { fadeInUp } from "@/lib/animations";
import Magnetic from "@/components/fx/Magnetic";
import SplashCursor from "@/components/lab/SplashCursor";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  // Fluide WebGL réservé aux pointeurs précis (desktop) sans reduced-motion :
  // sur mobile le coût GPU/batterie ne se justifie pas pour une section CTA.
  const [splashCapable, setSplashCapable] = useState(false);
  // …et monté seulement quand la section est à l'écran : la simulation tourne
  // à chaque frame une fois montée, inutile de payer ce coût sur tout le scroll.
  const [inView, setInView] = useState(false);
  const splashOn = splashCapable && inView;

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setSplashCapable(fine.matches && motionOk.matches);
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
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      // Marge : la sim démarre un peu avant d'arriver sur la section,
      // le fluide est prêt dès que le curseur y entre.
      { rootMargin: "200px 0px" }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

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
      className="relative py-32 md:py-40 overflow-hidden bg-bg-primary"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      {/* Volutes fluides teal & orange au curseur — réglages du lab /lab/splash-cinema */}
      {splashOn && (
        <SplashCursor
          colors={[
            { r: 0, g: 0.5, b: 0.55 },    // teal profond
            { r: 0.1, g: 0.65, b: 0.7 },  // teal clair
            { r: 1.0, g: 0.5, b: 0.15 },  // orange chaud
            { r: 1.0, g: 0.75, b: 0.45 }, // crème orangé
          ]}
          densityDissipation={1.4}
          velocityDissipation={1.8}
          curl={6}
          splatRadius={0.22}
          splatForce={6500}
        />
      )}

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
            <Magnetic>
              <Link
                href="/contact"
                className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow"
              >
                Démarrer un projet
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href="mailto:contact@paper34.fr"
                className="inline-block rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-text-primary transition-colors duration-300 hover:bg-white/5 hover:border-border-hover"
              >
                contact@paper34.fr
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
