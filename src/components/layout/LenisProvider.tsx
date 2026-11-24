"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  // Désactivé sur les pages internes (dashboard) — scroll natif plus adapté
  const disabled =
    (pathname?.startsWith("/lab") || pathname?.startsWith("/galerie/")) ??
    false;

  useEffect(() => {
    if (disabled) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [disabled]);

  // Changement de page : Lenis garde sa position de défilement et la nouvelle page s'ouvrait
  // en bas (ex. carte cliquée en bas de /apps). On remonte en haut, sauf si l'adresse vise une ancre.
  useEffect(() => {
    if (window.location.hash) return;
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
