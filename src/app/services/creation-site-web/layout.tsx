import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cr\u00e9ation de site web \u00e0 Agde \u2014 Site vitrine, e-commerce & SEO",
  description:
    "Cr\u00e9ation de sites web sur-mesure \u00e0 Agde (34300, H\u00e9rault). Sites vitrines, e-commerce, landing pages \u2014 design moderne, responsive, optimis\u00e9 SEO. Devis gratuit pour Agde, B\u00e9ziers, S\u00e8te et Montpellier.",
  keywords: [
    "cr\u00e9ation site web Agde",
    "cr\u00e9ation site internet Agde",
    "cr\u00e9ateur site web H\u00e9rault",
    "site vitrine Agde",
    "site e-commerce Agde",
    "agence web Agde",
    "agence web H\u00e9rault",
    "d\u00e9veloppeur web 34",
    "site internet Cap d'Agde",
    "cr\u00e9ation site web B\u00e9ziers",
    "cr\u00e9ation site web S\u00e8te",
    "site responsive Agde",
    "refonte site web Agde",
    "Paper34",
    "Benjamin Sanchez web",
  ],
  alternates: {
    canonical: "https://paper34.fr/services/creation-site-web",
  },
  openGraph: {
    title: "Cr\u00e9ation de site web \u00e0 Agde | PAPER34",
    description:
      "Sites vitrines, e-commerce, landing pages. Design moderne, responsive, optimis\u00e9 SEO. D\u00e9couvrez mes r\u00e9alisations.",
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
