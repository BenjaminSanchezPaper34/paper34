/**
 * Registre des apps conçues par Paper34.
 * Une entrée ici = la page /apps/<slug>, plus /apps/<slug>/confidentialite et /apps/<slug>/assistance
 * (les URL demandées par l'App Store) quand l'app n'a pas son propre site. Une app qui a déjà son site
 * (`external`) garde ses pages d'aide et de confidentialité chez elle : la page renvoie vers elles.
 * Pour ajouter une app : une entrée ci-dessous et ses images dans public/apps/<slug>/.
 */

export type AppSection = { title: string; text: string };

/** Appareils affichés avec leur pictogramme sous le bouton App Store. */
export type AppDevice = "mac" | "iphone" | "ipad" | "watch";

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
  /** Catégorie schema.org (données structurées). */
  category: "GameApplication" | "UtilitiesApplication";
  /** Lien App Store une fois l'app publiée ; sans lien, la page indique « Bientôt ». */
  storeUrl?: string;
  /** App Mac distribuée hors Mac App Store : lien de téléchargement, en second bouton. */
  macDownloadUrl?: string;
  /** Site propre de l'app : ses pages d'aide et de confidentialité y restent (URL déjà déclarées). */
  external?: { site: string; support: string; privacy: string };
  price: string;
  icon: string;
  /** Vidéo d'aperçu (celle de la fiche App Store), placée avant les captures. Format 600 x 1300. */
  preview?: { src: string; poster: string };
  screenshots: { src: string; alt: string; width: number; height: number }[];
  /** « phone » : captures iPhone de même format, en grille. « devices » : visuels déjà encadrés
   * (Mac, iPhone, montre) de formats différents, alignés sur une même hauteur. */
  screenshotsLayout?: "phone" | "devices";
  features: AppSection[];
  /** Encadré de réassurance (familles, données, achats…). */
  commitments: { title: string; points: string[] };
  /** Pages hébergées ici (obligatoires sans `external`). */
  privacy?: { updated: string; intro: string; sections: AppSection[] };
  support?: { intro: string; questions: AppSection[] };
};

const CAPTURE = { width: 598, height: 1300 };

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
    category: "GameApplication",
    storeUrl: "https://apps.apple.com/app/id6827112736",
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
    slug: "jaugeai",
    name: "JaugeAI",
    kind: "App Mac, iPhone et Apple Watch",
    tagline: "Toutes vos IA, au poignet. Gratuitement.",
    intro:
      "JaugeAI réunit les limites d'usage de Claude, ChatGPT et Gemini au même endroit. Le Mac fait le relevé, l'iPhone et l'Apple Watch l'affichent, et l'app prévient avant le blocage.",
    platforms: "Mac, iPhone et Apple Watch",
    devices: ["mac", "iphone", "watch"],
    category: "UtilitiesApplication",
    storeUrl: "https://apps.apple.com/app/id6814973861?ct=paper34",
    macDownloadUrl: "https://jaugeai.com/fr/telecharger",
    external: {
      site: "https://jaugeai.com/fr",
      support: "https://jaugeai.com/fr/support",
      privacy: "https://jaugeai.com/fr/privacy",
    },
    price: "Gratuit. JaugeAI Pro : 9,99 € en achat unique, valable sur tous vos appareils",
    icon: "/apps/jaugeai/icone.webp",
    screenshotsLayout: "devices",
    screenshots: [
      { src: "/apps/jaugeai/capture-1-mac.webp", alt: "Le tableau de bord de JaugeAI sur un MacBook : historique et limites de ChatGPT", width: 1338, height: 880 },
      { src: "/apps/jaugeai/capture-2-iphone.webp", alt: "JaugeAI sur iPhone : la session Claude à 61 % et la prévision « Pleine vers 17 h 11 »", width: 431, height: 880 },
      { src: "/apps/jaugeai/capture-3-widgets.webp", alt: "Les widgets JaugeAI sur l'écran d'accueil de l'iPhone", width: 431, height: 880 },
      { src: "/apps/jaugeai/capture-4-watch.webp", alt: "JaugeAI sur Apple Watch : les anneaux de session et de semaine de Claude", width: 550, height: 880 },
    ],
    features: [
      {
        title: "Voir",
        text: "Vos limites dans la barre des menus, l'encoche, les widgets, sur l'iPhone et l'Apple Watch.",
      },
      {
        title: "Anticiper",
        text: "Une prévision à votre rythme (« Pleine vers 12 h 24 »), des alertes avant le blocage et la Dynamic Island.",
      },
      {
        title: "Comprendre",
        text: "La valeur de votre forfait au tarif de l'API, l'historique et des conseils chiffrés.",
      },
      {
        title: "Demander",
        text: "Siri, ChatGPT ou Claude à la voix, et vos agents de code prévenus avant une longue demande.",
      },
      {
        title: "Tous vos services",
        text: "Claude, ChatGPT et Gemini sur tous vos appareils, Grok sur le Mac.",
      },
    ],
    commitments: {
      title: "Lecture seule, sur votre Mac",
      points: [
        "Pour Claude, JaugeAI lit par défaut la ligne d'état de Claude Code, sans jeton. Un mode complet, en option, lit la session en lecture seule.",
        "Seuls les résultats (pourcentages, estimations, noms de projets) passent par votre iCloud privé. Aucun serveur entre vos appareils.",
        "L'usage des apps de chat (claude.ai, ChatGPT, Gemini) n'est pas suivi.",
        "Logiciel indépendant, non affilié à Anthropic, OpenAI ou Google.",
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

/** Apps dont l'assistance et la confidentialité sont hébergées sur paper34.fr. */
export function getHostedDocSlugs(): string[] {
  return APPS.filter((a) => !a.external && a.privacy && a.support).map((a) => a.slug);
}
