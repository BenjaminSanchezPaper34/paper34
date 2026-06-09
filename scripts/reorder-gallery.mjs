/**
 * reorder-gallery.mjs — Réordonne le manifest d'une galerie par NUMÉRO de
 * fichier (A7V-1, A7V-2, … A7V-209), sans re-traiter ni re-uploader les images.
 *
 * On extrait le DERNIER groupe de chiffres du nom (le préfixe « A7V » contient
 * déjà un 7 → on ne veut pas le confondre avec le numéro de prise de vue).
 *
 * Usage : node scripts/reorder-gallery.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const GALLERIES = [{ slug: "chiringuito-opening" }];

/** Dernier groupe de chiffres d'un nom (hors extension). */
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
  manifest.photos.sort((a, b) => fileNum(a.downloadName) - fileNum(b.downloadName));
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  const after = manifest.photos.map((p) => p.downloadName);
  console.log(
    `✅ ${g.slug} : ${manifest.photos.length} photos triées par numéro de fichier`
  );
  console.log(`   ordre : ${after.slice(0, 4).join(", ")} … ${after.slice(-2).join(", ")}`);
}
