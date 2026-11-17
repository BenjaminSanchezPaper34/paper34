import type { Metadata } from "next";
import Link from "next/link";
import { APPS } from "@/lib/apps";

export const metadata: Metadata = {
  title: "Apps conçues par Paper34",
  description:
    "Les applications iPhone, iPad et Apple Watch conçues et développées par Paper34 à Agde : présentation, assistance et confidentialité.",
  alternates: { canonical: "https://www.paper34.fr/apps" },
};

export default function AppsPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-bg-primary">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Apps</p>
        <h1 className="text-[clamp(36px,7vw,64px)] font-bold tracking-[-2px] leading-tight mb-6">
          Conçues et développées <span className="gradient-text whitespace-nowrap">de A à Z</span>
        </h1>
        <p className="text-text-secondary leading-relaxed max-w-2xl mb-14">
          Du premier croquis à l&apos;App Store, je m&apos;occupe de tout : le design, les illustrations et le code.
          Chaque app a sa page, avec son assistance et sa politique de confidentialité.
        </p>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {APPS.map((app) => (
            <li key={app.slug}>
              <Link
                href={`/apps/${app.slug}`}
                className="flex h-full items-start gap-5 rounded-2xl border border-border bg-bg-card p-6 transition-colors hover:border-border-hover hover:bg-bg-card-hover"
              >
                <img
                  src={app.icon}
                  alt={`Icône de ${app.name}`}
                  width={80}
                  height={80}
                  className="h-20 w-20 shrink-0 rounded-[22%]"
                />
                <div>
                  <h2 className="text-xl font-bold text-text-primary mb-1">{app.name}</h2>
                  <p className="text-text-primary mb-2">{app.tagline}</p>
                  <p className="text-sm text-text-secondary">
                    {app.platforms}. {app.storeUrl ? "Disponible sur l'App Store." : "Bientôt sur l'App Store."}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-14 text-text-secondary">
          Une idée d&apos;application ?{" "}
          <Link href="/services/applications" className="text-accent hover:underline">
            Voir le service Applications
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
