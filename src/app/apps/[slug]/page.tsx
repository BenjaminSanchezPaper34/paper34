import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getApp, getAppSlugs } from "@/lib/apps";
import AppDevices from "@/components/apps/AppDevices";
import AppPreviewVideo from "@/components/apps/AppPreviewVideo";
import JsonLdBreadcrumb from "@/components/seo/JsonLdBreadcrumb";

const SITE = "https://www.paper34.fr";

// Une page statique par app du registre ; un slug inconnu donne une 404 propre.
export function generateStaticParams() {
  return getAppSlugs().map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return { title: "App introuvable" };
  const url = `${SITE}/apps/${app.slug}`;
  const description = `${app.name} : ${app.intro}`.slice(0, 158);
  return {
    title: `${app.name} : ${app.tagline}`,
    description,
    alternates: { canonical: url },
    openGraph: { title: app.name, description, url, type: "website", images: [{ url: app.icon }] },
  };
}

export default async function AppPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.intro,
    operatingSystem: app.devices
      .map((d) => ({ mac: "macOS", iphone: "iOS", ipad: "iPadOS", watch: "watchOS" })[d])
      .join(", "),
    applicationCategory: app.category,
    image: `${SITE}${app.icon}`,
    screenshot: app.screenshots.map((s) => `${SITE}${s.src}`),
    url: `${SITE}/apps/${app.slug}`,
    ...(app.storeUrl ? { installUrl: app.storeUrl } : {}),
    ...(app.macDownloadUrl ? { downloadUrl: app.macDownloadUrl } : {}),
    ...(app.external ? { sameAs: [app.external.site] } : {}),
    inLanguage: "fr",
    author: { "@type": "Person", name: "Benjamin Sanchez", url: SITE },
    publisher: { "@type": "Organization", name: "PAPER34", url: SITE },
    offers: { "@type": "Offer", price: app.offerPrice ?? "0", priceCurrency: "EUR" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <JsonLdBreadcrumb
        items={[
          { name: "Accueil", url: SITE },
          { name: "Apps", url: `${SITE}/apps` },
          { name: app.name, url: `${SITE}/apps/${app.slug}` },
        ]}
      />

      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-bg-primary">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <img
            src={app.icon}
            alt={`Icône de ${app.name}`}
            width={112}
            height={112}
            className="h-28 w-28 rounded-[22%] glow mb-8"
          />
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">{app.kind}</p>
          <h1 className="text-[clamp(40px,8vw,80px)] font-bold tracking-[-2px] leading-[1.05] mb-4">
            {app.name}
          </h1>
          <p className="text-[clamp(20px,3vw,28px)] font-semibold tracking-[-0.5px] gradient-text mb-6">
            {app.tagline}
          </p>
          <p className="text-text-secondary leading-relaxed max-w-2xl mb-8">{app.intro}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {app.storeUrl ? (
              /* Badge officiel d'Apple (fr), à utiliser tel quel : ni recoloré ni déformé. */
              <a
                href={app.storeUrl}
                className="inline-flex transition-opacity hover:opacity-85"
                aria-label={`Télécharger ${app.name} dans l'App Store`}
              >
                <img
                  src="/apps/badge-app-store-fr.svg"
                  alt="Télécharger dans l'App Store"
                  width={152}
                  height={48}
                  className="h-12 w-auto"
                />
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center rounded-full border border-border px-7 py-3 text-base font-semibold text-text-primary">
                Bientôt sur l&apos;App Store
              </span>
            )}
            {app.macDownloadUrl && (
              <a
                href={app.macDownloadUrl}
                className="inline-flex h-12 items-center rounded-[9px] border border-border-hover px-5 text-base font-semibold text-text-primary hover:bg-bg-card transition-colors"
              >
                Télécharger pour Mac
              </a>
            )}
            <p className="text-sm text-text-secondary">{app.price}.</p>
          </div>
          <div className="mt-8">
            <AppDevices devices={app.devices} />
          </div>
        </div>
      </section>

      {app.screenshotsLayout === "devices" ? (
        <section className="pb-20 md:pb-28 bg-bg-primary" aria-label="Captures d'écran">
          {/* Visuels déjà encadrés (Mac, iPhone, montre) : même hauteur. Mobile : défilement latéral.
              Bureau : chaque visuel prend une largeur proportionnelle à son format, la rangée tient sur la page. */}
          <ul className="mx-auto flex max-w-6xl items-end gap-6 overflow-x-auto snap-x snap-mandatory px-6 lg:px-8 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-8 md:overflow-visible">
            {app.preview && (
              <li
                className="snap-center shrink-0 md:shrink md:min-w-0"
                style={{ flexGrow: (app.preview.width ?? 600) / (app.preview.height ?? 1300), flexBasis: 0 }}
              >
                <AppPreviewVideo
                  src={app.preview.src}
                  poster={app.preview.poster}
                  label={`Aperçu vidéo de ${app.name}`}
                  width={app.preview.width}
                  height={app.preview.height}
                  className="h-[340px] w-auto max-w-none rounded-3xl bg-black md:h-auto md:w-full md:max-w-full"
                />
              </li>
            )}
            {app.screenshots.map((s) => (
              <li
                key={s.src}
                className="snap-center shrink-0 md:shrink md:min-w-0"
                style={{ flexGrow: s.width / s.height, flexBasis: 0 }}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  loading="lazy"
                  className="h-[340px] w-auto max-w-none md:h-auto md:w-full md:max-w-full"
                />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="pb-20 md:pb-28 bg-bg-primary" aria-label="Captures d'écran">
          <div className="mx-auto max-w-5xl">
            <ul className={`flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 lg:px-8 pb-4 md:grid md:gap-6 md:overflow-visible ${
                app.preview ? "md:grid-cols-5" : "md:grid-cols-4"
              }`}>
              {app.preview && (
                <li className="snap-center shrink-0 w-[62vw] max-w-[280px] md:w-auto md:max-w-none">
                  <AppPreviewVideo
                    src={app.preview.src}
                    poster={app.preview.poster}
                    label={`Aperçu vidéo de ${app.name}`}
                    className="w-full h-auto rounded-[13.5%/6.2%] bg-bg-card"
                  />
                </li>
              )}
              {app.screenshots.map((s) => (
                <li key={s.src} className="snap-center shrink-0 w-[62vw] max-w-[280px] md:w-auto md:max-w-none">
                  <img
                    src={s.src}
                    alt={s.alt}
                    width={s.width}
                    height={s.height}
                    loading="lazy"
                    className={`w-full h-auto ${
                      app.screenshotShape === "watch" ? "rounded-[20%/16%]" : "rounded-[13.5%/6.2%]"
                    }`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="py-24 md:py-32 bg-bg-secondary">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <h2 className="text-[clamp(28px,5vw,44px)] font-bold tracking-[-1px] leading-tight mb-12">
            Ce qu&apos;il y a dedans
          </h2>
          <dl className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {app.features.map((f) => (
              <div key={f.title}>
                <dt className="text-xl font-bold text-text-primary mb-2">{f.title}</dt>
                <dd className="text-text-secondary leading-relaxed">{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-bg-primary">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-[clamp(28px,5vw,44px)] font-bold tracking-[-1px] leading-tight mb-8">
            {app.commitments.title}
          </h2>
          <ul className="space-y-4 text-text-secondary leading-relaxed mb-12">
            {app.commitments.points.map((p) => (
              <li key={p} className="border-l border-accent pl-5">
                {p}
              </li>
            ))}
          </ul>
          <nav aria-label={`Aide et confidentialité de ${app.name}`} className="flex flex-wrap gap-x-8 gap-y-2">
            {app.external ? (
              <>
                <a href={app.external.site} className="inline-flex min-h-11 items-center text-accent hover:underline">
                  Site de {app.name}
                </a>
                <a href={app.external.support} className="inline-flex min-h-11 items-center text-accent hover:underline">
                  Assistance
                </a>
                <a href={app.external.privacy} className="inline-flex min-h-11 items-center text-accent hover:underline">
                  Politique de confidentialité
                </a>
              </>
            ) : (
              <>
                <Link href={`/apps/${app.slug}/assistance`} className="inline-flex min-h-11 items-center text-accent hover:underline">
                  Assistance
                </Link>
                <Link
                  href={`/apps/${app.slug}/confidentialite`}
                  className="inline-flex min-h-11 items-center text-accent hover:underline"
                >
                  Politique de confidentialité
                </Link>
              </>
            )}
          </nav>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-bg-secondary">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <p className="text-text-secondary leading-relaxed mb-6">
            {app.name} est conçue, dessinée et développée par Paper34, à Agde. Je crée aussi des
            applications sur mesure pour les entreprises, de la maquette à l&apos;App Store.
          </p>
          <Link
            href="/services/applications"
            className="inline-flex min-h-11 items-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-white/5 hover:border-border-hover"
          >
            Créer votre application
          </Link>
        </div>
      </section>
    </>
  );
}
