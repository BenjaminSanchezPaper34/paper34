import type { Metadata } from "next";

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
  return <>{children}</>;
}
