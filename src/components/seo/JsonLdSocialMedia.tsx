export const SOCIAL_FAQ = [
  {
    question: "Quels réseaux sociaux gères-tu ?",
    answer:
      "Principalement Instagram, Facebook, TikTok et LinkedIn. Le choix dépend de ta cible : Instagram et TikTok pour le grand public, Facebook pour le local et les communautés, LinkedIn pour le B2B.",
  },
  {
    question: "Combien coûte la gestion de mes réseaux sociaux ?",
    answer:
      "L'offre est sur-mesure selon le nombre de réseaux gérés, la fréquence des publications, le type de contenu (photo, vidéo, reels) et l'inclusion ou non de la création de contenu sur place. Contacte-moi pour un devis personnalisé.",
  },
  {
    question: "Tu te déplaces pour créer du contenu ?",
    answer:
      "Oui, je me déplace régulièrement chez mes clients pour shooter photo et vidéo : ambiances, produits, équipe, événements. C'est ce qui rend les feeds authentiques et reconnaissables.",
  },
  {
    question: "Combien de publications par mois ?",
    answer:
      "Le rythme idéal dépend de ton secteur. Pour un commerce ou un restaurant, je recommande 3 à 5 publications par semaine plus quelques stories quotidiennes. On adapte ensemble selon ta stratégie.",
  },
  {
    question: "Tu créés aussi les reels et vidéos ?",
    answer:
      "Oui, le contenu vidéo (reels Instagram, TikTok) fait partie intégrante de l'offre. Tournage, montage, motion design, sous-titres — tout est inclus.",
  },
  {
    question: "Je garde la main sur mes comptes ?",
    answer:
      "Évidemment. Tu restes propriétaire de tes comptes et tu valides chaque publication avant mise en ligne. Tu peux à tout moment publier toi-même en parallèle.",
  },
  {
    question: "Tu fais de la publicité sponsorisée (Meta Ads, TikTok Ads) ?",
    answer:
      "Oui, je peux créer et gérer tes campagnes publicitaires sur Meta (Instagram + Facebook) et TikTok : ciblage, créatives, suivi des performances, optimisation du budget.",
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
    name: "Gestion des réseaux sociaux",
    serviceType: "Social media management",
    provider: {
      "@type": "LocalBusiness",
      name: "PAPER34",
      url: "https://paper34.fr",
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
      "Gestion complète de réseaux sociaux : stratégie éditoriale, création de contenu photo et vidéo, animation de communauté, publicité sponsorisée. Studio basé à Agde, intervention partout en France.",
    url: "https://paper34.fr/services/reseaux-sociaux",
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
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://paper34.fr" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://paper34.fr/services" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Gestion des réseaux sociaux",
        item: "https://paper34.fr/services/reseaux-sociaux",
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
