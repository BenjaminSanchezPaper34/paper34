"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PORTFOLIO_CATEGORIES } from "@/lib/constants";
import { staggerReveal } from "@/lib/animations";

const PORTFOLIO_ITEMS = [
  { id: 1, title: "Pampa Restaurant", category: "Design", image: "/images/portfolio/placeholder-1.jpg" },
  { id: 2, title: "Villa Margot", category: "Print", image: "/images/portfolio/placeholder-2.jpg" },
  { id: 3, title: "Site vitrine restaurant", category: "Web", image: "/images/portfolio/placeholder-3.jpg" },
  { id: 4, title: "Spot vidéo surf", category: "Vidéo", image: "/images/portfolio/placeholder-4.jpg" },
  { id: 5, title: "Domaine viticole", category: "Photo", image: "/images/portfolio/placeholder-5.jpg" },
  { id: 6, title: "Brasserie du port", category: "Design", image: "/images/portfolio/placeholder-6.jpg" },
  { id: 7, title: "Festival Agde", category: "Print", image: "/images/portfolio/placeholder-7.jpg" },
  { id: 8, title: "E-commerce boutique mode", category: "Web", image: "/images/portfolio/placeholder-8.jpg" },
  { id: 9, title: "Clip promotionnel", category: "Vidéo", image: "/images/portfolio/placeholder-9.jpg" },
  { id: 10, title: "Community management resto", category: "Réseaux sociaux", image: "/images/portfolio/placeholder-10.jpg" },
  { id: 11, title: "Campagne Instagram hôtel", category: "Réseaux sociaux", image: "/images/portfolio/placeholder-11.jpg" },
  { id: 12, title: "Landing page événement", category: "Web", image: "/images/portfolio/placeholder-12.jpg" },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState("Tous");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    filter === "Tous"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === filter);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".portfolio-card");
      staggerReveal(Array.from(cards), { trigger: gridRef.current, stagger: 0.08 });
    }
  }, [filter]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeLightbox]);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 bg-bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Portfolio
          </p>
          <h1 className="text-[clamp(36px,7vw,72px)] font-bold tracking-[-3px] leading-tight mb-6">
            Mes réalisations
          </h1>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Découvrez une sélection de projets réalisés pour des clients variés.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-bg-primary pb-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? "bg-accent text-white"
                    : "bg-bg-card text-text-secondary hover:text-text-primary hover:bg-bg-card-hover border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 md:pb-32 bg-bg-primary">
        <div
          ref={gridRef}
          className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setLightbox(item.id)}
              className="portfolio-card group relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg-card border border-border transition-all duration-500 hover:border-border-hover hover:shadow-xl hover:shadow-black/30"
            >
              {/* Placeholder gradient - replace with real images */}
              <div className="absolute inset-0 bg-gradient-to-br from-bg-card-hover to-bg-secondary" />
              <div className="absolute inset-0 flex items-center justify-center text-text-tertiary text-sm">
                {item.title}
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">
                  {item.category}
                </p>
                <h3 className="text-lg font-bold">{item.title}</h3>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-text-secondary mt-12">
            Aucun projet dans cette catégorie pour le moment.
          </p>
        )}
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="max-w-4xl w-full mx-6 rounded-2xl bg-bg-card border border-border p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-bg-secondary rounded-xl mb-6 flex items-center justify-center text-text-tertiary">
              Image du projet
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {PORTFOLIO_ITEMS.find((p) => p.id === lightbox)?.title}
            </h2>
            <p className="text-accent text-sm">
              {PORTFOLIO_ITEMS.find((p) => p.id === lightbox)?.category}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
