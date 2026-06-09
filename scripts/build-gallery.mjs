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

// Les originaux DxO sont en HDR (Rec. BT.2100 PQ). Le build libvips de sharp
// ne décode pas ce HEIC/HEVC, et un détour PNG cramait le tonemap HDR→SDR.
// On convertit donc en DIRECT via `sips` (ImageIO Apple) : tonemap HDR→SDR de
// qualité + sortie en Display P3 (gamut large, vivant sur écrans iPhone).
// N'altère jamais l'original (qui reste téléchargé tel quel).
const HEIC_EXT = new Set([".heic", ".heif"]);
const DISPLAY_P3_PROFILE = "/System/Library/ColorSync/Profiles/Display P3.icc";

/** Convertit un HEIC HDR en JPEG Display P3 d'affichage via sips/ImageIO.
 *  Redimensionne (côté long → maxEdge) uniquement si l'original est plus grand. */
function heicToDisplayJpeg(srcPath, outPath, maxEdge, longEdge) {
  const args = [
    "-s", "format", "jpeg",
    "-s", "formatOptions", "high",
    "-m", DISPLAY_P3_PROFILE,
  ];
  if (longEdge > maxEdge) args.push("-Z", String(maxEdge));
  args.push(srcPath, "--out", outPath);
  execFileSync("sips", args, { stdio: ["ignore", "ignore", "pipe"] });
}

// ─── Config des galeries à construire ──────────────────────────────
const GALLERIES = [
  {
    slug: "chiringuito-opening",
    title: "Opening",
    client: "Chiringuito Vias",
    date: "2026-06-06",
    src: "Partage photos/CHIRINGUITO - VIAS/1-06I06I26-OPENING",
  },
];

// Taille max du côté long pour l'affichage web (px). Les originaux plus
// petits ne sont pas agrandis.
const DISPLAY_MAX_EDGE = 2048;
const DISPLAY_QUALITY = 90; // pour les sources déjà SDR (jpg/png) via sharp

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

    // 2. Version d'affichage (JPEG Display P3)
    const displayName = `${stem}.jpg`;
    const displayPath = join(displayDir, displayName);
    const isHeic = HEIC_EXT.has(ext);

    let displayW, displayH;
    if (isHeic) {
      // HEIC HDR → JPEG P3 via sips/ImageIO (tonemap de qualité)
      const meta = await sharp(srcPath).metadata(); // lecture dims (sans décoder)
      const longEdge = Math.max(meta.width || 0, meta.height || 0);
      heicToDisplayJpeg(srcPath, displayPath, DISPLAY_MAX_EDGE, longEdge);
      const out = await sharp(displayPath).metadata();
      displayW = out.width;
      displayH = out.height;
    } else {
      // Sources déjà SDR (jpg/png) : sharp, en conservant leur profil couleur
      const info = await sharp(srcPath)
        .rotate()
        .resize({
          width: DISPLAY_MAX_EDGE,
          height: DISPLAY_MAX_EDGE,
          fit: "inside",
          withoutEnlargement: true,
        })
        .keepIccProfile()
        .jpeg({ quality: DISPLAY_QUALITY, mozjpeg: true, chromaSubsampling: "4:4:4" })
        .toFile(displayPath);
      displayW = info.width;
      displayH = info.height;
    }

    // Chemins bruts (non encodés) — l'encodage URL se fait au rendu.
    photos.push({
      id: stem,
      display: `display/${displayName}`,
      original: `originals/${originalName}`,
      downloadName: originalName,
      width: displayW,
      height: displayH,
      originalBytes: originalSize,
      originalExt: ext.replace(".", ""),
    });

    const displaySize = statSync(displayPath).size;
    console.log(
      `  ✓ ${i}/${files.length}  ${file}  →  affichage ${displayW}×${displayH} (${Math.round(
        displaySize / 1024
      )} Ko, P3) · original ${Math.round(originalSize / 1024)} Ko intact`
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
