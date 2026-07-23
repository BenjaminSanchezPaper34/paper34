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

  // Galerie 100 % vidéo (mariages…) : libellés adaptés.
  const isVideo =
    gallery.photos.length > 0 && gallery.photos.every((p) => p.type === "video");

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      {/* Hero (pt-24 : dégage la navbar fixe, qui porte désormais le logo) */}
      <header className="mx-auto max-w-7xl px-6 pt-24 pb-8 md:pt-28 md:pb-10">
        <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
          {gallery.client}
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-[-1.5px] mb-4">
          {gallery.title}
        </h1>
        <p className="text-text-secondary">
          {formatDateFr(gallery.date)} · {gallery.count}{" "}
          {isVideo ? "films" : "photos"}
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

      {/* Accroche : le visiteur vient de voir le travail, on l'invite à
          découvrir le studio (adapté photo/vidéo) */}
      <section className="mx-auto max-w-7xl px-6 mt-16">
        <div className="rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/12 via-accent/5 to-transparent px-6 py-10 md:px-12 md:py-12 text-center">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.18em] mb-3">
            Paper34 · Studio graphique à Agde
          </p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-[-1px] mb-4">
            {isVideo
              ? "Vous préparez un mariage ?"
              : "Un événement à couvrir ?"}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            {isVideo
              ? "Paper34 réalise le film de votre journée, de la cérémonie à la piste de danse. Racontez-nous votre projet, on s'occupe des images."
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
          </div>
        </div>
      </section>

      {/* Signature galerie */}
      <div className="mx-auto max-w-7xl px-6 py-12 text-center">
        <p className="text-sm text-text-tertiary">
          {isVideo ? "Vidéos réalisées" : "Photos réalisées"} par{" "}
          <Link href="/" className="text-accent hover:underline">
            Paper34
          </Link>
        </p>
      </div>
    </main>
  );
}
