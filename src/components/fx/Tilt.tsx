"use client";

import { useEffect, useRef } from "react";

/**
 * Tilt 3D au survol (perspective + rotateX/rotateY, max ±4°).
 * Desktop uniquement — inactif au toucher et en reduced-motion.
 *
 * Usage : <Tilt className="rounded-2xl overflow-hidden">…<img …/>…</Tilt>
 */
export default function Tilt({
  children,
  max = 4,
  scale = 1.04,
  className,
}: {
  children: React.ReactNode;
  max?: number;
  scale?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -2 * max;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 2 * max;
      el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
    };
    const leave = () => (el.style.transform = "");
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [max, scale]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: "transform .45s cubic-bezier(.2,.8,.2,1)" }}
    >
      {children}
    </div>
  );
}
