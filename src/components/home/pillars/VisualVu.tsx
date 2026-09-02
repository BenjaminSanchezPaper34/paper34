"use client";

import PhoneFrame from "./PhoneFrame";
import { useInViewVideo } from "@/lib/useFx";

const R2 = "https://pub-054d5e4ec36144bea38e07a1452fe2b0.r2.dev";

/** Le reel de la Saint-Laurent (La Guinguette de Bessan) — tourné et monté par le studio. */
const REEL = {
  video: `${R2}/galeries/guinguette-st-laurent/video/reel-st-laurent.mp4`,
  poster: `${R2}/galeries/guinguette-st-laurent/display/reel-st-laurent.jpg`,
  handle: "@guinguettedebessan",
};

/** Deux vrais posts de comptes animés par le studio, en tuiles flottantes. */
const TILES = [
  { img: `${R2}/site/social/chiringuitovias/recent/post-01.jpg`, handle: "@chiringuitovias", cls: "-left-6 top-10 -rotate-6 md:-left-14" },
  { img: `${R2}/site/social/lesdelicesdefarinette/recent/post-01.jpg`, handle: "@lesdelicesdefarinette", cls: "-right-6 bottom-16 rotate-6 md:-right-14" },
];

/**
 * Pilier « Être vu » : un reel réel qui tourne dans un téléphone (lecture
 * seulement à l'écran, muet, poster en attendant), entouré de posts réels.
 */
export default function VisualVu() {
  const videoRef = useInViewVideo();
  return (
    <div className="relative mx-auto w-full max-w-[420px] py-6 md:py-2">
      <div className="mx-auto w-[58%]">
        <PhoneFrame>
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster={REEL.poster}
            className="h-full w-full object-cover"
            aria-label="Reel de la Saint-Laurent à La Guinguette de Bessan"
          >
            <source src={REEL.video} type="video/mp4" />
          </video>
          {/* Habillage type reel */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-5 pt-16 text-left">
            <p className="text-sm font-semibold text-white">{REEL.handle}</p>
            <p className="text-xs text-white/70">Saint-Laurent · la fête de Bessan</p>
          </div>
        </PhoneFrame>
      </div>
      {TILES.map((t, i) => (
        <figure
          key={t.handle}
          className={`pill-float absolute w-[38%] overflow-hidden rounded-2xl border border-white/12 shadow-2xl shadow-black/60 ${t.cls}`}
          style={{ animationDelay: `${0.6 + i * 0.5}s` }}
        >
          <img src={t.img} alt={`Post Instagram ${t.handle}`} loading="lazy" className="aspect-square w-full object-cover" />
          <figcaption className="absolute inset-x-0 bottom-0 bg-black/60 px-2.5 py-1.5 text-[11px] text-white/85 backdrop-blur-sm">
            {t.handle}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
