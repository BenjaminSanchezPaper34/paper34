"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";
import PhoneMockup from "./PhoneMockup";
import type { ManagedAccount } from "@/lib/instagram-accounts";

export default function HeroPhones({ accounts }: { accounts: ManagedAccount[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // On affiche seulement les 3 premiers comptes en hero
  const featured = accounts.slice(0, 3);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const phones = wrapperRef.current.querySelectorAll(".hero-phone");
    gsap.fromTo(
      Array.from(phones),
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  }, []);

  if (featured.length === 0) return null;

  return (
    <div
      ref={wrapperRef}
      className="relative flex justify-center items-end gap-4 md:gap-8 mt-16 mb-8"
    >
      {/* iPhone gauche — incliné, en retrait */}
      {featured[0] && (
        <div className="hero-phone hidden md:block translate-y-8 opacity-90 hover:opacity-100 transition-opacity">
          <PhoneMockup account={featured[0]} tilt="left" />
        </div>
      )}

      {/* iPhone central — plus grand */}
      {featured[1] && (
        <div className="hero-phone z-10 scale-105">
          <PhoneMockup account={featured[1]} tilt="none" />
        </div>
      )}
      {!featured[1] && featured[0] && (
        <div className="hero-phone z-10 scale-105 md:hidden">
          <PhoneMockup account={featured[0]} tilt="none" />
        </div>
      )}

      {/* iPhone droite — incliné, en retrait */}
      {featured[2] && (
        <div className="hero-phone hidden md:block translate-y-8 opacity-90 hover:opacity-100 transition-opacity">
          <PhoneMockup account={featured[2]} tilt="right" />
        </div>
      )}
    </div>
  );
}
