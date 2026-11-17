import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Création d'application iPhone, Apple Watch, Mac et web",
  description:
    "Création d'applications iPhone, iPad, Apple Watch, Mac et web, de la maquette à la publication sur l'App Store. Design et code au même endroit, à Agde.",
  keywords: [
    // National
    "création application iPhone",
    "développeur iOS freelance",
    "publication App Store",
    "application Apple Watch",
    "application Mac",
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
    "création application Agde",
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
    title: "Création d'applications iPhone, Apple Watch, Mac et web | PAPER34",
    description:
      "De la maquette à l'App Store : je conçois et développe des applications sur mesure, avec le design en plus. Deux apps déjà publiées.",
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
