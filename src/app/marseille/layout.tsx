import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio graphique à Marseille",
  description:
    "Paper34 à Marseille : création de sites web, identité visuelle, photo, vidéo et gestion des réseaux sociaux. Un interlocuteur sur place dans les Bouches-du-Rhône, la force d'un studio complet derrière.",
  keywords: [
    // Local Marseille
    "graphiste Marseille",
    "studio graphique Marseille",
    "création site web Marseille",
    "site internet Marseille",
    "community manager Marseille",
    "gestion réseaux sociaux Marseille",
    "identité visuelle Marseille",
    "logo Marseille",
    "photographe entreprise Marseille",
    "vidéo entreprise Marseille",
    "graphiste Bouches-du-Rhône",
    "graphiste Aix-en-Provence",
    // Marque
    "Paper34",
    "Paper34 Marseille",
  ],
  alternates: {
    canonical: "https://www.paper34.fr/marseille",
  },
  openGraph: {
    images: ["/og-image.jpg"],
    title: "Paper34 Marseille | Studio graphique",
    description:
      "Sites web, identité visuelle, photo, vidéo et réseaux sociaux — Paper34 s'installe à Marseille, avec un interlocuteur sur place.",
    url: "https://www.paper34.fr/marseille",
  },
};

export default function MarseilleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
