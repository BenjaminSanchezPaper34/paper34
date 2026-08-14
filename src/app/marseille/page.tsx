import Link from "next/link";
import JsonLdBreadcrumb from "@/components/seo/JsonLdBreadcrumb";

/**
 * Page d'implantation Marseille — même ligne éditoriale que le reste du
 * site : la preuve par le travail, pas de photos d'équipe. Le contenu
 * reste strictement factuel : Nicolas est sur place, le studio et ses
 * réalisations sont derrière. Les réalisations marseillaises viendront
 * enrichir la page au fil des premiers clients locaux.
 */

const SERVICES_MARSEILLE = [
  {
    title: "Création de sites web",
    text: "Sites vitrines, e-commerce, landing pages — design sur-mesure, responsive, optimisés pour Google.",
    href: "/services/creation-site-web",
  },
  {
    title: "Identité visuelle & graphisme",
    text: "Logos, chartes graphiques, supports imprimés : de la création à l'objet livré.",
    href: "/services/graphisme",
  },
  {
    title: "Réseaux sociaux",
    text: "Stratégie, création de contenu, publication : des comptes animés au quotidien, avec les chiffres pour le prouver.",
    href: "/services/reseaux-sociaux",
  },
  {
    title: "Photo & vidéo",
    text: "Reportages, portraits d'équipe, films d'entreprise, contenus pour les réseaux — shootés sur place.",
    href: "/galeries",
  },
] as const;

const FAQ = [
  {
    q: "Paper34 est-il vraiment présent à Marseille ?",
    a: "Oui : Nicolas, collaborateur du studio, est basé à Marseille. Il assure les rendez-vous, les shootings et le suivi sur place, dans les Bouches-du-Rhône. La création s'appuie sur toute la force du studio.",
  },
  {
    q: "Quelle zone couvrez-vous autour de Marseille ?",
    a: "Marseille et sa métropole, Aix-en-Provence et plus largement les Bouches-du-Rhône. Pour le reste de la région, tout est possible à distance — brief, maquettes et validations se font très bien en visio.",
  },
  {
    q: "Les tarifs sont-ils les mêmes qu'à Agde ?",
    a: "Oui. Mêmes prestations, mêmes méthodes, mêmes tarifs : chaque devis est établi sur mesure, gratuitement, selon la complexité du projet.",
  },
  {
    q: "Qui sera mon interlocuteur ?",
    a: "Un seul point d'entrée : le studio. Votre demande arrive chez Paper34, et selon le projet, Nicolas vous rencontre sur place à Marseille ou l'échange se fait directement avec le fondateur. Vous n'êtes jamais renvoyé d'un service à l'autre.",
  },
] as const;

export default function MarseillePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Studio graphique à Marseille",
    serviceType:
      "Création de sites web, identité visuelle, photo, vidéo, réseaux sociaux",
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
    areaServed: [
      { "@type": "City", name: "Marseille" },
      { "@type": "City", name: "Aix-en-Provence" },
      { "@type": "AdministrativeArea", name: "Bouches-du-Rhône" },
    ],
    description:
      "Antenne marseillaise du studio Paper34 : un collaborateur sur place pour les rendez-vous et les shootings, la création assurée par le studio.",
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
          { name: "Marseille", url: "https://www.paper34.fr/marseille" },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 bg-bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Paper34 · Marseille
          </p>
          <h1 className="text-[clamp(36px,7vw,72px)] font-bold tracking-[-2px] leading-tight mb-6">
            Le studio s&apos;installe{" "}
            <span className="gradient-text">à Marseille.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Sites web, identité visuelle, photo, vidéo et réseaux sociaux —
            avec Nicolas, votre interlocuteur sur place dans les
            Bouches-du-Rhône, et toute la force du studio derrière chaque
            projet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
            >
              Demander un devis gratuit
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
            >
              Voir les réalisations du studio
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 bg-bg-secondary">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Services
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Ce qu&apos;on fait{" "}
              <span className="gradient-text">pour vous</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Les mêmes prestations qui font travailler le studio depuis Agde —
              désormais avec un pied-à-terre marseillais.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SERVICES_MARSEILLE.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group rounded-2xl border border-border bg-bg-card p-7 transition-all duration-300 hover:bg-bg-card-hover hover:border-border-hover hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
              >
                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {s.text}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  En savoir plus
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 md:py-28 bg-bg-primary">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Fonctionnement
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Sur place et{" "}
              <span className="gradient-text">en studio</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                n: "01",
                title: "On se rencontre",
                text: "Nicolas vous retrouve à Marseille ou dans les Bouches-du-Rhône : brief, repérage, prises de vues. Le contact reste humain et local.",
              },
              {
                n: "02",
                title: "Le studio crée",
                text: "Conception graphique, développement, montage : chaque projet passe par les mêmes mains et les mêmes exigences que toutes les réalisations du studio.",
              },
              {
                n: "03",
                title: "Vous validez, on livre",
                text: "Maquettes, allers-retours et livraison — avec un seul point de contact du début à la fin, et un devis gratuit avant tout engagement.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-border bg-bg-card p-7 hover:border-border-hover transition-colors"
              >
                <span className="block text-2xl font-mono text-accent font-bold mb-3">
                  {step.n}
                </span>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.text}
                </p>
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
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center text-accent transition-transform duration-300 group-open:rotate-45">
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

      {/* CTA final */}
      <section className="relative py-24 md:py-32 bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent/10 to-bg-primary pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-6">
            Un projet{" "}
            <span className="gradient-text">à Marseille&nbsp;?</span>
          </h2>
          <p className="text-lg text-text-secondary mb-10">
            Racontez-le nous — devis gratuit, rencontre sur place possible.
          </p>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
          >
            Me contacter
          </Link>
        </div>
      </section>
    </>
  );
}
