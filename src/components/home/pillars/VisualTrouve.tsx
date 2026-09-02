"use client";

import { useEffect, useRef } from "react";
import LaptopMockup from "@/components/web-portfolio/LaptopMockup";
import { WEB_PROJECTS } from "@/lib/web-projects";
import { gsap } from "@/lib/animations";

/** Les surfaces où un site Paper34 est trouvable — même liste que l'infographie /creation-site-web. */
const SURFACES = [
  { label: "Google", x: "4%", y: "6%" },
  { label: "ChatGPT", x: "62%", y: "0%" },
  { label: "Apple Plans", x: "70%", y: "38%" },
  { label: "Gemini", x: "-2%", y: "44%" },
  { label: "Perplexity", x: "58%", y: "82%" },
  { label: "Bing", x: "10%", y: "86%" },
];

/**
 * Pilier « Être trouvé » : un vrai site client dans un laptop, et autour de
 * lui les surfaces qui le remontent — moteurs classiques ET moteurs IA.
 */
export default function VisualTrouve() {
  const rootRef = useRef<HTMLDivElement>(null);
  const project = WEB_PROJECTS[0];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll(".surface-pill"), {
        opacity: 0,
        scale: 0.6,
        y: 12,
        duration: 0.7,
        stagger: 0.09,
        ease: "back.out(1.8)",
        immediateRender: false,
        scrollTrigger: { trigger: root, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-[520px] py-8 md:py-4">
      <div className="md:[transform:perspective(1400px)_rotateY(-7deg)_rotateX(3deg)]">
        <LaptopMockup project={project} />
      </div>
      {SURFACES.map((s, i) => (
        <span
          key={s.label}
          className="surface-pill pill-float absolute flex items-center gap-2 rounded-full border border-white/12 bg-bg-card/90 px-3.5 py-1.5 text-sm font-medium text-text-primary shadow-lg shadow-black/40 backdrop-blur-md"
          style={{ left: s.x, top: s.y, animationDelay: `${i * 0.35}s` }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {s.label}
        </span>
      ))}
    </div>
  );
}
