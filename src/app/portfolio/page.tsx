import { fetchInstagramFeed } from "@/lib/instagram";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";

export default async function PortfolioPage() {
  const items = await fetchInstagramFeed();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 bg-bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Portfolio
          </p>
          <h1 className="text-[clamp(36px,7vw,72px)] font-bold tracking-[-3px] leading-tight mb-6">
            Mes r&eacute;alisations
          </h1>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            D&eacute;couvrez une s&eacute;lection de projets r&eacute;alis&eacute;s pour des clients vari&eacute;s.
          </p>
        </div>
      </section>

      <PortfolioGrid items={items} />
    </>
  );
}
