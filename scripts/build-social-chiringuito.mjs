/**
 * build-social-chiringuito.mjs — Prépare les visuels du pilote "comptes que j'anime".
 *
 * 1. Optimise les affiches DJ du Chiringuito (JPEG 900px, qualité 80)
 *    et les envoie sur R2 sous site/social/chiringuitovias/.
 * 2. Extrait depuis les manifests de galeries les URLs R2 (display) d'une
 *    sélection de photos d'événements, pour composer le feed.
 * 3. Affiche le bloc `feed` prêt à coller dans src/lib/instagram-accounts.ts.
 *
 * Usage : node --env-file=.env.local scripts/build-social-chiringuito.mjs
 */

import { readFileSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import sharp from "sharp";
import { requireR2, r2Client, putFile, R2 } from "./r2.mjs";

const CHIRINGUITO_IMAGES =
  "/Users/benjaminsanchez/Library/Mobile Documents/com~apple~CloudDocs/TRAVAUX/2026/CHIRINGUITO - VIAS/site/images";

// Affiches DJ / événements créées pour le compte (posts Instagram).
const POSTERS = [
  { file: "APEROL.jpg", slug: "affiche-aperol" },
  { file: "DEMSKO.jpg", slug: "affiche-demsko" },
  { file: "MAXX BATY.jpg", slug: "affiche-maxx-baty" },
  { file: "MOREZAN.jpg", slug: "affiche-morezan" },
  { file: "YANNMULLER.jpg", slug: "affiche-yann-muller" },
  { file: "LUISLABORI.jpg", slug: "affiche-luis-labori" },
];

// Photos d'événements déjà sur R2 (numéro de prise → URL display du manifest).
const GALLERY_PICKS = [
  { gallery: "chiringuito-opening", nums: [113, 27, 150] },
  { gallery: "chiringuito-coachella", nums: [7758, 7196, 7509] },
  { gallery: "chiringuito-reggaeton", nums: [90, 12, 140] },
  { gallery: "chiringuito-aperol", nums: [1, 60, 120] },
];

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
const feed = [];

// 1. Affiches → R2
for (const p of POSTERS) {
  const src = join(CHIRINGUITO_IMAGES, p.file);
  const out = join(tmpdir(), `${p.slug}.jpg`);
  await sharp(src).resize({ width: 900, withoutEnlargement: true }).jpeg({ quality: 80 }).toFile(out);
  const key = `site/social/chiringuitovias/${p.slug}.jpg`;
  const url = await putFile(client, key, out, "image/jpeg");
  feed.push({ type: "affiche", url });
  console.log(`✅ affiche ${p.slug} → ${url}`);
}

// 2. Photos de galeries (déjà sur R2, on récupère l'URL display exacte)
for (const g of GALLERY_PICKS) {
  const manifest = JSON.parse(
    readFileSync(join("public", "galeries", g.gallery, "manifest.json"), "utf8")
  );
  for (const num of g.nums) {
    const photo = manifest.photos.find((p) => fileNum(p.downloadName) === num);
    if (!photo) {
      console.warn(`⚠️  ${g.gallery} : photo ${num} introuvable`);
      continue;
    }
    feed.push({ type: "photo", url: photo.display || photo.thumb });
    console.log(`✅ photo ${g.gallery}#${num}`);
  }
}

console.log("\n--- Bloc feed pour instagram-accounts.ts ---\n");
console.log(JSON.stringify(feed.map((f) => f.url), null, 2));
