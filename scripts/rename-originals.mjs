/**
 * rename-originals.mjs — Donne des noms de téléchargement propres aux
 * originaux d'une galerie (ex. « Chiringuito-Coachella-001.heic » au lieu
 * de « A7507196-DxO_DeepPRIME XD3.heic »).
 *
 * Copie SERVEUR (S3 CopyObject) : aucun octet ne transite en local, les
 * fichiers ne sont pas recompressés. Puis manifest mis à jour (original +
 * downloadName) et anciennes clés supprimées. Vignettes/affichages et ids
 * inchangés (la grille ne bouge pas).
 *
 * Usage : node --env-file=.env.local scripts/rename-originals.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { S3Client, CopyObjectCommand } from "@aws-sdk/client-s3";
import { requireR2, r2Client, deleteUrls, R2 } from "./r2.mjs";

const GALLERIES = [
  { slug: "chiringuito-aperol", prefix: "Chiringuito-Aperol" },
];

function ctOf(ext) {
  const e = (ext || "").toLowerCase();
  if (e === "heic" || e === "heif") return "image/heic";
  if (e === "png") return "image/png";
  return "image/jpeg";
}

/** Encode une clé pour CopySource (slashes conservés). */
function encodeKey(key) {
  return key.split("/").map(encodeURIComponent).join("/");
}

requireR2();
const client = r2Client();

for (const g of GALLERIES) {
  const manifestPath = join("public", "galeries", g.slug, "manifest.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const pad = String(manifest.photos.length).length >= 3 ? 3 : 3;

  console.log(`\n📦 ${g.slug} — renommage de ${manifest.photos.length} originaux`);
  const oldUrls = [];
  let done = 0;

  for (let i = 0; i < manifest.photos.length; i++) {
    const p = manifest.photos[i];
    const ext = (p.originalExt || p.downloadName.split(".").pop() || "heic").toLowerCase();
    const cleanName = `${g.prefix}-${String(i + 1).padStart(pad, "0")}.${ext}`;
    if (p.downloadName === cleanName) continue; // déjà renommé

    // Ancienne clé (décodée depuis l'URL publique)
    const oldKey = decodeURIComponent(p.original.replace(`${R2.publicUrl}/`, ""));
    const newKey = `galeries/${g.slug}/originals/${cleanName}`;

    await client.send(
      new CopyObjectCommand({
        Bucket: R2.bucket,
        CopySource: `${R2.bucket}/${encodeKey(oldKey)}`,
        Key: newKey,
        ContentType: ctOf(ext),
        MetadataDirective: "REPLACE",
      })
    );

    oldUrls.push(p.original);
    p.original = `${R2.publicUrl}/${encodeKey(newKey)}`;
    p.downloadName = cleanName;
    done++;
    if (done % 50 === 0) console.log(`   ✓ ${done} copiés…`);
  }

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`   ✓ ${done} copiés · manifest réécrit`);

  if (oldUrls.length) {
    const deleted = await deleteUrls(client, oldUrls);
    console.log(`   🧹 ${deleted} anciennes clés supprimées`);
  }
}

console.log("\n✅ Renommage terminé");
