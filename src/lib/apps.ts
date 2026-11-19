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
  /** Ce que l'app montre du savoir-faire, pour la page /apps (référence pour les clients). */
  showcase: string;
  /** Visuel de la carte sur /apps (une des captures). */
  cover: { src: string; width: number; height: number };
  /** Catégorie schema.org (données structurées). */
  category: "GameApplication" | "UtilitiesApplication" | "LifestyleApplication";
  /** Lien App Store une fois l'app publiée ; sans lien, la page indique « Bientôt ». */
  storeUrl?: string;
  /** App Mac distribuée hors Mac App Store : lien de téléchargement, en second bouton. */
  macDownloadUrl?: string;
  /** Site propre de l'app : ses pages d'aide et de confidentialité y restent (URL déjà déclarées). */
  external?: { site: string; support: string; privacy: string };
  price: string;
  /** Prix en euros pour les données structurées (« 0 » par défaut, app gratuite). */
  offerPrice?: string;
  /** Forme des captures en grille : écran d'iPhone (par défaut) ou d'Apple Watch. */
  screenshotShape?: "phone" | "watch";
  icon: string;
  /** Image de partage 1200 x 630 (aperçu des liens dans les messages et réseaux). Sans elle : l'icône. */
  ogImage?: string;
  /** Vidéo d'aperçu, placée avant les captures. 600 x 1300 par défaut (aperçu App Store d'iPhone). */
  preview?: { src: string; poster: string; width?: number; height?: number };
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
/** Capture d'Apple Watch Ultra placée dans le cadre officiel d'Apple (600 x 960). */
const WATCH_FRAMED = { width: 600, height: 960 };

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
    showcase:
      "Un univers entièrement illustré : 36 races de chiens dessinées, un carnet à remplir, des animations qui donnent envie de rejouer. Un jeu pour les familles, sans publicité, sur l'iPhone, l'iPad et l'Apple Watch.",
    cover: { src: "/apps/puppy-drop/capture-2-decouverte.webp", width: 598, height: 1300 },
    storeUrl: "https://apps.apple.com/app/id6827112736",
    price: "Gratuit, avec un achat unique facultatif",
    icon: "/apps/puppy-drop/icone.webp",
    ogImage: "/apps/puppy-drop/partage.jpg",
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
    showcase:
      "Un outil sobre, en aplats noirs et blancs : le Mac relève les données, l'iPhone et l'Apple Watch les rendent lisibles d'un coup d'œil. Widgets, Dynamic Island, Siri et une vente directe en plus de l'App Store.",
    cover: { src: "/apps/jaugeai/capture-1-mac.webp", width: 1338, height: 880 },
    storeUrl: "https://apps.apple.com/app/id6814973861?ct=paper34",
    macDownloadUrl: "https://jaugeai.com/fr/telecharger",
    external: {
      site: "https://jaugeai.com/fr",
      support: "https://jaugeai.com/fr/support",
      privacy: "https://jaugeai.com/fr/privacy",
    },
    price: "Gratuit. JaugeAI Pro : 9,99 € en achat unique, valable sur tous vos appareils",
    icon: "/apps/jaugeai/icone.webp",
    ogImage: "/apps/jaugeai/partage.png",
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
  {
    slug: "watchroad",
    name: "WatchRoad",
    kind: "Jeu Apple Watch",
    tagline: "Trois minutes de route, des zombies sur le capot.",
    intro:
      "Un pick-up, une route du désert et des zombies qui sautent sur la carrosserie. Pour t'en débarrasser, frôle les épaves du bon côté ou tire au doigt. Un vrai jeu en 3D, pensé pour l'écran de la montre et des parties de trois minutes.",
    platforms: "Apple Watch",
    devices: ["watch"],
    category: "GameApplication",
    showcase:
      "Un vrai jeu en 3D sur l'écran de la montre : quatre zones qui ont chacune leur lumière, la conduite à la Digital Crown et des parties de trois minutes taillées pour le poignet. Payé une fois, sans publicité ni donnée collectée.",
    cover: { src: "/apps/watchroad/montre-1-portes.webp", width: 600, height: 960 },
    price: "2,99 €, sans achat intégré ni publicité",
    offerPrice: "2.99",
    screenshotsLayout: "devices",
    icon: "/apps/watchroad/icone.webp",
    ogImage: "/apps/watchroad/partage.png",
    preview: {
      src: "https://pub-054d5e4ec36144bea38e07a1452fe2b0.r2.dev/apps/watchroad/apercu.mp4",
      poster: "/apps/watchroad/apercu-affiche.webp",
      width: 720,
      height: 900,
    },
    screenshots: [
      { src: "/apps/watchroad/montre-1-portes.webp", alt: "Deux zombies accrochés au pick-up, avant deux portes de bonus : réparation ou munitions", ...WATCH_FRAMED },
      { src: "/apps/watchroad/montre-2-crepuscule.webp", alt: "La route du désert au crépuscule, un zombie sur le flanc du pick-up", ...WATCH_FRAMED },
      { src: "/apps/watchroad/montre-3-ville.webp", alt: "Le camion dans la rue étroite de la ville en ruine, près d'un bus renversé", ...WATCH_FRAMED },
      { src: "/apps/watchroad/montre-4-arrivee.webp", alt: "L'écran d'arrivée : score, médaille et bonus de coque", ...WATCH_FRAMED },
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
          text: "Les records, le grade, les réglages et un court historique des parties (date, durée, score) sont enregistrés uniquement sur la montre. Ils ne sont ni envoyés, ni synchronisés : je n'y ai pas accès.",
        },
        {
          title: "Achat",
          text: "Le jeu s'achète une fois sur l'App Store. Le paiement est entièrement traité par Apple : je ne reçois ni nom, ni adresse, ni moyen de paiement. Il n'y a aucun achat dans le jeu.",
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
  {
    slug: "ensemble",
    name: "Ensemble",
    kind: "App iPhone et iPad, avec widgets",
    tagline: "Le nombre de jours que vous passez ensemble, en grand.",
    intro:
      "Ensemble compte les jours depuis votre premier jour. Un grand chiffre, une ligne, la date. Rien d'autre. Pour un couple, deux amies, une grand-mère et son petit-fils, ou un bébé qui vient d'arriver : chacun son chiffre, sans compte à créer et sans publicité.",
    platforms: "iPhone et iPad",
    devices: ["iphone", "ipad"],
    category: "LifestyleApplication",
    showcase:
      "Une app Apple native menée de bout en bout : l'interface où le chiffre est le héros, les widgets de l'écran d'accueil et de l'écran verrouillé, le partage à deux par iCloud sans serveur, les achats intégrés, et un site qui se met à jour depuis le code de l'app.",
    cover: { src: "/apps/ensemble/iphone-1-compteur.webp", width: 431, height: 880 },
    external: {
      site: "https://ensembledays.app/",
      support: "https://ensembledays.app/assistance/",
      privacy: "https://ensembledays.app/confidentialite/",
    },
    price: "Gratuit. Ensemble Pro : 1,99 € par mois, 9,99 € par an ou 19,99 € à vie",
    icon: "/apps/ensemble/icone.webp",
    ogImage: "/apps/ensemble/partage.jpg",
    screenshotsLayout: "devices",
    screenshots: [
      { src: "/apps/ensemble/iphone-1-compteur.webp", alt: "L'accueil d'Ensemble : 1 249 jours ensemble, en grand, et la ligne de vie", width: 431, height: 880 },
      { src: "/apps/ensemble/iphone-2-widgets.webp", alt: "Les widgets d'Ensemble : petit, StandBy, moyen et grand", width: 431, height: 880 },
      { src: "/apps/ensemble/iphone-3-ecran-verrouille.webp", alt: "Les widgets de l'écran verrouillé et l'activité en direct du jour J", width: 431, height: 880 },
      { src: "/apps/ensemble/iphone-4-cadeau.webp", alt: "La carte cadeau d'Ensemble, à ouvrir le 14 février", width: 431, height: 880 },
    ],
    features: [
      {
        title: "Partout",
        text: "Widgets petit, moyen et grand sur l'écran d'accueil, cercle, rectangle et ligne sur l'écran verrouillé, StandBy sur la table de nuit. Le widget est gratuit, sans publicité.",
      },
      {
        title: "À deux",
        text: "Avec Pro, le même compteur sur vos deux iPhone, par iCloud, sans compte à créer.",
      },
      {
        title: "La carte cadeau",
        text: "L'invitation part par Messages comme une carte, et le chiffre se dévoile le jour que vous choisissez, le 14 février par exemple.",
      },
      {
        title: "Votre ligne de vie",
        text: "La rencontre, le premier restaurant, l'emménagement, le mariage, un enfant, les voyages. Chaque moment avec son « il y a 847 jours » ; une date à venir compte à rebours.",
      },
      {
        title: "Les jours qui comptent",
        text: "100 jours, 500 jours, 1 000 jours, chaque anniversaire. Une notification le matin même, jamais plus.",
      },
      {
        title: "Vos couleurs",
        text: "Huit thèmes, ou votre photo. Le chiffre reste lisible, toujours.",
      },
    ],
    commitments: {
      title: "Vos dates restent chez vous",
      points: [
        "Aucune donnée collectée. Vos dates et votre photo restent sur votre iPhone et dans votre iCloud, chez Apple.",
        "Aucun serveur, aucun compte, aucun traceur, aucune publicité, aucune demande de note insistante.",
        "La photo passe par le sélecteur d'Apple : l'app n'accède pas à votre photothèque.",
        "Un seul achat pour deux : le Pro de celui qui partage s'applique au compteur partagé.",
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
/** Image de partage d'une app (1200 x 630), ou son icône à défaut. */
export function appOgImages(app: AppInfo) {
  return app.ogImage
    ? [{ url: app.ogImage, width: 1200, height: 630, alt: `${app.name} : ${app.tagline}` }]
    : [{ url: app.icon }];
}

export function getHostedDocSlugs(): string[] {
  return APPS.filter((a) => !a.external && a.privacy && a.support).map((a) => a.slug);
}
