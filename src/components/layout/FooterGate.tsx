"use client";

import { usePathname } from "next/navigation";

/**
 * Cache le footer sur les pages immersives (/lab, galeries plein écran).
 * Le composant Footer reste un Server Component.
 */
export default function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Masqué sur les pages immersives ; les galeries clients le gardent
  // (porte d'entrée vers le reste du site).
  if (pathname?.startsWith("/lab") || pathname?.startsWith("/vias"))
    return null;
  return <>{children}</>;
}
