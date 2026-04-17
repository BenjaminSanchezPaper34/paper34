import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestion des réseaux sociaux — Instagram, Facebook, TikTok, LinkedIn",
  description:
    "Gestion complète de vos réseaux sociaux : stratégie éditoriale, création de contenu photo et vidéo, animation de communauté, publicité sponsorisée. Studio basé à Agde, intervention partout en France.",
  keywords: [
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
    // Local
    "community manager Agde",
    "gestion réseaux sociaux Hérault",
    "social media Béziers",
    "social media Sète",
    // Marque
    "Paper34",
    "Benjamin Sanchez social",
  ],
  alternates: {
    canonical: "https://paper34.fr/services/reseaux-sociaux",
  },
  openGraph: {
    title: "Gestion des réseaux sociaux | PAPER34",
    description:
      "Stratégie, création de contenu, animation. Voir les comptes Instagram que je gère pour mes clients.",
    url: "https://paper34.fr/services/reseaux-sociaux",
  },
};

export default function ReseauxSociauxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
