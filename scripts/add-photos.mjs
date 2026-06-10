/**
 * add-photos.mjs — Ajoute INCRÉMENTALEMENT les nouvelles photos d'une galerie.
 *
 * Détecte les fichiers source absents du manifest, les traite (display P3 via
 * sips), les uploade sur Blob, les insère dans le manifest puis re-trie par
 * numéro de fichier. Ne touche pas aux photos déjà présentes (zéro re-upload).
 *
 * Usage : node --env-file=.env.local scripts/add-photos.mjs
 */

import { put } from "@vercel/blob";
import sharp from "sharp";
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  statSync,
  rmSync,
  mkdirSync,
} from "fs";
import { execFileSync } from "child_process";
import { join, extname } from "path";

const GALLERIES = [
  {
    slug: "chiringuito-opening",
    src: "Partage photos/CHIRINGUITO - VIAS/1-06I06I26-OPENING",
  },
];

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
if (!TOKEN) {
  console.error("❌ Lance avec : node --env-file=.env.local scripts/add-photos.mjs");
  process.exit(1);
}

const DISPLAY_MAX_EDGE = 2048;
const DISPLAY_P3 = "/System/Library/ColorSync/Profiles/Display P3.icc";
const HEIC_EXT = new Set([".heic", ".heif"]);
const SOURCE_EXT = new Set([".heic", ".heif", ".jpg", ".jpeg", ".png", ".tif", ".tiff"]);

/** Dernier groupe de chiffres d'un nom (hors extension) → numéro de prise. */
function fileNum(name) {
  const base = name.replace(/\.[^.]+$/, "");
  const nums = base.match(/\d+/g);
  return nums ? parseInt(nums[nums.length - 1], 10) : 0;
}

function heicToP3(srcPath, outPath, longEdge) {
  const args = ["-s", "format", "jpeg", "-s", "formatOptions", "high", "-m", DISPLAY_P3];
  if (longEdge > DISPLAY_MAX_EDGE) args.push("-Z", String(DISPLAY_MAX_EDGE));
  args.push(srcPath, "--out", outPath);
  execFileSync("sips", args, { stdio: ["ignore", "ignore", "pipe"] });
}

for (const g of GALLERIES) {
  const manifestPath = join("public", "galeries", g.slug, "manifest.json");
  if (!existsSync(manifestPath)) {
    console.warn(`⚠️  Pas de manifest pour ${g.slug}`);
    continue;
  }
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const have = new Set(manifest.photos.map((p) => p.downloadName));
  const excluded = new Set(manifest.excluded || []); // retirées volontairement

  const newFiles = readdirSync(g.src)
    .filter((f) => SOURCE_EXT.has(extname(f).toLowerCase()))
    .filter((f) => !have.has(f) && !excluded.has(f))
    .sort((a, b) => fileNum(a) - fileNum(b));

  if (newFiles.length === 0) {
    console.log(`✅ ${g.slug} : aucune nouvelle photo`);
    continue;
  }
  console.log(`📸 ${g.slug} : ${newFiles.length} nouvelle(s) photo(s)`);

  const tmpDir = join("public", "galeries", g.slug, "_tmp");
  mkdirSync(tmpDir, { recursive: true });

  for (const file of newFiles) {
    const srcPath = join(g.src, file);
    const ext = extname(file).toLowerCase();
    const stem = file.slice(0, file.length - ext.length);
    const originalSize = statSync(srcPath).size;
    const displayLocal = join(tmpDir, `${stem}.jpg`);

    let dw, dh;
    if (HEIC_EXT.has(ext)) {
      const meta = await sharp(srcPath).metadata();
      heicToP3(srcPath, displayLocal, Math.max(meta.width || 0, meta.height || 0));
      const out = await sharp(displayLocal).metadata();
      dw = out.width;
      dh = out.height;
    } else {
      const info = await sharp(srcPath)
        .rotate()
        .resize({ width: DISPLAY_MAX_EDGE, height: DISPLAY_MAX_EDGE, fit: "inside", withoutEnlargement: true })
        .keepIccProfile()
        .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: "4:4:4" })
        .toFile(displayLocal);
      dw = info.width;
      dh = info.height;
    }

    const displayBlob = await put(`galeries/${g.slug}/display/${stem}.jpg`, readFileSync(displayLocal), {
      access: "public",
      token: TOKEN,
      contentType: "image/jpeg",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    const originalBlob = await put(`galeries/${g.slug}/originals/${file}`, readFileSync(srcPath), {
      access: "public",
      token: TOKEN,
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    manifest.photos.push({
      id: stem,
      display: displayBlob.url,
      original: originalBlob.url,
      downloadName: file,
      width: dw,
      height: dh,
      originalBytes: originalSize,
      originalExt: ext.replace(".", ""),
      _relDisplay: `display/${stem}.jpg`,
      _relOriginal: `originals/${file}`,
    });
    console.log(`  + ${file}`);
  }

  rmSync(tmpDir, { recursive: true, force: true });

  // Re-tri par numéro + recompte
  manifest.photos.sort((a, b) => fileNum(a.downloadName) - fileNum(b.downloadName));
  manifest.count = manifest.photos.length;
  manifest.totalOriginalBytes = manifest.photos.reduce((s, p) => s + p.originalBytes, 0);
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`✅ ${g.slug} : ${newFiles.length} ajoutée(s) · total ${manifest.count} photos`);
}
