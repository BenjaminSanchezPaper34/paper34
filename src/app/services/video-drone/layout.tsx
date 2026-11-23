import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vidéo et photo par drone à Agde et au Cap d'Agde",
  description:
    "Vidéo et photo aérienne par drone à Agde, au Cap d'Agde et sur le littoral : plages, campings, loisirs, immobilier, événements. Tournage, montage et livraison.",
  keywords: [
    "vidéo drone Agde",
    "drone Cap d'Agde",
    "prise de vue aérienne Agde",
    "photo drone Hérault",
    "vidéo aérienne Marseillan",
    "drone Vias",
    "drone Sète",
    "film drone camping",
    "vidéo drone immobilier",
    "drone FPV Agde",
    "Paper34",
  ],
  alternates: { canonical: "https://www.paper34.fr/services/video-drone" },
  openGraph: {
    images: ["/og-image.jpg"],
    title: "Vidéo et photo par drone à Agde | PAPER34",
    description: "Votre lieu vu du ciel : des images aériennes tournées et montées par un studio, pour le site, les réseaux et la publicité.",
    url: "https://www.paper34.fr/services/video-drone",
  },
};

export default function VideoDroneLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
