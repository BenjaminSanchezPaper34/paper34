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
    name: "Actah & Associés",
    url: "https://actah-associes.fr",
    category: "Cabinet d'avocats",
    description: "Cabinet d'avocats à Béziers",
  },
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
    name: "O Soleil",
    url: "https://www.osoleil-marseillan.fr",
    category: "Restaurant",
    description: "Restaurant à Marseillan",
  },
  {
    name: "Le Dix9",
    url: "https://www.ledix9.com",
    category: "Restaurant",
    description: "Restaurant gastronomique",
  },
  {
    name: "La Guinguette",
    url: "https://www.guinguette-bessan.fr",
    category: "Restaurant",
    description: "Guinguette à Bessan",
  },
  {
    name: "Infini Mouv",
    url: "https://www.infini-mouv.fr",
    category: "Salle de sport",
    description: "Salle de sport à Agde",
  },
  {
    name: "CEM",
    url: "https://www.cem-expertcomptable.fr",
    category: "Expertise comptable",
    description: "Cabinet d'expertise comptable à Agde et Paris",
  },
  {
    name: "Languedoc Isolation",
    url: "https://languedocisolation.com/index.html",
    category: "Rénovation énergétique",
    description: "Isolation thermique RGE à Béziers",
  },
];

/**
 * Aper\u00e7u d'une r\u00e9alisation, servi depuis R2.
 *
 * Les captures \u00e9taient g\u00e9n\u00e9r\u00e9es \u00e0 la vol\u00e9e par l'API Microlink : au-del\u00e0
 * de quelques vignettes, le quota gratuit \u00e9tait atteint et les images ne
 * s'affichaient plus chez les visiteurs. Elles sont d\u00e9sormais g\u00e9n\u00e9r\u00e9es
 * une fois (scripts/capture-realisations.mjs) puis h\u00e9berg\u00e9es sur R2.
 */
const R2_PUBLIC = "https://pub-054d5e4ec36144bea38e07a1452fe2b0.r2.dev";

/** Identifiant de fichier d\u00e9riv\u00e9 du nom du projet. */
export function projectSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getScreenshotUrl(nameOrUrl: string): string {
  return `${R2_PUBLIC}/site/realisations/${projectSlug(nameOrUrl)}.jpg`;
}

/** Ancienne g\u00e9n\u00e9ration \u00e0 la vol\u00e9e (conserv\u00e9e pour r\u00e9f\u00e9rence/reg\u00e9n\u00e9ration). */
export function getMicrolinkUrl(url: string): string {
  const encoded = encodeURIComponent(url);
  return `https://api.microlink.io/?url=${encoded}&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&viewport.width=1280&viewport.height=800&waitUntil=networkidle0`;
}
