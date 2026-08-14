import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Développement d'applications",
  description:
    "Développement d'applications web et mobiles sur-mesure : réservation, fidélité, outils métier, tableaux de bord. Design et développement au même endroit — studio basé à Agde et Marseille, intervention partout en France.",
  keywords: [
    // National
    "développement application sur mesure",
    "création application mobile",
    "développement application web",
    "application métier PME",
    "PWA sur mesure",
    "application réservation",
    "application fidélité commerce",
    "tableau de bord sur mesure",
    "développeur application freelance",
    // Local
    "développement application Hérault",
    "création application Montpellier",
    "développeur application Béziers",
    "développement application Marseille",
    // Marque
    "Paper34",
    "Paper34 applications",
  ],
  alternates: {
    canonical: "https://www.paper34.fr/services/applications",
  },
  openGraph: {
    images: ["/og-image.jpg"],
    title: "Développement d'applications | PAPER34",
    description:
      "Applications web et mobiles sur-mesure, avec le design en plus : réservation, fidélité, outils métier, tableaux de bord.",
    url: "https://www.paper34.fr/services/applications",
  },
};

export default function ApplicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
