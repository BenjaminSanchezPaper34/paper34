import type { Metadata } from "next";

export const metadata: Metadata = {
  // Requête cible n° 1 (audit GSC 05/09/2026) : « agence web agde » /
  // « création site internet agde », page 2 → objectif page 1. Le local
  // passe devant le national dans le titre, la description et les mots-clés.
  title: "Création de site web à Agde et dans l'Hérault — agence web",
  description:
    "Agence web à Agde : création de sites vitrines et e-commerce pour les restaurants, commerces et loisirs d'Agde, Marseillan, Vias, Sète, Pézenas et Béziers. Rapides sur mobile, en tête sur Google, cités par ChatGPT. Devis gratuit, à partir de 800 €.",
  keywords: [
    // Local — priorité
    "création site web Agde",
    "agence web Agde",
    "création site internet Agde",
    "agence web Hérault",
    "site internet Cap d'Agde",
    "création site web Marseillan",
    "création site web Vias",
    "création site web Sète",
    "création site web Pézenas",
    "création site web Béziers",
    "création site web Montpellier",
    "site internet restaurant Hérault",
    "site web commerce Agde",
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
    // Marque
    "Paper34",
    "Benjamin Sanchez web",
  ],
  alternates: {
    canonical: "https://www.paper34.fr/services/creation-site-web",
  },
  openGraph: {
    images: ["/og-image.jpg"],
    title: "Création de site web à Agde | PAPER34",
    description:
      "Sites vitrines et e-commerce pour les restaurants, commerces et loisirs d'Agde et du littoral de l'Hérault. Rapides, référencés, cités par les IA.",
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
