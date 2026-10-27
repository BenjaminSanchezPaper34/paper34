"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const disabled = Boolean(pathname?.startsWith("/lab") || pathname?.startsWith("/galerie/"));

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop: (() => void) | undefined;
    const sync = () => {
      stop?.();
      stop = undefined;
      if (disabled || motion.matches) return;
      const lenis = new Lenis({
        duration: 1.2,
        anchors: true,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      let frame = 0;
      function raf(time: number) {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      }
      frame = requestAnimationFrame(raf);
      stop = () => { cancelAnimationFrame(frame); lenis.destroy(); };
    };
    sync();
    motion.addEventListener("change", sync);
    return () => { stop?.(); motion.removeEventListener("change", sync); };
  }, [disabled]);

  return <>{children}</>;
}
