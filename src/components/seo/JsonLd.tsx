export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PAPER34",
    alternateName: "Paper34 Studio Graphique",
    url: "https://paper34.fr",
    logo: "https://paper34.fr/images/logo-paper34.svg",
    sameAs: [
      "https://www.instagram.com/benjaminsanchez_paper34",
      "https://www.facebook.com/Paper34",
      "https://www.linkedin.com/in/benjamin-sanchez-2395a4288",
      "https://benjaminsanchez-paper34.pixieset.com",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+33782343227",
      contactType: "customer service",
      areaServed: "FR",
      availableLanguage: "French",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "PAPER34",
    image: "https://paper34.fr/og-image.jpg",
    url: "https://paper34.fr",
    telephone: "+33782343227",
    email: "contact@paper34.fr",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Agde",
      postalCode: "34300",
      addressRegion: "H\u00e9rault",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.3108,
      longitude: 3.4736,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Agde",
      },
      {
        "@type": "City",
        name: "Cap d'Agde",
      },
      {
        "@type": "City",
        name: "B\u00e9ziers",
      },
      {
        "@type": "City",
        name: "S\u00e8te",
      },
      {
        "@type": "City",
        name: "Montpellier",
      },
      {
        "@type": "AdministrativeArea",
        name: "H\u00e9rault",
      },
    ],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "16",
      bestRating: "5",
      worstRating: "5",
    },
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Identit\u00e9 visuelle",
          description: "Cr\u00e9ation de logos, chartes graphiques et supports de marque",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Communication print & impression",
          description: "Cr\u00e9ation graphique, impression et livraison de flyers, brochures, affiches, cartes de visite",
        },
      },
      {
        "@type": "Offer",
        url: "https://paper34.fr/services/creation-site-web",
        itemOffered: {
          "@type": "Service",
          name: "Cr\u00e9ation de site web",
          serviceType: "Web design et d\u00e9veloppement",
          url: "https://paper34.fr/services/creation-site-web",
          description: "Sites vitrines responsive, e-commerce, landing pages, refonte et optimisation SEO. Cr\u00e9ation sur-mesure pour les commerces et entreprises de l'H\u00e9rault.",
          areaServed: { "@type": "Country", name: "France" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gestion des r\u00e9seaux sociaux",
          description: "Strat\u00e9gie social media, cr\u00e9ation de contenu, animation de communaut\u00e9, publicit\u00e9 sponsoris\u00e9e",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Vid\u00e9os promotionnelles",
          description: "Films promotionnels, motion design, montage vid\u00e9o",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Photographie",
          description: "Reportage photo, packshot produit, photo corporate",
        },
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PAPER34",
    url: "https://paper34.fr",
    description: "Studio graphique \u00e0 Agde — identit\u00e9 visuelle, print, digital, vid\u00e9o, photo",
    inLanguage: "fr-FR",
    publisher: {
      "@type": "Organization",
      name: "PAPER34",
      url: "https://paper34.fr",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
