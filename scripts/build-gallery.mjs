/**
 * build-gallery.mjs — Prépare une galerie photo client.
 *
 * Pour chaque photo source (HEIC/JPEG/PNG) d'un dossier :
 *   1. Copie l'ORIGINAL tel quel (octet pour octet) dans originals/
 *      → c'est ce fichier qui sera téléchargé par le client, JAMAIS recompressé.
 *   2. Génère une version d'AFFICHAGE web (JPEG sRGB) dans display/
 *      → uniquement pour le rendu navigateur (le HEIC ne s'affiche pas
 *         dans Chrome/Firefox). Cette version n'est jamais téléchargée.
 *   3. Écrit un manifest.json listant tout (dimensions, noms, tailles).
 *
 * Usage : node scripts/build-gallery.mjs
 * (config GALLERIES ci-dessous — ajouter une entrée par soirée)
 */

import sharp from "sharp";
import {
  readdirSync,
  mkdirSync,
  copyFileSync,
  writeFileSync,
  rmSync,
  existsSync,
  statSync,
} from "fs";
import { join, extname } from "path";
import { execFileSync } from "child_process";
import { tmpdir } from "os";

// Le build libvips de sharp ne décode pas le HEIC/HEVC (licence). Sur macOS
// on passe par `sips` (décodeur Apple natif) pour produire un PNG sans perte
// intermédiaire, que sharp finalise ensuite. N'altère jamais l'original.
const HEIC_EXT = new Set([".heic", ".heif"]);

function heicToTempPng(srcPath, id) {
  const tmp = join(tmpdir(), `gallery-${id}-${Date.now()}.png`);
  execFileSync("sips", ["-s", "format", "png", srcPath, "--out", tmp], {
    stdio: ["ignore", "ignore", "pipe"],
  });
  return tmp;
}

// ─── Config des galeries à construire ──────────────────────────────
const GALLERIES = [
  {
    slug: "chiringuito-opening",
    title: "Opening",
    client: "Chiringuito Vias",
    date: "2026-06-06",
    src: "Partage photos/CHIRINGUITO - VIAS/06I06I26 - OPENING",
  },
];

// Taille max du côté long pour l'affichage web (px). Les originaux plus
// petits ne sont pas agrandis.
const DISPLAY_MAX_EDGE = 2160;
const DISPLAY_QUALITY = 86;

const SOURCE_EXT = new Set([".heic", ".heif", ".jpg", ".jpeg", ".png", ".tif", ".tiff"]);

async function buildGallery(g) {
  const outDir = join("public", "galeries", g.slug);
  const displayDir = join(outDir, "display");
  const originalsDir = join(outDir, "originals");

  // Reset propre
  if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
  mkdirSync(displayDir, { recursive: true });
  mkdirSync(originalsDir, { recursive: true });

  const files = readdirSync(g.src)
    .filter((f) => SOURCE_EXT.has(extname(f).toLowerCase()))
    .sort();

  if (files.length === 0) {
    console.warn(`⚠️  Aucune photo trouvée dans ${g.src}`);
    return;
  }

  const photos = [];
  let i = 0;
  for (const file of files) {
    i++;
    const srcPath = join(g.src, file);
    const ext = extname(file).toLowerCase();
    const stem = file.slice(0, file.length - ext.length);

    // 1. Copie de l'original — AUCUNE transformation
    const originalName = file; // nom exact conservé
    copyFileSync(srcPath, join(originalsDir, originalName));
    const originalSize = statSync(srcPath).size;

    // 2. Version d'affichage (JPEG sRGB)
    const displayName = `${stem}.jpg`;
    const isHeic = HEIC_EXT.has(ext);
    let tempPng = null;
    let sharpInput = srcPath;
    if (isHeic) {
      tempPng = heicToTempPng(srcPath, stem);
      sharpInput = tempPng;
    }

    const pipeline = sharp(sharpInput)
      .rotate() // applique l'orientation EXIF puis la fige
      .resize({
        width: DISPLAY_MAX_EDGE,
        height: DISPLAY_MAX_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      })
      .toColorspace("srgb")
      .jpeg({ quality: DISPLAY_QUALITY, mozjpeg: true });

    const info = await pipeline.toFile(join(displayDir, displayName));
    if (tempPng) rmSync(tempPng, { force: true });

    // Chemins bruts (non encodés) — l'encodage URL se fait au rendu.
    photos.push({
      id: stem,
      display: `display/${displayName}`,
      original: `originals/${originalName}`,
      downloadName: originalName,
      width: info.width,
      height: info.height,
      originalBytes: originalSize,
      originalExt: ext.replace(".", ""),
    });

    console.log(
      `  ✓ ${i}/${files.length}  ${file}  →  affichage ${info.width}×${info.height} (${Math.round(
        info.size / 1024
      )} Ko) · original ${Math.round(originalSize / 1024)} Ko intact`
    );
  }

  const manifest = {
    slug: g.slug,
    title: g.title,
    client: g.client,
    date: g.date,
    count: photos.length,
    totalOriginalBytes: photos.reduce((s, p) => s + p.originalBytes, 0),
    photos,
  };

  writeFileSync(
    join(outDir, "manifest.json"),
    JSON.stringify(manifest, null, 2)
  );

  console.log(
    `✅ ${g.slug} : ${photos.length} photos · /galerie/${g.slug}\n`
  );
}

for (const g of GALLERIES) {
  console.log(`\n📸 ${g.client} — ${g.title}`);
  await buildGallery(g);
}
