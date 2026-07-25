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

/** Numéro de prise = le plus long groupe de chiffres du nom (hors extension).
 *  Gère « A7V-194 » (→ 194) comme « A7507196-DxO_DeepPRIME XD3 » (→ 7507196,
 *  le « 3 » de XD3 étant ignoré). Égalité de longueur → le dernier groupe. */
function fileNum(name) {
  const base = name.replace(/\.[^.]+$/, "");
  const nums = base.match(/\d+/g);
  if (!nums) return 0;
  let best = nums[0];
  for (const n of nums) if (n.length >= best.length) best = n;
  return parseInt(best, 10);
}

// ─── Config des galeries à construire ──────────────────────────────
const GALLERIES = [
  {
    slug: "chiringuito-aperol",
    title: "Aperol",
    client: "Chiringuito Vias",
    date: "2026-07-24",
    src: "partage photos/CHIRINGUITO - VIAS/4-24I07I26-APEROL",
    intro:
      "\u{1F44B} Tap sur une photo pour la t\u00e9l\u00e9charger\n" +
      "\u2764\uFE0F N'h\u00e9sitez pas \u00e0 nous mentionner sur vos r\u00e9seaux \u2764\uFE0F\n\n" +
      "\u{1F34A} Soir\u00e9e Aperol\n" +
      "\u{1F334} @chiringuitovias\n" +
      "\u{1F4F8} @benjaminsanchez_paper34",
    exclude: [],
  },
  // Galeries précédentes — déjà construites et sur R2, NE PAS rebuild :
  // reggaeton (11/07, cover 90) · coachella (21/06, exclude 7507647, cover 126)
  // opening (06/06, exclude 194/196/197, cover 106)
];

// Taille max du côté long pour l'affichage web (px). Les originaux plus
// petits ne sont pas agrandis.
const DISPLAY_MAX_EDGE = 2048;
const DISPLAY_QUALITY = 90; // pour les sources déjà SDR (jpg/png) via sharp
// Vignette de grille : petite + légère → ~9× moins de transfert que le display.
const THUMB_MAX_EDGE = 640;
const THUMB_QUALITY = 72;

const SOURCE_EXT = new Set([".heic", ".heif", ".jpg", ".jpeg", ".png", ".tif", ".tiff"]);

async function buildGallery(g) {
  const outDir = join("public", "galeries", g.slug);
  const displayDir = join(outDir, "display");
  const thumbDir = join(outDir, "thumb");
  const originalsDir = join(outDir, "originals");

  // Reset propre
  if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
  mkdirSync(displayDir, { recursive: true });
  mkdirSync(thumbDir, { recursive: true });
  mkdirSync(originalsDir, { recursive: true });

  // Tri par NUMÉRO de fichier (A7V-1, 2, 3, … 209), pas par ordre alpha
  // (A7V-100 viendrait avant A7V-2) : on prend le DERNIER groupe de chiffres
  // du nom (le préfixe « A7V » contient déjà un 7).
  const excludeNums = new Set(g.exclude || []);
  const allSrc = readdirSync(g.src).filter((f) =>
    SOURCE_EXT.has(extname(f).toLowerCase())
  );
  const excludedNames = allSrc.filter((f) => excludeNums.has(fileNum(f)));
  const files = allSrc
    .filter((f) => !excludeNums.has(fileNum(f)))
    .sort((a, b) => fileNum(a) - fileNum(b));

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

    // 3. Vignette de grille (légère) — générée depuis le display (rapide),
    //    profil couleur conservé.
    const thumbName = `${stem}.jpg`;
    const thumbPath = join(thumbDir, thumbName);
    await sharp(displayPath)
      .resize({ width: THUMB_MAX_EDGE, height: THUMB_MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .keepIccProfile()
      .jpeg({ quality: THUMB_QUALITY, mozjpeg: true })
      .toFile(thumbPath);

    // Chemins bruts (non encodés) — l'encodage URL se fait au rendu.
    photos.push({
      id: stem,
      thumb: `thumb/${thumbName}`,
      display: `display/${displayName}`,
      original: `originals/${originalName}`,
      downloadName: originalName,
      width: displayW,
      height: displayH,
      originalBytes: originalSize,
      originalExt: ext.replace(".", ""),
    });

    const displaySize = statSync(displayPath).size;
    const thumbSize = statSync(thumbPath).size;
    console.log(
      `  ✓ ${i}/${files.length}  ${file}  →  vignette ${Math.round(thumbSize / 1024)} Ko · affichage ${Math.round(
        displaySize / 1024
      )} Ko (P3) · original ${Math.round(originalSize / 1024)} Ko intact`
    );
  }

  const manifest = {
    slug: g.slug,
    title: g.title,
    client: g.client,
    date: g.date,
    ...(g.intro ? { intro: g.intro } : {}),
    ...(g.cover && photos[g.cover - 1] ? { cover: photos[g.cover - 1].id } : {}),
    ...(excludedNames.length ? { excluded: excludedNames } : {}),
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
