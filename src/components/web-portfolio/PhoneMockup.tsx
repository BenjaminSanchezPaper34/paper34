"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getScreenshotUrl, type WebProject } from "@/lib/web-projects";

/**
 * Réalisation pensée pour le téléphone (carte digitale ouverte par QR code, appli web) :
 * la capture, prise à 390 px de large, s'affiche dans un téléphone plutôt que dans un
 * ordinateur, où elle ne serait qu'une colonne étroite. Même légende que LaptopMockup.
 * Le téléphone occupe la même hauteur que l'ordinateur voisin pour garder la rangée alignée.
 *
 * Au clic sur ordinateur (pointeur fin, écran large) : le vrai site s'ouvre en direct dans un
 * iPhone en surimpression, à taille mobile. Sur téléphone : le lien ouvre le vrai site.
 * Le lien reste un <a href> normal (suivi par Google).
 */
export default function PhoneMockup({ project }: { project: WebProject }) {
  const screenshot = getScreenshotUrl(project.name);
  const [open, setOpen] = useState(false);

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    if (!desktop || e.metaKey || e.ctrlKey || e.shiftKey) return; // mobile ou nouvel onglet voulu
    e.preventDefault();
    setOpen(true);
  }

  // Échap ferme, la page derrière ne défile plus pendant l'ouverture.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="group block"
      aria-label={`Voir le site ${project.name}`}
    >
      {/* Zone de même proportion que l'ordinateur (16/10 + barre de titre), téléphone centré */}
      <div className="flex aspect-[16/12.4] items-center justify-center">
        <div className="relative h-full aspect-[9/19.5] rounded-[16%/7.4%] border border-white/25 bg-bg-primary p-[3px] shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/10 transition-all duration-500 group-hover:scale-[1.03] group-hover:border-white/40 group-hover:shadow-accent-glow">
          <div className="relative h-full w-full overflow-hidden rounded-[14%/6.5%] bg-bg-secondary">
            <img
              src={screenshot}
              alt={`Aperçu de ${project.name} sur téléphone`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-4 text-center">
        <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">
          {project.category}
        </p>
        <h3 className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors">
          {project.name}
        </h3>
        {project.description && (
          <p className="text-sm text-text-secondary mt-1">{project.description}</p>
        )}
      </div>
    </a>

    {/* Rendue dans <body> : la grille animée (transform) piégerait sinon le position: fixed. */}
    {open && createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} sur téléphone`}
        data-lenis-prevent
        onClick={() => setOpen(false)}
        className="phone-pop fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary/45 backdrop-blur-2xl backdrop-saturate-150"
      >
        <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-4">
          {/* iPhone : écran 390 x 844, réduit pour tenir dans la hauteur de la fenêtre */}
          <div className="phone-pop-device rounded-[14.5%/6.8%] border border-white/35 bg-bg-primary p-[7px] shadow-[0_0_80px_-10px] shadow-accent-glow ring-1 ring-inset ring-white/10 [width:min(404px,calc((100dvh-9rem)*404/858))]">
            <div className="relative aspect-[390/844] w-full overflow-hidden rounded-[13%/6%] bg-bg-secondary">
              <iframe
                src={project.url}
                title={`${project.name}, version mobile`}
                // Le site est d'un autre domaine : sa barre de défilement ne se masque pas en CSS.
                // L'iframe déborde de 16 px à droite et l'écran (overflow-hidden) la coupe.
                className="absolute inset-y-0 left-0 h-full w-[calc(100%+16px)] max-w-none border-0"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-semibold text-text-primary transition-colors hover:border-border-hover hover:bg-white/5"
            >
              Ouvrir le site
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              autoFocus
              className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>,
      document.body,
    )}
    </>
  );
}
