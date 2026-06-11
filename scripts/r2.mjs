/**
 * r2.mjs — Helpers Cloudflare R2 (S3-compatible) pour les scripts de galerie.
 * Lit les identifiants depuis l'env (.env.local). Le transfert sortant R2 est
 * gratuit → plus de limite de bande passante sur les galeries.
 */

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutBucketCorsCommand,
} from "@aws-sdk/client-s3";
import { readFileSync } from "fs";

export const R2 = {
  bucket: process.env.R2_BUCKET,
  endpoint: process.env.R2_ENDPOINT,
  publicUrl: process.env.R2_PUBLIC_URL,
};

export function requireR2() {
  for (const k of ["R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET", "R2_ENDPOINT", "R2_PUBLIC_URL"]) {
    if (!process.env[k]) {
      console.error(`❌ ${k} manquant. Lance avec : node --env-file=.env.local …`);
      process.exit(1);
    }
  }
}

export function r2Client() {
  return new S3Client({
    region: "auto",
    endpoint: R2.endpoint,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
}

/** Upload un fichier local → retourne l'URL publique. */
export async function putFile(client, key, localPath, contentType) {
  await client.send(
    new PutObjectCommand({
      Bucket: R2.bucket,
      Key: key,
      Body: readFileSync(localPath),
      ContentType: contentType,
    })
  );
  return `${R2.publicUrl}/${key}`;
}

/** Supprime des clés (liste d'URLs publiques ou de clés). */
export async function deleteUrls(client, urlsOrKeys) {
  const keys = urlsOrKeys
    .map((u) => (u.startsWith("http") ? u.replace(`${R2.publicUrl}/`, "") : u))
    .map((k) => ({ Key: decodeURIComponent(k) }));
  if (!keys.length) return 0;
  // DeleteObjects accepte 1000 max par appel
  let done = 0;
  for (let i = 0; i < keys.length; i += 1000) {
    await client.send(
      new DeleteObjectsCommand({
        Bucket: R2.bucket,
        Delete: { Objects: keys.slice(i, i + 1000) },
      })
    );
    done += Math.min(1000, keys.length - i);
  }
  return done;
}

/** Supprime tous les objets sous un préfixe. */
export async function deletePrefix(client, prefix) {
  let count = 0;
  let token;
  do {
    const res = await client.send(
      new ListObjectsV2Command({ Bucket: R2.bucket, Prefix: prefix, ContinuationToken: token })
    );
    const objs = (res.Contents || []).map((o) => ({ Key: o.Key }));
    if (objs.length) {
      await client.send(new DeleteObjectsCommand({ Bucket: R2.bucket, Delete: { Objects: objs } }));
      count += objs.length;
    }
    token = res.IsTruncated ? res.NextContinuationToken : undefined;
  } while (token);
  return count;
}

/** Configure le CORS du bucket : GET public (fichiers déjà publics). */
export async function setCors(client) {
  await client.send(
    new PutBucketCorsCommand({
      Bucket: R2.bucket,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedMethods: ["GET", "HEAD"],
            AllowedOrigins: ["*"],
            AllowedHeaders: ["*"],
            ExposeHeaders: ["Content-Length", "Content-Type"],
            MaxAgeSeconds: 3600,
          },
        ],
      },
    })
  );
}
