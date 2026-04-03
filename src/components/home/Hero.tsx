"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import Link from "next/link";

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

    if (!section || !title || !subtitle || !cta || !scroll) return;

    // Initial reveal animation
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      title,
      { opacity: 0, y: 40, scale: 1 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        subtitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        cta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(scroll, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");

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
          className="h-full w-full object-cover"
        >
          <source src="/videos/videosd-paper34.mp4" type="video/mp4" />
          <source src="/videos/videosd-paper34.webm" type="video/webm" />
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
          className="text-[clamp(32px,6vw,72px)] font-bold leading-[1] tracking-[-2px] mb-6 opacity-0"
        >
          Du contenu
          <br />
          <span className="gradient-text">qui se remarque.</span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-[clamp(15px,2.2vw,20px)] text-text-secondary max-w-xl mx-auto mb-10 opacity-0"
        >
          Design, vid&eacute;o, photo, web, impression.
          <br />
          Un studio graphique complet pour donner de la visibilit&eacute; &agrave; votre activit&eacute;.
        </p>
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0"
        >
          <Link
            href="/portfolio"
            className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
          >
            Voir les réalisations
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
          >
            Discutons de votre projet
          </Link>
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
