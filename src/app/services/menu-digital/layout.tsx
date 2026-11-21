import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu digital et carte QR code pour restaurant",
  description:
    "Une carte de restaurant en ligne, ouverte par QR code : lisible sur téléphone, en plusieurs langues, mise à jour en un instant, sans appli ni PDF. Studio à Agde.",
  keywords: [
    "menu digital restaurant",
    "carte QR code restaurant",
    "menu QR code",
    "carte en ligne restaurant",
    "menu numérique",
    "carte digitale",
    "menu multilingue restaurant",
    "QR code menu Agde",
    "carte restaurant Hérault",
    "Paper34",
  ],
  alternates: { canonical: "https://www.paper34.fr/services/menu-digital" },
  openGraph: {
    images: ["/og-image.jpg"],
    title: "Menu digital et carte QR code | PAPER34",
    description: "La carte de votre restaurant sur le téléphone de vos clients : un QR code sur la table, et c'est ouvert.",
    url: "https://www.paper34.fr/services/menu-digital",
  },
};

export default function MenuDigitalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
