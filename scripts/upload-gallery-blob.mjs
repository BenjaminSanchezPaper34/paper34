/**
 * upload-gallery-blob.mjs — Pousse une galerie déjà préparée vers Vercel Blob.
 *
 * Pourquoi : le repo est dans iCloud → les push git de binaires figent (iCloud
 * synchronise .git pendant le transfert). En hébergeant les photos sur Blob,
 * git ne porte plus que le manifest JSON (minuscule) → push/déploiement
 * instantanés, et ça scale à des centaines de photos par soirée.
 *
 * Lit public/galeries/<slug>/ (display + originals générés par build-gallery.mjs),
 * uploade chaque fichier sur Blob, puis réécrit manifest.json avec les URLs Blob.
 * L'ORIGINAL est uploadé tel quel (octet pour octet, jamais recompressé).
 *
 * Usage : node --env-file=.env.local scripts/upload-gallery-blob.mjs
 */

import { put } from "@vercel/blob";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const SLUGS = ["chiringuito-opening"];

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
if (!TOKEN) {
  console.error(
    "❌ BLOB_READ_WRITE_TOKEN manquant. Lance avec : node --env-file=.env.local scripts/upload-gallery-blob.mjs"
  );
  process.exit(1);
}

async function uploadGallery(slug) {
  const dir = join("public", "galeries", slug);
  const manifestPath = join(dir, "manifest.json");
  if (!existsSync(manifestPath)) {
    console.warn(`⚠️  Pas de manifest pour ${slug} (lance d'abord build-gallery.mjs)`);
    return;
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
  console.log(`\n☁️  ${slug} — ${manifest.photos.length} photos vers Blob`);

  for (let i = 0; i < manifest.photos.length; i++) {
    const p = manifest.photos[i];

    // Si déjà une URL Blob, on saute (idempotent)
    const localDisplay = join(dir, p.display.replace(/^https?:\/\/.*/, ""));
    const localOriginal = join(dir, p.original.replace(/^https?:\/\/.*/, ""));

    // Chemins locaux d'origine (avant réécriture). On garde une copie des
    // chemins relatifs originaux dans p._rel si présent, sinon on déduit.
    const relDisplay = p._relDisplay || p.display;
    const relOriginal = p._relOriginal || p.original;

    const displayPath = join(dir, relDisplay);
    const originalPath = join(dir, relOriginal);

    if (!existsSync(displayPath) || !existsSync(originalPath)) {
      console.warn(
        `  ⚠️  fichiers locaux introuvables pour ${p.id}, déjà migré ? (skip)`
      );
      continue;
    }

    const displayBlob = await put(
      `galeries/${slug}/display/${p.downloadName.replace(/\.[^.]+$/, ".jpg")}`,
      readFileSync(displayPath),
      {
        access: "public",
        token: TOKEN,
        contentType: "image/jpeg",
        addRandomSuffix: false,
        allowOverwrite: true,
      }
    );

    const originalBlob = await put(
      `galeries/${slug}/originals/${p.downloadName}`,
      readFileSync(originalPath), // octets intacts
      {
        access: "public",
        token: TOKEN,
        addRandomSuffix: false,
        allowOverwrite: true,
      }
    );

    // Conserve les chemins relatifs locaux pour ré-uploads futurs
    p._relDisplay = relDisplay;
    p._relOriginal = relOriginal;
    p.display = displayBlob.url;
    p.original = originalBlob.url;

    console.log(`  ✓ ${i + 1}/${manifest.photos.length}  ${p.downloadName}`);
  }

  manifest.storage = "blob";
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`✅ ${slug} : manifest réécrit avec URLs Blob`);
}

for (const slug of SLUGS) {
  await uploadGallery(slug);
}
