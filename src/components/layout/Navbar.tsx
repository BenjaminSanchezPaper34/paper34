"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";

type NavApp = { slug: string; name: string; icon: string };

/** Une entrée du menu est active sur sa page et, pour une rubrique, sur ses sous-pages. */
function isActive(pathname: string | null, href: string) {
  return pathname === href || (href !== "/" && !!pathname?.startsWith(`${href}/`));
}

export default function Navbar({ apps = [] }: { apps?: NavApp[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Navbar intelligente : masquée en descente, revient en remontée.
  // Passé 80px, le fond gradient laisse place à un verre dépoli.
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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

  return (
    <nav
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
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo-paper34.svg"
              alt="PAPER34"
              className="h-7 transition-opacity group-hover:opacity-80"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <span key={link.href} className="flex items-center gap-2.5">
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-300 relative group ${
                    isActive(pathname, link.href)
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                      isActive(pathname, link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
                {/* Rubrique Apps : l'icône de chaque app mène droit à sa page. */}
                {link.href === "/apps" &&
                  apps.map((app) => (
                    <Link
                      key={app.slug}
                      href={`/apps/${app.slug}`}
                      aria-label={app.name}
                      title={app.name}
                      className="transition-opacity hover:opacity-80"
                    >
                      <img src={app.icon} alt="" width={28} height={28} className="h-7 w-7 rounded-[22%]" />
                    </Link>
                  ))}
              </span>
            ))}
            <Link
              href="/contact"
              className={`ml-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow ${
                pathname === "/contact" ? "ring-2 ring-accent/50" : ""
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
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

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-[36rem]" : "max-h-0"
        }`}
      >
        <div className="bg-bg-primary/95 backdrop-blur-2xl border-t border-border px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="flex flex-col gap-1">
              <Link
                href={link.href}
                className={`text-lg font-medium transition-colors ${
                  isActive(pathname, link.href)
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
              {link.href === "/apps" &&
                apps.map((app) => (
                  <Link
                    key={app.slug}
                    href={`/apps/${app.slug}`}
                    className="flex min-h-11 items-center gap-3 text-base text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <img src={app.icon} alt="" width={32} height={32} className="h-8 w-8 rounded-[22%]" />
                    {app.name}
                  </Link>
                ))}
            </div>
          ))}
          <Link
            href="/contact"
            className="mt-2 rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
