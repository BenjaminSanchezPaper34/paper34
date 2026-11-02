import type { Metadata } from "next";
import Accueil from "@/components/accueil/Accueil";

// LABO : accueil v3 (02/11/2026). L'ancien accueil (components/home) reste intact pour comparaison.
const title = "Benjamin Sanchez, photographe, vidéaste et graphiste à Agde | Paper34";
const description = "Des images qui donnent envie de venir : photo, vidéo, réseaux sociaux, sites et supports pour les établissements d'Agde et de l'Hérault.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description },
  twitter: { title, description },
};

export default function HomePage() {
  return <Accueil />;
}
