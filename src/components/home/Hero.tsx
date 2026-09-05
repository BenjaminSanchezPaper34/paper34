"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import Link from "next/link";
import Magnetic from "@/components/fx/Magnetic";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const scroll = scrollRef.current;
    const video = videoRef.current;

    if (!section || !title || !subtitle || !cta || !scroll) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      title.querySelectorAll(".hero-word").forEach((w) => {
        (w as HTMLElement).style.transform = "none";
      });
      gsap.set([subtitle, cta, scroll], { opacity: 1, y: 0 });
      return;
    }

    // Split-text : chaque ligne monte depuis son masque
    gsap.to(title.querySelectorAll(".hero-word"), {
      y: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power4.out",
      delay: 0.15,
    });
    // Dé-zoom lent de la vidéo à l'arrivée
    if (video) {
      gsap.fromTo(video, { scale: 1.14 }, { scale: 1, duration: 2.4, ease: "power2.out" });
    }
    gsap.to(subtitle, { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power3.out" });
    gsap.to(cta, { opacity: 1, y: 0, duration: 0.7, delay: 0.7, ease: "power3.out" });
    gsap.to(scroll, { opacity: 1, duration: 0.5, delay: 1 });

    // Scroll parallax — use fromTo so reverse (scroll up) works perfectly
    gsap.fromTo(
      title,
      { opacity: 1, scale: 1, y: 0 },
      {
        opacity: 0,
        scale: 0.95,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      subtitle,
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "20% top",
          end: "60% top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      cta,
      { opacity: 1 },
      {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "20% top",
          end: "50% top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      scroll,
      { opacity: 1 },
      {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "5% top",
          end: "15% top",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover will-change-transform"
        >
          {/* Servies depuis R2 (egress gratuit) : 9-15 Mo par visite sortaient
              du quota Vercel Fast Data Transfer (pause du compte en juillet). */}
          <source src="https://pub-054d5e4ec36144bea38e07a1452fe2b0.r2.dev/site/hero-home.mp4" type="video/mp4" />
          <source src="https://pub-054d5e4ec36144bea38e07a1452fe2b0.r2.dev/site/hero-home.webm" type="video/webm" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Gradient overlay bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1
          ref={titleRef}
          className="text-[clamp(32px,6vw,72px)] font-bold leading-[1] tracking-[-2px] mb-6"
        >
          <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
            <span className="hero-word inline-block translate-y-[110%]">Du contenu</span>
          </span>
          <br />
          <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
            <span className="hero-word gradient-text inline-block translate-y-[110%]">
              qui se remarque.
            </span>
          </span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-[clamp(15px,2.2vw,20px)] text-text-secondary max-w-xl mx-auto mb-10 opacity-0 translate-y-4"
        >
          Sites web, applications et r&eacute;seaux sociaux, avec le design en plus.
          <br />
          Le studio d&apos;Agde qui rend les restaurants et commerces du littoral visibles, de Google &agrave; ChatGPT.
        </p>
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 translate-y-3"
        >
          <Magnetic>
            <Link
              href="/portfolio"
              className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow"
            >
              Voir les réalisations
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/contact"
              className="rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
            >
              Me contacter 💌
            </Link>
          </Magnetic>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-xs text-text-tertiary uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-text-tertiary to-transparent animate-bounce" />
      </div>
    </section>
  );
}
