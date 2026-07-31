import type { MetadataRoute } from "next";

// Scrapers et SEO-bots sans bénéfice client, bloqués depuis la pause
// Vercel de juillet 2026 (1,9 M de requêtes edge, 300 Go de transfert).
// Les bots des moteurs de réponse IA (GPTBot, ClaudeBot, PerplexityBot…)
// sont volontairement AUTORISÉS depuis le 31/07/2026 : ils alimentent les
// citations et recommandations dans ChatGPT, Claude et Perplexity, et le
// coût est devenu négligeable depuis que les médias lourds sont sur R2.
const BLOCKED_BOTS = [
  "Bytespider",
  "CCBot",
  "Amazonbot",
  "meta-externalagent",
  "FacebookBot",
  "Applebot-Extended",
  "cohere-ai",
  "Diffbot",
  "ImagesiftBot",
  "PetalBot",
  "SemrushBot",
  "AhrefsBot",
  "MJ12bot",
  "DotBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...BLOCKED_BOTS.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/"],
      },
    ],
    sitemap: "https://www.paper34.fr/sitemap.xml",
  };
}
