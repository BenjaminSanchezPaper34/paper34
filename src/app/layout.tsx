import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ConsentProvider } from "@/components/legal/Consent";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FooterGate from "@/components/layout/FooterGate";
import LenisProvider from "@/components/layout/LenisProvider";
import JsonLd from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display : réservée aux titres (DESIGN.md §2). Variable → un seul fichier.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "wdth"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Zoom laissé libre : accessibilité (WCAG 1.4.4) + exigence Lighthouse.
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.paper34.fr"),
  title: {
    default: "PAPER34 | Studio graphique à Agde — de la carte de visite à ChatGPT",
    template: "%s | PAPER34 Studio graphique",
  },
  description:
    "Studio graphique à Agde (Hérault) : identité visuelle, print, photo, vidéo, réseaux sociaux et sites web rapides, visibles sur Google, Apple Plans et les IA. Devis gratuit.",
  keywords: [
    "studio graphique Agde",
    "graphiste Agde",
    "graphiste Hérault",
    "design graphique 34",
    "identité visuelle Agde",
    "logo Agde",
    "communication visuelle",
    "création graphique",
    "flyer Agde",
    "site web Agde",
    "référencement IA ChatGPT",
    "fiche Google Apple Plans",
    "vidéo promotionnelle",
    "photographe Agde",
    "Paper34",
    "Benjamin Sanchez graphiste",
  ],
  authors: [{ name: "Benjamin Sanchez", url: "https://www.paper34.fr" }],
  creator: "PAPER34",
  publisher: "PAPER34",
  formatDetection: {
    telephone: true,
    email: true,
  },
  alternates: {
    canonical: "https://www.paper34.fr",
  },
  openGraph: {
    title: "PAPER34 | De la carte de visite à ChatGPT",
    description:
      "Un seul studio pour être vu partout où vos clients vous cherchent : identité, print, photo, vidéo, réseaux et sites web. Agde, Hérault.",
    url: "https://www.paper34.fr",
    siteName: "PAPER34",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.paper34.fr/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PAPER34, studio graphique à Agde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PAPER34 | De la carte de visite à ChatGPT",
    description:
      "Identité, print, photo, vidéo, réseaux et sites web visibles sur Google, Apple Plans et les IA. Studio graphique à Agde.",
    images: ["https://www.paper34.fr/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "PJOX5EXmeoVBypORgHntA_g_3hUU_9AkI02AY-7SS28",
  },
  category: "design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${bricolage.variable} antialiased`}>
      <head>
        {/* Google Analytics n'est PAS chargé ici : il dépose des cookies et
            ne peut se déclencher qu'après consentement explicite (CNIL).
            L'injection est faite par ConsentProvider une fois l'accord donné. */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`grain font-[family-name:var(--font-inter),sans-serif]`}>
        <JsonLd />
        <ConsentProvider>
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <FooterGate>
            <Footer />
          </FooterGate>
        </LenisProvider>
        </ConsentProvider>
        {/* Mesure d'audience Vercel (sans cookie) + Core Web Vitals réels */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
