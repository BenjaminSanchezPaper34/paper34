import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppDocPage from "@/components/apps/AppDocPage";
import { appOgImages, getApp, getHostedDocSlugs } from "@/lib/apps";

export function generateStaticParams() {
  return getHostedDocSlugs().map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return { title: "App introuvable" };
  return {
    title: `Politique de confidentialité de ${app.name}`,
    description: (app.privacy?.intro ?? "").slice(0, 158),
    alternates: { canonical: `https://www.paper34.fr/apps/${app.slug}/confidentialite` },
    openGraph: { images: appOgImages(app) },
    twitter: { card: app.ogImage ? "summary_large_image" : "summary", images: appOgImages(app).map((i) => i.url) },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app || !app.privacy) notFound();
  return (
    <AppDocPage
      app={app}
      kicker="Vos données"
      title="Politique de"
      accent="confidentialité"
      intro={app.privacy.intro}
      sections={app.privacy.sections}
      note={`Dernière mise à jour : ${app.privacy.updated}.`}
      other={{ href: `/apps/${app.slug}/assistance`, label: `Assistance de ${app.name}` }}
    />
  );
}
