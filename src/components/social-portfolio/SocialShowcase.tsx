"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";
import PhoneMockup from "./PhoneMockup";
import type { ManagedAccount } from "@/lib/instagram-accounts";

export default function SocialShowcase({
  accounts,
}: {
  accounts: ManagedAccount[];
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".social-mockup");
    gsap.fromTo(
      Array.from(cards),
      { opacity: 0, y: 50, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16"
    >
      {accounts.map((account) => (
        <div key={account.handle} className="social-mockup">
          <PhoneMockup account={account} />
        </div>
      ))}
    </div>
  );
}
