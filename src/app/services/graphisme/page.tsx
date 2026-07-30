import Link from "next/link";
import JsonLdBreadcrumb from "@/components/seo/JsonLdBreadcrumb";

/**
 * Page Graphisme & impression — "du logo à l'objet imprimé".
 *
 * Les exemples sont organisés par scénario client (ouvrir un commerce,
 * habiller une équipe…) plutôt que par format papier : le visiteur se
 * reconnaît dans une situation, pas dans une fiche technique.
 * L'impression et le textile sont fabriqués chez des imprimeurs
 * partenaires — jamais nommés ici — et livrés directement au client.
 */

const SCENARIOS = [
  {
    id: "commerce",
    title: "Ouvrir un commerce",
    sectors: "Restaurants, boutiques, instituts, artisans…",
    items: [
      "Logo & identité visuelle",
      "Cartes de visite & papeterie",
      "Flyer d'ouverture",
      "Menus & sets de table",
      "Vitrophanie & enseigne",
      "Site vitrine & fiche Google",
      "Photos du lieu et des produits",
    ],
    example: {
      label: "Voir mes sites livrés pour des commerces",
      href: "/services/creation-site-web",
    },
  },
  {
    id: "equipe",
    title: "Habiller une équipe",
    sectors: "Ateliers, BTP, restaurants, associations sportives…",
    items: [
      "Polos, t-shirts & sweats brodés ou floqués",
      "Vêtements de travail personnalisés",
      "Casquettes & bonnets",
      "Badges & tours de cou",
      "Signatures mail aux couleurs de l'entreprise",
      "Fourniture, personnalisation & livraison",
    ],
  },
  {
    id: "chantier",
    title: "Signaler une activité",
    sectors: "BTP, rénovation, services à domicile…",
    items: [
      "Panneaux de chantier",
      "Bâches & banderoles",
      "Marquage véhicule (magnets, semi-covering)",
      "Stickers & étiquettes",
      "Papier à en-tête, devis & factures",
      "Cartes de visite terrain",
    ],
  },
  {
    id: "evenement",
    title: "Lancer un événement",
    sectors: "Soirées, festivals, campagnes, salons…",
    items: [
      "Affiches tous formats (jusqu'au 2 m²)",
      "Kakemonos & roll-ups",
      "Flyers & invitations",
      "Visuels réseaux sociaux",
      "Vidéo teaser & aftermovie",
      "Goodies & textile événementiel",
    ],
    example: {
      label: "Voir la campagne Fabrikus World",
      href: "/galerie/fabrikus-world",
    },
  },
] as const;

const FAMILIES = [
  {
    icon: "/images/services/print-paper34.svg",
    title: "Print classique",
    items: [
      "Cartes de visite",
      "Flyers & dépliants",
      "Brochures & catalogues",
      "Affiches",
      "Papeterie d'entreprise",
      "Menus & sets de table",
      "Cartes de vœux & calendriers",
    ],
  },
  {
    icon: "/images/services/design-paper34.svg",
    title: "Grand format & signalétique",
    items: [
      "Bâches & banderoles",
      "Kakemonos & roll-ups",
      "Panneaux rigides",
      "Stickers & étiquettes",
      "Vitrophanie",
      "Marquage véhicule",
    ],
  },
  {
    icon: "/images/services/tenue-paper34.svg",
    title: "Textile & objet",
    items: [
      "T-shirts, polos & sweats",
      "Broderie & flocage",
      "Vêtements de travail",
      "Casquettes & accessoires",
      "Tote bags & mugs",
      "Goodies & objets publicitaires",
    ],
  },
] as const;

const STEPS = [
  {
    n: "01",
    title: "Création",
    text: "Nous définissons ensemble le besoin, je conçois la maquette et nous l'ajustons jusqu'à validation. Vous ne validez jamais un fichier que vous n'avez pas vu.",
  },
  {
    n: "02",
    title: "Fabrication",
    text: "Je prépare les fichiers aux normes d'imprimerie (haute définition, fonds perdus, profils couleur) et je lance la fabrication chez mes imprimeurs partenaires. Zéro mauvaise surprise à la réception.",
  },
  {
    n: "03",
    title: "Livraison",
    text: "Vos supports arrivent directement chez vous, prêts à l'usage. Un seul interlocuteur, un seul devis, du premier croquis à l'objet fini.",
  },
] as const;

export default function GraphismePage() {
  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: "Accueil", url: "https://www.paper34.fr" },
          { name: "Services", url: "https://www.paper34.fr/services" },
          { name: "Graphisme & impression", url: "https://www.paper34.fr/services/graphisme" },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 bg-bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Graphisme & impression
          </p>
          <h1 className="text-[clamp(36px,7vw,72px)] font-bold tracking-[-2px] leading-tight mb-6">
            Du logo à{" "}
            <span className="gradient-text">l&apos;objet imprimé.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Je ne livre pas que des fichiers : je conçois vos supports, je gère
            l&apos;impression et vous recevez l&apos;objet fini. Print, grand
            format, textile, web et vidéo — un seul interlocuteur pour toute
            votre image.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
            >
              Demander un devis gratuit
            </Link>
            <a
              href="#exemples"
              className="rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
            >
              Voir des exemples
            </a>
          </div>
        </div>
      </section>

      {/* Scénarios */}
      <section id="exemples" className="py-20 md:py-28 bg-bg-primary scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Exemples de réalisations
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Quel est <span className="gradient-text">votre projet&nbsp;?</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Quatre situations courantes et ce que je peux créer, imprimer et
              livrer pour chacune. Votre besoin est ailleurs&nbsp;? Parlons-en.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCENARIOS.map((s) => (
              <div
                key={s.id}
                className="rounded-3xl border border-border bg-bg-card p-8 md:p-10 hover:border-border-hover transition-colors"
              >
                <h3 className="text-xl md:text-2xl font-bold tracking-[-0.5px] mb-1">
                  {s.title}
                </h3>
                <p className="text-sm text-text-tertiary mb-6">{s.sectors}</p>
                <ul className="space-y-2.5">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-text-secondary"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                {"example" in s && s.example && (
                  <Link
                    href={s.example.href}
                    className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
                  >
                    {s.example.label}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Familles de produits */}
      <section className="py-20 md:py-28 bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Catalogue
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Tout ce que je peux{" "}
              <span className="gradient-text">imprimer pour vous</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Chaque support est conçu par mes soins puis fabriqué chez des
              imprimeurs partenaires sélectionnés pour leur qualité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FAMILIES.map((f) => (
              <div
                key={f.title}
                className="rounded-3xl border border-border bg-bg-card p-8 hover:border-border-hover transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
                  <img
                    src={f.icon}
                    alt=""
                    className="w-7 h-7 brightness-0 invert opacity-80"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <ul className="space-y-2.5">
                  {f.items.map((item) => (
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

      {/* Processus */}
      <section className="py-20 md:py-28 bg-bg-primary">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Comment ça marche
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Un seul interlocuteur,{" "}
              <span className="gradient-text">trois étapes</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Pas besoin de chercher un imprimeur, de préparer des fichiers aux
              normes ou de comparer des devis techniques : je m&apos;occupe de
              tout.
            </p>
          </div>

          <div className="space-y-4">
            {STEPS.map((step) => (
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

      {/* Passerelles vers le reste du studio */}
      <section className="py-20 md:py-28 bg-bg-secondary">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <h2 className="text-[clamp(24px,4vw,36px)] font-bold tracking-[-1px] mb-4">
            Et pour prolonger{" "}
            <span className="gradient-text">votre image</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto mb-10">
            Le graphisme fonctionne rarement seul : un site web, des photos et
            des vidéos donnent vie à la même identité sur tous vos canaux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services/creation-site-web"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
            >
              Création de site web
            </Link>
            <Link
              href="/galeries"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
            >
              Photos & vidéos
            </Link>
            <Link
              href="/services/reseaux-sociaux"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
            >
              Réseaux sociaux
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative py-24 md:py-32 bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent/10 to-bg-primary pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-6">
            Un support à créer,{" "}
            <span className="gradient-text">imprimer, livrer&nbsp;?</span>
          </h2>
          <p className="text-lg text-text-secondary mb-10">
            Décrivez-moi votre besoin — devis gratuit, création comprise.
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
