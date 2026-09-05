import type { MetadataRoute } from "next";

// Scrapers et SEO-bots sans bénéfice client, bloqués depuis la pause
// Vercel de juillet 2026 (1,9 M de requêtes edge, 300 Go de transfert).
// Les bots des moteurs de réponse IA sont volontairement AUTORISÉS (règle
// studio GEO) : ils alimentent les citations dans ChatGPT, Claude,
// Perplexity, Siri/Apple Intelligence et les AI Overviews, et le coût est
// devenu négligeable depuis que les médias lourds sont sur R2.
const BLOCKED_BOTS = [
  "Bytespider",
  "CCBot",
  "Amazonbot",
  "meta-externalagent",
  "FacebookBot",
  "cohere-ai",
  "Diffbot",
  "ImagesiftBot",
  "PetalBot",
  "SemrushBot",
  "AhrefsBot",
  "MJ12bot",
  "DotBot",
];

// Autorisés explicitement (lisibilité par les IA — CLAUDE.md studio, section GEO).
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...BLOCKED_BOTS.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
      // Audit GSC du 05/09/2026 : plus aucun Disallow sur /_next/ — Google
      // doit pouvoir charger les CSS/JS de /_next/static pour rendre les
      // pages ; les bloquer lui faisait évaluer une page dégradée.
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.paper34.fr/sitemap.xml",
  };
}
