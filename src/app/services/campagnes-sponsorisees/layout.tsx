import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campagnes sponsorisées Instagram, Facebook et Google Ads à Agde",
  description:
    "Publicité Meta (Instagram, Facebook) et Google Ads pour les restaurants, commerces et loisirs d'Agde et du littoral : visuels créés sur place, ciblage local, suivi des appels et réservations.",
  keywords: ["publicité Facebook Agde","publicité Instagram Agde","Google Ads Agde","campagne sponsorisée Hérault","Meta Ads restaurant","Google Ads Béziers","publicité locale Vias","Paper34"],
  alternates: { canonical: "https://www.paper34.fr/services/campagnes-sponsorisees" },
  openGraph: {
    images: ["/og-image.jpg"],
    title: "Campagnes sponsorisées à Agde | PAPER34",
    description: "Meta et Google Ads avec des visuels tournés sur place, un ciblage local et des résultats mesurés en appels et réservations.",
    url: "https://www.paper34.fr/services/campagnes-sponsorisees",
  },
};

export default function CampagnesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
