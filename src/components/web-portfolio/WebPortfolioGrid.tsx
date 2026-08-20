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
      /*
       * Dernière ligne incomplète : une carte seule à gauche fait « oubliée ».
       * On la recentre en CSS pur — la règle s'active d'elle-même selon le
       * nombre de projets, sans rien à maintenir à chaque ajout.
       *  - 3 colonnes (lg) : orpheline (3n+1) → colonne 2
       *  - 2 colonnes (md) : orpheline (2n+1) → centrée sur les 2 colonnes
       */
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10
        md:[&>*:last-child:nth-child(2n+1)]:col-span-2 md:[&>*:last-child:nth-child(2n+1)]:max-w-[calc(50%-1.25rem)] md:[&>*:last-child:nth-child(2n+1)]:mx-auto
        lg:[&>*:last-child:nth-child(3n+1)]:col-start-2 lg:[&>*:last-child:nth-child(3n+1)]:col-span-1 lg:[&>*:last-child:nth-child(3n+1)]:max-w-none"
    >
      {projects.map((project) => (
        <div key={project.url} className="web-mockup">
          <LaptopMockup project={project} />
        </div>
      ))}
    </div>
  );
}
