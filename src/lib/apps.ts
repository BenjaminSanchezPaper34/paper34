/**
 * Registre des apps conçues par Paper34.
 * Une entrée ici = trois pages générées : /apps/<slug>, /apps/<slug>/confidentialite et
 * /apps/<slug>/assistance (les deux dernières sont les URL demandées par l'App Store).
 * Pour ajouter une app : une entrée ci-dessous et ses images dans public/apps/<slug>/.
 */

export type AppSection = { title: string; text: string };

/** Appareils affichés avec leur pictogramme sous le bouton App Store. */
export type AppDevice = "iphone" | "ipad" | "watch";

export type AppInfo = {
  slug: string;
  name: string;
  /** Ce que c'est, en quelques mots (kicker de la page). */
  kind: string;
  /** Promesse en une phrase : titre de la page et meta description. */
  tagline: string;
  intro: string;
  platforms: string;
  devices: AppDevice[];
  /** Lien App Store une fois l'app publiée ; sans lien, la page indique « Bientôt ». */
  storeUrl?: string;
  price: string;
  /** Prix en euros pour les données structurées (« 0 » pour une app gratuite). */
  offerPrice?: string;
  /** Forme des captures : écran d'iPhone (par défaut) ou d'Apple Watch. */
  screenshotShape?: "phone" | "watch";
  icon: string;
  /** Vidéo d'aperçu (celle de la fiche App Store), placée avant les captures. Format 600 x 1300. */
  preview?: { src: string; poster: string };
  screenshots: { src: string; alt: string; width: number; height: number }[];
  features: AppSection[];
  /** Encadré de réassurance (familles, données, achats…). */
  commitments: { title: string; points: string[] };
  privacy: { updated: string; intro: string; sections: AppSection[] };
  support: { intro: string; questions: AppSection[] };
};

const CAPTURE = { width: 598, height: 1300 };
/** Capture native d'Apple Watch Ultra (422 x 514). */
const WATCH_CAPTURE = { width: 422, height: 514 };

export const APPS: AppInfo[] = [
  {
    slug: "puppy-drop",
    name: "Puppy Drop",
    kind: "Jeu iPhone, iPad et Apple Watch",
    tagline: "Fusionne des chiots, découvre 36 races.",
    intro:
      "Fais tomber des chiots dans le panier : quand deux chiens identiques se touchent, ils fusionnent en une race plus grande. Du petit Chihuahua au Dogue allemand, fais grandir ta meute et remplis ton carnet.",
    platforms: "iPhone, iPad et Apple Watch",
    devices: ["iphone", "ipad", "watch"],
    price: "Gratuit, avec un achat unique facultatif",
    icon: "/apps/puppy-drop/icone.webp",
    preview: {
      src: "https://pub-054d5e4ec36144bea38e07a1452fe2b0.r2.dev/apps/puppy-drop/apercu.mp4",
      poster: "/apps/puppy-drop/apercu-affiche.webp",
    },
    screenshots: [
      { src: "/apps/puppy-drop/capture-1-jeu.webp", alt: "Une partie de Puppy Drop : des chiots empilés dans le panier", ...CAPTURE },
      { src: "/apps/puppy-drop/capture-2-decouverte.webp", alt: "Nouvelle race découverte : le Caniche", ...CAPTURE },
      { src: "/apps/puppy-drop/capture-3-carnet.webp", alt: "Le carnet des races et les défis du jour", ...CAPTURE },
      { src: "/apps/puppy-drop/capture-4-fiche.webp", alt: "La fiche du Caniche : taille, pays, caractère", ...CAPTURE },
    ],
    features: [
      {
        title: "Une règle, un geste",
        text: "Glisse pour viser, lâche, et regarde les chiots fusionner. Penche le téléphone pour les faire rouler.",
      },
      {
        title: "4 meutes, 36 races",
        text: "Tout est inclus dans le jeu gratuit, sans limite de parties. Une meute terminée, la partie continue avec la suivante.",
      },
      {
        title: "Un carnet illustré",
        text: "Chaque chien a sa fiche : son pays, sa taille, son caractère et une anecdote.",
      },
      {
        title: "Des défis du jour",
        text: "Ils rapportent des os, à échanger contre des décors, des paniers et des effets de fusion.",
      },
      {
        title: "Au poignet aussi",
        text: "Sur Apple Watch, on vise au doigt ou à la couronne. Le carnet et le record suivent l'iPhone.",
      },
      {
        title: "Version complète",
        text: "Un achat unique et facultatif, partagé avec la famille : il permet de choisir sa meute au début de chaque partie.",
      },
    ],
    commitments: {
      title: "Pensé pour les familles",
      points: [
        "Sans publicité, sans messagerie, sans lien vers l'extérieur.",
        "Aucune donnée collectée. Pas de compte à créer.",
        "Un seul achat possible, protégé par un contrôle parental. Les os ne s'achètent jamais.",
        "Un espace parents : pause conseillée après 10 ou 20 minutes, Game Center facultatif.",
      ],
    },
    privacy: {
      updated: "16 novembre 2026",
      intro:
        "Puppy Drop est un jeu pour toute la famille, édité par Benjamin Sanchez (Paper34). Il ne collecte, ne transmet et ne vend aucune donnée personnelle.",
      sections: [
        {
          title: "Aucune donnée collectée",
          text: "L'app ne contient ni publicité, ni outil de mesure d'audience, ni pistage, ni messagerie, ni lien vers l'extérieur. Il n'y a pas de compte Puppy Drop à créer.",
        },
        {
          title: "Achat « Version complète »",
          text: "Le jeu est gratuit et propose un seul achat facultatif, protégé par un contrôle parental. Le paiement est entièrement traité par Apple (App Store) : nous ne recevons ni nom, ni adresse, ni moyen de paiement. L'app demande seulement à l'App Store si l'achat a été fait sur ce compte Apple ou partagé par la famille.",
        },
        {
          title: "Progression sur l'appareil et dans iCloud",
          text: "Le record, les races découvertes, les os gagnés et les décors choisis sont enregistrés sur l'appareil et, si iCloud est activé, dans l'espace iCloud du compte Apple de l'appareil, pour retrouver la même progression sur les autres appareils de ce compte. Ces informations restent chez Apple, dans ce compte : nous n'y avons pas accès.",
        },
        {
          title: "Game Center (facultatif)",
          text: "Game Center est désactivé par défaut. Un adulte peut l'activer dans l'espace parents, protégé par une question. Le jeu envoie alors à Game Center, le service d'Apple, le record et le nombre de races découvertes pour les classements et les succès. Ces informations sont traitées par Apple selon sa propre politique de confidentialité : nous n'y avons pas accès.",
        },
        {
          title: "Enfants",
          text: "Le jeu est conçu pour les enfants et respecte les règles de la catégorie Enfants de l'App Store : aucune donnée n'est collectée, et les réglages de partage sont réservés aux parents.",
        },
        {
          title: "Effacer ses données",
          text: "Dans l'espace parents, « Réinitialiser record et carnet » efface le record et le carnet. Supprimer l'app efface les données de l'appareil. Les données iCloud se suppriment dans Réglages, votre nom, iCloud, Gérer le stockage.",
        },
      ],
    },
    support: {
      intro:
        "Une question ou un souci avec Puppy Drop ? Écrivez-moi : je réponds en français, en général sous quelques jours.",
      questions: [
        {
          title: "Comment jouer ?",
          text: "Glisse le doigt pour viser, lâche pour faire tomber le chiot. Deux chiens identiques qui se touchent fusionnent en une race plus grande. Penche le téléphone pour faire rouler les chiens.",
        },
        {
          title: "Qu'apporte la Version complète ?",
          text: "Le jeu gratuit contient toutes les meutes et toutes les races : les meutes s'enchaînent au fil de la partie. La Version complète, en achat unique, permet de choisir sa meute au début de chaque partie. Elle se partage avec la famille (partage familial d'Apple).",
        },
        {
          title: "J'ai acheté la Version complète et elle n'apparaît plus",
          text: "Ouvrez la pause, puis Réglages, Espace parents, « Restaurer mes achats », avec le compte Apple qui a fait l'achat ou un membre du partage familial.",
        },
        {
          title: "Obtenir un remboursement",
          text: "Les achats sont gérés par Apple : la demande se fait sur reportaproblem.apple.com, avec le compte Apple qui a payé.",
        },
        {
          title: "Ma progression n'est pas sur mon autre appareil",
          text: "La progression suit iCloud : vérifiez que les deux appareils utilisent le même compte Apple et qu'iCloud est activé.",
        },
        {
          title: "Effacer la progression",
          text: "Dans l'espace parents : « Réinitialiser record et carnet ».",
        },
      ],
    },
  },
  {
    slug: "watchroad",
    name: "WatchRoad",
    kind: "Jeu Apple Watch",
    tagline: "Trois minutes de route, des zombies sur le capot.",
    intro:
      "Un pick-up, une route du désert et des zombies qui sautent sur la carrosserie. Pour t'en débarrasser, frôle les épaves du bon côté ou tire au doigt. Un vrai jeu en 3D, pensé pour l'écran de la montre et des parties de trois minutes.",
    platforms: "Apple Watch",
    devices: ["watch"],
    price: "2,99 €, sans achat intégré ni publicité",
    offerPrice: "2.99",
    screenshotShape: "watch",
    icon: "/apps/watchroad/icone.webp",
    screenshots: [
      { src: "/apps/watchroad/capture-1-portes.webp", alt: "Deux zombies accrochés au pick-up, avant deux portes de bonus : réparation ou munitions", ...WATCH_CAPTURE },
      { src: "/apps/watchroad/capture-2-crepuscule.webp", alt: "La route du désert au crépuscule, un zombie sur le flanc du pick-up", ...WATCH_CAPTURE },
      { src: "/apps/watchroad/capture-3-ville.webp", alt: "Le camion dans la rue étroite de la ville en ruine, près d'un bus renversé", ...WATCH_CAPTURE },
      { src: "/apps/watchroad/capture-4-arrivee.webp", alt: "L'écran d'arrivée : score, médaille et bonus de coque", ...WATCH_CAPTURE },
    ],
    features: [
      {
        title: "Une partie, trois minutes",
        text: "Six secteurs, puis la ligne d'arrivée. Le score grimpe à chaque secteur, jusqu'au double. Une fois arrivé, tu peux continuer sans fin.",
      },
      {
        title: "Frôle, tire, choisis",
        text: "Rase une épave pour arracher le zombie de ce côté, ou tire d'un tap. À chaque fin de secteur, deux portes : passe à gauche ou à droite pour choisir ta réparation, tes munitions ou ton boost.",
      },
      {
        title: "Couronne ou doigt",
        text: "On conduit à la Digital Crown ou en glissant le doigt, au choix. Chaque commande suffit seule.",
      },
      {
        title: "Quatre véhicules, quatre armes",
        text: "Pick-up, buggy, camion et moto ; pistolet, fusil à pompe, harpon et lance-flammes. Ils se débloquent en montant en grade, de Recrue à Légende.",
      },
      {
        title: "Quatre zones",
        text: "Le désert, le crépuscule, la tempête de sable et la ville en ruine, chacune avec sa lumière. La tempête pousse la voiture, la ville resserre la route.",
      },
      {
        title: "Un défi par jour",
        text: "Le même parcours pour tous les essais de la journée, accessible depuis le cadran de la montre.",
      },
    ],
    commitments: {
      title: "Payé une fois, c'est tout",
      points: [
        "Aucun achat intégré, aucune publicité, aucun abonnement.",
        "Aucune donnée collectée. Pas de compte, pas de connexion.",
        "Tout se passe sur la montre : le jeu marche hors ligne, sans iPhone à côté.",
        "Sang, son, vibrations et animations se règlent dans le jeu.",
      ],
    },
    privacy: {
      updated: "17 novembre 2026",
      intro:
        "WatchRoad est un jeu pour Apple Watch édité par Benjamin Sanchez (Paper34). Il ne collecte, ne transmet et ne vend aucune donnée personnelle.",
      sections: [
        {
          title: "Aucune donnée collectée",
          text: "Le jeu ne contient ni publicité, ni outil de mesure d'audience, ni pistage, ni connexion à un serveur. Il n'y a pas de compte WatchRoad à créer.",
        },
        {
          title: "Ce qui reste sur la montre",
          text: "Les records, le grade, les réglages et un court historique des parties (date, durée, score) sont enregistrés uniquement sur la montre. Ils ne sont ni envoyés, ni synchronisés : nous n'y avons pas accès.",
        },
        {
          title: "Achat",
          text: "Le jeu s'achète une fois sur l'App Store. Le paiement est entièrement traité par Apple : nous ne recevons ni nom, ni adresse, ni moyen de paiement. Il n'y a aucun achat dans le jeu.",
        },
        {
          title: "Effacer ses données",
          text: "Dans la pause, Réglages, « Réinitialiser les records » efface les records et le grade. Supprimer l'app de la montre efface toutes ses données.",
        },
      ],
    },
    support: {
      intro:
        "Une question ou un souci avec WatchRoad ? Écrivez-moi : je réponds en français, en général sous quelques jours.",
      questions: [
        {
          title: "Comment jouer ?",
          text: "Tourne la Digital Crown ou glisse le doigt pour changer de voie. Quand un zombie s'accroche, frôle une épave de son côté pour l'arracher, ou touche l'écran pour lui tirer dessus. Le boost se lance avec le bouton éclair, en bas à droite.",
        },
        {
          title: "Comment débloquer les véhicules et les armes ?",
          text: "Chaque partie rapporte de l'expérience. En montant en grade, de Recrue à Légende, s'ouvrent de nouveaux véhicules, armes, zones et ennemis. On les choisit dans la pause.",
        },
        {
          title: "Le jeu ralentit ou la montre chauffe",
          text: "Fermez les autres apps ouvertes, puis relancez le jeu. Si le souci persiste, écrivez-moi en indiquant le modèle de votre montre.",
        },
        {
          title: "Obtenir un remboursement",
          text: "L'achat est géré par Apple : la demande se fait sur reportaproblem.apple.com, avec le compte Apple qui a payé.",
        },
        {
          title: "Effacer la progression",
          text: "Dans la pause, Réglages : « Réinitialiser les records ».",
        },
      ],
    },
  },
];

export function getApp(slug: string): AppInfo | undefined {
  return APPS.find((a) => a.slug === slug);
}

export function getAppSlugs(): string[] {
  return APPS.map((a) => a.slug);
}
