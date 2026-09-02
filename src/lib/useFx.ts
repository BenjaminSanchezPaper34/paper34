"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Harnais standard des effets WebGL/canvas (règle studio) :
 *  - `capable` : pointeur précis (desktop) ET pas de prefers-reduced-motion
 *  - `inView`  : l'élément approche du viewport (IntersectionObserver)
 *  - `on`      : les deux → on monte le canvas ; sinon fallback statique.
 * Un effet ne coûte rien tant qu'il n'est pas à l'écran, et jamais au doigt.
 */
export function useFx<T extends HTMLElement>(rootMargin = "160px 0px") {
  const ref = useRef<T>(null);
  const [capable, setCapable] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setCapable(fine.matches && motionOk.matches);
    update();
    fine.addEventListener("change", update);
    motionOk.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      motionOk.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, capable, inView, on: capable && inView };
}

/** Vidéo d'illustration : lecture seulement à l'écran (batterie, données). */
export function useInViewVideo(threshold = 0.35) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}
