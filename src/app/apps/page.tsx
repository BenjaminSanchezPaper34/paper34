import type { Metadata } from "next";
import Link from "next/link";
import { APPS } from "@/lib/apps";
import JsonLdBreadcrumb from "@/components/seo/JsonLdBreadcrumb";

const SITE = "https://www.paper34.fr";

export const metadata: Metadata = {
  title: "Apps iPhone, Apple Watch et Mac conçues par Paper34",
  description:
    "Je dessine et développe des applications iPhone, Apple Watch et Mac, de la première esquisse à l'App Store. Références : Puppy Drop, JaugeAI, WatchRoad.",
  alternates: { canonical: `${SITE}/apps` },
  openGraph: {
    title: "Apps conçues par Paper34",
    description: "Une app se dessine avant de se coder. Applications iPhone, Apple Watch et Mac, de l'esquisse à l'App Store.",
    url: `${SITE}/apps`,
    images: ["/og-image.jpg"],
  },
};

/** Ce que je prends en charge pour une app cliente. */
const SAVOIR_FAIRE = [
  {
    title: "Le cadrage",
    text: "À qui sert l'app, ce qu'elle doit faire en premier, sur quels appareils : on tranche avant de dessiner.",
  },
  {
    title: "Le dessin",
    text: "L'interface, l'icône, les illustrations et chaque geste, à la charte de votre marque.",
  },
  {
    title: "Le développement",
    text: "iPhone, iPad, Apple Watch, Mac ou web. Vous l'essayez sur votre téléphone à chaque étape.",
  },
  {
    title: "La sortie",
    text: "Fiche App Store, captures, vidéo d'aperçu, pages exigées par Apple, revue. Puis les mises à jour.",
  },
] as const;

export default function AppsPage() {
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Apps conçues par Paper34",
    url: `${SITE}/apps`,
    inLanguage: "fr-FR",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: APPS.map((app, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE}/apps/${app.slug}`,
        name: app.name,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }} />
      <JsonLdBreadcrumb
        items={[
          { name: "Accueil", url: SITE },
          { name: "Apps", url: `${SITE}/apps` },
        ]}
      />

      {/* Ouverture : la proposition, avant la liste */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-bg-primary">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Apps</p>
          <h1 className="text-[clamp(36px,7vw,72px)] font-bold tracking-[-2px] leading-[1.05] mb-8 max-w-4xl">
            Une app se dessine <span className="gradient-text">avant de se coder.</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mb-10">
            Je conçois une application comme une identité : on part de ce que vos clients doivent
            ressentir en l&apos;ouvrant. Puis je dessine l&apos;interface, les illustrations et chaque
            geste, j&apos;écris le code et je la mène jusqu&apos;à l&apos;App Store. Une seule personne,
            de l&apos;esquisse à la sortie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Parler de votre app
            </Link>
            <a
              href="#references"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:bg-white/5 hover:border-border-hover"
            >
              Voir les références
            </a>
          </div>
        </div>
      </section>

      {/* Références : chaque app publiée, ce qu'elle montre du savoir-faire */}
      <section id="references" className="py-20 md:py-28 bg-bg-secondary scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-1.5px] leading-tight mb-4">
            Références
          </h2>
          <p className="text-text-secondary max-w-2xl mb-14">
            Trois apps, trois univers qui ne se ressemblent pas. Elles sont à moi : c&apos;est
            la meilleure façon de vous montrer ce que je ferais pour la vôtre.
          </p>

          <ul className="space-y-8">
            {APPS.map((app) => (
              <li key={app.slug}>
                <Link
                  href={`/apps/${app.slug}`}
                  className="group grid grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl border border-border bg-bg-card p-6 transition-colors hover:border-border-hover md:grid-cols-[1fr_1.1fr] md:gap-12 md:p-10"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={app.icon}
                        alt={`Icône de ${app.name}`}
                        width={64}
                        height={64}
                        className="h-16 w-16 shrink-0 rounded-[22%]"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-text-primary">{app.name}</h3>
                        <p className="text-sm text-text-secondary">{app.kind}</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-text-primary mb-3">{app.tagline}</p>
                    <p className="text-text-secondary leading-relaxed mb-6">{app.showcase}</p>
                    <span className="inline-flex min-h-11 items-center text-accent group-hover:underline">
                      Découvrir {app.name}
                    </span>
                  </div>
                  <div className="flex h-72 items-center justify-center md:h-96">
                    <img
                      src={app.cover.src}
                      alt=""
                      width={app.cover.width}
                      height={app.cover.height}
                      loading="lazy"
                      className={`max-h-full w-auto max-w-full object-contain ${
                        app.screenshotShape === "watch"
                          ? "rounded-[20%/16%]"
                          : app.cover.height > app.cover.width
                            ? "rounded-[13.5%/6.2%]"
                            : ""
                      }`}
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ce que je fais pour une app cliente */}
      <section className="py-20 md:py-28 bg-bg-primary">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-1.5px] leading-tight mb-14">
            Pour votre app, <span className="gradient-text">tout se fait ici.</span>
          </h2>
          <dl className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {SAVOIR_FAIRE.map((item, i) => (
              <div key={item.title} className="border-t border-border pt-6">
                <dt className="text-xl font-bold text-text-primary mb-2">
                  <span className="text-accent mr-3">0{i + 1}</span>
                  {item.title}
                </dt>
                <dd className="text-text-secondary leading-relaxed">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Appel final */}
      <section className="py-24 md:py-32 bg-bg-secondary">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-[clamp(28px,5vw,44px)] font-bold tracking-[-1.5px] leading-tight mb-6">
            Une idée d&apos;app <span className="gradient-text">en tête ?</span>
          </h2>
          <p className="text-lg text-text-secondary mb-10">
            Réservation, fidélité, outil interne ou jeu à votre marque : racontez-moi l&apos;usage, le
            cadrage et le devis sont offerts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Parler de votre app
            </Link>
            <Link
              href="/services/applications"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:bg-white/5 hover:border-border-hover"
            >
              Création d&apos;applications sur mesure
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
