import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/layout/LenisProvider";
import JsonLd from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paper34.fr"),
  title: {
    default: "PAPER34 | Studio graphique à Agde 34300",
    template: "%s | PAPER34 Studio graphique",
  },
  description:
    "Studio graphique à Agde (34300, Hérault). Création d'identité visuelle, communication print, présence digitale, vidéos promotionnelles, photographie et illustrations. Devis gratuit.",
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
    "vidéo promotionnelle",
    "photographe Agde",
    "Paper34",
    "Benjamin Sanchez graphiste",
  ],
  authors: [{ name: "Benjamin Sanchez", url: "https://paper34.fr" }],
  creator: "PAPER34",
  publisher: "PAPER34",
  formatDetection: {
    telephone: true,
    email: true,
  },
  alternates: {
    canonical: "https://paper34.fr",
  },
  openGraph: {
    title: "PAPER34 | Studio graphique à Agde",
    description:
      "Votre communication globale au même endroit. Design, print, digital, vidéo, photo. Studio graphique à Agde, Hérault.",
    url: "https://paper34.fr",
    siteName: "PAPER34",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://paper34.fr/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PAPER34 — Studio graphique à Agde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PAPER34 | Studio graphique à Agde",
    description:
      "Identité visuelle, print, digital, vidéo, photo — un studio graphique complet à Agde.",
    images: ["https://paper34.fr/og-image.jpg"],
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
    <html lang="fr" className={`${inter.variable} antialiased`}>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8GK54Y4FEL" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8GK54Y4FEL');
            `,
          }}
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`grain font-[family-name:var(--font-inter),sans-serif]`}>
        <JsonLd />
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
