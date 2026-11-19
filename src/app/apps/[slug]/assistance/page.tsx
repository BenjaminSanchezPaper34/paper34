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
    title: `Assistance de ${app.name}`,
    description: `Aide et questions fréquentes sur ${app.name} : jouer, achat, restauration, progression. Contact par e-mail.`,
    alternates: { canonical: `https://www.paper34.fr/apps/${app.slug}/assistance` },
    openGraph: { images: appOgImages(app) },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app || !app.support) notFound();
  return (
    <AppDocPage
      app={app}
      kicker="Aide"
      title="Assistance"
      accent={app.name}
      intro={app.support.intro}
      sections={app.support.questions}
      other={{ href: `/apps/${app.slug}/confidentialite`, label: `Politique de confidentialité de ${app.name}` }}
    />
  );
}
