/**
 * Pièces attendues sur l'accueil (Labo, 02/11/2026, approche B validée par Benjamin).
 * Chaque emplacement de la page décrit la pièce réelle à fournir : la page sert de liste de courses.
 * Une seule source : l'accueil et la liste « Pièces à fournir » lisent ce tableau.
 */
export type Piece = {
  id: string;
  /** Nature de la pièce */
  kind: "Film" | "Photo" | "Vidéo" | "Planche" | "Capture" | "Portrait" | "Témoignage";
  /** Ce qu'on doit y voir */
  sujet: string;
  /** Format affiché à l'écran (CSS aspect-ratio) */
  ratio: string;
  /** Format lisible pour Benjamin */
  format: string;
  /** Où la pièce existe peut-être déjà */
  source: string;
  /** Section de la page */
  section: string;
};

export const PIECES: Piece[] = [
  { id: "P1", section: "Hero", kind: "Film", sujet: "8 à 10 s de tes tournages enchaînés (Chiringuito, Megakart, Guinguette…), sans son, en boucle", ratio: "16 / 9", format: "16:9 ordinateur + 4:5 téléphone, MP4 léger + image d'affiche", source: "Rushs des galeries d'événements, teaser 12 h Megakart, motion du site Megakart" },
  { id: "P2", section: "Déjà vues", kind: "Photo", sujet: "Une soirée au Chiringuito, foule et lumière", ratio: "4 / 5", format: "4:5", source: "Galeries chiringuito-opening, -coachella, -closing" },
  { id: "P3", section: "Déjà vues", kind: "Vidéo", sujet: "Megakart en course, un reel qui a tourné", ratio: "9 / 16", format: "9:16, 6 à 10 s, sans son", source: "Teaser 12 h, reels Instagram Megakart" },
  { id: "P4", section: "Déjà vues", kind: "Photo", sujet: "Un plat ou une salle de restaurant", ratio: "1 / 1", format: "1:1", source: "O Soleil, Le Dix9, La Bohème (selon accord)" },
  { id: "P5", section: "Déjà vues", kind: "Photo", sujet: "Une scène de la Guinguette", ratio: "3 / 2", format: "3:2", source: "Galerie guinguette-st-laurent" },
  { id: "P6", section: "Déjà vues", kind: "Photo", sujet: "Fabrikus World, une attraction en action", ratio: "4 / 5", format: "4:5", source: "Galeries fabrikus-world, fabrikus-vias-court-en-rose" },
  { id: "P7", section: "Déjà vues", kind: "Photo", sujet: "Une sortie en mer, Midi Cap Thau", ratio: "3 / 2", format: "3:2", source: "Galerie midicapthau-en-mer" },
  { id: "P8", section: "Cas Megakart", kind: "Planche", sujet: "Une course déclinée : visuel, post, événement Facebook, page d'inscription, e-mail", ratio: "16 / 10", format: "16:10, captures réelles côte à côte", source: "Dossier MEGAKART (VISUELS, ADS, web)" },
  { id: "P9", section: "Cas O Soleil", kind: "Capture", sujet: "Le site sur téléphone, à côté de la fiche Google", ratio: "4 / 5", format: "4:5", source: "osoleil-marseillan.fr + fiche Google" },
  { id: "P10", section: "Cas Chiringuito", kind: "Planche", sujet: "Les supports d'une soirée : menu, billetterie, éventail, post, photo", ratio: "3 / 2", format: "3:2, photo à plat ou montage", source: "Dossier CHIRINGUITO (MENUCOACHELLA, BILLETTERIE, EVENTAIL, MOCKUP)" },
  { id: "P11", section: "Benjamin", kind: "Portrait", sujet: "Toi au travail : en shooting, pendant un événement ou avec un client", ratio: "4 / 5", format: "4:5", source: "À faire prendre par un tiers lors d'un tournage" },
  { id: "P12", section: "Benjamin", kind: "Témoignage", sujet: "Un client filmé chez lui, 20 s : pourquoi il travaille avec toi", ratio: "4 / 5", format: "4:5, sous-titré, sans son par défaut", source: "À tourner (Megakart ou Chiringuito)" },
];

export const piece = (id: string) => {
  const found = PIECES.find((p) => p.id === id);
  if (!found) throw new Error(`Pièce inconnue : ${id}`);
  return found;
};
