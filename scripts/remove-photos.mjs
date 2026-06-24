/**
 * remove-photos.mjs — Retire des photos d'une galerie (R2 + manifest).
 *
 * Identifie les photos par leur NUMÉRO de fichier, supprime leurs objets R2
 * (thumb + display + original), les retire du manifest, et les note dans
 * `manifest.excluded` pour qu'un futur add-photos / build ne les réajoute pas.
 * Les sources restent intactes dans le dossier.
 *
 * Usage : node --env-file=.env.local scripts/remove-photos.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { requireR2, r2Client, deleteUrls } from "./r2.mjs";

// Numéros de photo (caméra) à retirer, par galerie.
const GALLERIES = [{ slug: "chiringuito-coachella", remove: [] }];

// Numéro de prise = plus long groupe de chiffres (gère A7V-194 et A7507647…XD3).
function fileNum(name) {
  const base = name.replace(/\.[^.]+$/, "");
  const nums = base.match(/\d+/g);
  if (!nums) return 0;
  let best = nums[0];
  for (const n of nums) if (n.length >= best.length) best = n;
  return parseInt(best, 10);
}

requireR2();
const client = r2Client();

for (const g of GALLERIES) {
  if (!g.remove || g.remove.length === 0) {
    console.log(`ℹ️  ${g.slug} : rien à retirer (liste vide)`);
    continue;
  }
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

  const urls = [];
  for (const p of targets) {
    for (const u of [p.thumb, p.display, p.original]) {
      if (u && /^https?:\/\//.test(u)) urls.push(u);
    }
  }
  const deleted = await deleteUrls(client, urls);

  const removedNames = targets.map((p) => p.downloadName);
  manifest.photos = manifest.photos.filter((p) => !removeSet.has(fileNum(p.downloadName)));
  manifest.excluded = Array.from(new Set([...(manifest.excluded || []), ...removedNames]));
  manifest.count = manifest.photos.length;
  manifest.totalOriginalBytes = manifest.photos.reduce((s, p) => s + p.originalBytes, 0);
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(
    `✅ ${g.slug} : ${removedNames.length} retirée(s) (${removedNames.join(", ")}) · ${deleted} objets R2 supprimés · total ${manifest.count}`
  );
}
