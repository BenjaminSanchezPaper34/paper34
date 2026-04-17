export type WebProject = {
  name: string;
  url: string;
  category: string;
  description?: string;
};

// Liste \u00e0 enrichir au fur et \u00e0 mesure que tu me donnes les URLs.
// 3 projets visibles dans tes propri\u00e9t\u00e9s Search Console + commentaire de l'utilisateur.
export const WEB_PROJECTS: WebProject[] = [
  {
    name: "Chiringuito",
    url: "https://www.chiringuito-vias.fr",
    category: "Plage privée",
    description: "Plage privée",
  },
  {
    name: "Les Délices de Farinette",
    url: "https://www.lesdelicesdefarinette.fr",
    category: "Boulangerie pâtisserie",
    description: "Boulangerie pâtisserie",
  },
  {
    name: "Espace Ongles",
    url: "https://www.espace-ongles.fr/index.html",
    category: "Beauté",
    description: "Institut de prothésie ongulaire",
  },
  {
    name: "Le Komptoir 45",
    url: "https://www.lekomptoir45.fr",
    category: "Bar à vin",
    description: "Bar à vin",
  },
  {
    name: "Le Dix9",
    url: "https://www.ledix9.com",
    category: "Restaurant",
    description: "Restaurant gastronomique",
  },
  {
    name: "Safran",
    url: "https://www.safran-vias.fr",
    category: "Traiteur",
    description: "Traiteur",
  },
];

/**
 * G\u00e9n\u00e8re l'URL Microlink pour un screenshot d'une URL donn\u00e9e.
 * Microlink fournit une API gratuite avec 50 req/jour, mais les images
 * sont mises en cache sur leur CDN \u2014 donc une fois g\u00e9n\u00e9r\u00e9es elles sont
 * servies sans consommer le quota.
 */
export function getScreenshotUrl(url: string): string {
  const encoded = encodeURIComponent(url);
  return `https://api.microlink.io/?url=${encoded}&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&viewport.width=1280&viewport.height=800&waitUntil=networkidle0`;
}
