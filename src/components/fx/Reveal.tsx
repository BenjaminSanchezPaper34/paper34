"use client";

import { useEffect, useRef } from "react";
import { fadeInUp } from "@/lib/animations";

/**
 * Wrapper client "fade in up au scroll" — utilisable dans les pages
 * server components (portfolio, galeries) sans les passer en "use client".
 *
 * Usage : <Reveal><div>…contenu hero…</div></Reveal>
 */
export default function Reveal({
  children,
  y = 30,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) fadeInUp(ref.current, { y, delay });
  }, [y, delay]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
