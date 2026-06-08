/**
 * Lecture des galeries photo clients — SERVEUR UNIQUEMENT (fs/path).
 *
 * Les manifests sont générés par `scripts/build-gallery.mjs` dans
 * public/galeries/<slug>/manifest.json. La lecture se fait au BUILD
 * (generateStaticParams + page statique) → HTML 100 % statique, les
 * images servies comme fichiers statiques depuis public/.
 *
 * Les utilitaires partagés client/serveur (assetUrl, formatBytes, types)
 * sont dans gallery-shared.ts.
 */

import { readdirSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import type { Gallery } from "./gallery-shared";

export type { Gallery, GalleryPhoto } from "./gallery-shared";

const GALLERIES_DIR = join(process.cwd(), "public", "galeries");

/** Liste tous les slugs de galeries disponibles (au build). */
export function getGallerySlugs(): string[] {
  if (!existsSync(GALLERIES_DIR)) return [];
  return readdirSync(GALLERIES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .filter((d) => existsSync(join(GALLERIES_DIR, d.name, "manifest.json")))
    .map((d) => d.name);
}

/** Charge un manifest de galerie. Null si introuvable. */
export function getGallery(slug: string): Gallery | null {
  const file = join(GALLERIES_DIR, slug, "manifest.json");
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, "utf-8")) as Gallery;
  } catch {
    return null;
  }
}
