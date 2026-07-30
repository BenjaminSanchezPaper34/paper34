import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graphisme & impression",
  description:
    "Du logo à l'objet imprimé : création graphique, impression et livraison de vos supports. Cartes de visite, flyers, bâches, panneaux, textile brodé ou floqué, objets publicitaires. Studio basé à Agde, livraison partout en France.",
  keywords: [
    // National
    "graphiste freelance",
    "création graphique",
    "impression flyers",
    "impression cartes de visite",
    "supports imprimés entreprise",
    "textile personnalisé entreprise",
    "flocage broderie vêtements de travail",
    "objets publicitaires",
    "signalétique chantier",
    "kakemono roll-up",
    // Local
    "graphiste Agde",
    "imprimerie Agde",
    "graphiste Hérault",
    "flocage textile Béziers",
    "signalétique Sète",
    // Marque
    "Paper34",
    "Benjamin Sanchez graphiste",
  ],
  alternates: {
    canonical: "https://www.paper34.fr/services/graphisme",
  },
  openGraph: {
    images: ["/og-image.jpg"],
    title: "Graphisme & impression | PAPER34",
    description:
      "Création graphique, impression et livraison : print, grand format, textile et objets. Un seul interlocuteur, du logo à l'objet fini.",
    url: "https://www.paper34.fr/services/graphisme",
  },
};

export default function GraphismeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
