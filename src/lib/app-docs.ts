/**
 * Pages communes des applis sans site (règle APP-029 du kit apps) :
 * /apps/<slug>/assistance (formulaire « Écrire au développeur » + questions) et /apps/<slug>/confidentialite.
 * Un seul modèle (components/apps/AppDocView), habillé par `color` ; textes en français et en anglais, écrits par nous.
 * Les politiques décrivent ce que le code de chaque appli fait réellement (audit du 24/11/2026) : à relire à chaque
 * version qui touche aux données. Une appli qui a son site (JaugeAI, Ensemble) n'a rien ici.
 */
import { getApp } from "@/lib/apps";

export type Lang = "fr" | "en";
export type DocSection = { title: string; text: string };
type ByLang<T> = Record<Lang, T>;

export type DocApp = {
  slug: string;
  /** Clé de l'appli dans le service des retours (retours.paper34.fr). */
  feedbackKey: string;
  name: string;
  icon: string;
  /** Couleur de l'appli (tirée de son code) et couleur du texte posé dessus, contraste vérifié. */
  color: string;
  onColor: string;
  storeUrl?: string;
  /** L'appli a une page de présentation /apps/<slug>. */
  showcase: boolean;
  /** Pas encore annoncée : pages hors index et hors sitemap. */
  noindex?: boolean;
  phrase: ByLang<string>;
  support: ByLang<{ intro: string; questions: DocSection[] }>;
  privacy: { updated: ByLang<string> } & ByLang<{ intro: string; sections: DocSection[] }>;
};

/** Ce que devient un message écrit depuis la page d'assistance (même circuit pour toutes les applis). */
function webForm(lang: Lang): DocSection {
  return lang === "fr"
    ? {
        title: "Si vous m'écrivez depuis la page d'assistance",
        text: "Le formulaire envoie le type de message, votre texte, votre adresse e-mail si vous la donnez, le type de navigateur et d'appareil (par exemple « Safari, iPhone »), la langue du navigateur et la date. Votre adresse IP sert seulement à limiter les envois répétés : elle est remplacée par une empreinte, effacée au bout de deux jours. Le message est rangé dans un espace privé, m'arrive par e-mail et devient une fiche de suivi privée, chez les prestataires techniques qui hébergent ce service. Il est supprimé au bout de six mois. Votre adresse ne sert qu'à vous répondre. Pour faire effacer un message plus tôt, écrivez-le-moi depuis le même formulaire.",
      }
    : {
        title: "If you write to me from the support page",
        text: "The form sends the type of message, your text, your email address if you give it, the type of browser and device (for example \"Safari, iPhone\"), the browser language and the date. Your IP address is only used to limit repeated sending: it is replaced by a fingerprint and erased after two days. The message is kept in a private space, reaches me by email and becomes a private tracking ticket, with the technical providers that host this service. It is deleted after six months. Your address is only used to reply to you. To have a message erased sooner, ask me through the same form.",
      };
}

function rights(lang: Lang): DocSection {
  return lang === "fr"
    ? {
        title: "Vos droits",
        text: "Vous pouvez demander l'accès à un message que vous m'avez envoyé, sa correction ou sa suppression, et saisir la CNIL (cnil.fr) si vous estimez que vos données sont mal traitées.",
      }
    : {
        title: "Your rights",
        text: "You can ask to see, correct or delete a message you sent me, and complain to the French data protection authority, the CNIL (cnil.fr), if you think your data is mishandled.",
      };
}

const puppy = getApp("puppy-drop")!;
const watchroad = getApp("watchroad")!;

export const DOC_APPS: DocApp[] = [
  {
    slug: "puppy-drop",
    feedbackKey: "puppydrop",
    name: puppy.name,
    icon: puppy.icon,
    color: "#EF7D57",
    onColor: "#1A1C2C",
    storeUrl: puppy.storeUrl,
    showcase: true,
    phrase: {
      fr: "Fusionne des chiots, découvre 36 races. Sur iPhone, iPad et Apple Watch.",
      en: "Merge puppies, discover 36 breeds. On iPhone, iPad and Apple Watch.",
    },
    support: {
      fr: {
        intro: "Je lis chaque message et je réponds en général sous quelques jours. Pour un bug, dites-moi sur quel appareil il s'est produit.",
        questions: [
          { title: "Comment jouer ?", text: "Glisse le doigt pour viser, lâche pour faire tomber le chiot. Deux chiens identiques qui se touchent fusionnent en une race plus grande. Penche le téléphone pour faire rouler les chiens." },
          { title: "Qu'apporte la Version complète ?", text: "Le jeu gratuit contient toutes les meutes et toutes les races : les meutes s'enchaînent au fil de la partie. La Version complète, en achat unique, permet de choisir sa meute au début de chaque partie. Elle se partage avec la famille (partage familial d'Apple)." },
          { title: "J'ai acheté la Version complète et elle n'apparaît plus", text: "Ouvrez la pause, puis Réglages, Espace parents, « Restaurer mes achats », avec le compte Apple qui a fait l'achat ou un membre du partage familial." },
          { title: "Obtenir un remboursement", text: "Les achats sont gérés par Apple : la demande se fait sur reportaproblem.apple.com, avec le compte Apple qui a payé." },
          { title: "Ma progression n'est pas sur mon autre appareil", text: "La progression suit iCloud : vérifiez que les deux appareils utilisent le même compte Apple et qu'iCloud est activé." },
          { title: "Effacer la progression", text: "Dans l'espace parents : « Réinitialiser record et carnet »." },
        ],
      },
      en: {
        intro: "I read every message and usually reply within a few days. For a bug, tell me which device it happened on.",
        questions: [
          { title: "How do I play?", text: "Slide your finger to aim, let go to drop the puppy. When two identical dogs touch, they merge into a bigger breed. Tilt the phone to roll the dogs." },
          { title: "What does the Full Version add?", text: "The free game includes every pack and every breed: the packs follow one another as you play. The Full Version, a one-time purchase, lets you choose your pack at the start of each game. It is shared with your family (Apple Family Sharing)." },
          { title: "I bought the Full Version and it is gone", text: "The game is in French. Open the pause menu, then Réglages (Settings), Espace parents (Parents' area), \"Restaurer mes achats\" (Restore my purchases), with the Apple Account that made the purchase or a Family Sharing member." },
          { title: "Getting a refund", text: "Purchases are handled by Apple: ask on reportaproblem.apple.com with the Apple Account that paid." },
          { title: "My progress is not on my other device", text: "Progress follows iCloud: check that both devices use the same Apple Account and that iCloud is turned on." },
          { title: "Erasing progress", text: "In the Espace parents (Parents' area): \"Réinitialiser record et carnet\" (Reset best score and book)." },
        ],
      },
    },
    privacy: {
      updated: { fr: "24 novembre 2026", en: "24 November 2026" },
      fr: {
        intro: "Puppy Drop est un jeu pour toute la famille, édité par Benjamin Sanchez (Paper34). Le jeu ne collecte, ne transmet et ne vend aucune donnée personnelle. Seul un message que vous m'écrivez vous-même depuis la page d'assistance me parvient.",
        sections: [
          { title: "Rien n'est collecté par le jeu", text: "L'app ne contient ni publicité, ni outil de mesure d'audience, ni pistage, ni messagerie, ni lien vers l'extérieur. Elle ne se connecte à aucun de mes serveurs et il n'y a pas de compte Puppy Drop à créer." },
          { title: "Achat « Version complète »", text: "Le jeu est gratuit et propose un seul achat facultatif, protégé par un contrôle parental. Le paiement est entièrement traité par Apple (App Store) : je ne reçois ni nom, ni adresse, ni moyen de paiement. L'app demande seulement à l'App Store si l'achat a été fait sur ce compte Apple ou partagé par la famille, et garde cette réponse sur l'appareil." },
          { title: "Progression sur l'appareil et dans iCloud", text: "Le record, les races découvertes, les os gagnés, les décors choisis et les défis du jour sont enregistrés sur l'appareil et, si iCloud est activé, dans l'espace iCloud du compte Apple de l'appareil, pour retrouver la même progression sur les autres appareils de ce compte. Un numéro tiré au hasard distingue chaque appareil dans cette synchronisation ; ce n'est pas un identifiant de l'appareil. Ces informations restent chez Apple, dans ce compte : je n'y ai pas accès." },
          { title: "Entre l'iPhone et l'Apple Watch", text: "L'iPhone et la montre jumelée échangent directement le record, les races découvertes et l'accès à la Version complète. Rien ne passe par un serveur." },
          { title: "Game Center (facultatif)", text: "Game Center est désactivé par défaut. Un adulte peut l'activer dans l'espace parents, protégé par une question. Le jeu envoie alors à Game Center, le service d'Apple, le record, le nombre de races découvertes et les succès obtenus, pour les classements. Ces informations sont traitées par Apple selon sa propre politique de confidentialité : je n'y ai pas accès." },
          { title: "Enfants", text: "Le jeu est conçu pour les enfants et respecte les règles de la catégorie Enfants de l'App Store : le jeu ne collecte aucune donnée, et les réglages de partage sont réservés aux parents." },
          { title: "Effacer ses données", text: "Dans l'espace parents, « Réinitialiser record et carnet » efface le record et le carnet. Supprimer l'app efface les données de l'appareil. Les données iCloud se suppriment dans Réglages, votre nom, iCloud, Gérer le stockage." },
          webForm("fr"),
          rights("fr"),
        ],
      },
      en: {
        intro: "Puppy Drop is a family game published by Benjamin Sanchez (Paper34). The game does not collect, send or sell any personal data. Only a message you choose to write to me from the support page reaches me.",
        sections: [
          { title: "The game collects nothing", text: "The app has no ads, no analytics, no tracking, no messaging and no links to the outside. It does not connect to any server of mine and there is no Puppy Drop account to create." },
          { title: "\"Full Version\" purchase", text: "The game is free and offers a single optional purchase, protected by a parental gate. Payment is handled entirely by Apple (App Store): I receive no name, address or payment details. The app only asks the App Store whether the purchase was made on this Apple Account or shared by the family, and keeps that answer on the device." },
          { title: "Progress on the device and in iCloud", text: "The best score, discovered breeds, bones earned, chosen decorations and daily challenges are saved on the device and, if iCloud is on, in the iCloud space of the device's Apple Account, so the same progress appears on the account's other devices. A random number tells each device apart in this sync; it is not a device identifier. This information stays with Apple, in that account: I have no access to it." },
          { title: "Between iPhone and Apple Watch", text: "The iPhone and the paired watch exchange the best score, discovered breeds and Full Version access directly. Nothing goes through a server." },
          { title: "Game Center (optional)", text: "Game Center is off by default. An adult can turn it on in the Parents' area, protected by a question. The game then sends Game Center, Apple's service, the best score, the number of breeds discovered and the achievements earned, for the leaderboards. Apple processes this information under its own privacy policy: I have no access to it." },
          { title: "Children", text: "The game is designed for children and follows the rules of the App Store Kids category: the game collects no data, and sharing settings are for parents only." },
          { title: "Erasing your data", text: "In the Espace parents (Parents' area), \"Réinitialiser record et carnet\" erases the best score and the book. Deleting the app erases the data on the device. iCloud data is deleted in Settings, your name, iCloud, Manage Storage." },
          webForm("en"),
          rights("en"),
        ],
      },
    },
  },
  {
    slug: "watchroad",
    feedbackKey: "watchroad",
    name: watchroad.name,
    icon: watchroad.icon,
    color: "#FAC76E",
    onColor: "#1A1205",
    storeUrl: watchroad.storeUrl,
    showcase: true,
    phrase: {
      fr: "Trois minutes de route, des zombies sur le capot. Un jeu en 3D pour Apple Watch.",
      en: "Three minutes of road, zombies on the hood. A 3D game for Apple Watch.",
    },
    support: {
      fr: {
        intro: "Je lis chaque message et je réponds en général sous quelques jours. Pour un bug, indiquez le modèle de votre montre.",
        questions: [
          { title: "Comment jouer ?", text: "Tourne la Digital Crown ou glisse le doigt pour changer de voie. Quand un zombie s'accroche, frôle une épave de son côté pour l'arracher, ou touche l'écran pour lui tirer dessus. Le boost se lance avec le bouton éclair, en bas à droite." },
          { title: "Comment débloquer les véhicules et les armes ?", text: "Chaque partie rapporte de l'expérience. En montant en grade, de Recrue à Légende, s'ouvrent de nouveaux véhicules, armes, zones et ennemis. On les choisit dans la pause." },
          { title: "Le jeu ralentit ou la montre chauffe", text: "Fermez les autres apps ouvertes, puis relancez le jeu. Si le souci persiste, écrivez-moi en indiquant le modèle de votre montre." },
          { title: "Obtenir un remboursement", text: "L'achat est géré par Apple : la demande se fait sur reportaproblem.apple.com, avec le compte Apple qui a payé." },
          { title: "Effacer la progression", text: "Dans la pause, Réglages : « Réinitialiser les records »." },
        ],
      },
      en: {
        intro: "I read every message and usually reply within a few days. For a bug, tell me your watch model.",
        questions: [
          { title: "How do I play?", text: "Turn the Digital Crown or slide your finger to change lanes. When a zombie hangs on, brush past a wreck on its side to tear it off, or tap the screen to shoot it. The boost starts with the lightning button, bottom right." },
          { title: "How do I unlock vehicles and weapons?", text: "Every run earns experience. As you rank up, from Recruit to Legend, new vehicles, weapons, zones and enemies open. You pick them in the pause menu." },
          { title: "The game slows down or the watch gets warm", text: "Close the other open apps, then restart the game. If it keeps happening, write to me with your watch model." },
          { title: "Getting a refund", text: "The purchase is handled by Apple: ask on reportaproblem.apple.com with the Apple Account that paid." },
          { title: "Erasing progress", text: "The game is in French. In the pause menu, Réglages (Settings): \"Réinitialiser les records\" (Reset records)." },
        ],
      },
    },
    privacy: {
      updated: { fr: "24 novembre 2026", en: "24 November 2026" },
      fr: {
        intro: "WatchRoad est un jeu pour Apple Watch édité par Benjamin Sanchez (Paper34). Le jeu ne collecte, ne transmet et ne vend aucune donnée personnelle. Seul un message que vous m'écrivez vous-même depuis la page d'assistance me parvient.",
        sections: [
          { title: "Rien n'est collecté par le jeu", text: "Le jeu ne contient ni publicité, ni outil de mesure d'audience, ni pistage, ni connexion à un serveur. Il n'y a pas de compte WatchRoad à créer." },
          { title: "Ce qui reste sur la montre", text: "Les records, le grade, les réglages et un court historique des parties (date, durée, score) sont enregistrés uniquement sur la montre. Ils ne sont ni envoyés, ni synchronisés : je n'y ai pas accès." },
          { title: "Achat", text: "Le jeu s'achète une fois sur l'App Store. Le paiement est entièrement traité par Apple : je ne reçois ni nom, ni adresse, ni moyen de paiement. Il n'y a aucun achat dans le jeu." },
          { title: "Effacer ses données", text: "Dans la pause, Réglages, « Réinitialiser les records » efface les records et le grade. Supprimer l'app de la montre efface toutes ses données." },
          webForm("fr"),
          rights("fr"),
        ],
      },
      en: {
        intro: "WatchRoad is an Apple Watch game published by Benjamin Sanchez (Paper34). The game does not collect, send or sell any personal data. Only a message you choose to write to me from the support page reaches me.",
        sections: [
          { title: "The game collects nothing", text: "The game has no ads, no analytics, no tracking and no server connection. There is no WatchRoad account to create." },
          { title: "What stays on the watch", text: "Records, rank, settings and a short history of runs (date, duration, score) are saved only on the watch. They are neither sent nor synced: I have no access to them." },
          { title: "Purchase", text: "The game is bought once on the App Store. Payment is handled entirely by Apple: I receive no name, address or payment details. There are no in-game purchases." },
          { title: "Erasing your data", text: "In the pause menu, Réglages (Settings), \"Réinitialiser les records\" erases records and rank. Deleting the app from the watch erases all its data." },
          webForm("en"),
          rights("en"),
        ],
      },
    },
  },
  {
    slug: "jaugecloud",
    feedbackKey: "jaugecloud",
    name: "JaugeCloud",
    icon: "/apps/jaugecloud/icone.webp",
    color: "#299EFF",
    onColor: "#000000",
    showcase: false,
    noindex: true,
    phrase: {
      fr: "Voyez ce qu'iCloud Drive garde sur votre appareil, dossier par dossier, et libérez de la place.",
      en: "See what iCloud Drive keeps on your device, folder by folder, and free up space.",
    },
    support: {
      fr: {
        intro: "Je lis chaque message et je réponds en général sous quelques jours. Pour un bug, dites-moi sur quel appareil et quelle version du système il s'est produit.",
        questions: [
          { title: "Quel dossier l'app regarde-t-elle ?", text: "Celui que vous lui montrez au premier lancement, iCloud Drive par défaut. Elle n'en lit que les tailles, les dates et l'état de synchronisation, jamais le contenu des fichiers." },
          { title: "Est-ce que l'app supprime des fichiers ?", text: "Non. « Renvoyer dans le cloud » retire la copie de l'appareil et la laisse dans iCloud Drive ; « Télécharger » la remet sur l'appareil. Rien n'est effacé." },
          { title: "J'ai acheté la version Pro et elle n'apparaît plus", text: "Utilisez « Restaurer mes achats » dans l'app, avec le compte Apple qui a fait l'achat." },
          { title: "Obtenir un remboursement", text: "Les achats sont gérés par Apple : la demande se fait sur reportaproblem.apple.com, avec le compte Apple qui a payé." },
        ],
      },
      en: {
        intro: "I read every message and usually reply within a few days. For a bug, tell me which device and system version it happened on.",
        questions: [
          { title: "Which folder does the app look at?", text: "The one you show it at first launch, iCloud Drive by default. It only reads sizes, dates and sync status, never what is inside the files." },
          { title: "Does the app delete files?", text: "No. \"Send Back to Cloud\" removes the copy from the device and leaves it in iCloud Drive; \"Download\" puts it back on the device. Nothing is erased." },
          { title: "I bought Pro and it is gone", text: "Use \"Restore Purchases\" in the app, with the Apple Account that made the purchase." },
          { title: "Getting a refund", text: "Purchases are handled by Apple: ask on reportaproblem.apple.com with the Apple Account that paid." },
        ],
      },
    },
    privacy: {
      updated: { fr: "24 novembre 2026", en: "24 November 2026" },
      fr: {
        intro: "JaugeCloud est une app pour Mac, iPhone, iPad et Apple Watch éditée par Benjamin Sanchez (Paper34). Elle ne collecte, ne transmet et ne vend aucune donnée personnelle : tout reste sur vos appareils et dans votre propre iCloud. Seul un message que vous m'écrivez vous-même depuis la page d'assistance me parvient.",
        sections: [
          { title: "Rien n'est collecté par l'app", text: "L'app ne contient ni publicité, ni outil de mesure d'audience, ni pistage. Elle ne se connecte à aucun de mes serveurs et il n'y a pas de compte à créer." },
          { title: "Ce que l'app lit", text: "Uniquement le dossier que vous choisissez, iCloud Drive par défaut : la taille des éléments, leur état dans iCloud (sur l'appareil ou dans le nuage), leurs dates de modification et de dernière ouverture, et leurs tags Finder. Jamais le contenu des fichiers. Sur Mac, si vous l'autorisez, elle mesure aussi l'espace occupé par les grands dossiers du disque et lit l'espace iCloud restant." },
          { title: "Ce qui reste sur l'appareil", text: "Le dernier relevé (arborescence, chemins et tailles), l'historique des actions et vos règles automatiques sont enregistrés sur l'appareil, dans l'espace de l'app." },
          { title: "Entre vos appareils, par votre iCloud", text: "Pour afficher vos appareils côte à côte, chacun dépose dans l'espace iCloud de votre compte Apple : son nom, son espace disque utilisé et libre, la part occupée par iCloud Drive, ses plus gros dossiers (chemin et taille, 40 au plus) et les actions que vous lancez d'un appareil vers un autre. Un numéro tiré au hasard distingue chaque appareil. Ces informations restent chez Apple, dans votre compte : je n'y ai pas accès." },
          { title: "Notifications", text: "Une alerte d'espace disque, créée sur l'appareil, si vous l'activez dans les règles. Aucune notification ne vient d'un serveur." },
          { title: "Achat", text: "La version Pro est un achat unique traité entièrement par Apple (App Store) : je ne reçois ni nom, ni adresse, ni moyen de paiement. L'app garde seulement sur l'appareil le fait que l'achat a été fait." },
          { title: "Effacer ses données", text: "Supprimer l'app efface ses données sur l'appareil. Les données synchronisées se suppriment dans Réglages, votre nom, iCloud, Gérer le stockage." },
          webForm("fr"),
          rights("fr"),
        ],
      },
      en: {
        intro: "JaugeCloud is an app for Mac, iPhone, iPad and Apple Watch published by Benjamin Sanchez (Paper34). It does not collect, send or sell any personal data: everything stays on your devices and in your own iCloud. Only a message you choose to write to me from the support page reaches me.",
        sections: [
          { title: "The app collects nothing", text: "The app has no ads, no analytics and no tracking. It does not connect to any server of mine and there is no account to create." },
          { title: "What the app reads", text: "Only the folder you choose, iCloud Drive by default: item sizes, their iCloud status (on the device or in the cloud), their modification and last-opened dates, and their Finder tags. Never what is inside the files. On Mac, if you allow it, it also measures the space used by the disk's large folders and reads the remaining iCloud storage." },
          { title: "What stays on the device", text: "The latest scan (folder tree, paths and sizes), the activity history and your automatic rules are saved on the device, in the app's own space." },
          { title: "Between your devices, through your iCloud", text: "To show your devices side by side, each one places in the iCloud space of your Apple Account: its name, its used and free disk space, the share taken by iCloud Drive, its largest folders (path and size, 40 at most) and the actions you send from one device to another. A random number tells each device apart. This information stays with Apple, in your account: I have no access to it." },
          { title: "Notifications", text: "A disk space alert, created on the device, if you turn it on in the rules. No notification comes from a server." },
          { title: "Purchase", text: "Pro is a one-time purchase handled entirely by Apple (App Store): I receive no name, address or payment details. The app only keeps on the device the fact that the purchase was made." },
          { title: "Erasing your data", text: "Deleting the app erases its data on the device. Synced data is deleted in Settings, your name, iCloud, Manage Storage." },
          webForm("en"),
          rights("en"),
        ],
      },
    },
  },
];

export function getDocApp(slug: string): DocApp | undefined {
  return DOC_APPS.find((a) => a.slug === slug);
}

/** Toutes les pages communes (générées). */
export function getDocSlugs(): string[] {
  return DOC_APPS.map((a) => a.slug);
}

/** Pages communes à mettre dans le sitemap (appli annoncée). */
export function getIndexedDocSlugs(): string[] {
  return DOC_APPS.filter((a) => !a.noindex).map((a) => a.slug);
}
