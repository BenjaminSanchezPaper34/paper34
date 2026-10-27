import type { Metadata } from "next";
import Accueil from "@/components/home/Accueil";

const title = "Communication à Agde — Graphisme, photo, vidéo et web";
const description = "Benjamin Sanchez, Paper34 à Agde : identité visuelle, photo, vidéo, sites internet et réseaux sociaux. Un projet ponctuel ou un accompagnement régulier.";
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
