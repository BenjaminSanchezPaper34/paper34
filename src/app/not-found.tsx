import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-bg-primary px-6">
      <div className="text-center max-w-lg">
        <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
          Erreur 404
        </p>
        <h1 className="text-[clamp(48px,10vw,96px)] font-bold tracking-[-3px] leading-none mb-6">
          Page introuvable
        </h1>
        <p className="text-text-secondary text-lg mb-10">
          La page que vous cherchez n&apos;existe pas ou a \u00e9t\u00e9 d\u00e9plac\u00e9e.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow"
        >
          Retour \u00e0 l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
