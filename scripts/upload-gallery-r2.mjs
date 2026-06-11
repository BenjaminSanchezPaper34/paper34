/**
 * upload-gallery-r2.mjs — Pousse une galerie préparée vers Cloudflare R2.
 *
 * Lit public/galeries/<slug>/ (thumb + display + originals générés par
 * build-gallery.mjs), nettoie l'ancien contenu R2 de la galerie, uploade
 * chaque fichier, puis réécrit manifest.json avec les URLs publiques R2.
 * Supprime ensuite les binaires locaux (le manifest seul reste versionné).
 *
 * R2 = transfert sortant gratuit → plus aucune limite de bande passante.
 *
 * Usage : node --env-file=.env.local scripts/upload-gallery-r2.mjs
 */

import { readFileSync, writeFileSync, existsSync, rmSync } from "fs";
import { join } from "path";
import { requireR2, r2Client, putFile, deletePrefix } from "./r2.mjs";

const SLUGS = ["chiringuito-opening"];

function ctOf(ext) {
  const e = ext.toLowerCase();
  if (e === "heic" || e === "heif") return "image/heic";
  if (e === "png") return "image/png";
  return "image/jpeg";
}

requireR2();
const client = r2Client();

for (const slug of SLUGS) {
  const dir = join("public", "galeries", slug);
  const manifestPath = join(dir, "manifest.json");
  if (!existsSync(manifestPath)) {
    console.warn(`⚠️  Pas de manifest pour ${slug} (lance d'abord build-gallery.mjs)`);
    continue;
  }
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

  console.log(`\n☁️  ${slug} — nettoyage R2 + upload de ${manifest.photos.length} photos`);
  const deleted = await deletePrefix(client, `galeries/${slug}/`);
  if (deleted) console.log(`   🧹 ${deleted} ancien(s) objet(s) R2 supprimé(s)`);

  for (let i = 0; i < manifest.photos.length; i++) {
    const p = manifest.photos[i];
    const rel = {
      thumb: p._relThumb || p.thumb,
      display: p._relDisplay || p.display,
      original: p._relOriginal || p.original,
    };
    const thumbUrl = await putFile(client, `galeries/${slug}/thumb/${p.id}.jpg`, join(dir, rel.thumb), "image/jpeg");
    const displayUrl = await putFile(client, `galeries/${slug}/display/${p.id}.jpg`, join(dir, rel.display), "image/jpeg");
    const originalUrl = await putFile(
      client,
      `galeries/${slug}/originals/${p.downloadName}`,
      join(dir, rel.original),
      ctOf(p.originalExt || "")
    );

    p._relThumb = rel.thumb;
    p._relDisplay = rel.display;
    p._relOriginal = rel.original;
    p.thumb = thumbUrl;
    p.display = displayUrl;
    p.original = originalUrl;

    if ((i + 1) % 25 === 0 || i + 1 === manifest.photos.length) {
      console.log(`   ✓ ${i + 1}/${manifest.photos.length}`);
    }
  }

  manifest.storage = "r2";
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  // Nettoyage des binaires locaux (déjà sur R2)
  for (const sub of ["thumb", "display", "originals"]) {
    const p = join(dir, sub);
    if (existsSync(p)) rmSync(p, { recursive: true, force: true });
  }
  console.log(`✅ ${slug} : manifest réécrit (URLs R2) · binaires locaux nettoyés`);
}
