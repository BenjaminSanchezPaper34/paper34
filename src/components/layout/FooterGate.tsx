"use client";

import { usePathname } from "next/navigation";

/**
 * Cache le footer sur les pages immersives (/lab, galeries plein écran).
 * Le composant Footer reste un Server Component.
 */
export default function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (
    pathname?.startsWith("/lab") ||
    pathname?.startsWith("/galerie/") ||
    pathname?.startsWith("/vias")
  )
    return null;
  return <>{children}</>;
}
