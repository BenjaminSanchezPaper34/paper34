"use client";

import { useEffect, useRef } from "react";

/**
 * Vidéo d'aperçu d'une app, en tête des captures comme sur l'App Store.
 * Lecture automatique en boucle et sans son ; reste sur l'affiche si le visiteur
 * préfère réduire les animations.
 */
export default function AppPreviewVideo({
  src,
  poster,
  label,
  className,
  width = 600,
  height = 1300,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      video.currentTime = 0;
    }
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      width={width}
      height={height}
      className={className}
    />
  );
}
