export default function GalerieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Indexation décidée galerie par galerie (champ `private` du manifest),
  // dans generateMetadata de [slug]/page.tsx.
  return <>{children}</>;
}
