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
    name: "Chiringuito Vias",
    url: "https://chiringuito-vias.fr",
    category: "Restaurant",
    description: "Site vitrine pour le bar de plage \u00e0 Vias",
  },
  {
    name: "O Soleil",
    url: "https://osoleil-marseillan.fr",
    category: "Restaurant",
    description: "Brasserie traditionnelle \u00e0 Marseillan",
  },
  {
    name: "uPost",
    url: "https://upost.fr",
    category: "Service",
    description: "Plateforme de publication de contenu",
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
