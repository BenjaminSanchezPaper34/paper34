"use client";

import { useEffect, useRef } from "react";

/**
 * Bouton magnétique : l'élément suit légèrement le curseur (max ±8 px)
 * et revient en place avec un ease doux. Désactivé sur écran tactile
 * et en prefers-reduced-motion.
 *
 * Usage : <Magnetic><Link …>Contact</Link></Magnetic>
 */
export default function Magnetic({
  children,
  strength = 0.18,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = clamp((e.clientX - r.left - r.width / 2) * strength, 8);
      const dy = clamp((e.clientY - r.top - r.height / 2) * strength * 1.6, 6);
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const leave = () => {
      el.style.transition = "transform .4s cubic-bezier(.2,.8,.2,1)";
      el.style.transform = "";
      setTimeout(() => (el.style.transition = ""), 400);
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-flex will-change-transform ${className ?? ""}`}>
      {children}
    </span>
  );
}
