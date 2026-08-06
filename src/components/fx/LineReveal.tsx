"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";

/**
 * Reveal de titre "ligne masquée" : la ligne monte depuis un masque
 * overflow-hidden (style Apple). Une instance par ligne du titre.
 *
 * Usage :
 *   <h2>
 *     <LineReveal>Tous vos besoins,</LineReveal>
 *     <LineReveal delay={0.1}><span className="gradient-text">un seul interlocuteur.</span></LineReveal>
 *   </h2>
 */
export default function LineReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const inner = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.transform = "none";
      return;
    }
    const tween = gsap.to(el, {
      y: 0,
      duration: 1,
      delay,
      ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay]);

  return (
    // pb/mb compensés : évite que le masque coupe les descendantes (g, p, q)
    <span
      className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${className ?? ""}`}
    >
      <span ref={inner} className="block translate-y-[110%]">
        {children}
      </span>
    </span>
  );
}
