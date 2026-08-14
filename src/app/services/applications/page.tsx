import Link from "next/link";
import JsonLdBreadcrumb from "@/components/seo/JsonLdBreadcrumb";

/**
 * Page du pôle développement d'applications — même approche que
 * /services/graphisme : des scénarios concrets par besoin plutôt qu'une
 * liste de technologies. Aucune réalisation inventée : les projets en
 * cours viendront alimenter la page à leur livraison.
 */

const CAS_USAGE = [
  {
    title: "Réserver, commander, payer",
    sectors: "Restaurants, loisirs, plages privées, événements…",
    items: [
      "Réservation en ligne avec créneaux",
      "Billetterie & pré-ventes",
      "Commande & paiement intégrés",
      "Notifications et rappels clients",
    ],
  },
  {
    title: "Fidéliser vos clients",
    sectors: "Commerces, salles de sport, bars & restaurants…",
    items: [
      "Carte de fidélité dématérialisée",
      "Offres et actualités poussées sur téléphone",
      "Espace membre & abonnements",
      "Parrainage et récompenses",
    ],
  },
  {
    title: "Piloter votre activité",
    sectors: "Toutes entreprises",
    items: [
      "Tableaux de bord connectés à vos données",
      "Outils internes : planning, stocks, devis",
      "Automatisation des tâches répétitives",
      "Accès sécurisés par rôle (équipe, direction)",
    ],
  },
  {
    title: "Accompagner un lieu ou un événement",
    sectors: "Parcs de loisirs, festivals, clubs sportifs…",
    items: [
      "Programme, plan et infos pratiques en poche",
      "Suivi d'activité des visiteurs ou adhérents",
      "Contenus exclusifs & communauté",
      "Le tout aux couleurs de votre marque",
    ],
  },
] as const;

const FAQ = [
  {
    q: "Application mobile ou application web ?",
    a: "Les deux existent, et le choix dépend de l'usage. Une application web (PWA) s'installe depuis le navigateur, fonctionne sur tous les téléphones et se met à jour instantanément — idéale pour démarrer vite. Une application native iOS/Android se télécharge sur les stores et va plus loin (notifications riches, hors-ligne). On choisit ensemble selon votre besoin réel, pas selon la mode.",
  },
  {
    q: "Combien coûte une application ?",
    a: "Tout dépend du périmètre : un outil interne simple et une plateforme de réservation complète ne représentent pas le même travail. Chaque projet démarre par un cadrage gratuit qui aboutit à un devis précis, sans surprise. Le fonctionnement par étapes permet aussi de commencer par l'essentiel et d'enrichir ensuite.",
  },
  {
    q: "Pourquoi confier une application à un studio graphique ?",
    a: "Parce qu'une application réussie, c'est autant du design que du code. Chez Paper34, l'identité visuelle, l'interface et le développement sortent des mêmes mains : votre application est belle, cohérente avec votre marque, et fonctionnelle — sans coordination entre trois prestataires.",
  },
  {
    q: "Qui s'occupe de l'application après la mise en ligne ?",
    a: "Le studio. Hébergement, sauvegardes, mises à jour de sécurité et évolutions : un contrat de maintenance optionnel vous garantit une application qui reste rapide et à jour, avec un seul interlocuteur.",
  },
  {
    q: "Travaillez-vous avec des entreprises hors de l'Hérault ?",
    a: "Oui. Le studio est basé à Agde avec une antenne à Marseille, et le développement d'applications se mène très bien à distance : cadrage en visio, démonstrations régulières en ligne, mise en production accompagnée — partout en France.",
  },
] as const;

export default function ApplicationsPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Développement d'applications",
    serviceType: "Développement d'applications web et mobiles sur-mesure",
    provider: {
      "@type": "LocalBusiness",
      name: "PAPER34",
      url: "https://www.paper34.fr",
      telephone: "+33782343227",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Agde",
        postalCode: "34300",
        addressRegion: "Hérault",
        addressCountry: "FR",
      },
    },
    areaServed: { "@type": "Country", name: "France" },
    description:
      "Applications web (PWA) et mobiles iOS/Android sur-mesure : réservation, fidélité, outils métier, tableaux de bord. Design et développement intégrés au sein du studio.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <JsonLdBreadcrumb
        items={[
          { name: "Accueil", url: "https://www.paper34.fr" },
          { name: "Services", url: "https://www.paper34.fr/services" },
          { name: "Développement d'applications", url: "https://www.paper34.fr/services/applications" },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 bg-bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Développement d&apos;applications
          </p>
          <h1 className="text-[clamp(36px,7vw,72px)] font-bold tracking-[-2px] leading-tight mb-6">
            Une application qui{" "}
            <span className="gradient-text">travaille pour vous.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Réservation, fidélité, outils internes, tableaux de bord :
            des applications web et mobiles sur-mesure, conçues et développées
            par le studio — avec le design en plus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
            >
              Parler de mon projet
            </Link>
            <a
              href="#usages"
              className="rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
            >
              Voir les cas d&apos;usage
            </a>
          </div>
        </div>
      </section>

      {/* Cas d'usage */}
      <section id="usages" className="py-20 md:py-28 bg-bg-secondary scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Cas d&apos;usage
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Qu&apos;est-ce que votre application{" "}
              <span className="gradient-text">ferait pour vous&nbsp;?</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Quatre familles de besoins qui reviennent chez les commerces,
              les lieux et les entreprises de la région. Le vôtre est
              ailleurs&nbsp;? C&apos;est justement l&apos;intérêt du sur-mesure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAS_USAGE.map((c) => (
              <div
                key={c.title}
                className="rounded-3xl border border-border bg-bg-card p-8 md:p-10 hover:border-border-hover transition-colors"
              >
                <h3 className="text-xl md:text-2xl font-bold tracking-[-0.5px] mb-1">
                  {c.title}
                </h3>
                <p className="text-sm text-text-tertiary mb-6">{c.sectors}</p>
                <ul className="space-y-2.5">
                  {c.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-text-secondary"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="py-20 md:py-28 bg-bg-primary">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Méthode
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Du besoin à la{" "}
              <span className="gradient-text">mise en ligne</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                n: "01",
                title: "Cadrage",
                text: "On définit ensemble ce que l'application doit faire — et surtout ce qu'elle ne doit pas faire. Périmètre clair, devis gratuit, calendrier réaliste.",
              },
              {
                n: "02",
                title: "Prototype",
                text: "Vous voyez et manipulez une maquette interactive avant que le développement ne commence. Les ajustements se font là, quand ils ne coûtent rien.",
              },
              {
                n: "03",
                title: "Développement",
                text: "Le studio construit l'application avec des technologies modernes et éprouvées, en vous montrant l'avancée à chaque étape — pas d'effet tunnel.",
              },
              {
                n: "04",
                title: "Lancement & suivi",
                text: "Mise en production, formation à la prise en main, puis maintenance optionnelle : sécurité, sauvegardes et évolutions au fil de vos besoins.",
              },
            ].map((step) => (
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
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-border bg-bg-card overflow-hidden hover:border-border-hover transition-colors"
              >
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                  <h3 className="text-base md:text-lg font-semibold text-text-primary">
                    {item.q}
                  </h3>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-bg-primary flex items-center justify-center text-accent transition-transform duration-300 group-open:rotate-45">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-text-secondary leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Passerelle site web */}
      <section className="py-20 md:py-28 bg-bg-primary">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <h2 className="text-[clamp(24px,4vw,36px)] font-bold tracking-[-1px] mb-4">
            Un site web d&apos;abord,{" "}
            <span className="gradient-text">une app ensuite&nbsp;?</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto mb-10">
            Beaucoup de projets commencent par un site vitrine et grandissent
            vers l&apos;application. Les deux se construisent ici, avec la même
            identité visuelle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services/creation-site-web"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
            >
              Création de site web
            </Link>
            <Link
              href="/services/graphisme"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
            >
              Graphisme & impression
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative py-24 md:py-32 bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent/10 to-bg-primary pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-6">
            Une idée d&apos;application{" "}
            <span className="gradient-text">en tête&nbsp;?</span>
          </h2>
          <p className="text-lg text-text-secondary mb-10">
            Racontez-moi le besoin — cadrage et devis gratuits.
          </p>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
          >
            Parler de mon projet
          </Link>
        </div>
      </section>
    </>
  );
}
