import type { Metadata } from "next";
import { Young_Serif, Cal_Sans, Lexend } from "next/font/google";

/* Young Serif — titrage : empattements francs, écho médiéval mais contemporain */
const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-young-serif",
});

/* Cal Sans — accents & interface : géométrique, chaleureuse (labels, boutons) */
const calSans = Cal_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cal-sans",
});

/* Lexend — lecture : variable, dessinée pour la lisibilité (corps de texte) */
const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Proposition d'identité visuelle pour Vias",
  description:
    "Proposition d'identité visuelle pour la commune de Vias (Hérault). Logo, charte graphique et déclinaisons. Un travail Paper34.",
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
    <div className={`${youngSerif.variable} ${calSans.variable} ${lexend.variable}`}>
      {children}
    </div>
  );
}
