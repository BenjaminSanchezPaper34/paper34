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
        name: "Marseillan",
      },
      {
        "@type": "City",
        name: "Vias",
      },
      {
        "@type": "City",
        name: "Bessan",
      },
      {
        "@type": "City",
        name: "P\u00e9zenas",
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
    // Ordre = priorit\u00e9 commerciale (audit 05/09/2026) : le web d'abord.
    makesOffer: [
      {
        "@type": "Offer",
        url: "https://www.paper34.fr/services/creation-site-web",
        itemOffered: {
          "@type": "Service",
          name: "Cr\u00e9ation de site web \u00e0 Agde",
          serviceType: "Web design et d\u00e9veloppement",
          url: "https://www.paper34.fr/services/creation-site-web",
          description: "Sites vitrines, e-commerce et r\u00e9servation pour les restaurants, commerces et loisirs d'Agde, Marseillan, Vias, S\u00e8te et B\u00e9ziers. Rapides, r\u00e9f\u00e9renc\u00e9s sur Google, cit\u00e9s par les IA.",
          areaServed: { "@type": "AdministrativeArea", name: "H\u00e9rault" },
        },
      },
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
          name: "Design de supports print",
          description: "Conception graphique de vos cartes, menus, flyers et affiches, fabrication d\u00e9l\u00e9gu\u00e9e \u00e0 des imprimeurs partenaires",
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
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PAPER34",
    url: "https://www.paper34.fr",
    description: "Agence web et studio graphique \u00e0 Agde : cr\u00e9ation de sites web, identit\u00e9 visuelle, r\u00e9seaux sociaux, photo et vid\u00e9o pour les commerces du littoral de l'H\u00e9rault",
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
