"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PORTFOLIO_CATEGORIES } from "@/lib/constants";
import { gsap } from "@/lib/animations";

type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  type: "image" | "video";
  src: string;
  size: "small" | "wide" | "tall" | "featured";
};

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // Row 1-2 : featured (2x2) + 2 small (1x1) empilés + 1 tall (1x2)
  { id: 1, title: "Pampa Restaurant", category: "Design", type: "image", src: "/images/portfolio/placeholder.jpg", size: "featured" },
  { id: 2, title: "Villa Margot", category: "Print", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 3, title: "Spot vidéo surf", category: "Vidéo", type: "video", src: "/videos/videosd-paper34.mp4", size: "small" },
  { id: 4, title: "Site vitrine restaurant", category: "Web", type: "image", src: "/images/portfolio/placeholder.jpg", size: "tall" },
  // Row 3 : 4 small
  { id: 5, title: "Domaine viticole", category: "Photo", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 6, title: "Community management", category: "Réseaux sociaux", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 7, title: "Brasserie du port", category: "Design", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 8, title: "Festival Agde", category: "Print", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  // Row 4-5 : 1 tall + 2 small empilés + featured vidéo (2x2)
  { id: 9, title: "E-commerce mode", category: "Web", type: "image", src: "/images/portfolio/placeholder.jpg", size: "tall" },
  { id: 10, title: "Campagne Instagram", category: "Réseaux sociaux", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
  { id: 11, title: "Clip promotionnel", category: "Vidéo", type: "video", src: "/videos/videosd-paper34.mp4", size: "featured" },
  { id: 12, title: "Landing page événement", category: "Web", type: "image", src: "/images/portfolio/placeholder.jpg", size: "small" },
];

function BentoCard({
  item,
  onClick,
}: {
  item: PortfolioItem;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);

  // IntersectionObserver for autoplay videos on mobile
  useEffect(() => {
    if (item.type !== "video" || !videoRef.current) return;
    const video = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [item.type]);

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    wide: "col-span-2 row-span-1",
    tall: "col-span-1 row-span-2",
    featured: "col-span-2 row-span-2",
  };

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      className={`portfolio-card group relative rounded-2xl overflow-hidden bg-bg-card border border-border transition-all duration-500 hover:border-border-hover hover:shadow-2xl hover:shadow-black/40 ${sizeClasses[item.size]}`}
    >
      {/* Media */}
      {item.type === "video" ? (
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-bg-card-hover via-bg-secondary to-bg-card transition-transform duration-700 group-hover:scale-105" />
      )}

      {/* Video play icon */}
      {item.type === "video" && (
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center z-10">
          <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
        <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">
          {item.category}
        </p>
        <h3 className={`font-bold leading-tight ${item.size === "featured" ? "text-xl" : "text-base"}`}>
          {item.title}
        </h3>
      </div>

      {/* Placeholder text (remove when real images are added) */}
      {item.type === "image" && (
        <div className="absolute inset-0 flex items-center justify-center text-text-tertiary/30 text-xs pointer-events-none">
          {item.title}
        </div>
      )}
    </button>
  );
}

export default function PortfolioPage() {
  const [filter, setFilter] = useState("Tous");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    filter === "Tous"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === filter);

  const lightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".portfolio-card");
    gsap.fromTo(
      Array.from(cards),
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
      }
    );
  }, [filter]);

  const [slideDir, setSlideDir] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const lightboxContentRef = useRef<HTMLDivElement>(null);

  const closeLightbox = useCallback(() => {
    setSlideDir(null);
    setLightboxIndex(null);
  }, []);

  const navigateLightbox = useCallback(
    (direction: -1 | 1) => {
      if (lightboxIndex === null || isAnimating) return;
      const newIndex = lightboxIndex + direction;
      if (newIndex < 0 || newIndex >= filtered.length) return;

      setIsAnimating(true);
      setSlideDir(direction === 1 ? "left" : "right");

      setTimeout(() => {
        setLightboxIndex(newIndex);
        setSlideDir(direction === 1 ? "right" : "left");

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setSlideDir(null);
            setTimeout(() => setIsAnimating(false), 350);
          });
        });
      }, 300);
    },
    [lightboxIndex, filtered.length, isAnimating]
  );

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeLightbox, navigateLightbox]);

  // Swipe / trackpad navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const el = lightboxContentRef.current;
    if (!el) return;

    let accumulated = 0;
    let swipeTimeout: ReturnType<typeof setTimeout>;

    const onWheel = (e: WheelEvent) => {
      if (isAnimating) return;
      // Horizontal scroll (trackpad swipe)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        accumulated += e.deltaX;

        clearTimeout(swipeTimeout);
        swipeTimeout = setTimeout(() => { accumulated = 0; }, 200);

        if (accumulated > 80) {
          accumulated = 0;
          navigateLightbox(1);
        } else if (accumulated < -80) {
          accumulated = 0;
          navigateLightbox(-1);
        }
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchDeltaX.current = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    };

    const onTouchEnd = () => {
      if (isAnimating) return;
      if (touchDeltaX.current > 60) navigateLightbox(-1);
      if (touchDeltaX.current < -60) navigateLightbox(1);
      touchDeltaX.current = 0;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      clearTimeout(swipeTimeout);
    };
  }, [lightboxIndex, navigateLightbox, isAnimating]);

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

      {/* Bento Grid */}
      <section className="pb-24 md:pb-32 bg-bg-primary">
        <div
          ref={gridRef}
          className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-[10px]"
          style={{ gridAutoFlow: "dense" }}
        >
          {filtered.map((item, index) => (
            <BentoCard
              key={item.id}
              item={item}
              onClick={() => setLightboxIndex(index)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-text-secondary mt-12">
            Aucun projet dans cette catégorie pour le moment.
          </p>
        )}
      </section>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
            aria-label="Fermer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation arrows */}
          {lightboxIndex !== null && lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(-1);
              }}
              className="absolute left-4 md:left-8 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              aria-label="Précédent"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {lightboxIndex !== null && lightboxIndex < filtered.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(1);
              }}
              className="absolute right-4 md:right-8 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              aria-label="Suivant"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Content with slide animation — adapts to media proportions */}
          <div
            ref={lightboxContentRef}
            className={`flex flex-col items-center justify-center max-h-[92vh] px-4 md:px-16 transition-all duration-300 ease-out ${
              slideDir === "left"
                ? "-translate-x-16 opacity-0"
                : slideDir === "right"
                ? "translate-x-16 opacity-0"
                : "translate-x-0 opacity-100"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxItem.type === "video" ? (
              <video
                key={lightboxItem.id}
                src={lightboxItem.src}
                controls
                autoPlay
                loop
                className="max-w-[90vw] max-h-[80vh] rounded-2xl object-contain"
              />
            ) : (
              <img
                key={lightboxItem.id}
                src={lightboxItem.src}
                alt={lightboxItem.title}
                className="max-w-[90vw] max-h-[80vh] rounded-2xl object-contain"
                onError={(e) => {
                  // Fallback placeholder si pas d'image
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.parentElement!.insertAdjacentHTML(
                    "beforeend",
                    `<div class="w-[60vw] max-w-3xl aspect-video rounded-2xl bg-[#111] flex items-center justify-center text-[#6e6e73]">${lightboxItem.title}</div>`
                  );
                }}
              />
            )}
            <div className="mt-4 text-center shrink-0">
              <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">
                {lightboxItem.category}
              </p>
              <h2 className="text-xl font-bold">{lightboxItem.title}</h2>
              <p className="text-sm text-text-tertiary mt-1">
                {lightboxIndex !== null ? lightboxIndex + 1 : 0} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
