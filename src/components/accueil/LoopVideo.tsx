"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./accueil.module.css";

/**
 * Vidéo muette en boucle, avec bouton lecture/pause (grand média à coins arrondis, veille america.gov 29/10).
 * Ne charge et ne joue que visible à l'écran ; en mouvement réduit, elle attend un clic.
 */
export default function LoopVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [manual, setManual] = useState(false); // le visiteur a choisi : on ne relance plus seul

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const io = new IntersectionObserver(([entry]) => {
      if (manual) return;
      if (entry.isIntersecting) video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      else { video.pause(); setPlaying(false); }
    }, { threshold: 0.25 });
    io.observe(video);
    return () => io.disconnect();
  }, [manual]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    setManual(true);
    if (video.paused) video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else { video.pause(); setPlaying(false); }
  };

  return (
    <div className={styles.videoWrap}>
      <video ref={ref} className={styles.mediaFill} src={src} poster={poster} muted loop playsInline preload="none" aria-label={label} />
      <button type="button" className={styles.videoToggle} onClick={toggle} aria-label={playing ? `Mettre en pause : ${label}` : `Lire : ${label}`}>
        {playing ? "Pause" : "Lecture"}
      </button>
    </div>
  );
}
