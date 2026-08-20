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
       * Flex plutôt que grid : `justify-center` recentre toute dernière ligne
       * incomplète, quel que soit le nombre de colonnes du palier. Une grille
       * exigerait des règles nth-child par breakpoint qui se contredisent
       * (le 10e projet est orphelin à 3 colonnes, pas à 4).
       * Largeurs = 100/n % moins la part de gouttière : gap-8 (2rem) jusqu'à
       * xl, gap-6 (1.5rem) en 2xl où l'on passe à 5 colonnes.
       */
      className="flex flex-wrap justify-center gap-8 2xl:gap-6"
    >
      {projects.map((project) => (
        <div
          key={project.url}
          className="web-mockup w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)] xl:w-[calc(25%-1.5rem)] 2xl:w-[calc(20%-1.2rem)]"
        >
          <LaptopMockup project={project} />
        </div>
      ))}
    </div>
  );
}
