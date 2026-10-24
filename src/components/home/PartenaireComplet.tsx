import Link from "next/link";

/**
 * « Un seul partenaire » (24/10/2026) : le cycle de communication en 4 temps.
 * Ce qui fait la différence de Paper34 : une même matière (photos, vidéos,
 * textes produits sur place) nourrit tous les canaux, et le rapport mensuel
 * mesure l'ensemble. Fond secondaire, entre le hero et la grille de services.
 */
const TEMPS = [
  {
    n: "01",
    titre: "Être trouvé",
    texte: "Un site rapide qui fait réserver, référencé sur Google, Maps et dans les réponses des IA.",
    liens: [{ label: "Sites web", href: "/services/creation-site-web" }],
  },
  {
    n: "02",
    titre: "Être vu",
    texte: "Contenu tourné chez vous, réseaux animés toute l'année, campagnes Instagram, Facebook et Google quand il faut accélérer.",
    liens: [
      { label: "Réseaux sociaux", href: "/services/reseaux-sociaux" },
      { label: "Campagnes", href: "/services/campagnes-sponsorisees" },
    ],
  },
  {
    n: "03",
    titre: "Faire revenir",
    texte: "Une newsletter alimentée par le site et les supports imprimés, des e-mails qui donnent une raison de revenir.",
    liens: [{ label: "Newsletter & emailing", href: "/services/newsletter-emailing" }],
  },
  {
    n: "04",
    titre: "Exister en vrai",
    texte: "Identité, affiches, menus, flyers, photo et vidéo : la même image, du comptoir au téléphone.",
    liens: [{ label: "Graphisme & print", href: "/services/graphisme" }],
  },
];

export default function PartenaireComplet() {
  return (
    <section className="py-24 md:py-32 bg-bg-secondary">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Un seul partenaire</p>
          <h2 className="text-[clamp(28px,5vw,52px)] font-bold tracking-[-2px] leading-tight mb-5">
            Une séance photo, <span className="gradient-text">tous vos canaux.</span>
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            Ce que je photographie et filme chez vous alimente le site, les réseaux, la publicité, la
            newsletter et le print. Un seul interlocuteur, une seule image, et chaque mois un rapport
            qui dit ce qui rapporte.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEMPS.map((t) => (
            <li key={t.n} className="rounded-2xl border border-border bg-bg-card p-6 flex flex-col gap-3">
              <span className="font-mono text-sm text-accent font-bold">{t.n}</span>
              <h3 className="text-xl font-bold">{t.titre}</h3>
              <p className="text-sm text-text-secondary leading-relaxed flex-1">{t.texte}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {t.liens.map((l) => (
                  <Link key={l.href} href={l.href} className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
                    {l.label} →
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-sm text-text-tertiary">
          Tout réunir dans une mensualité ?{" "}
          <Link href="/services#partenaire" className="text-accent hover:underline">
            Découvrir la formule partenaire
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
