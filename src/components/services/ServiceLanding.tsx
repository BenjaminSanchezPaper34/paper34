import Link from "next/link";
import JsonLdBreadcrumb from "@/components/seo/JsonLdBreadcrumb";

/**
 * Gabarit des pages de service « partenaire complet » (campagnes, emailing…).
 * Même grammaire que /services/reseaux-sociaux : hero, blocs, méthode, lien
 * avec les autres services, FAQ, appel au contact. Fonds alternés, jamais deux
 * sections adjacentes sur le même fond.
 */

type Bloc = { titre: string; texte: string };
type Etape = { titre: string; texte: string };
type Faq = { question: string; answer: string };
type Lien = { label: string; href: string; texte: string };

export type ServiceLandingProps = {
  slug: string;
  eyebrow: string;
  titre: string;
  titreAccent: string;
  chapo: string;
  blocsTitre: string;
  blocs: Bloc[];
  etapes: Etape[];
  liens: Lien[];
  faq: Faq[];
  ctaTitre: string;
  ctaTexte: string;
};

const SITE = "https://www.paper34.fr";

export default function ServiceLanding(p: ServiceLandingProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${p.titre} ${p.titreAccent}`.trim(),
    description: p.chapo,
    url: `${SITE}/services/${p.slug}`,
    provider: { "@type": "LocalBusiness", name: "PAPER34", url: SITE, telephone: "+33782343227", address: { "@type": "PostalAddress", addressLocality: "Agde", postalCode: "34300", addressCountry: "FR" } },
    areaServed: ["Agde", "Cap d'Agde", "Marseillan", "Vias", "Bessan", "Sète", "Pézenas", "Béziers", "Hérault"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <JsonLdBreadcrumb
        items={[
          { name: "Accueil", url: SITE },
          { name: "Services", url: `${SITE}/services` },
          { name: p.eyebrow, url: `${SITE}/services/${p.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 bg-bg-primary overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">{p.eyebrow}</p>
          <h1 className="text-[clamp(36px,7vw,72px)] font-bold tracking-[-2px] leading-tight mb-6">
            {p.titre} <span className="gradient-text">{p.titreAccent}</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">{p.chapo}</p>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
          >
            Discuter de mon projet
          </Link>
        </div>
      </section>

      {/* Ce que je fais */}
      <section className="py-20 md:py-28 bg-bg-secondary">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-12 text-center">{p.blocsTitre}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {p.blocs.map((b) => (
              <div key={b.titre} className="rounded-2xl border border-border bg-bg-card p-6 hover:border-border-hover transition-colors">
                <h3 className="text-lg font-semibold mb-2">{b.titre}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{b.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="py-20 md:py-28 bg-bg-primary">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Méthode</p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px]">
              Comment <span className="gradient-text">je travaille</span>
            </h2>
          </div>
          <div className="space-y-4">
            {p.etapes.map((e, i) => (
              <div key={e.titre} className="flex flex-col md:flex-row gap-6 rounded-2xl border border-border bg-bg-card p-6 md:p-8">
                <span className="block text-2xl font-mono text-accent font-bold shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">{e.titre}</h3>
                  <p className="text-text-secondary leading-relaxed">{e.texte}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tout se nourrit : liens vers les autres services */}
      <section className="py-20 md:py-28 bg-bg-secondary">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Un seul partenaire</p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px]">
              Plus efficace <span className="gradient-text">avec le reste</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {p.liens.map((l) => (
              <Link key={l.href} href={l.href} className="group rounded-2xl border border-border bg-bg-card p-6 hover:border-accent/50 transition-colors">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{l.label} →</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{l.texte}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-12 text-center">
            Questions <span className="gradient-text">fréquentes</span>
          </h2>
          <div className="space-y-3">
            {p.faq.map((f) => (
              <details key={f.question} className="group rounded-2xl border border-border bg-bg-card overflow-hidden hover:border-border-hover transition-colors">
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                  <h3 className="text-base md:text-lg font-semibold">{f.question}</h3>
                  <span className="shrink-0 w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center text-accent transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-6 text-text-secondary leading-relaxed">{f.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 bg-bg-secondary overflow-hidden">
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-6">{p.ctaTitre}</h2>
          <p className="text-lg text-text-secondary mb-10">{p.ctaTexte}</p>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
          >
            Discuter de mon projet
          </Link>
        </div>
      </section>
    </>
  );
}
