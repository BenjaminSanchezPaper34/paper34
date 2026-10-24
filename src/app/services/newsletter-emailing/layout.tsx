import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter et campagnes emailing à Agde pour restaurants et commerces",
  description:
    "Newsletter et campagnes emailing : inscription intégrée à votre site, fichier clients conforme RGPD, e-mails conçus avec vos photos et envoyés au bon moment. Studio à Agde.",
  keywords: ["newsletter restaurant","campagne emailing Agde","emailing Hérault","newsletter commerce","marketing e-mail local","fichier clients RGPD","Paper34"],
  alternates: { canonical: "https://www.paper34.fr/services/newsletter-emailing" },
  openGraph: {
    images: ["/og-image.jpg"],
    title: "Newsletter et emailing à Agde | PAPER34",
    description: "Une liste de clients qui vous appartient, alimentée par votre site et vos réseaux, et des e-mails qui font revenir.",
    url: "https://www.paper34.fr/services/newsletter-emailing",
  },
};

export default function EmailingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
