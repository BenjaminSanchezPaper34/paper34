import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Création de site web sur-mesure — Site vitrine, e-commerce & SEO",
  description:
    "Création de sites web sur-mesure partout en France. Sites vitrines, e-commerce, landing pages — design moderne, responsive, optimisé SEO. Studio basé à Agde, intervention 100 % à distance. Devis gratuit.",
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
    canonical: "https://paper34.fr/services/creation-site-web",
  },
  openGraph: {
    title: "Création de site web sur-mesure | PAPER34",
    description:
      "Sites vitrines, e-commerce, landing pages. Design moderne, responsive, optimisé SEO. Intervention partout en France.",
    url: "https://paper34.fr/services/creation-site-web",
  },
};

export default function CreationSiteWebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
