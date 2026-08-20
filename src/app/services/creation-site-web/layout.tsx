import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Création de site web sur-mesure",
  description:
    "Création de sites web sur-mesure partout en France. Sites vitrines, e-commerce, landing pages — rapides sur mobile, référencés sur Google et lisibles par les IA (ChatGPT, Gemini, Perplexity). Studio basé à Agde. Devis gratuit.",
  keywords: [
    // National
    "création site web",
    "création site internet",
    "créateur de sites web",
    "agence web France",
    "site vitrine sur-mesure",
    "site e-commerce sur-mesure",
    "freelance web France",
    "développeur web freelance",
    "refonte site web",
    "site responsive",
    "site web SEO",
    // Référencement sur les moteurs de réponse IA (GEO) — requêtes émergentes
    "site web optimisé IA",
    "référencement ChatGPT",
    "être visible sur ChatGPT",
    "référencement IA générative",
    "GEO référencement",
    "site web rapide",
    "landing page",
    "création site WordPress",
    "site Next.js",
    // Local (pour rester visible localement aussi)
    "création site web Agde",
    "agence web Hérault",
    "site internet Cap d'Agde",
    "création site web Béziers",
    "création site web Sète",
    "création site web Montpellier",
    // Marque
    "Paper34",
    "Benjamin Sanchez web",
  ],
  alternates: {
    canonical: "https://www.paper34.fr/services/creation-site-web",
  },
  openGraph: {
    images: ["/og-image.jpg"],
    title: "Création de site web sur-mesure | PAPER34",
    description:
      "Sites vitrines, e-commerce, landing pages. Design moderne, responsive, optimisé SEO. Intervention partout en France.",
    url: "https://www.paper34.fr/services/creation-site-web",
  },
};

export default function CreationSiteWebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
