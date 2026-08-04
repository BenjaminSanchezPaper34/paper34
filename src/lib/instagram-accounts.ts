const R2 = "https://pub-054d5e4ec36144bea38e07a1452fe2b0.r2.dev";

export type ManagedAccount = {
  name: string;
  handle: string; // sans @
  category: string;
  description?: string;
  /** Année de début de l'accompagnement (affichée « depuis 20XX ») */
  since?: number;
  /** Liens vers les autres plateformes du client (Instagram déduit du handle) */
  facebook?: string;
  tiktok?: string;
  /** Chiffres affichés tels quels (préformatés) */
  stats?: {
    followers: string;
    posts: string;
    following?: string;
    /** Couverture cumulée des 6 derniers mois (source : Meta Business Suite) */
    reach6m?: string;
  };
  /** Visuels de posts réels (URLs R2) — les 9 premiers remplissent le mockup iPhone */
  feed?: string[];
  /** Optionnel : palette de gradient pour le fallback visuel */
  gradient?: [string, string];
  /** Optionnel : chemin local d'un screenshot (ex: /images/social/chiringuitovias.jpg) */
  screenshot?: string;
};

// Comptes gérés. Seuls ceux qui ont un `feed` rempli apparaissent dans la
// section « Les comptes que j'anime » (les autres attendent leurs visuels).
export const MANAGED_ACCOUNTS: ManagedAccount[] = [
  {
    name: "Chiringuito Vias Plage",
    handle: "chiringuitovias",
    category: "Plage privée",
    description:
      "Plage privée emblématique de Vias. J'anime le compte au fil des saisons : affiches des soirées, photos et reels des événements, stories, couverture des concerts. Le contenu est shooté sur place — c'est l'ambiance réelle qui fait vivre le compte.",
    since: 2016,
    facebook: "https://www.facebook.com/chiringuitovias/",
    tiktok: "https://www.tiktok.com/@chiringuitovias",
    stats: {
      followers: "18 K",
      posts: "1 221",
      following: "1 772",
      // reach6m : à renseigner depuis Meta Business Suite (couverture 6 mois)
    },
    feed: [
      // Mix affiches créées + photos d'événements shootées (ordre = feed du mockup)
      `${R2}/site/social/chiringuitovias/affiche-aperol.jpg`,
      `${R2}/galeries/chiringuito-opening/display/A7V-113.jpg`,
      `${R2}/site/social/chiringuitovias/affiche-demsko.jpg`,
      `${R2}/galeries/chiringuito-coachella/display/A7507758-DxO_DeepPRIME%20XD3.jpg`,
      `${R2}/site/social/chiringuitovias/affiche-maxx-baty.jpg`,
      `${R2}/galeries/chiringuito-reggaeton/display/A7V-90.jpg`,
      `${R2}/site/social/chiringuitovias/affiche-morezan.jpg`,
      `${R2}/galeries/chiringuito-aperol/display/A7V-60.jpg`,
      `${R2}/site/social/chiringuitovias/affiche-yann-muller.jpg`,
      `${R2}/galeries/chiringuito-opening/display/A7V-27.jpg`,
      `${R2}/site/social/chiringuitovias/affiche-luis-labori.jpg`,
      `${R2}/galeries/chiringuito-coachella/display/A7507348-DxO_DeepPRIME%20XD3.jpg`,
      `${R2}/galeries/chiringuito-reggaeton/display/A7V-12.jpg`,
      `${R2}/galeries/chiringuito-aperol/display/A7V-1.jpg`,
      `${R2}/galeries/chiringuito-opening/display/A7V-158.jpg`,
      `${R2}/galeries/chiringuito-coachella/display/A7507597-DxO_DeepPRIME%20XD3.jpg`,
      `${R2}/galeries/chiringuito-reggaeton/display/A7V-140.jpg`,
      `${R2}/galeries/chiringuito-aperol/display/A7V-120.jpg`,
    ],
    gradient: ["#0ea5e9", "#0369a1"],
  },
  {
    name: "Le Dix9",
    handle: "ledix9restaurant",
    category: "Restaurant",
    gradient: ["#f59e0b", "#b45309"],
  },
  {
    name: "Pampa",
    handle: "pampaviasplage",
    category: "Restaurant",
    gradient: ["#10b981", "#047857"],
  },
  {
    name: "Fabrikus World",
    handle: "fabrikusworldviasplage",
    category: "Parc événementiel",
    gradient: ["#8b5cf6", "#5b21b6"],
  },
  {
    name: "Etienne Coffee & Shop",
    handle: "etienne_france",
    category: "Coffee shop",
    gradient: ["#d97706", "#78350f"],
  },
  {
    name: "Infini Mouv",
    handle: "infinimouv_agde",
    category: "Sport & loisirs",
    gradient: ["#ef4444", "#991b1b"],
  },
];

export function getProfileUrl(handle: string): string {
  return `https://www.instagram.com/${handle}/`;
}
