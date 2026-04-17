import Link from "next/link";
import { WEB_PROJECTS } from "@/lib/web-projects";
import WebPortfolioGrid from "@/components/web-portfolio/WebPortfolioGrid";
import JsonLdWebService, { FAQ_ITEMS } from "@/components/seo/JsonLdWebService";

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Brief & strat\u00e9gie",
    text: "On d\u00e9finit ensemble vos objectifs, votre cible et les fonctionnalit\u00e9s n\u00e9cessaires. Devis d\u00e9taill\u00e9 et planning livr\u00e9s sous 48h.",
  },
  {
    n: "02",
    title: "Conception & design",
    text: "Cr\u00e9ation des maquettes sur Figma. Design moderne, responsive, align\u00e9 sur votre identit\u00e9 visuelle. Allers-retours jusqu'\u00e0 validation.",
  },
  {
    n: "03",
    title: "D\u00e9veloppement",
    text: "Codage du site avec les technologies les plus performantes (Next.js, WordPress selon le projet). Optimisation SEO et vitesse int\u00e9gr\u00e9es.",
  },
  {
    n: "04",
    title: "Mise en ligne",
    text: "Achat du nom de domaine, configuration de l'h\u00e9bergement, d\u00e9ploiement. Inscription Google Search Console et soumission du sitemap.",
  },
  {
    n: "05",
    title: "Suivi & maintenance",
    text: "Formation pour g\u00e9rer votre site, garantie 30 jours. Maintenance optionnelle pour mises \u00e0 jour, sauvegardes et \u00e9volutions.",
  },
];

export default function CreationSiteWebPage() {
  return (
    <>
      <JsonLdWebService />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 bg-bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Cr\u00e9ation de site web
          </p>
          <h1 className="text-[clamp(36px,7vw,72px)] font-bold tracking-[-2px] leading-tight mb-6">
            Cr\u00e9ation de site web{" "}
            <span className="gradient-text">\u00e0 Agde.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Sites vitrines, e-commerce, landing pages \u2014 con\u00e7us sur-mesure pour
            les commerces, restaurants et entreprises de l'H\u00e9rault. Design moderne,
            performance, r\u00e9f\u00e9rencement Google.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
            >
              Demander un devis gratuit
            </Link>
            <a
              href="#realisations"
              className="rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
            >
              Voir mes r\u00e9alisations
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio web */}
      <section id="realisations" className="py-20 md:py-28 bg-bg-primary scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              R\u00e9alisations
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Mes <span className="gradient-text">derniers sites</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Une s\u00e9lection de sites web livr\u00e9s pour des restaurants, commerces
              et entreprises de la r\u00e9gion. Cliquez sur un site pour le visiter.
            </p>
          </div>

          <WebPortfolioGrid projects={[...WEB_PROJECTS]} />
        </div>
      </section>

      {/* Processus */}
      <section className="py-20 md:py-28 bg-bg-secondary">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Processus
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Mon <span className="gradient-text">m\u00e9thode</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              De la premi\u00e8re discussion \u00e0 la mise en ligne, un processus clair
              en 5 \u00e9tapes pour livrer un site qui vous ressemble.
            </p>
          </div>

          <div className="space-y-4">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.n}
                className="flex flex-col md:flex-row gap-6 rounded-2xl border border-border bg-bg-card p-6 md:p-8 hover:border-border-hover transition-colors"
              >
                <div className="flex-shrink-0">
                  <span className="block text-2xl font-mono text-accent font-bold">
                    {step.n}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Questions <span className="gradient-text">fr\u00e9quentes</span>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-border bg-bg-card overflow-hidden hover:border-border-hover transition-colors"
              >
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                  <h3 className="text-base md:text-lg font-semibold text-text-primary">
                    {item.question}
                  </h3>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center text-accent transition-transform duration-300 group-open:rotate-45">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-text-secondary leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative py-24 md:py-32 bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent/10 to-bg-primary pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-6">
            Pr\u00eat \u00e0 lancer{" "}
            <span className="gradient-text">votre site\u00a0?</span>
          </h2>
          <p className="text-lg text-text-secondary mb-10">
            Discutons de votre projet \u2014 devis gratuit sous 48h.
          </p>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </section>
    </>
  );
}
