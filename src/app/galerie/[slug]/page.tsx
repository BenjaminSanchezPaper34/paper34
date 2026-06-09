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

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      {/* Hero */}
      <header className="mx-auto max-w-7xl px-6 pt-16 pb-8 md:pt-24 md:pb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-text-tertiary hover:text-text-secondary transition-colors mb-8"
        >
          <img src="/images/logo-paper34.svg" alt="Paper34" className="h-5" />
        </Link>
        <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
          {gallery.client}
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-[-1.5px] mb-4">
          {gallery.title}
        </h1>
        <p className="text-text-secondary">
          {formatDateFr(gallery.date)} · {gallery.count} photos
        </p>
        {gallery.intro ? (
          <GalleryIntro text={gallery.intro} />
        ) : (
          <p className="text-sm text-text-tertiary mt-4 max-w-xl">
            Cliquez sur une photo pour l&apos;agrandir. Téléchargez vos photos
            individuellement ou en une fois — les fichiers sont fournis en
            qualité originale.
          </p>
        )}
      </header>

      <ClientGallery gallery={gallery} />

      {/* Footer galerie */}
      <footer className="mx-auto max-w-7xl px-6 py-12 mt-8 border-t border-border text-center">
        <p className="text-sm text-text-tertiary">
          Photos réalisées par{" "}
          <Link href="/" className="text-accent hover:underline">
            Paper34
          </Link>
        </p>
      </footer>
    </main>
  );
}
