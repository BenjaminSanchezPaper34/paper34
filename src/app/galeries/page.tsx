import type { Metadata } from "next";
import Link from "next/link";
import { getGallerySlugs, getGallery } from "@/lib/galleries";
import { assetUrl } from "@/lib/gallery-shared";
import CopyLinkButton from "@/components/gallery/CopyLinkButton";

const SITE = "https://www.paper34.fr";

export const metadata: Metadata = {
  title: "Galeries",
  description:
    "Galeries photo des événements couverts par Paper34. Retrouvez et téléchargez vos photos.",
  alternates: { canonical: `${SITE}/galeries` },
  // Pages d'événements privées : accessibles par le menu mais non indexées
  robots: { index: false, follow: false },
};

function formatDateFr(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function GaleriesPage() {
  const galleries = getGallerySlugs()
    .map((slug) => getGallery(slug))
    .filter((g): g is NonNullable<typeof g> => g !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      {/* Hero */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Galeries
          </p>
          <h1 className="text-[clamp(36px,7vw,72px)] font-bold tracking-[-2px] leading-tight mb-6">
            Vos <span className="gradient-text">événements</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Retrouvez les photos des soirées et événements. Cliquez pour
            ouvrir, puis téléchargez vos clichés en qualité originale.
          </p>
        </div>
      </section>

      {/* Grille */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {galleries.length === 0 ? (
            <p className="text-center text-text-tertiary text-sm">
              Aucune galerie pour l&apos;instant.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {galleries.map((g) => {
                const url = `${SITE}/galerie/${g.slug}`;
                const coverPhoto =
                  g.photos.find((p) => p.id === g.cover) || g.photos[0];
                const cover = coverPhoto
                  ? assetUrl(g.slug, coverPhoto.thumb || coverPhoto.display)
                  : null;
                return (
                  <Link
                    key={g.slug}
                    href={`/galerie/${g.slug}`}
                    className="group relative block rounded-2xl overflow-hidden border border-border bg-bg-card aspect-[4/5]"
                  >
                    {/* Couverture */}
                    {cover && (
                      <img
                        src={cover}
                        alt={`${g.client} — ${g.title}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    {/* Dégradé bas pour lisibilité */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    {/* Infos */}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[11px] uppercase tracking-[0.15em] text-white/70 mb-1">
                        {g.client}
                      </p>
                      <h2 className="text-xl font-bold text-white mb-1">
                        {g.title}
                      </h2>
                      <p className="text-xs text-white/60 mb-3">
                        {formatDateFr(g.date)} · {g.count}{" "}
                        {g.photos.every((p) => p.type === "video") ? "films" : "photos"}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white">
                          Ouvrir
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                        <CopyLinkButton url={url} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
