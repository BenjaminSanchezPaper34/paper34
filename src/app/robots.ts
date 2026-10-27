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
  "OAI-AdsBot", // crawler de validation des annonces ChatGPT Ads (24/09/2026)
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

// LABO — site d'essai : tout est interdit aux robots (ne pas reprendre dans main).
// Les listes ci-dessus restent pour mémoire, inutilisées sur cette branche.
void BLOCKED_BOTS; void AI_BOTS;
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }] };
}
