import type { MetadataRoute } from "next";

// Crawlers voraces (IA/scrapers/SEO-bots) bloqués : en juillet 2026,
// 1,9 M de requêtes edge et 300 Go de transfert ont mis le compte Vercel
// en pause. Google et Bing restent autorisés via la règle « * ».
const BLOCKED_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "meta-externalagent",
  "FacebookBot",
  "PerplexityBot",
  "Applebot-Extended",
  "Google-Extended",
  "anthropic-ai",
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
