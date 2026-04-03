export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
] as const;

export const SERVICES = [
  {
    id: "design",
    title: "Identit\u00e9 visuelle",
    description:
      "Cr\u00e9ation de logos, chartes graphiques et supports de marque pour une identit\u00e9 forte et coh\u00e9rente.",
    icon: "/images/services/design-paper34.svg",
    features: [
      "Logo & d\u00e9clinaisons",
      "Charte graphique compl\u00e8te",
      "Papeterie & supports",
      "Guidelines de marque",
    ],
  },
  {
    id: "print",
    title: "Communication print & impression",
    description:
      "De la cr\u00e9ation graphique \u00e0 l\u2019impression, je g\u00e8re tout : conception, fabrication et livraison de vos supports imprim\u00e9s. Pas besoin de chercher un imprimeur, je m\u2019en occupe.",
    icon: "/images/services/print-paper34.svg",
    features: [
      "Flyers & d\u00e9pliants",
      "Brochures & catalogues",
      "Affiches & kakemonos",
      "Cartes de visite",
      "Impression & livraison",
      "Packaging & stickers",
    ],
  },
  {
    id: "web",
    title: "Cr\u00e9ation de sites web",
    description:
      "Conception et d\u00e9veloppement de sites web modernes, rapides et optimis\u00e9s pour le r\u00e9f\u00e9rencement. Du site vitrine au e-commerce, je cr\u00e9e votre pr\u00e9sence en ligne sur-mesure.",
    icon: "/images/services/phone-paper34.svg",
    features: [
      "Sites vitrines responsive",
      "Sites e-commerce",
      "Landing pages",
      "Refonte & optimisation SEO",
      "Maintenance & mises \u00e0 jour",
      "H\u00e9bergement & nom de domaine",
    ],
  },
  {
    id: "reseaux-sociaux",
    title: "Gestion des r\u00e9seaux sociaux",
    description:
      "Strat\u00e9gie social media compl\u00e8te pour d\u00e9velopper votre communaut\u00e9, engager votre audience et g\u00e9n\u00e9rer des clients via Instagram, Facebook, LinkedIn et TikTok.",
    icon: "/images/services/illustration-paper34.svg",
    features: [
      "Strat\u00e9gie & planning \u00e9ditorial",
      "Cr\u00e9ation de contenu visuel",
      "Animation de communaut\u00e9",
      "Publicit\u00e9 sponsoris\u00e9e (Ads)",
      "Reportings & statistiques",
      "Formation & accompagnement",
    ],
  },
  {
    id: "video",
    title: "Vid\u00e9os promotionnelles",
    description:
      "Production vid\u00e9o cr\u00e9ative pour mettre en valeur votre activit\u00e9 et capter l\u2019attention.",
    icon: "/images/services/video-paper34.svg",
    features: [
      "Films promotionnels",
      "Motion design",
      "Montage & post-prod",
      "Contenu r\u00e9seaux sociaux",
    ],
  },
  {
    id: "photo",
    title: "Photographie",
    description:
      "Reportages photo professionnels pour sublimer vos produits, \u00e9v\u00e9nements et espaces.",
    icon: "/images/services/photo-paper34.svg",
    features: [
      "Packshot produit",
      "Reportage \u00e9v\u00e9nementiel",
      "Photo corporate",
      "Retouche & post-traitement",
    ],
  },
  {
    id: "illustration",
    title: "Illustrations",
    description:
      "Illustrations sur-mesure pour enrichir vos supports de communication et votre univers de marque.",
    icon: "/images/services/illustration-paper34.svg",
    features: [
      "Illustrations digitales",
      "Ic\u00f4nes & pictogrammes",
      "Illustrations \u00e9ditoriales",
      "Motifs & patterns",
    ],
  },
  {
    id: "tenue",
    title: "Tenues & objets personnalis\u00e9s",
    description:
      "Cr\u00e9ation graphique, fourniture et personnalisation de v\u00eatements professionnels et objets publicitaires. Je g\u00e8re la commande et la livraison pour vous.",
    icon: "/images/services/tenue-paper34.svg",
    features: [
      "Flocage & broderie",
      "V\u00eatements de travail",
      "Textile promotionnel",
      "Goodies & objets publicitaires",
      "Fourniture & livraison",
      "Devis sur-mesure",
    ],
  },
] as const;

export const STATS = [
  { value: 12, suffix: "+", label: "Ann\u00e9es d\u2019exp\u00e9rience" },
  { value: 500, suffix: "+", label: "Projets r\u00e9alis\u00e9s" },
  { value: 300, suffix: "+", label: "Clients satisfaits" },
  { value: 100, suffix: "%", label: "Passion" },
] as const;

export const TESTIMONIALS = [
  {
    name: "Kevin Naert",
    role: "Client",
    text: "Vous pouvez faire confiance \u00e0 Benjamin pour son professionnalisme et sa compr\u00e9hension de vos projets. Je recommande vivement cette entreprise. \u00c0 bient\u00f4t pour de nouvelles aventures\u00a0!",
    rating: 5,
  },
  {
    name: "Joannie Berthet",
    role: "Cliente",
    text: "Benjamin est un vrai professionnel, il a su r\u00e9pondre \u00e0 ma demande dans un temps record. Il prend acte de mes id\u00e9es, me fait part aussi des siennes. R\u00e9activit\u00e9, l\u2019une de ses premi\u00e8res qualit\u00e9s.",
    rating: 5,
  },
  {
    name: "Val Zaf",
    role: "Cheffe d\u2019entreprise",
    text: "Je fais appel r\u00e9guli\u00e8rement \u00e0 Benjamin depuis plusieurs ann\u00e9es pour ses qualit\u00e9s de designer. Je recommande Paper34 sans h\u00e9sitation, c\u2019est un excellent graphiste.",
    rating: 5,
  },
  {
    name: "Alain Francine",
    role: "Client",
    text: "Cette entreprise a \u00e9t\u00e9 pour nous un excellent renfort marketing\u00a0! Extr\u00eamement r\u00e9actif, Paper34 nous a permis de d\u00e9velopper imm\u00e9diatement notre chiffre d\u2019affaires.",
    rating: 5,
  },
  {
    name: "Enzo Toc\u00e9",
    role: "Client",
    text: "Travail tr\u00e8s professionnel, Benjamin est tr\u00e8s r\u00e9actif et \u00e0 l\u2019\u00e9coute. Impression livr\u00e9e plut\u00f4t que pr\u00e9vu. Je recommande fortement\u00a0!",
    rating: 5,
  },
  {
    name: "Nicolas A.",
    role: "Client",
    text: "Un professionnel qui propose des prix tr\u00e8s attractifs pour des prestations de qualit\u00e9. Je recommande.",
    rating: 5,
  },
] as const;

export const CONTACT_INFO = {
  email: "contact@paper34.fr",
  phone: "07 82 34 32 27",
  address: "Agde, 34300",
  instagram: "https://www.instagram.com/benjaminsanchez_paper34",
  facebook: "https://www.facebook.com/Paper34",
  linkedin: "https://www.linkedin.com/in/benjamin-sanchez-2395a4288",
  portfolio: "https://benjaminsanchez-paper34.pixieset.com",
  googleReview: "https://g.page/r/CYYVSpDMpiAZEB0/review",
} as const;

export const PORTFOLIO_CATEGORIES = [
  "Tous",
  "Photos",
  "Vid\u00e9os",
  "Design",
  "Web",
  "Impressions",
] as const;
