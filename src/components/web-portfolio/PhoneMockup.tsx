import { getScreenshotUrl, type WebProject } from "@/lib/web-projects";

/**
 * Réalisation pensée pour le téléphone (carte digitale ouverte par QR code, appli web) :
 * la capture, prise à 390 px de large, s'affiche dans un téléphone plutôt que dans un
 * ordinateur, où elle ne serait qu'une colonne étroite. Même légende que LaptopMockup.
 * Le téléphone occupe la même hauteur que l'ordinateur voisin pour garder la rangée alignée.
 */
export default function PhoneMockup({ project }: { project: WebProject }) {
  const screenshot = getScreenshotUrl(project.name);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      aria-label={`Voir le site ${project.name}`}
    >
      {/* Zone de même proportion que l'ordinateur (16/10 + barre de titre), téléphone centré */}
      <div className="flex aspect-[16/11] items-center justify-center">
        <div className="relative h-full aspect-[9/19.5] rounded-[1.6rem] border-[5px] border-bg-card-hover bg-bg-card p-[3px] shadow-2xl shadow-black/40 transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-accent-glow">
          <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] bg-bg-secondary">
            <img
              src={screenshot}
              alt={`Aperçu de ${project.name} sur téléphone`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            {/* Île dynamique */}
            <span className="absolute left-1/2 top-1.5 h-3 w-12 -translate-x-1/2 rounded-full bg-bg-primary" />
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
  );
}
