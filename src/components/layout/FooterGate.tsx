"use client";

import { usePathname } from "next/navigation";

/**
 * Cache le footer sur les pages internes (ex: /studio).
 * Le composant Footer reste un Server Component.
 */
export default function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return <>{children}</>;
}
