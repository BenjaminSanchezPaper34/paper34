import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Demandez un devis gratuit",
  description:
    "Contactez PAPER34 pour votre projet de communication \u00e0 Agde. Devis gratuit pour logo, identit\u00e9 visuelle, site web, vid\u00e9o, photo. T\u00e9l : 07 82 34 32 27. Email : contact@paper34.fr.",
  alternates: {
    canonical: "https://paper34.fr/contact",
  },
  openGraph: {
    title: "Contact | PAPER34 Studio graphique \u00e0 Agde",
    description:
      "Discutons de votre projet. Devis gratuit, r\u00e9ponse rapide. Studio graphique \u00e0 Agde, H\u00e9rault.",
    url: "https://paper34.fr/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
