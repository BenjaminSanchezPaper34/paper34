import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Zoom laissé libre : accessibilité (WCAG 1.4.4) + exigence Lighthouse.
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.paper34.fr"),
  // Audit Search Console du 05/09/2026 : la création de site web devient la
  // promesse n° 1 du site (requêtes « agence web agde », « création site
  // internet agde »). Le print n'est plus un axe de référencement.
  title: {
    default: "PAPER34 | Création de site web à Agde — studio graphique",
    template: "%s | PAPER34",
  },
  description:
    "Agence web et studio graphique à Agde (Hérault). Création de sites web pour restaurants, commerces et loisirs d'Agde, Marseillan, Vias, Sète et Béziers : rapides, trouvés sur Google, cités par ChatGPT. Identité visuelle, réseaux sociaux, photo et vidéo.",
  keywords: [
    "création site web Agde",
    "agence web Agde",
    "création site internet Agde",
    "agence web Hérault",
    "site internet restaurant Hérault",
    "création site web Marseillan",
    "création site web Sète",
    "création site web Béziers",
    "studio graphique Agde",
    "graphiste Agde",
    "identité visuelle Agde",
    "gestion réseaux sociaux Agde",
    "photographe Agde",
    "Paper34",
    "Benjamin Sanchez",
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
    title: "PAPER34 | Création de site web à Agde",
    description:
      "Des sites web qui font venir les clients : restaurants, commerces et loisirs d'Agde au Cap, de Marseillan à Sète. Studio graphique complet, devis gratuit.",
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
    title: "PAPER34 | Création de site web à Agde",
    description:
      "Sites web, identité visuelle, réseaux sociaux, photo et vidéo : le studio des commerces d'Agde et du littoral.",
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
    <html lang="fr" className={`${inter.variable} antialiased`}>
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
