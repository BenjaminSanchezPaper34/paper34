import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getGallery,
  getGallerySlugs,
  type Gallery,
} from "@/lib/galleries";
import ClientGallery from "@/components/gallery/ClientGallery";
import GalleryIntro from "@/components/gallery/GalleryIntro";

// Génère une page statique par galerie au build.
export function generateStaticParams() {
  return getGallerySlugs().map((slug) => ({ slug }));
}

// Pas de slug inconnu généré à la volée → 404 propre.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const gallery = getGallery(slug);
  if (!gallery) return { title: "Galerie introuvable" };
  return {
    title: `${gallery.title} — ${gallery.client}`,
    robots: { index: false, follow: false },
  };
}

function formatDateFr(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function GaleriePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gallery: Gallery | null = getGallery(slug);
  if (!gallery) notFound();

  // Galeries voisines (les plus récentes d'abord, comme sur /galeries) pour
  // enchaîner sans repasser par le menu.
  const all = getGallerySlugs()
    .map((s) => getGallery(s))
    .filter((g): g is Gallery => g !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
  const pos = all.findIndex((g) => g.slug === gallery.slug);
  const prev = pos > 0 ? all[pos - 1] : null;
  const next = pos >= 0 && pos < all.length - 1 ? all[pos + 1] : null;

  // Galerie 100 % vidéo (mariages…) ou mixte (campagnes) : libellés adaptés.
  const videoCount = gallery.photos.filter((p) => p.type === "video").length;
  const isVideo = gallery.photos.length > 0 && videoCount === gallery.photos.length;
  const isMixed = videoCount > 0 && !isVideo;

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      {/* Hero (pt-24 : dégage la navbar fixe, qui porte désormais le logo) */}
      <header className="mx-auto max-w-7xl px-6 pt-24 pb-8 md:pt-28 md:pb-10">
        {/* Fil d'Ariane : retour explicite vers la liste des galeries */}
        <nav aria-label="Fil d'Ariane" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-text-tertiary">
            <li>
              <Link
                href="/galeries"
                className="inline-flex items-center gap-1.5 hover:text-text-primary transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Toutes les galeries
              </Link>
            </li>
            <li aria-hidden="true" className="text-text-tertiary/50">
              /
            </li>
            <li className="text-text-secondary truncate">{gallery.title}</li>
          </ol>
        </nav>
        <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
          {gallery.client}
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-[-1.5px] mb-4">
          {gallery.title}
        </h1>
        <p className="text-text-secondary">
          {formatDateFr(gallery.date)} · {gallery.count}{" "}
          {isVideo
            ? gallery.count > 1 ? "films" : "film"
            : isMixed
              ? "créations"
              : gallery.count > 1 ? "photos" : "photo"}
        </p>
        {gallery.intro ? (
          <GalleryIntro text={gallery.intro} />
        ) : (
          <p className="text-sm text-text-tertiary mt-4 max-w-xl">
            Cliquez sur une photo pour l&apos;agrandir. Téléchargez vos photos
            individuellement ou en une fois : les fichiers sont fournis en
            qualité originale.
          </p>
        )}
      </header>

      <ClientGallery gallery={gallery} />

      {/* Galeries voisines : enchaîner sans repasser par le menu */}
      {(prev || next) && (
        <nav
          aria-label="Autres galeries"
          className="mx-auto max-w-7xl px-6 mt-12 grid gap-3 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={`/galerie/${prev.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-border hover:border-border-hover hover:bg-white/5 px-5 py-4 transition-all"
            >
              <svg className="w-5 h-5 text-accent shrink-0 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-[0.15em] text-text-tertiary">
                  Galerie précédente
                </span>
                <span className="block text-sm font-semibold text-text-primary truncate">
                  {prev.title}
                </span>
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next && (
            <Link
              href={`/galerie/${next.slug}`}
              className="group flex items-center justify-end gap-3 rounded-2xl border border-border hover:border-border-hover hover:bg-white/5 px-5 py-4 text-right transition-all"
            >
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-[0.15em] text-text-tertiary">
                  Galerie suivante
                </span>
                <span className="block text-sm font-semibold text-text-primary truncate">
                  {next.title}
                </span>
              </span>
              <svg className="w-5 h-5 text-accent shrink-0 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </nav>
      )}

      {/* Accroche : le visiteur vient de voir le travail, on l'invite à
          découvrir le studio (adapté photo/vidéo) */}
      <section className="mx-auto max-w-7xl px-6 mt-16">
        <div className="rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/12 via-accent/5 to-transparent px-6 py-10 md:px-12 md:py-12 text-center">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.18em] mb-3">
            Paper34 · Studio graphique à Agde
          </p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-[-1px] mb-4">
            {gallery.ctaTheme === "mariage"
              ? "Vous préparez un mariage ?"
              : gallery.ctaTheme === "entreprise"
                ? "Un film pour votre marque ?"
                : isVideo
                  ? "Un projet vidéo ?"
                  : "Un événement à couvrir ?"}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            {gallery.ctaTheme === "mariage"
              ? "Paper34 réalise le film de votre journée, de la cérémonie à la piste de danse. Racontez-nous votre projet, on s'occupe des images."
              : gallery.ctaTheme === "entreprise"
                ? "Spots publicitaires, films d'entreprise, contenus pour vos réseaux : Paper34 met votre activité en images, du tournage au montage."
                : isVideo
                  ? "Clips, événements, publicités : Paper34 filme et monte vos projets, du tournage à la diffusion."
                  : "Soirées, ouvertures, mariages : Paper34 photographie et filme vos événements, et accompagne aussi votre image au quotidien (identité, réseaux, site web)."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-accent hover:bg-accent-hover px-7 py-3 text-sm font-semibold text-white transition-colors"
            >
              Demander un devis
            </Link>
            <Link
              href="/"
              className="rounded-full border border-border hover:border-border-hover hover:bg-white/5 px-7 py-3 text-sm font-medium text-text-secondary hover:text-text-primary transition-all"
            >
              Découvrir le studio
            </Link>
            <Link
              href="/galeries"
              className="rounded-full px-7 py-3 text-sm font-medium text-text-tertiary hover:text-text-primary transition-colors"
            >
              Toutes les galeries
            </Link>
          </div>
        </div>
      </section>

      {/* Signature galerie */}
      <div className="mx-auto max-w-7xl px-6 py-12 text-center">
        <p className="text-sm text-text-tertiary">
          {isVideo
            ? "Vidéos réalisées"
            : isMixed
              ? "Campagne réalisée"
              : "Photos réalisées"}{" "}
          par{" "}
          <Link href="/" className="text-accent hover:underline">
            Paper34
          </Link>
        </p>
      </div>
    </main>
  );
}
