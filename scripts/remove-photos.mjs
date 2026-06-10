/**
 * remove-photos.mjs — Retire des photos d'une galerie (Blob + manifest).
 *
 * Identifie les photos par leur NUMÉRO de fichier (dernier groupe de chiffres),
 * supprime leurs fichiers Blob (display + original), les retire du manifest, et
 * les note dans `manifest.excluded` pour qu'un futur add-photos / build ne les
 * réajoute pas (les sources restent intactes dans le dossier).
 *
 * Usage : node --env-file=.env.local scripts/remove-photos.mjs
 */

import { del } from "@vercel/blob";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// Numéros de photo à retirer, par galerie.
const GALLERIES = [{ slug: "chiringuito-opening", remove: [194, 196, 197] }];

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
if (!TOKEN) {
  console.error("❌ Lance avec : node --env-file=.env.local scripts/remove-photos.mjs");
  process.exit(1);
}

function fileNum(name) {
  const base = name.replace(/\.[^.]+$/, "");
  const nums = base.match(/\d+/g);
  return nums ? parseInt(nums[nums.length - 1], 10) : 0;
}

for (const g of GALLERIES) {
  const manifestPath = join("public", "galeries", g.slug, "manifest.json");
  if (!existsSync(manifestPath)) {
    console.warn(`⚠️  Pas de manifest pour ${g.slug}`);
    continue;
  }
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const removeSet = new Set(g.remove);

  const targets = manifest.photos.filter((p) => removeSet.has(fileNum(p.downloadName)));
  if (targets.length === 0) {
    console.log(`✅ ${g.slug} : aucune des photos ${g.remove.join(", ")} trouvée`);
    continue;
  }

  // Supprime les fichiers Blob (display + original)
  const urls = [];
  for (const p of targets) {
    if (/^https?:\/\//.test(p.display)) urls.push(p.display);
    if (/^https?:\/\//.test(p.original)) urls.push(p.original);
  }
  if (urls.length) await del(urls, { token: TOKEN });

  // Retire du manifest + note comme exclues
  const removedNames = targets.map((p) => p.downloadName);
  manifest.photos = manifest.photos.filter((p) => !removeSet.has(fileNum(p.downloadName)));
  manifest.excluded = Array.from(
    new Set([...(manifest.excluded || []), ...removedNames])
  );
  manifest.count = manifest.photos.length;
  manifest.totalOriginalBytes = manifest.photos.reduce((s, p) => s + p.originalBytes, 0);
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(
    `✅ ${g.slug} : ${removedNames.length} retirée(s) (${removedNames.join(", ")}) · ${urls.length} fichiers Blob supprimés · total ${manifest.count} photos`
  );
}
