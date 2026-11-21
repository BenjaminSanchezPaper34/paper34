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
  // Le tuto s'efface dès que le visiteur entre dans le site (la fenêtre perd le focus au profit de l'iframe).
  const [tourDone, setTourDone] = useState(false);
  // Change à chaque « Revoir le tuto » : la liste est recréée, ses animations repartent de zéro.
  const [tourRun, setTourRun] = useState(0);

  function replayTour() {
    setTourDone(false);
    setTourRun((n) => n + 1);
  }

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    if (!desktop || e.metaKey || e.ctrlKey || e.shiftKey) return; // mobile ou nouvel onglet voulu
    e.preventDefault();
    setTourDone(false);
    setOpen(true);
  }

  // Échap ferme, la page derrière ne défile plus pendant l'ouverture.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onBlur = () => setTourDone(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("blur", onBlur);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("blur", onBlur);
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
        <button
          type="button"
          onClick={() => setOpen(false)}
          autoFocus
          aria-label="Fermer"
          className="absolute right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-text-primary transition-colors hover:border-white/50 hover:bg-white/10"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-4">
          {/* iPhone : écran 390 x 844, réduit pour tenir dans la hauteur de la fenêtre */}
          <div className="relative">
          {project.tour && !tourDone && (
            <ol key={tourRun} aria-label="Comment naviguer" className="phone-tour pointer-events-none absolute inset-0 z-10">
              {project.tour.map((step, i) => (
                <li
                  key={step.label}
                  // La flèche part de 3,5 rem à gauche du téléphone et s'arrête sur l'élément visé (x %).
                  className="phone-tour-step absolute flex -translate-y-1/2 items-center"
                  style={{
                    top: `${step.y}%`,
                    left: "-3.5rem",
                    width: `calc(3.5rem + ${step.x}%)`,
                    animationDelay: `${0.6 + i * 1.1}s`,
                  }}
                >
                  <span className="absolute right-full mr-3 whitespace-nowrap rounded-full border border-white/20 bg-bg-card/80 px-4 py-2 text-sm font-medium text-text-primary backdrop-blur-sm">
                    <span className="mr-2 text-accent">{i + 1}</span>
                    {step.label}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/30 to-accent" />
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-accent bg-bg-primary shadow-[0_0_12px] shadow-accent-glow" />
                  {step.gesture && (
                    <span
                      className={`phone-tour-hand absolute left-[calc(100%+6rem)] text-2xl drop-shadow-lg ${
                        step.gesture === "swipe-x" ? "phone-tour-hand-x" : "phone-tour-hand-y"
                      }`}
                      style={{ animationDelay: `${0.9 + i * 1.1}s` }}
                      aria-hidden="true"
                    >
                      👆
                    </span>
                  )}
                </li>
              ))}
            </ol>
          )}
          <div className="phone-pop-device rounded-[14.5%/6.8%] border border-white/35 bg-bg-primary p-[7px] shadow-[0_0_80px_-10px] shadow-accent-glow ring-1 ring-inset ring-white/10 [width:min(404px,calc((100dvh-9rem)*404/858))]">
            <div className="relative aspect-[390/844] w-full overflow-hidden rounded-[13%/6%] bg-bg-secondary">
              <iframe
                src={project.url}
                title={`${project.name}, version mobile`}
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
          </div>
          <div className="flex items-center gap-3">
            {project.tour && (
              <button
                type="button"
                onClick={replayTour}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-semibold text-text-primary transition-colors hover:border-white/50 hover:bg-white/10"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 12a9 9 0 1 0 3-6.7" />
                  <path d="M3 4v4.5h4.5" />
                </svg>
                Revoir le tuto
              </button>
            )}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Ouvrir le site
            </a>
          </div>
        </div>
      </div>,
      document.body,
    )}
    </>
  );
}
