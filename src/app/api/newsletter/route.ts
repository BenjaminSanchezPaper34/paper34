import { NextResponse } from "next/server";

/**
 * Inscription newsletter : ajoute le contact à la liste du prestataire d'envoi.
 * Variables d'environnement (Vercel) : NEWSLETTER_API_KEY, NEWSLETTER_LIST_ID.
 * Le nom du prestataire n'apparaît jamais côté visiteur (choix de Benjamin).
 * Sans configuration : 503, et le formulaire propose d'écrire directement.
 */
export async function POST(req: Request) {
  const key = process.env.NEWSLETTER_API_KEY;
  const list = process.env.NEWSLETTER_LIST_ID;
  if (!key || !list) {
    return NextResponse.json({ ok: false, raison: "indisponible" }, { status: 503 });
  }

  let body: { email?: string; consentement?: boolean; site?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, raison: "requete" }, { status: 400 });
  }
  // Champ piège invisible : un robot le remplit, un humain non.
  if (body.site) return NextResponse.json({ ok: true });

  const email = String(body.email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, raison: "email" }, { status: 400 });
  }
  if (body.consentement !== true) {
    return NextResponse.json({ ok: false, raison: "consentement" }, { status: 400 });
  }

  const res = await fetch(`https://api.resend.com/audiences/${list}/contacts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, unsubscribed: false }),
  });
  // Contact déjà inscrit = succès pour le visiteur.
  if (!res.ok && res.status !== 409) {
    return NextResponse.json({ ok: false, raison: "envoi" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
