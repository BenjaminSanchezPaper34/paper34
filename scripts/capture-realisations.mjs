/**
 * capture-realisations.mjs — Régénère les aperçus des sites clients.
 *
 * Les vignettes de /services/creation-site-web ne sont plus générées à la
 * volée par Microlink (quota gratuit atteint dès quelques visiteurs → images
 * vides). Elles sont capturées une fois ici, optimisées, puis poussées sur
 * R2 (egress gratuit) sous site/realisations/<slug>.jpg.
 *
 * À lancer après avoir ajouté un projet dans src/lib/web-projects.ts, ou
 * quand un site client a été redesigné :
 *   node --env-file=.env.local scripts/capture-realisations.mjs
 *   node --env-file=.env.local scripts/capture-realisations.mjs cem
 *     (un seul projet : passer son slug en argument)
 */

import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { requireR2, r2Client, putFile } from "./r2.mjs";

const WORK = join(tmpdir(), "paper34-shots");
mkdirSync(WORK, { recursive: true });

function projectSlug(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Lit name/url depuis web-projects.ts (source unique de vérité). */
function readProjects() {
  const src = readFileSync("src/lib/web-projects.ts", "utf8");
  const body = src.slice(src.indexOf("WEB_PROJECTS"), src.indexOf("];"));
  return [...body.matchAll(/name:\s*"([^"]+)",\s*\n\s*url:\s*"([^"]+)"/g)].map(
    (m) => ({ name: m[1], url: m[2] })
  );
}

const only = process.argv[2];
const projects = readProjects().filter(
  (p) => !only || projectSlug(p.name) === only
);

if (projects.length === 0) {
  console.error(only ? `Aucun projet « ${only} »` : "Aucun projet trouvé");
  process.exit(1);
}

requireR2();
const client = r2Client();

for (const p of projects) {
  const id = projectSlug(p.name);
  const api =
    `https://api.microlink.io/?url=${encodeURIComponent(p.url)}` +
    `&screenshot=true&meta=false&embed=screenshot.url&type=jpeg` +
    `&viewport.width=1280&viewport.height=800&waitUntil=networkidle0`;

  try {
    const res = await fetch(api);
    if (!res.ok) {
      console.warn(`⚠️  ${id} : capture impossible (HTTP ${res.status})`);
      continue;
    }
    const raw = join(WORK, `${id}-raw.jpg`);
    const opt = join(WORK, `${id}.jpg`);
    writeFileSync(raw, Buffer.from(await res.arrayBuffer()));

    await sharp(raw)
      .resize({ width: 1280, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(opt);

    const url = await putFile(client, `site/realisations/${id}.jpg`, opt, "image/jpeg");
    console.log(`✓ ${p.name} → ${url}`);
  } catch (err) {
    console.warn(`⚠️  ${id} : ${err.message}`);
  }

  // Microlink limite les appels : on espace les captures.
  await new Promise((r) => setTimeout(r, 2500));
}

console.log("\n✅ Aperçus à jour");
