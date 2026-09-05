import Link from "next/link";
import { WEB_PROJECTS } from "@/lib/web-projects";
import WebPortfolioGrid from "@/components/web-portfolio/WebPortfolioGrid";
import SiteAdvantage from "@/components/web/SiteAdvantage";
import JsonLdWebService, { FAQ_ITEMS } from "@/components/seo/JsonLdWebService";
import JsonLdBreadcrumb from "@/components/seo/JsonLdBreadcrumb";

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Brief & stratégie",
    text: "Nous définissons ensemble vos objectifs, votre cible et les fonctionnalités nécessaires. Un devis détaillé personnalisé vous est remis.",
  },
  {
    n: "02",
    title: "Conception & design",
    text: "Conception d'un design moderne, responsive et aligné sur votre identité visuelle. Allers-retours sur les maquettes jusqu'à validation complète.",
  },
  {
    n: "03",
    title: "Développement",
    text: "Codage du site avec les technologies les plus performantes. Optimisation SEO et vitesse intégrées dès le départ.",
  },
  {
    n: "04",
    title: "Mise en ligne",
    text: "Achat du nom de domaine, configuration de l'hébergement, déploiement. Inscription à Google Search Console et soumission du sitemap.",
  },
  {
    n: "05",
    title: "Maintenance & évolution",
    text: "Maintenance optionnelle pour les mises à jour de sécurité, sauvegardes régulières et évolutions du site dans le temps.",
  },
];

// Villes servies en direct (déplacement possible pour le brief) — le reste
// de la France à distance. Ordre : du studio vers l'extérieur.
const LOCAL_AREAS = [
  {
    city: "Agde et le Cap d'Agde",
    text: "Le studio est ici. Restaurants, plages privées, loisirs nautiques, salles de sport et commerces du centre : des sites pensés pour la saison, pour les visiteurs qui cherchent depuis la plage sur leur téléphone, et pour la fiche Google qui va avec. Infini Mouv, la salle de sport d'Agde, est un de ces sites.",
  },
  {
    city: "Marseillan",
    text: "Port, étang de Thau, plage : restaurants de bord d'eau, sorties en mer, caves et producteurs. Un site de restaurant à Marseillan doit montrer la carte, la terrasse et le bouton réserver en une seconde. O Soleil, à Marseillan, en est l'exemple.",
  },
  {
    city: "Vias et Vias-Plage",
    text: "Chiringuitos, guinguettes, campings et commerces de saison : très forte fréquentation estivale, clientèle qui découvre l'adresse sur Google Maps et Instagram. Le Chiringuito de Vias-Plage et Les Délices de Farinette sont deux sites livrés ici.",
  },
  {
    city: "Sète",
    text: "Restaurants du quai, artisans, cabinets et lieux culturels : une ville où la concurrence en ligne est réelle. Le site doit être rapide, structuré et cité par les IA quand on demande « où manger à Sète ».",
  },
  {
    city: "Pézenas",
    text: "Métiers d'art, antiquaires, compagnies de théâtre, commerces du centre historique : des sites qui racontent un savoir-faire et qui sortent sur les recherches de visiteurs du week-end.",
  },
  {
    city: "Béziers et Bessan",
    text: "PME, professions libérales, franchises et lieux de sortie : refonte, performance, référencement local sur plusieurs villes. La Guinguette de Bessan est un site du studio.",
  },
];

const LOCAL_PROJECTS = [
  { name: "Chiringuito", city: "Vias-Plage", url: "https://www.chiringuito-vias.fr" },
  { name: "La Guinguette", city: "Bessan", url: "https://www.guinguette-bessan.fr" },
  { name: "O Soleil", city: "Marseillan", url: "https://www.osoleil-marseillan.fr" },
  { name: "Infini Mouv", city: "Agde", url: "https://www.infini-mouv.fr" },
  { name: "Les Délices de Farinette", city: "Vias", url: "https://www.lesdelicesdefarinette.fr" },
];

export default function CreationSiteWebPage() {
  return (
    <>
      <JsonLdWebService />
      <JsonLdBreadcrumb
        items={[
          { name: "Accueil", url: "https://www.paper34.fr" },
          { name: "Services", url: "https://www.paper34.fr/services" },
          { name: "Création de site web", url: "https://www.paper34.fr/services/creation-site-web" },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 bg-bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Création de site web
          </p>
          <h1 className="text-[clamp(36px,7vw,72px)] font-bold tracking-[-2px] leading-tight mb-6">
            Création de site web à Agde{" "}
            <span className="gradient-text">et sur le littoral.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Sites vitrines, e-commerce, réservation — conçus pour les
            restaurants, commerces et loisirs d&apos;Agde, Marseillan, Vias,
            Sète et Béziers. Rapides sur mobile, en tête sur Google, et cités par
            les intelligences artificielles qui répondent désormais à vos
            clients.
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
              Voir mes réalisations
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio web — la preuve d'abord : on montre des images avant de
          parler méthode (même hiérarchie que la page réseaux sociaux). */}
      <section id="realisations" className="py-20 md:py-28 bg-bg-primary scroll-mt-24">
        {/* Conteneur élargi au-delà de 1536 px : sans ça, les 5 colonnes
            réduiraient chaque maquette à ~220 px et l'URL deviendrait illisible. */}
        <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Réalisations
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Mes <span className="gradient-text">derniers sites</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Une sélection de sites web livrés pour des restaurants, commerces
              et entreprises. Cliquez sur un site pour le visiter.
            </p>
          </div>

          <WebPortfolioGrid projects={[...WEB_PROJECTS]} />
        </div>
      </section>

      {/* Ancrage local — audit GSC 05/09/2026 : la page n'apparaissait
          qu'en page 2-3 sur « agence web agde » faute de nommer les villes
          et les clients d'ici. Villes servies + réalisations locales. */}
      <section id="agde" className="py-20 md:py-28 bg-bg-secondary scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Agence web locale
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Des sites pour les commerces{" "}
              <span className="gradient-text">d&apos;Agde et du littoral.</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Le studio est à Agde. Les restaurants de plage, les guinguettes,
              les salles de sport et les artisans du coin sont mes clients de
              tous les jours : je connais la saison, les touristes qui cherchent
              sur leur téléphone, et ce qu&apos;un site doit faire pour remplir
              une terrasse.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LOCAL_AREAS.map((area) => (
              <div
                key={area.city}
                className="rounded-2xl border border-border bg-bg-card p-6 hover:border-border-hover transition-colors"
              >
                <h3 className="text-lg font-semibold mb-2">{area.city}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {area.text}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Parmi les sites livrés à côté de chez vous :{" "}
            {LOCAL_PROJECTS.map((p, i) => (
              <span key={p.name}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-primary underline decoration-border hover:decoration-accent transition-colors"
                >
                  {p.name}
                </a>{" "}
                ({p.city}){i < LOCAL_PROJECTS.length - 1 ? ", " : "."}
              </span>
            ))}{" "}
            Et pour Marseille, le studio a désormais une{" "}
            <Link href="/marseille" className="text-accent hover:underline">
              antenne sur place
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Argumentaire visuel : surfaces, chiffres, comparatif */}
      <SiteAdvantage />

      {/* Processus */}
      <section className="py-20 md:py-28 bg-bg-primary">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Processus
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Ma <span className="gradient-text">méthode</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              De la première discussion à la mise en ligne, un processus clair
              en 5 étapes pour livrer un site qui vous ressemble.
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
      <section className="py-20 md:py-28 bg-bg-secondary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Questions <span className="gradient-text">fréquentes</span>
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
            Prêt à lancer{" "}
            <span className="gradient-text">votre site&nbsp;?</span>
          </h2>
          <p className="text-lg text-text-secondary mb-10">
            Discutons de votre projet — devis gratuit personnalisé.
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
