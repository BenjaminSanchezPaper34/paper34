"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    if (!mobileOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        document.querySelector<HTMLButtonElement>('[aria-controls="mobile-navigation"]')?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [mobileOpen]);
  // Navbar intelligente : masquée en descente, revient en remontée.
  // Passé 80px, le fond gradient laisse place à un verre dépoli.
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 140);
      setScrolled(y > 80);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pas de navbar sur les pages immersives (lab, proposition Vias).
  if (pathname?.startsWith("/lab") || pathname?.startsWith("/vias"))
    return null;

  const links = pathname === "/" ? [
    { label: "Accueil", href: "/#accueil" },
    { label: "Accompagnement", href: "/#accompagnement" },
    { label: "Expertises", href: "/#expertises" },
    { label: "Réalisations", href: "/#realisations" },
    { label: "À propos", href: "/#a-propos" },
  ] : NAV_LINKS;

  return (
    <nav
      onFocusCapture={() => setHidden(false)}
      aria-label="Navigation principale"
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)] ${
        hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Gradient fade : visible en haut de page uniquement */}
      <div
        className={`absolute -top-12 left-0 right-0 bottom-0 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none transition-opacity duration-500 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
        style={{ paddingBottom: "2rem", bottom: "-2rem" }}
      />
      {/* Verre dépoli : apparaît après 80px de scroll */}
      <div
        className={`absolute inset-0 bg-black/55 backdrop-blur-2xl border-b border-border transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={pathname === "/" ? "/#accueil" : "/"} onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center gap-3 group ml-16">
            <img
              src="/images/logo-paper34.svg"
              alt="PAPER34"
              width={154}
              height={28}
              className="h-7 transition-opacity group-hover:opacity-80"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium transition-colors duration-300 relative group inline-flex items-center min-h-11 ${
                  pathname === link.href
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <Link
              href="/contact"
              className={`min-h-11 inline-flex items-center ml-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow ${
                pathname === "/contact" ? "ring-2 ring-accent/50" : ""
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="lg:hidden flex flex-col justify-center gap-1.5 p-2 min-h-11 min-w-11"
            aria-label="Menu"
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu : démonté fermé, aucun lien masqué dans l’ordre clavier. */}
      {mobileOpen && <div
        id="mobile-navigation"
        data-lenis-prevent
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain" : "max-h-0"
        }`}
      >
        <div className="bg-bg-primary/95 backdrop-blur-2xl border-t border-border px-6 py-6 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`min-h-11 flex items-center text-lg font-medium transition-colors ${
                pathname === link.href
                  ? "text-accent"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow"
          >
            Contact
          </Link>
        </div>
      </div>}
    </nav>
  );
}
