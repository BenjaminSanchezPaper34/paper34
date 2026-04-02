import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Graphisme, sites web, r\u00e9seaux sociaux, vid\u00e9o et photo",
  description:
    "D\u00e9couvrez les services de PAPER34 \u00e0 Agde : identit\u00e9 visuelle, communication print, cr\u00e9ation de sites web, gestion des r\u00e9seaux sociaux, vid\u00e9os promotionnelles, photographie et illustrations. Devis gratuit.",
  alternates: {
    canonical: "https://paper34.fr/services",
  },
  openGraph: {
    title: "Nos services | PAPER34 Studio graphique \u00e0 Agde",
    description:
      "Identit\u00e9 visuelle, print, digital, vid\u00e9o, photo \u2014 tous vos besoins en communication au m\u00eame endroit.",
    url: "https://paper34.fr/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
