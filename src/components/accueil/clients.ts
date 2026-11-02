/**
 * Index des réalisations (grammaire « galerie légendée », choisie par Benjamin le 02/11/2026).
 * Règle de la grammaire : le MÊME schéma de légende pour chaque objet (n°, client, lieu, ce que j'ai fait).
 * Faits uniquement : tirés des dossiers clients, des galeries et du récit de Benjamin (02/11/2026).
 * Les trois cas racontent comment la collaboration a grandi (textes provisoires, à valider avec chaque client).
 */
export type Client = {
  n: string;
  id: string;
  nom: string;
  lieu: string;
  /** Ce que Benjamin fait pour ce client : la légende qui montre l'étendue sans catalogue */
  fait: string[];
  /** Pièces affichées (voir pieces.ts) : la première est l'image de l'index */
  pieces: string[];
  /** Cas : comment la collaboration a grandi */
  cas?: { etapes: string[]; aujourdhui: string; note: string };
};

export const CLIENTS: Client[] = [
  {
    n: "01", id: "chiringuito", nom: "Le Chiringuito", lieu: "Plage, Vias",
    fait: ["Photo", "Vidéo", "Réseaux sociaux", "Menus", "Affiches et print", "E-mailing", "Objets personnalisés"],
    pieces: ["P2", "P10"],
    cas: {
      etapes: ["Les photos et les vidéos des soirées.", "La gestion des réseaux sociaux.", "Les menus, les affiches, les supports imprimés et les e-mailings.", "Les objets personnalisés : t-shirts, éventails, sous-bocks."],
      aujourdhui: "Je suis presque intégré à l’équipe, comme un responsable de communication externalisé.",
      note: "Texte provisoire, à valider avec le Chiringuito.",
    },
  },
  {
    n: "02", id: "megakart", nom: "Megakart", lieu: "Karting, Vias-Plage",
    fait: ["Photo", "Vidéo", "Réseaux sociaux", "Site internet", "Suivi mensuel", "Annuaires en ligne", "E-mailing", "Affichage"],
    pieces: ["P5", "P8"],
    cas: {
      etapes: ["Tout a commencé par des photos et des vidéos pour les réseaux.", "J’ai ensuite pris en charge Instagram, Facebook et TikTok.", "Les contenus étaient vus, mais le site convertissait mal sur téléphone : j’en ai fait un nouveau, avec un suivi mensuel.", "Je gère aussi sa présence sur les annuaires et les plateformes en ligne."],
      aujourdhui: "Pour une course, une date suffit. Je fais le visuel, l’événement Facebook, les publications Instagram et TikTok, le formulaire d’inscription et l’e-mail aux anciens participants.",
      note: "Texte provisoire, à valider avec Megakart.",
    },
  },
  {
    n: "03", id: "guinguette", nom: "La Guinguette", lieu: "Guinguette, Bessan",
    fait: ["Photo", "Vidéo", "Site internet"],
    pieces: ["P3"],
  },
  {
    n: "04", id: "fabrikus", nom: "Fabrikus World", lieu: "Parc de loisirs, Vias",
    fait: ["Film publicitaire", "Affichage grand format", "Contenus"],
    pieces: ["P6"],
  },
  {
    n: "05", id: "o-soleil", nom: "O Soleil", lieu: "Restaurant, Marseillan",
    fait: ["Site internet", "Graphisme"],
    pieces: ["P9"],
    cas: {
      etapes: ["Une demande ponctuelle : la création du site.", "Six mois plus tard, le restaurant revient pour des retouches graphiques.", "Puis vient la question des avis Google."],
      aujourdhui: "Nous parlons maintenant d’un suivi mensuel : avis, fiche Google, horaires, maintenance et optimisation du site. Sans jamais avoir forcé la suite.",
      note: "Texte provisoire, à valider avec le client (orthographe du nom à confirmer).",
    },
  },
  {
    n: "06", id: "midi-cap-thau", nom: "Midi Cap Thau", lieu: "Sortie en mer",
    fait: ["Photo"],
    pieces: ["P7"],
  },
];
