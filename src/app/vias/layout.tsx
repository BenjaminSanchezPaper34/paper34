import type { Metadata } from "next";
import { Young_Serif, Cal_Sans } from "next/font/google";

/* Young Serif — titrage : empattements francs, écho médiéval mais contemporain */
const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-young-serif",
});

/* Cal Sans — texte & interface : géométrique, ultra lisible, intemporelle */
const calSans = Cal_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cal-sans",
});

export const metadata: Metadata = {
  title: "Vias — Proposition d'identité visuelle | Paper34",
  description:
    "Proposition d'identité visuelle pour la commune de Vias (Hérault). Logo, charte graphique et déclinaisons — un travail Paper34.",
  // Proposition spontanée : accessible par lien, non indexée tant que non validée.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function ViasLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${youngSerif.variable} ${calSans.variable}`}>{children}</div>
  );
}
