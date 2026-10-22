import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getGallery,
  getGallerySlugs,
  type Gallery,
} from "@/lib/galleries";
import ClientGallery from "@/components/gallery/ClientGallery";
import { assetUrl } from "@/lib/gallery-shared";
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
  const url = `${SITE}/galerie/${gallery.slug}`;
  const cover = coverPhoto(gallery);
  const date = formatDateFr(gallery.date);
  const description = `Photos de ${gallery.title} chez ${gallery.client}, le ${date} : ${gallery.count} photos à voir et télécharger. Reportage Paper34, photographe à Agde.`.slice(0, 160);
  return {
    title: `${gallery.client} · ${gallery.title} — photos du ${date}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${gallery.client} · ${gallery.title}`,
      description,
      url,
      type: "website",
      ...(cover ? { images: [{ url: assetUrl(gallery.slug, cover.display), width: cover.width, height: cover.height }] } : {}),
    },
    robots: gallery.private ? { index: false, follow: false } : { index: true, follow: true },
  };
}

const SITE = "https://www.paper34.fr";

/** Photo de couverture (champ `cover`, sinon la première image). */
function coverPhoto(g: Gallery) {
  const imgs = g.photos.filter((p) => p.type !== "video");
  return imgs.find((p) => p.id === g.cover) ?? imgs[0];
}

/** JSON-LD ImageGallery + fil d'Ariane : crédit et licence lus par Google Images. */
function GalleryJsonLd({ gallery }: { gallery: Gallery }) {
  const url = `${SITE}/galerie/${gallery.slug}`;
  const creator = { "@type": "Person", name: "Benjamin Sanchez", url: SITE };
  const images = gallery.photos
    .filter((p) => p.type !== "video")
    .slice(0, 60)
    .map((p, i) => ({
      "@type": "ImageObject",
      contentUrl: assetUrl(gallery.slug, p.display),
      thumbnailUrl: assetUrl(gallery.slug, p.thumb ?? p.display),
      name: `${gallery.client} · ${gallery.title} — photo ${i + 1}`,
      width: p.width,
      height: p.height,
      creator,
      creditText: "Paper34",
      copyrightNotice: "© Paper34 — Benjamin Sanchez",
      license: `${SITE}/mentions-legales`,
      acquireLicensePage: `${SITE}/contact`,
    }));
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: `${gallery.client} · ${gallery.title}`,
      url,
      datePublished: gallery.date,
      about: gallery.client,
      creator,
      publisher: { "@type": "Organization", name: "PAPER34", url: SITE },
      image: images,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
        { "@type": "ListItem", position: 2, name: "Galeries", item: `${SITE}/galeries` },
        { "@type": "ListItem", position: 3, name: `${gallery.client} · ${gallery.title}`, item: url },
      ],
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Accroche de fin de galerie selon le public qui la regarde.
 *  `ctaTheme` du manifest prime ; sinon on déduit du client. */
type Accroche = { titre: string; texte: string };
function accroche(g: Gallery, isVideo: boolean): Accroche {
  if (g.ctaTheme === "mariage")
    return { titre: "Vous préparez un mariage ?", texte: "Je réalise le film de votre journée, de la cérémonie à la piste de danse. Racontez-moi votre projet, je m'occupe des images." };
  if (g.ctaTheme === "entreprise")
    return { titre: "Un film pour votre marque ?", texte: "Spots publicitaires, films d'entreprise, contenus pour vos réseaux : je mets votre activité en images, du tournage au montage." };
  if (isVideo)
    return { titre: "Un projet vidéo ?", texte: "Clips, événements, publicités : je filme et je monte vos projets, du tournage à la diffusion." };
  const c = g.client.toLowerCase();
  if (/chiringuito|guinguette|pampa|dix ?9|soleil|team c/.test(c))
    return { titre: "Vous tenez un restaurant, une plage, un bar ?", texte: "Ces photos font vivre le compte Instagram et le site du lieu. Je fais la même chose pour le vôtre : soirées en photo, réseaux sociaux, et un site qui fait réserver." };
  if (/megakart|fabrikus/.test(c))
    return { titre: "Votre entreprise ou votre club prépare une sortie ?", texte: "Sorties d'équipe, compétitions, journées clients : je photographie l'événement et je livre la galerie le lendemain. Pour les lieux de loisirs, je fais aussi le site et les réseaux." };
  if (/actah|cem|isolation|cabinet/.test(c))
    return { titre: "Votre entreprise mérite mieux qu'une photo de banque d'images ?", texte: "Portraits d'équipe, film, site web : je construis une image professionnelle cohérente, des photos jusqu'au site." };
  return { titre: "Un événement à couvrir ?", texte: "Soirées, ouvertures, mariages : je photographie et je filme vos événements, et j'accompagne aussi votre image au quotidien (identité, réseaux, site web)." };
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
      {!gallery.private && <GalleryJsonLd gallery={gallery} />}
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
            {accroche(gallery, isVideo).titre}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            {accroche(gallery, isVideo).texte}
          </p>
          {/* Lien éditorial vers l'offre prioritaire du studio (maillage
              interne vers la page création de site, audit GSC 05/09/2026). */}
          <p className="text-sm text-text-tertiary max-w-2xl mx-auto -mt-4 mb-8">
            Ces photos servent aussi un site : découvrez la{" "}
            <Link
              href="/services/creation-site-web"
              className="text-accent hover:underline"
            >
              création de site web à Agde et sur le littoral
            </Link>{" "}
            par Paper34.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* La galerie d'origine suit la demande : champ caché du formulaire
                et propriété de l'événement devis_envoye. */}
            <Link
              href={`/contact?galerie=${gallery.slug}`}
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
