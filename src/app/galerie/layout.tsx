import type { Metadata } from "next";

export const metadata: Metadata = {
  // Galeries privées : jamais indexées, accessibles par lien direct uniquement
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function GalerieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
