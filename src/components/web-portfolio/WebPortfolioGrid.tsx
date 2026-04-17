"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";
import LaptopMockup from "./LaptopMockup";
import type { WebProject } from "@/lib/web-projects";

export default function WebPortfolioGrid({ projects }: { projects: WebProject[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".web-mockup");
    gsap.fromTo(
      Array.from(cards),
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
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
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
    >
      {projects.map((project) => (
        <div key={project.url} className="web-mockup">
          <LaptopMockup project={project} />
        </div>
      ))}
    </div>
  );
}
