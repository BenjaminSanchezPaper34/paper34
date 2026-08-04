const R2 = "https://pub-054d5e4ec36144bea38e07a1452fe2b0.r2.dev";

/** Un post du feed : visuel R2 + lien vers le vrai post (reel → badge lecture) */
export type FeedItem = {
  img: string;
  post?: string;
  video?: boolean;
  /**
   * Avis client mis en page (visuel texte). Conservé sur la page réseaux,
   * mais écarté de l'accueil : en petite tuile, les pavés de texte sont
   * illisibles et moins attirants que les photos et les reels.
   */
  review?: boolean;
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
    /** Vues cumulées FB+IG des 6 derniers mois (source : Meta Business Suite) */
    views6m?: string;
    /** Couverture (comptes uniques touchés) des 6 derniers mois */
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
const GUINGUETTE_RECENT = `${R2}/site/social/guinguettedebessan/recent`;
const FARINETTE_RECENT = `${R2}/site/social/lesdelicesdefarinette/recent`;

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
      // Relevé Meta Business Suite le 03/08/2026, période 04/02 → 03/08/2026
      views6m: "3,9 M",
      reach6m: "286 K",
    },
    // Les 12 derniers posts du compte (au 03/08/2026) — visuels ré-hébergés
    // sur R2, chaque tuile pointe vers le post réel.
    feed: [
      { img: `${CHIRINGUITO_RECENT}/post-01.jpg`, post: "https://www.instagram.com/chiringuitovias/p/Dblo1_SiqUX/" },
      { img: `${CHIRINGUITO_RECENT}/post-02.jpg`, post: "https://www.instagram.com/chiringuitovias/p/DbfaRHjCo7B/", review: true },
      { img: `${CHIRINGUITO_RECENT}/post-03.jpg`, post: "https://www.instagram.com/chiringuitovias/p/DbZ-f3KihTH/" },
      { img: `${CHIRINGUITO_RECENT}/post-04.jpg`, post: "https://www.instagram.com/chiringuitovias/reel/DbXtNF_iAi9/", video: true },
      { img: `${CHIRINGUITO_RECENT}/post-05.jpg`, post: "https://www.instagram.com/chiringuitovias/p/DbS_jBGCjhm/" },
      { img: `${CHIRINGUITO_RECENT}/post-06.jpg`, post: "https://www.instagram.com/chiringuitovias/p/DbOTvEqijKf/" },
      { img: `${CHIRINGUITO_RECENT}/post-07.jpg`, post: "https://www.instagram.com/chiringuitovias/p/DbJLi6LHFSi/", review: true },
      { img: `${CHIRINGUITO_RECENT}/post-08.jpg`, post: "https://www.instagram.com/chiringuitovias/p/DbOSvtyil2F/" },
      { img: `${CHIRINGUITO_RECENT}/post-09.jpg`, post: "https://www.instagram.com/j.lauww/p/DbGsxbfDP8_/" },
      { img: `${CHIRINGUITO_RECENT}/post-10.jpg`, post: "https://www.instagram.com/chiringuitovias/p/DbFngSEioqD/" },
      { img: `${CHIRINGUITO_RECENT}/post-11.jpg`, post: "https://www.instagram.com/chiringuitovias/reel/DbBh9pPKs5e/", video: true },
      { img: `${CHIRINGUITO_RECENT}/post-12.jpg`, post: "https://www.instagram.com/chiringuitovias/p/Da78pEyHJ3v/", review: true },
    ],
    gradient: ["#0ea5e9", "#0369a1"],
  },
  {
    name: "La Guinguette de Bessan",
    handle: "guinguettedebessan",
    category: "Restaurant · Bessan",
    description:
      "Restaurant au bord de l'Hérault : ouverture de saison, carte terre & mer, terrasse et soirées. Contenus shootés sur place et publiés sur Instagram comme sur Facebook.",
    facebook:
      "https://www.facebook.com/La-guinguette-de-Bessan-officiel-236629180448376",
    stats: {
      followers: "1 674",
      posts: "126",
      // Relevé Meta Business Suite le 03/08/2026, période 04/02 → 03/08/2026
      // (915 557 vues Facebook + 104 380 vues Instagram)
      views6m: "1 M",
    },
    // Les 12 derniers posts du compte (au 03/08/2026)
    feed: [
      { img: `${GUINGUETTE_RECENT}/post-01.jpg`, post: "https://www.instagram.com/guinguettedebessan/p/DblpcOrCIfi/", review: true },
      { img: `${GUINGUETTE_RECENT}/post-02.jpg`, post: "https://www.instagram.com/guinguettedebessan/p/DbaEM2tCJ1m/" },
      { img: `${GUINGUETTE_RECENT}/post-03.jpg`, post: "https://www.instagram.com/guinguettedebessan/p/DbQKTAmiJd2/" },
      { img: `${GUINGUETTE_RECENT}/post-04.jpg`, post: "https://www.instagram.com/guinguettedebessan/reel/DbGqmj7o0-U/", video: true },
      { img: `${GUINGUETTE_RECENT}/post-05.jpg`, post: "https://www.instagram.com/guinguettedebessan/p/Da7kBl4CCkN/" },
      { img: `${GUINGUETTE_RECENT}/post-06.jpg`, post: "https://www.instagram.com/guinguettedebessan/p/DaxBIw5iCk6/", review: true },
      { img: `${GUINGUETTE_RECENT}/post-07.jpg`, post: "https://www.instagram.com/guinguettedebessan/p/DanRshAEYAS/" },
      { img: `${GUINGUETTE_RECENT}/post-08.jpg`, post: "https://www.instagram.com/guinguettedebessan/p/Dac9cUbCOXK/" },
      { img: `${GUINGUETTE_RECENT}/post-09.jpg`, post: "https://www.instagram.com/guinguettedebessan/reel/DaPrrbYohjs/", video: true },
      { img: `${GUINGUETTE_RECENT}/post-10.jpg`, post: "https://www.instagram.com/guinguettedebessan/p/DaI08-mCGIG/" },
      { img: `${GUINGUETTE_RECENT}/post-11.jpg`, post: "https://www.instagram.com/guinguettedebessan/p/DZ8EgT2iF38/" },
      { img: `${GUINGUETTE_RECENT}/post-12.jpg`, post: "https://www.instagram.com/guinguettedebessan/p/DZ14T98Ec9O/" },
    ],
    gradient: ["#84cc16", "#3f6212"],
  },
  {
    name: "Les Délices de Farinette",
    handle: "lesdelicesdefarinette",
    category: "Boulangerie-pâtisserie · Vias Plage",
    description:
      "Boulangerie-pâtisserie artisanale : entremets trompe-l'œil, viennoiseries et pain maison. Reels gourmands et photos produits, déclinés sur Instagram, Facebook et TikTok.",
    facebook: "https://www.facebook.com/lesdelicesdefarinette",
    tiktok: "https://www.tiktok.com/@lesdelicesdefarinette",
    stats: {
      followers: "491",
      posts: "37",
      // Relevé Meta Business Suite le 03/08/2026, période 04/02 → 03/08/2026
      // (259 500 vues Facebook + 88 305 vues Instagram)
      views6m: "348 K",
    },
    // Les 12 derniers posts du compte (au 04/08/2026)
    feed: [
      { img: `${FARINETTE_RECENT}/post-01.jpg`, post: "https://www.instagram.com/lesdelicesdefarinette/p/DbnIjMwliJd/" },
      { img: `${FARINETTE_RECENT}/post-02.jpg`, post: "https://www.instagram.com/lesdelicesdefarinette/reel/DbfUzvWt0PC/", video: true, review: true },
      { img: `${FARINETTE_RECENT}/post-03.jpg`, post: "https://www.instagram.com/lesdelicesdefarinette/reel/DbXm_jaNLl0/", video: true },
      { img: `${FARINETTE_RECENT}/post-04.jpg`, post: "https://www.instagram.com/lesdelicesdefarinette/p/DbQAwLfjV73/" },
      { img: `${FARINETTE_RECENT}/post-05.jpg`, post: "https://www.instagram.com/lesdelicesdefarinette/p/DbDTM3jkWLb/" },
      { img: `${FARINETTE_RECENT}/post-06.jpg`, post: "https://www.instagram.com/lesdelicesdefarinette/p/Da76KI8jdRJ/" },
      { img: `${FARINETTE_RECENT}/post-07.jpg`, post: "https://www.instagram.com/lesdelicesdefarinette/reel/DaxGd1Dt6ec/", video: true, review: true },
      { img: `${FARINETTE_RECENT}/post-08.jpg`, post: "https://www.instagram.com/lesdelicesdefarinette/reel/DanAxuaN2G1/", video: true },
      { img: `${FARINETTE_RECENT}/post-09.jpg`, post: "https://www.instagram.com/lesdelicesdefarinette/p/DahbQbPDe_M/" },
      { img: `${FARINETTE_RECENT}/post-10.jpg`, post: "https://www.instagram.com/lesdelicesdefarinette/p/DaW1chviCae/" },
      { img: `${FARINETTE_RECENT}/post-11.jpg`, post: "https://www.instagram.com/lesdelicesdefarinette/reel/DaPvYZ2NKSg/", video: true },
      { img: `${FARINETTE_RECENT}/post-12.jpg`, post: "https://www.instagram.com/lesdelicesdefarinette/reel/DaFjM3FN8gM/", video: true, review: true },
    ],
    gradient: ["#f59e0b", "#92400e"],
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
