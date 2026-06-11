/**
 * Utilitaires et types de galerie SANS dépendance Node (fs/path).
 * Importable côté client ET serveur. La lecture des manifests (fs) vit
 * dans galleries.ts (serveur uniquement).
 */

export type GalleryPhoto = {
  id: string;
  /** Vignette légère pour la grille (URL R2 ou chemin relatif) */
  thumb?: string;
  /** Chemin relatif (depuis /galeries/<slug>/) du JPEG d'affichage */
  display: string;
  /** Chemin relatif de l'original intact (téléchargement) */
  original: string;
  /** Nom de fichier exact pour le téléchargement */
  downloadName: string;
  width: number;
  height: number;
  originalBytes: number;
  originalExt: string;
};

export type Gallery = {
  slug: string;
  title: string;
  client: string;
  date: string;
  count: number;
  totalOriginalBytes: number;
  /** Texte d'intro personnalisé (avec retours ligne et @mentions). Optionnel. */
  intro?: string;
  photos: GalleryPhoto[];
};

/** Préfixe URL public d'une galerie. */
export function galleryBase(slug: string): string {
  return `/galeries/${slug}`;
}

/** URL d'un asset. Renvoie tel quel si c'est déjà une URL absolue (Blob),
 *  sinon préfixe par le chemin public local et encode les espaces. */
export function assetUrl(slug: string, pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  // encodeURI préserve les "/" mais encode les espaces → %20
  return encodeURI(`${galleryBase(slug)}/${pathOrUrl}`);
}

/** Formatte une taille d'octets en Ko/Mo lisible. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}
