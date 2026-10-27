import type { Metadata } from "next";
import Accueil from "@/components/home/Accueil";

const title = "Communication globale à Agde — Toute votre communication. Un seul partenaire.";
const description = "Paper34, Benjamin Sanchez à Agde : identité, photo, vidéo, sites web et réseaux sociaux. Un seul partenaire pour votre communication, dans la durée.";
export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false }, // LABO : prototype non indexable.
  openGraph: { title, description },
  twitter: { title, description },
};

export default function HomePage() {
  return <Accueil />;
}
