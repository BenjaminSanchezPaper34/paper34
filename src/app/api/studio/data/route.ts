import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

/**
 * API de sync pour le dashboard /studio.
 * Protégée par CRON_SECRET (réutilisation du secret existant).
 * Stocke un seul JSON dans Vercel Blob (pathname fixe).
 */

const BLOB_PATH = "studio-data.json";

function isAuthorized(req: NextRequest): boolean {
  const secret = req.nextUrl.searchParams.get("secret");
  return Boolean(secret) && secret === process.env.CRON_SECRET;
}

/** Lit la donnée stockée. Retourne null si inexistant. */
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Cherche le blob (l'API Blob ne sait pas lire un blob par path direct,
    // il faut d'abord lister puis fetch l'URL retournée)
    const { blobs } = await list({ prefix: BLOB_PATH, limit: 1 });
    if (blobs.length === 0) {
      return NextResponse.json({ data: null }, { status: 200 });
    }

    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ data: null }, { status: 200 });
    }
    const data = await res.json();
    return NextResponse.json(
      { data, updatedAt: blobs[0].uploadedAt },
      {
        status: 200,
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Read failed", details: String(e) },
      { status: 500 }
    );
  }
}

/** Écrit la donnée. Body = { data: StudioData } */
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body || typeof body !== "object" || !body.data) {
      return NextResponse.json(
        { error: "Missing data field" },
        { status: 400 }
      );
    }

    const blob = await put(BLOB_PATH, JSON.stringify(body.data), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    return NextResponse.json(
      { success: true, url: blob.url, updatedAt: new Date().toISOString() },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Write failed", details: String(e) },
      { status: 500 }
    );
  }
}
