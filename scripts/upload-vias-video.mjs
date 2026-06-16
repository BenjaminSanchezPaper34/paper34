/**
 * Upload de la vidéo hero Vias sur R2 (egress gratuit — hors git).
 * Lance : node --env-file=.env.local scripts/upload-vias-video.mjs
 */
import { requireR2, r2Client, putFile } from "./r2.mjs";

requireR2();
const client = r2Client();
const url = await putFile(client, "vias/hero.mp4", "public/vias/hero.mp4", "video/mp4");
console.log("UPLOADED:", url);
