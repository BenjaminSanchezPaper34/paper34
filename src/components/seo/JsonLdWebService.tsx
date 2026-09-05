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
    question:
      "Mon site sera-t-il visible sur ChatGPT, Gemini et les autres IA ?",
    answer:
      "Oui. De plus en plus de clients ne tapent plus leur recherche sur Google : ils la posent à ChatGPT, Gemini, Perplexity ou Copilot, qui répondent en citant des sites. Chaque site que je livre est conçu pour faire partie des sources citées — information claire, vérifiable et accessible à ces moteurs de réponse — en plus du référencement Google classique. Cette optimisation est comprise dans le prix, ce n'est pas une option.",
  },
  {
    question: "Mon site sera-t-il rapide à charger ?",
    answer:
      "Oui, c'est un critère de conception, pas une correction de fin de projet. Les sites que je livre répondent en moins de 0,1 seconde et sont pensés pour le mobile d'abord, d'où arrivent plus de 7 visiteurs sur 10. La vitesse compte doublement : elle évite que le visiteur reparte avant l'affichage, et Google en fait un critère de classement.",
  },
  {
    question: "Gérez-vous aussi l'hébergement et le nom de domaine ?",
    answer:
      "Oui, je peux prendre en charge l'achat du nom de domaine, la configuration de l'h\u00e9bergement (Vercel, Hostinger, OVH selon le projet) et la mise en ligne. Vous restez propri\u00e9taire de tout.",
  },
  {
    question: "Vous créez des sites pour les restaurants et commerces d'Agde ?",
    answer:
      "Oui, c'est le cœur de mon activité. Le studio est à Agde et la plupart des sites que je livre sont ceux de restaurants de plage, guinguettes, salles de sport, artisans et commerces d'Agde, du Cap d'Agde, de Marseillan, Vias, Bessan, Sète et Pézenas. Je connais la saison touristique et les clients qui cherchent sur leur téléphone : le site est conçu pour être trouvé sur Google Maps et sur ChatGPT, puis pour faire réserver ou venir.",
  },
  {
    question:
      "Pourquoi choisir une agence web à Agde plutôt qu'une plateforme en ligne ?",
    answer:
      "Parce qu'un site de restaurant ou de commerce local se gagne sur des détails qu'une plateforme ne voit pas : la bonne photo au bon endroit, la carte à jour, les horaires d'été, la fiche Google cohérente avec le site, le bouton qui appelle en un geste. Je viens sur place pour le brief, je photographie moi-même si besoin, et je reste joignable après la mise en ligne. Le site vous appartient, sans abonnement imposé.",
  },
  {
    question: "Travaillez-vous avec des clients partout en France ?",
    answer:
      "Oui, j'interviens partout en France \u00e0 distance. Le studio est bas\u00e9 \u00e0 Agde mais la totalit\u00e9 des \u00e9changes (brief, validation, mise en ligne) peut se faire en visio et par email. Pour les clients de l'H\u00e9rault et alentours, un d\u00e9placement pour le brief initial est possible si besoin.",
  },
  {
    question: "Que se passe-t-il apr\u00e8s la mise en ligne du site ?",
    answer:
      "Je propose un contrat de maintenance optionnel pour les mises \u00e0 jour de s\u00e9curit\u00e9, les sauvegardes r\u00e9guli\u00e8res et les \u00e9volutions futures de votre site. Vous restez libre d'arr\u00eater \u00e0 tout moment.",
  },
];

export default function JsonLdWebService() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cr\u00e9ation de site web \u00e0 Agde",
    serviceType: "Web design et d\u00e9veloppement",
    provider: {
      "@type": "LocalBusiness",
      name: "PAPER34",
      url: "https://www.paper34.fr",
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
      { "@type": "City", name: "Marseillan" },
      { "@type": "City", name: "Vias" },
      { "@type": "City", name: "Bessan" },
      { "@type": "City", name: "S\u00e8te" },
      { "@type": "City", name: "P\u00e9zenas" },
      { "@type": "City", name: "B\u00e9ziers" },
      { "@type": "City", name: "Montpellier" },
      { "@type": "AdministrativeArea", name: "H\u00e9rault" },
      { "@type": "Country", name: "France" },
    ],
    description:
      "Cr\u00e9ation de sites web pour les restaurants, commerces et loisirs d'Agde et du littoral de l'H\u00e9rault : sites vitrines, e-commerce, r\u00e9servation. Rapides sur mobile, r\u00e9f\u00e9renc\u00e9s sur Google, cit\u00e9s par les IA. Studio \u00e0 Agde, intervention partout en France \u00e0 distance.",
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        minPrice: "800",
      },
      url: "https://www.paper34.fr/services/creation-site-web",
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
        item: "https://www.paper34.fr",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://www.paper34.fr/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Cr\u00e9ation de site web",
        item: "https://www.paper34.fr/services/creation-site-web",
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
