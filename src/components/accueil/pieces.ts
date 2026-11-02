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
  /** Illustration provisoire (Labo) : vraie photo ou vidéo de Benjamin, en attendant la pièce choisie */
  media?: { type: "image" | "video"; src: string; poster?: string; credit: string };
};

const R2 = "https://pub-054d5e4ec36144bea38e07a1452fe2b0.r2.dev";
const g = (path: string) => `${R2}/galeries/${path}`;

export const PIECES: Piece[] = [
  { id: "P1", section: "Hero", kind: "Film", sujet: "8 à 10 s de tes tournages enchaînés (Chiringuito, Megakart, Guinguette…), sans son, en boucle", ratio: "16 / 9", format: "16:9 ordinateur + 4:5 téléphone, MP4 léger + image d'affiche", source: "Rushs des galeries d'événements, teaser 12 h Megakart, motion du site Megakart", media: { type: "video", src: `${R2}/site/hero-home.mp4`, poster: g("chiringuito-opening/display/A7V-113.jpg"), credit: "Vidéo du hero actuel de paper34.fr" } },
  { id: "P2", section: "Index · Chiringuito", kind: "Photo", sujet: "Une soirée au Chiringuito, foule et lumière", ratio: "4 / 5", format: "4:5", source: "Galeries chiringuito-opening, -coachella, -closing", media: { type: "image", src: g("chiringuito-coachella/display/A7507758-DxO_DeepPRIME%20XD3.jpg"), credit: "Le Chiringuito, soirée Coachella" } },
  { id: "P3", section: "Index · La Guinguette", kind: "Vidéo", sujet: "Un reel de la Guinguette qui a tourné", ratio: "9 / 16", format: "9:16, 6 à 10 s, sans son", source: "Reel de la Saint-Laurent, reels Instagram", media: { type: "video", src: g("guinguette-st-laurent/video/reel-st-laurent.mp4"), poster: g("guinguette-st-laurent/display/reel-st-laurent.jpg"), credit: "La Guinguette, reel de la Saint-Laurent" } },
  { id: "P5", section: "Index · Megakart", kind: "Photo", sujet: "Megakart en course, la photo la plus forte", ratio: "3 / 2", format: "3:2", source: "Galeries megakart-100-tours, -bricocash, -course-enfants", media: { type: "image", src: g("megakart-bricocash/display/A7V19%20-%20HDR.jpg"), credit: "Megakart, course Bricocash" } },
  { id: "P6", section: "Index · Fabrikus World", kind: "Photo", sujet: "Fabrikus World, une attraction en action", ratio: "4 / 5", format: "4:5", source: "Galeries fabrikus-world, fabrikus-vias-court-en-rose", media: { type: "image", src: g("fabrikus-world/display/affiche-2m2.jpg"), credit: "Fabrikus World, affiche 2 m²" } },
  { id: "P7", section: "Index · Midi Cap Thau", kind: "Photo", sujet: "Une sortie en mer, Midi Cap Thau", ratio: "3 / 2", format: "3:2", source: "Galerie midicapthau-en-mer", media: { type: "image", src: g("midicapthau-en-mer/display/A7V-1.jpg"), credit: "Midi Cap Thau, en mer" } },
  { id: "P8", section: "Cas Megakart", kind: "Planche", sujet: "Une course déclinée : visuel, post, événement Facebook, page d'inscription, e-mail", ratio: "16 / 10", format: "16:10, captures réelles côte à côte", source: "Dossier MEGAKART (VISUELS, ADS, web)", media: { type: "image", src: `${R2}/site/realisations/megakart.jpg`, credit: "Megakart, capture du site" } },
  { id: "P9", section: "Cas O Soleil", kind: "Capture", sujet: "Le site sur téléphone, à côté de la fiche Google", ratio: "4 / 5", format: "4:5", source: "osoleil-marseillan.fr + fiche Google", media: { type: "image", src: `${R2}/site/realisations/o-soleil.jpg`, credit: "O Soleil, capture du site" } },
  { id: "P10", section: "Cas Chiringuito", kind: "Planche", sujet: "Les supports d'une soirée : menu, billetterie, éventail, post, photo", ratio: "3 / 2", format: "3:2, photo à plat ou montage", source: "Dossier CHIRINGUITO (MENUCOACHELLA, BILLETTERIE, EVENTAIL, MOCKUP)", media: { type: "image", src: g("chiringuito-opening/display/A7V-113.jpg"), credit: "Le Chiringuito, Opening" } },
  { id: "P11", section: "Benjamin", kind: "Portrait", sujet: "Toi au travail : en shooting, pendant un événement ou avec un client", ratio: "4 / 5", format: "4:5", source: "À faire prendre par un tiers lors d'un tournage", media: { type: "image", src: g("chiringuito-closing/display/A7V1.jpg"), credit: "Illustration : en attendant ton portrait" } },
  { id: "P12", section: "Benjamin", kind: "Témoignage", sujet: "Un client filmé chez lui, 20 s : pourquoi il travaille avec toi", ratio: "4 / 5", format: "4:5, sous-titré, sans son par défaut", source: "À tourner (Megakart ou Chiringuito)", media: { type: "video", src: g("actah-associes/video/film-cabinet.mp4"), poster: g("actah-associes/display/film-cabinet.jpg"), credit: "Illustration : film du cabinet Actah, en attendant un témoignage" } },
];

export const piece = (id: string) => {
  const found = PIECES.find((p) => p.id === id);
  if (!found) throw new Error(`Pièce inconnue : ${id}`);
  return found;
};
