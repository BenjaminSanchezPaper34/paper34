import type { Metadata } from "next";

export const metadata: Metadata = {
  // Audit GSC 05/09/2026 : la page sortait en position 61-76 sur « gestion
  // réseaux sociaux pézenas / béziers » faute de nommer villes et clients.
  title: "Gestion des réseaux sociaux à Agde, Pézenas et Béziers",
  description:
    "Community manager à Agde : stratégie, photo, vidéo et publication pour les restaurants, commerces et loisirs d'Agde, Marseillan, Vias, Bessan, Pézenas, Sète et Béziers. Comptes animés au quotidien, reporting mensuel, publicité Meta et TikTok.",
  keywords: [
    // Local — priorité
    "gestion réseaux sociaux Agde",
    "community manager Agde",
    "gestion réseaux sociaux Pézenas",
    "gestion réseaux sociaux Béziers",
    "gestion réseaux sociaux Sète",
    "community manager Hérault",
    "gestion Instagram restaurant Hérault",
    "social media Marseillan",
    "social media Vias",
    // National
    "gestion réseaux sociaux",
    "community manager",
    "community management",
    "freelance social media",
    "agence social media France",
    "gestion Instagram professionnelle",
    "création contenu Instagram",
    "stratégie social media",
    "Meta Ads",
    "TikTok Ads",
    "publicité Instagram",
    "shooting réseaux sociaux",
    "reels Instagram pro",
    // Marque
    "Paper34",
    "Benjamin Sanchez social",
  ],
  alternates: {
    canonical: "https://www.paper34.fr/services/reseaux-sociaux",
  },
  openGraph: {
    images: ["/og-image.jpg"],
    title: "Gestion des réseaux sociaux à Agde | PAPER34",
    description:
      "Stratégie, photo, vidéo, publication : les comptes Instagram de restaurants et commerces d'Agde, Vias, Bessan et Marseillan que j'anime au quotidien.",
    url: "https://www.paper34.fr/services/reseaux-sociaux",
  },
};

export default function ReseauxSociauxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
