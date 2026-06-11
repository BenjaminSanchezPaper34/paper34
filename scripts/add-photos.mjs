/**
 * add-photos.mjs — Ajoute INCRÉMENTALEMENT les nouvelles photos d'une galerie (R2).
 *
 * Détecte les fichiers source absents du manifest (hors `excluded`), génère
 * vignette + affichage (display P3), uploade vignette + affichage + original
 * sur R2, insère dans le manifest puis re-trie par numéro de fichier.
 * Ne re-traite ni ne re-uploade l'existant.
 *
 * Usage : node --env-file=.env.local scripts/add-photos.mjs
 */

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
import { requireR2, r2Client, putFile } from "./r2.mjs";

const GALLERIES = [
  { slug: "chiringuito-opening", src: "Partage photos/CHIRINGUITO - VIAS/1-06I06I26-OPENING" },
];

const DISPLAY_MAX_EDGE = 2048;
const THUMB_MAX_EDGE = 640;
const THUMB_QUALITY = 72;
const DISPLAY_P3 = "/System/Library/ColorSync/Profiles/Display P3.icc";
const HEIC_EXT = new Set([".heic", ".heif"]);
const SOURCE_EXT = new Set([".heic", ".heif", ".jpg", ".jpeg", ".png", ".tif", ".tiff"]);

function fileNum(name) {
  const base = name.replace(/\.[^.]+$/, "");
  const nums = base.match(/\d+/g);
  return nums ? parseInt(nums[nums.length - 1], 10) : 0;
}
function ctOf(ext) {
  const e = ext.toLowerCase().replace(".", "");
  if (e === "heic" || e === "heif") return "image/heic";
  if (e === "png") return "image/png";
  return "image/jpeg";
}
function heicToP3(srcPath, outPath, longEdge) {
  const args = ["-s", "format", "jpeg", "-s", "formatOptions", "high", "-m", DISPLAY_P3];
  if (longEdge > DISPLAY_MAX_EDGE) args.push("-Z", String(DISPLAY_MAX_EDGE));
  args.push(srcPath, "--out", outPath);
  execFileSync("sips", args, { stdio: ["ignore", "ignore", "pipe"] });
}

requireR2();
const client = r2Client();

for (const g of GALLERIES) {
  const dir = join("public", "galeries", g.slug);
  const manifestPath = join(dir, "manifest.json");
  if (!existsSync(manifestPath)) {
    console.warn(`⚠️  Pas de manifest pour ${g.slug}`);
    continue;
  }
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const have = new Set(manifest.photos.map((p) => p.downloadName));
  const excluded = new Set(manifest.excluded || []);

  const newFiles = readdirSync(g.src)
    .filter((f) => SOURCE_EXT.has(extname(f).toLowerCase()))
    .filter((f) => !have.has(f) && !excluded.has(f))
    .sort((a, b) => fileNum(a) - fileNum(b));

  if (newFiles.length === 0) {
    console.log(`✅ ${g.slug} : aucune nouvelle photo`);
    continue;
  }
  console.log(`📸 ${g.slug} : ${newFiles.length} nouvelle(s) photo(s)`);

  const tmp = join(dir, "_tmp");
  mkdirSync(tmp, { recursive: true });

  for (const file of newFiles) {
    const srcPath = join(g.src, file);
    const ext = extname(file).toLowerCase();
    const stem = file.slice(0, file.length - ext.length);
    const originalSize = statSync(srcPath).size;
    const displayLocal = join(tmp, `${stem}.disp.jpg`);
    const thumbLocal = join(tmp, `${stem}.thumb.jpg`);

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
    await sharp(displayLocal)
      .resize({ width: THUMB_MAX_EDGE, height: THUMB_MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .keepIccProfile()
      .jpeg({ quality: THUMB_QUALITY, mozjpeg: true })
      .toFile(thumbLocal);

    const thumbUrl = await putFile(client, `galeries/${g.slug}/thumb/${stem}.jpg`, thumbLocal, "image/jpeg");
    const displayUrl = await putFile(client, `galeries/${g.slug}/display/${stem}.jpg`, displayLocal, "image/jpeg");
    const originalUrl = await putFile(client, `galeries/${g.slug}/originals/${file}`, srcPath, ctOf(ext));

    manifest.photos.push({
      id: stem,
      thumb: thumbUrl,
      display: displayUrl,
      original: originalUrl,
      downloadName: file,
      width: dw,
      height: dh,
      originalBytes: originalSize,
      originalExt: ext.replace(".", ""),
    });
    console.log(`  + ${file}`);
  }

  rmSync(tmp, { recursive: true, force: true });

  manifest.photos.sort((a, b) => fileNum(a.downloadName) - fileNum(b.downloadName));
  manifest.count = manifest.photos.length;
  manifest.totalOriginalBytes = manifest.photos.reduce((s, p) => s + p.originalBytes, 0);
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`✅ ${g.slug} : ${newFiles.length} ajoutée(s) · total ${manifest.count}`);
}
