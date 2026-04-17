import { getScreenshotUrl, type WebProject } from "@/lib/web-projects";

export default function LaptopMockup({ project }: { project: WebProject }) {
  const screenshot = getScreenshotUrl(project.url);
  // Affiche le domaine sans le https:// dans la barre de titre
  const displayUrl = project.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      aria-label={`Voir le site ${project.name}`}
    >
      {/* Cadre laptop */}
      <div className="relative rounded-2xl overflow-hidden bg-bg-card border border-border shadow-2xl shadow-black/40 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-accent-glow group-hover:border-border-hover">
        {/* Barre de titre macOS */}
        <div className="flex items-center gap-2 bg-[#1c1c1e] px-4 py-3 border-b border-white/5">
          {/* 3 boutons macOS */}
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          {/* Barre URL */}
          <div className="flex-1 flex justify-center">
            <div className="bg-[#2a2a2c] rounded-md px-3 py-1 text-xs text-text-tertiary truncate max-w-[80%]">
              {displayUrl}
            </div>
          </div>
        </div>

        {/* Viewport du site */}
        <div className="relative aspect-[16/10] bg-bg-secondary overflow-hidden">
          <img
            src={screenshot}
            alt={`Aper\u00e7u du site ${project.name}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Overlay hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
