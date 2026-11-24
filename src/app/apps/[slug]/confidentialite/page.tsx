import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppDocView from "@/components/apps/AppDocView";
import { getDocApp, getDocSlugs } from "@/lib/app-docs";
import { appOgImages, getApp } from "@/lib/apps";

export function generateStaticParams() {
  return getDocSlugs().map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const app = getDocApp(slug);
  if (!app) return { title: "App introuvable" };
  const showcase = getApp(slug);
  const images = showcase ? appOgImages(showcase) : [{ url: app.icon }];
  return {
    title: `Politique de confidentialité de ${app.name}`,
    description: app.privacy.fr.intro.slice(0, 158),
    alternates: { canonical: `https://www.paper34.fr/apps/${app.slug}/confidentialite` },
    robots: app.noindex ? { index: false, follow: false } : undefined,
    openGraph: { images },
    twitter: { card: showcase?.ogImage ? "summary_large_image" : "summary", images: images.map((i) => i.url) },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getDocApp(slug);
  if (!app) notFound();
  return <AppDocView app={app} page="privacy" />;
}
