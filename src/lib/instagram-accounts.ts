const R2 = "https://pub-054d5e4ec36144bea38e07a1452fe2b0.r2.dev";

/** Un post du feed : visuel R2 + lien vers le vrai post (reel → badge lecture) */
export type FeedItem = {
  img: string;
  post?: string;
  video?: boolean;
};

export type ManagedAccount = {
  name: string;
  handle: string; // sans @
  category: string;
  description?: string;
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
  /** Derniers posts publiés (visuels R2 rafraîchis via scripts, liens réels) */
  feed?: FeedItem[];
  /** Optionnel : palette de gradient pour le fallback visuel */
  gradient?: [string, string];
  /** Optionnel : chemin local d'un screenshot (ex: /images/social/chiringuitovias.jpg) */
  screenshot?: string;
};

const CHIRINGUITO_RECENT = `${R2}/site/social/chiringuitovias/recent`;

// Comptes gérés. Seuls ceux qui ont un `feed` rempli apparaissent dans la
// section « Les comptes que j'anime » (les autres attendent leurs visuels).
export const MANAGED_ACCOUNTS: ManagedAccount[] = [
  {
    name: "Chiringuito Vias Plage",
    handle: "chiringuitovias",
    category: "Plage privée · Vias",
    description:
      "Affiches des soirées, photos et reels shootés sur place, stories, couverture des concerts — le compte vit au rythme des saisons.",
    facebook: "https://www.facebook.com/chiringuitovias/",
    tiktok: "https://www.tiktok.com/@chiringuitovias",
    stats: {
      followers: "18 K",
      posts: "1 221",
      // reach6m : à renseigner depuis Meta Business Suite (couverture 6 mois)
    },
    // Les 12 derniers posts du compte (au 03/08/2026) — visuels ré-hébergés
    // sur R2, chaque tuile pointe vers le post réel.
    feed: [
      { img: `${CHIRINGUITO_RECENT}/post-01.jpg`, post: "https://www.instagram.com/chiringuitovias/p/Dblo1_SiqUX/" },
      { img: `${CHIRINGUITO_RECENT}/post-02.jpg`, post: "https://www.instagram.com/chiringuitovias/p/DbfaRHjCo7B/" },
      { img: `${CHIRINGUITO_RECENT}/post-03.jpg`, post: "https://www.instagram.com/chiringuitovias/p/DbZ-f3KihTH/" },
      { img: `${CHIRINGUITO_RECENT}/post-04.jpg`, post: "https://www.instagram.com/chiringuitovias/reel/DbXtNF_iAi9/", video: true },
      { img: `${CHIRINGUITO_RECENT}/post-05.jpg`, post: "https://www.instagram.com/chiringuitovias/p/DbS_jBGCjhm/" },
      { img: `${CHIRINGUITO_RECENT}/post-06.jpg`, post: "https://www.instagram.com/chiringuitovias/p/DbOTvEqijKf/" },
      { img: `${CHIRINGUITO_RECENT}/post-07.jpg`, post: "https://www.instagram.com/chiringuitovias/p/DbJLi6LHFSi/" },
      { img: `${CHIRINGUITO_RECENT}/post-08.jpg`, post: "https://www.instagram.com/chiringuitovias/p/DbOSvtyil2F/" },
      { img: `${CHIRINGUITO_RECENT}/post-09.jpg`, post: "https://www.instagram.com/j.lauww/p/DbGsxbfDP8_/" },
      { img: `${CHIRINGUITO_RECENT}/post-10.jpg`, post: "https://www.instagram.com/chiringuitovias/p/DbFngSEioqD/" },
      { img: `${CHIRINGUITO_RECENT}/post-11.jpg`, post: "https://www.instagram.com/chiringuitovias/reel/DbBh9pPKs5e/", video: true },
      { img: `${CHIRINGUITO_RECENT}/post-12.jpg`, post: "https://www.instagram.com/chiringuitovias/p/Da78pEyHJ3v/" },
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
