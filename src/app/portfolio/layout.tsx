import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — R\u00e9alisations graphiques et cr\u00e9atives",
  description:
    "D\u00e9couvrez les r\u00e9alisations de PAPER34 : logos, chartes graphiques, flyers, sites web, vid\u00e9os et photographies. Projets r\u00e9alis\u00e9s pour des clients \u00e0 Agde, B\u00e9ziers, S\u00e8te et Montpellier.",
  alternates: {
    canonical: "https://paper34.fr/portfolio",
  },
  openGraph: {
    title: "Portfolio | PAPER34 Studio graphique \u00e0 Agde",
    description:
      "Logos, chartes graphiques, supports print, sites web, vid\u00e9os \u2014 d\u00e9couvrez nos r\u00e9alisations.",
    url: "https://paper34.fr/portfolio",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
