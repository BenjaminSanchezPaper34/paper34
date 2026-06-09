/**
 * reorder-gallery.mjs — Réordonne le manifest d'une galerie par DATE DE PRISE
 * DE VUE (EXIF), sans re-traiter ni re-uploader les images (déjà sur Blob).
 *
 * Lit la date de capture de chaque source via `mdls` (Spotlight macOS lit
 * kMDItemContentCreationDate = EXIF DateTimeOriginal), puis trie les entrées
 * du manifest en conséquence. Fallback : numéro dans le nom de fichier.
 *
 * Usage : node scripts/reorder-gallery.mjs
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { execFileSync } from "child_process";
import { join, extname } from "path";

const GALLERIES = [
  {
    slug: "chiringuito-opening",
    src: "Partage photos/CHIRINGUITO - VIAS/1-06I06I26-OPENING",
  },
];

const SOURCE_EXT = new Set([".heic", ".heif", ".jpg", ".jpeg", ".png", ".tif", ".tiff"]);

/** Date de prise de vue d'un fichier (ISO triable) ou "" si introuvable. */
function captureDate(path) {
  try {
    const out = execFileSync(
      "mdls",
      ["-raw", "-name", "kMDItemContentCreationDate", path],
      { encoding: "utf8" }
    ).trim();
    return out === "(null)" ? "" : out; // "2026-06-06 16:24:30 +0000"
  } catch {
    return "";
  }
}

/** Premier nombre trouvé dans un nom (pour départager les ex-aequo). */
function numIn(name) {
  const m = name.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

for (const g of GALLERIES) {
  const manifestPath = join("public", "galeries", g.slug, "manifest.json");
  if (!existsSync(manifestPath)) {
    console.warn(`⚠️  Pas de manifest pour ${g.slug}`);
    continue;
  }

  // Map nom de fichier → date de capture
  const files = readdirSync(g.src).filter((f) =>
    SOURCE_EXT.has(extname(f).toLowerCase())
  );
  const dates = {};
  for (const f of files) dates[f] = captureDate(join(g.src, f));

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const before = manifest.photos.map((p) => p.downloadName);

  manifest.photos.sort((a, b) => {
    const da = dates[a.downloadName] || "";
    const db = dates[b.downloadName] || "";
    if (da && db && da !== db) return da < db ? -1 : 1;
    if (da && !db) return -1;
    if (!da && db) return 1;
    return numIn(a.downloadName) - numIn(b.downloadName); // fallback
  });

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  const after = manifest.photos.map((p) => p.downloadName);
  const changed = before.some((n, i) => n !== after[i]);
  console.log(
    `✅ ${g.slug} : ${manifest.photos.length} photos réordonnées par prise de vue${
      changed ? "" : " (déjà dans l'ordre)"
    }`
  );
  console.log(
    `   1re: ${after[0]} (${dates[after[0]] || "?"})  ·  dernière: ${
      after[after.length - 1]
    } (${dates[after[after.length - 1]] || "?"})`
  );
}
