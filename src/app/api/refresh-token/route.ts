import { NextResponse } from "next/server";

// Cette route rafraîchit le token Instagram automatiquement
// Appeler via un cron job (Vercel Cron ou externe) toutes les 50 jours
// GET /api/refresh-token?secret=VOTRE_CRON_SECRET

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // Protection : seul quelqu'un avec le secret peut rafraîchir
  if (secret !== process.env.CRON_SECRET) {
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
      // Mise à jour automatique de la variable d'environnement sur Vercel
      await fetch(
        `https://api.vercel.com/v10/projects/${vercelProjectId}/env`,
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
