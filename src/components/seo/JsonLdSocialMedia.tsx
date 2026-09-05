export const SOCIAL_FAQ = [
  {
    question: "Quels réseaux sociaux gérez-vous ?",
    answer:
      "Principalement Instagram, Facebook, TikTok et LinkedIn. Le choix dépend de votre cible : Instagram et TikTok pour le grand public, Facebook pour le local et les communautés, LinkedIn pour le B2B.",
  },
  {
    question: "Combien coûte la gestion des réseaux sociaux ?",
    answer:
      "L'offre est sur-mesure selon le nombre de réseaux gérés, la fréquence des publications, le type de contenu (photo, vidéo, reels) et l'inclusion ou non de la création de contenu sur place. Contactez-moi pour un devis personnalisé.",
  },
  {
    question: "Vous déplacez-vous pour créer du contenu ?",
    answer:
      "Oui, je me déplace régulièrement chez mes clients pour shooter photo et vidéo : ambiances, produits, équipe, événements. C'est ce qui rend les feeds authentiques et reconnaissables.",
  },
  {
    question: "Combien de publications par mois ?",
    answer:
      "Le rythme idéal dépend de votre secteur. Pour un commerce ou un restaurant, je recommande 3 à 5 publications par semaine plus quelques stories quotidiennes. Nous adaptons ensemble selon votre stratégie.",
  },
  {
    question: "Créez-vous aussi les reels et les vidéos ?",
    answer:
      "Oui, le contenu vidéo (reels Instagram, TikTok) fait partie intégrante de l'offre. Tournage, montage, motion design, sous-titres : tout est inclus.",
  },
  {
    question: "Je garde la main sur mes comptes ?",
    answer:
      "Évidemment. Vous restez propriétaire de vos comptes et vous validez chaque publication avant mise en ligne. Vous pouvez à tout moment publier vous-même en parallèle.",
  },
  {
    question: "Faites-vous de la publicité sponsorisée (Meta Ads, TikTok Ads) ?",
    answer:
      "Oui, je peux créer et gérer vos campagnes publicitaires sur Meta (Instagram + Facebook) et TikTok : ciblage, créatives, suivi des performances, optimisation du budget.",
  },
  {
    question:
      "Vous gérez les réseaux sociaux de commerces à Agde, Pézenas ou Béziers ?",
    answer:
      "Oui, c'est mon terrain. Le studio est à Agde et j'anime les comptes de restaurants, commerces et loisirs d'Agde, du Cap d'Agde, de Vias-Plage, de Bessan et de Marseillan, avec des shootings sur place. Pézenas, Sète et Béziers sont à moins de quarante minutes : je m'y déplace pour les tournages, le reste se fait à distance. Le contenu tourné chez vous, au bon moment de la saison, est ce qui fait remonter un compte local.",
  },
  {
    question: "Combien de temps avant de voir des résultats ?",
    answer:
      "Les premiers résultats (engagement, croissance) sont visibles en 1 à 3 mois avec une stratégie solide et des publications régulières. La conversion en clients est progressive et dépend du secteur.",
  },
];

export default function JsonLdSocialMedia() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Gestion des réseaux sociaux à Agde",
    serviceType: "Social media management",
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
      { "@type": "City", name: "Agde" },
      { "@type": "City", name: "Cap d'Agde" },
      { "@type": "City", name: "Marseillan" },
      { "@type": "City", name: "Vias" },
      { "@type": "City", name: "Bessan" },
      { "@type": "City", name: "Pézenas" },
      { "@type": "City", name: "Sète" },
      { "@type": "City", name: "Béziers" },
      { "@type": "AdministrativeArea", name: "Hérault" },
      { "@type": "Country", name: "France" },
    ],
    description:
      "Gestion de réseaux sociaux pour les restaurants, commerces et loisirs d'Agde, Marseillan, Vias, Bessan, Pézenas, Sète et Béziers : stratégie éditoriale, photo et vidéo tournées sur place, publication, animation, publicité Meta et TikTok. Studio à Agde, intervention partout en France à distance.",
    url: "https://www.paper34.fr/services/reseaux-sociaux",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SOCIAL_FAQ.map((item) => ({
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
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.paper34.fr" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://www.paper34.fr/services" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Gestion des réseaux sociaux",
        item: "https://www.paper34.fr/services/reseaux-sociaux",
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
