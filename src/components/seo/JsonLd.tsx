export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PAPER34",
    alternateName: "Paper34 Studio Graphique",
    url: "https://www.paper34.fr",
    logo: "https://www.paper34.fr/images/logo-paper34.svg",
    sameAs: [
      "https://www.instagram.com/benjaminsanchez_paper34",
      "https://www.facebook.com/Paper34",
      "https://www.linkedin.com/in/benjamin-sanchez-2395a4288",
      "https://www.tiktok.com/@benjaminsanchez_paper34",
    ],
    slogan: "De la carte de visite \u00e0 ChatGPT.",
    knowsAbout: [
      "Identit\u00e9 visuelle et charte graphique",
      "Communication print et impression",
      "Cr\u00e9ation de sites web rapides (Next.js)",
      "R\u00e9f\u00e9rencement naturel et moteurs de r\u00e9ponse IA (ChatGPT, Gemini, Perplexity)",
      "Fiches d'\u00e9tablissement Google, Bing et Apple Plans",
      "Photographie et vid\u00e9o d'entreprise",
      "Gestion des r\u00e9seaux sociaux",
      "D\u00e9veloppement d'applications web et mobiles",
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
    image: "https://www.paper34.fr/og-image.jpg",
    url: "https://www.paper34.fr",
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
        url: "https://www.paper34.fr/services/creation-site-web",
        itemOffered: {
          "@type": "Service",
          name: "Cr\u00e9ation de site web",
          serviceType: "Web design et d\u00e9veloppement",
          url: "https://www.paper34.fr/services/creation-site-web",
          description: "Sites vitrines et e-commerce sur-mesure, con\u00e7us mobile d'abord et r\u00e9pondant en moins d'un dixi\u00e8me de seconde. R\u00e9f\u00e9renc\u00e9s sur Google et Bing, pr\u00e9sents sur Google Maps et Apple Plans, lisibles par ChatGPT, Gemini et Perplexity. Fiches d'\u00e9tablissement g\u00e9r\u00e9es avec le client.",
          areaServed: { "@type": "Country", name: "France" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gestion des r\u00e9seaux sociaux",
          serviceType: "Social media management",
          url: "https://www.paper34.fr/services/reseaux-sociaux",
          description: "Strat\u00e9gie social media, cr\u00e9ation de contenu photo et vid\u00e9o, animation de communaut\u00e9, publicit\u00e9 sponsoris\u00e9e Meta et TikTok.",
          areaServed: { "@type": "Country", name: "France" },
        },
        url: "https://www.paper34.fr/services/reseaux-sociaux",
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
      {
        "@type": "Offer",
        url: "https://www.paper34.fr/services/applications",
        itemOffered: {
          "@type": "Service",
          name: "D\u00e9veloppement d'applications",
          serviceType: "D\u00e9veloppement web et mobile",
          url: "https://www.paper34.fr/services/applications",
          description: "Applications web (PWA) et mobiles sur-mesure : r\u00e9servation, fid\u00e9lit\u00e9, outils m\u00e9tier, tableaux de bord. Con\u00e7ues et maintenues par le studio.",
        },
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PAPER34",
    url: "https://www.paper34.fr",
    description: "Studio graphique \u00e0 Agde : identit\u00e9 visuelle, print, photo, vid\u00e9o, r\u00e9seaux sociaux et sites web visibles sur Google, Apple Plans et les IA.",
    inLanguage: "fr-FR",
    publisher: {
      "@type": "Organization",
      name: "PAPER34",
      url: "https://www.paper34.fr",
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
