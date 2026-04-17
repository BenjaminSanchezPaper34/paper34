/**
 * JSON-LD enrichi pour la page /services/creation-site-web
 * Combine un schema Service d\u00e9taill\u00e9 + un schema FAQPage.
 * Les FAQs ici doivent rester strictement identiques au contenu visible sur la page.
 */

export const FAQ_ITEMS = [
  {
    question: "Combien co\u00fbte la cr\u00e9ation d'un site web ?",
    answer:
      "Le tarif d\u00e9pend de la complexit\u00e9 du projet : un site vitrine d\u00e9marre \u00e0 partir de 800\u00a0\u20ac, un site e-commerce \u00e0 partir de 2500\u00a0\u20ac. Chaque devis est personnalis\u00e9 selon vos besoins (nombre de pages, fonctionnalit\u00e9s, h\u00e9bergement). Contactez-moi pour un devis gratuit.",
  },
  {
    question: "Combien de temps pour cr\u00e9er un site internet ?",
    answer:
      "Comptez 2 \u00e0 4 semaines pour un site vitrine et 6 \u00e0 12 semaines pour un site e-commerce. Le d\u00e9lai d\u00e9pend de la r\u00e9activit\u00e9 dans la validation des maquettes et de la mise \u00e0 disposition des contenus (textes, photos).",
  },
  {
    question: "Mon site sera-t-il responsive (adapt\u00e9 aux mobiles) ?",
    answer:
      "Oui, tous les sites que je cr\u00e9e sont responsive par d\u00e9faut. Plus de 70 % du trafic web vient des mobiles, donc l'exp\u00e9rience sur smartphone et tablette est trait\u00e9e avec autant de soin que sur ordinateur.",
  },
  {
    question: "Mon site sera-t-il r\u00e9f\u00e9renc\u00e9 sur Google ?",
    answer:
      "Oui, j'optimise tous mes sites pour le SEO (r\u00e9f\u00e9rencement naturel) : structure HTML s\u00e9mantique, meta-donn\u00e9es, vitesse de chargement, donn\u00e9es structur\u00e9es Schema.org, sitemap, robots.txt. J'inscris \u00e9galement votre site sur Google Search Console.",
  },
  {
    question: "Quelles technologies utilises-tu ?",
    answer:
      "J'utilise les frameworks modernes les plus performants : Next.js (React) pour les sites sur-mesure rapides, WordPress pour les sites \u00e0 g\u00e9rer en autonomie, et des solutions e-commerce comme Shopify ou WooCommerce. Le choix d\u00e9pend de vos besoins.",
  },
  {
    question: "Tu g\u00e8res aussi l'h\u00e9bergement et le nom de domaine ?",
    answer:
      "Oui, je peux prendre en charge l'achat du nom de domaine, la configuration de l'h\u00e9bergement (Vercel, Hostinger, OVH selon le projet) et la mise en ligne. Vous restez propri\u00e9taire de tout.",
  },
  {
    question: "Tu interviens uniquement \u00e0 Agde ?",
    answer:
      "Je suis bas\u00e9 \u00e0 Agde mais je travaille avec des clients dans tout l'H\u00e9rault (B\u00e9ziers, S\u00e8te, Montpellier, Cap d'Agde, Vias, Marseillan) et m\u00eame au-del\u00e0. La majorit\u00e9 des \u00e9changes se font \u00e0 distance, et je me d\u00e9place pour le brief initial si besoin.",
  },
  {
    question: "Que se passe-t-il apr\u00e8s la mise en ligne du site ?",
    answer:
      "Vous b\u00e9n\u00e9ficiez d'une formation pour g\u00e9rer votre site (si CMS) et d'une garantie de 30 jours pour les corrections. Je propose ensuite un contrat de maintenance optionnel pour les mises \u00e0 jour, sauvegardes et \u00e9volutions.",
  },
];

export default function JsonLdWebService() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cr\u00e9ation de site web",
    serviceType: "Web design et d\u00e9veloppement",
    provider: {
      "@type": "LocalBusiness",
      name: "PAPER34",
      url: "https://paper34.fr",
      telephone: "+33782343227",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Agde",
        postalCode: "34300",
        addressRegion: "H\u00e9rault",
        addressCountry: "FR",
      },
    },
    areaServed: [
      { "@type": "City", name: "Agde" },
      { "@type": "City", name: "Cap d'Agde" },
      { "@type": "City", name: "B\u00e9ziers" },
      { "@type": "City", name: "S\u00e8te" },
      { "@type": "City", name: "Montpellier" },
      { "@type": "City", name: "Vias" },
      { "@type": "City", name: "Marseillan" },
      { "@type": "AdministrativeArea", name: "H\u00e9rault" },
    ],
    description:
      "Cr\u00e9ation de sites web sur-mesure : sites vitrines, e-commerce, landing pages. Design moderne, responsive, optimis\u00e9 SEO. Bas\u00e9 \u00e0 Agde dans l'H\u00e9rault.",
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        minPrice: "800",
      },
      url: "https://paper34.fr/services/creation-site-web",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://paper34.fr",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://paper34.fr/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Cr\u00e9ation de site web",
        item: "https://paper34.fr/services/creation-site-web",
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
