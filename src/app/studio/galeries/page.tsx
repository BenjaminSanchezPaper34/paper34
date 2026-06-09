import Link from "next/link";
import { getGallerySlugs, getGallery } from "@/lib/galleries";
import { formatBytes } from "@/lib/gallery-shared";
import CopyLinkButton from "@/components/studio/CopyLinkButton";

const SITE = "https://www.paper34.fr";

function formatDateFr(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function StudioGaleriesPage() {
  const galleries = getGallerySlugs()
    .map((slug) => getGallery(slug))
    .filter((g): g is NonNullable<typeof g> => g !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // plus récentes en premier

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10">
          <Link
            href="/studio"
            className="inline-flex items-center gap-1.5 text-xs text-text-tertiary hover:text-text-secondary transition-colors mb-6"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour au studio
          </Link>
          <h1 className="text-3xl font-bold tracking-[-0.5px] mb-2">
            Galeries <span className="gradient-text">clients</span>
          </h1>
          <p className="text-sm text-text-secondary">
            Tous tes liens de partage au même endroit. Copie et envoie au client.
          </p>
        </header>

        {galleries.length === 0 ? (
          <p className="text-text-tertiary text-sm">Aucune galerie pour l&apos;instant.</p>
        ) : (
          <ul className="space-y-3">
            {galleries.map((g) => {
              const url = `${SITE}/galerie/${g.slug}`;
              return (
                <li
                  key={g.slug}
                  className="rounded-2xl border border-border bg-bg-card p-5"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.15em] text-accent/80 mb-1">
                        {g.client}
                      </p>
                      <h2 className="text-lg font-semibold mb-1">{g.title}</h2>
                      <p className="text-xs text-text-tertiary">
                        {formatDateFr(g.date)} · {g.count} photos ·{" "}
                        {formatBytes(g.totalOriginalBytes)}
                      </p>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-xs text-text-secondary hover:text-accent transition-colors break-all"
                      >
                        {url}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <CopyLinkButton url={url} />
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-bg-secondary border border-border text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors"
                        title="Ouvrir la galerie"
                        aria-label="Ouvrir la galerie"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <p className="text-xs text-text-tertiary mt-8 leading-relaxed">
          Cette page est privée (non indexée, hors menu). Garde-la en favori pour
          retrouver tes liens. Pour ajouter une galerie : dépose les photos puis
          demande-moi de l&apos;uploader.
        </p>
      </div>
    </main>
  );
}
