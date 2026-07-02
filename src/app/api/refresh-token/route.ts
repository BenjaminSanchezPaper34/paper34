import { NextResponse } from "next/server";

// Cette route rafraîchit le token Instagram automatiquement
// Appeler via un cron job (Vercel Cron ou externe) toutes les 50 jours
// GET /api/refresh-token?secret=VOTRE_CRON_SECRET

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // Protection. Vercel Cron n'interpole PAS ${CRON_SECRET} dans vercel.json :
  // il envoie le secret via l'en-tête « Authorization: Bearer <CRON_SECRET> »
  // (automatique dès que la variable d'env CRON_SECRET existe). On accepte
  // aussi ?secret= pour les tests manuels.
  const authHeader = request.headers.get("authorization");
  const fromCron = authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const fromQuery = secret !== null && secret === process.env.CRON_SECRET;
  if (!process.env.CRON_SECRET || (!fromCron && !fromQuery)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const currentToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!currentToken) {
    return NextResponse.json({ error: "Pas de token configuré" }, { status: 400 });
  }

  try {
    // Échange le token actuel contre un nouveau (60 jours)
    const res = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`
    );

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json(
        { error: "Échec du rafraîchissement", details: err },
        { status: 500 }
      );
    }

    const data = await res.json();

    // Le nouveau token est dans data.access_token
    // Il faut le mettre à jour dans Vercel via l'API
    const vercelToken = process.env.VERCEL_TOKEN;
    const vercelProjectId = process.env.VERCEL_PROJECT_ID;

    if (vercelToken && vercelProjectId) {
      // Mise à jour automatique de la variable d'environnement sur Vercel.
      // upsert=true : sans lui, Vercel refuse quand la variable existe déjà
      // (c'est ce qui a laissé le token expirer en juin 2026).
      const envRes = await fetch(
        `https://api.vercel.com/v10/projects/${vercelProjectId}/env?upsert=true`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${vercelToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key: "INSTAGRAM_ACCESS_TOKEN",
            value: data.access_token,
            type: "encrypted",
            target: ["production", "preview"],
          }),
        }
      );

      // Échec de la mise à jour env → 500, pour que l'invocation cron
      // apparaisse EN ERREUR dans les logs Vercel (pas d'échec silencieux).
      if (!envRes.ok) {
        const envErr = await envRes.json().catch(() => ({}));
        return NextResponse.json(
          { error: "Token rafraîchi mais mise à jour Vercel échouée", details: envErr },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Token rafraîchi et mis à jour sur Vercel",
        expires_in: data.expires_in,
      });
    }

    // Si pas de Vercel API token, retourne le nouveau token pour mise à jour manuelle
    return NextResponse.json({
      success: true,
      message: "Token rafraîchi — mets à jour manuellement dans Vercel",
      new_token: data.access_token,
      expires_in: data.expires_in,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur", details: String(error) },
      { status: 500 }
    );
  }
}
