import type { Metadata } from "next";

// Page d'essai (branche proto/typo-allo uniquement) : Allo à trois arrondis, avec les vrais
// textes de l'accueil. Jamais indexée.
export const metadata: Metadata = {
  title: "Essai typo Allo",
  robots: { index: false, follow: false },
};

const RONDS = [0, 30, 60] as const;

export default function EssaiTypo() {
  return (
    <section className="pt-28 pb-20 bg-bg-primary">
      <div className="mx-auto max-w-[1400px] px-6">
        <p className="text-text-tertiary text-sm mb-10">
          Essai : la police Allo à trois arrondis (axe ROND). Mêmes textes que l&apos;accueil.
        </p>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {RONDS.map((r) => (
            <article
              key={r}
              style={{ fontVariationSettings: `"ROND" ${r}` }}
              className="rounded-3xl border border-border bg-bg-card p-6 md:p-8"
            >
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-6">ROND {r}</p>
              <h1 className="text-[clamp(32px,4vw,52px)] font-bold leading-[1] tracking-[-2px] mb-5">
                Du contenu qui fait venir les clients.
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                Site, réseaux, contenu, publicité, newsletter, print : un seul partenaire pour toute votre
                communication.
              </p>
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Un seul partenaire</p>
              <h2 className="text-[clamp(26px,3vw,36px)] font-bold tracking-[-1.5px] leading-tight mb-4">
                Une séance photo, <span className="gradient-text">tous vos canaux.</span>
              </h2>
              <p className="text-base text-text-secondary leading-relaxed mb-4">
                Ce que je photographie et filme chez vous alimente le site, les réseaux, la publicité, la
                newsletter et le print. Un seul interlocuteur, une seule image, et chaque mois un rapport
                qui dit ce qui rapporte.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed mb-8">
                Horaires 9 h 30 - 19 h · 1 249 visites · 4,9 ★ · Agde 34300 · 07 82 34 32 27
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-white">
                  Voir les réalisations
                </span>
                <span className="inline-flex min-h-11 items-center rounded-full border border-border px-6 text-sm font-semibold text-text-primary">
                  Me contacter
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
