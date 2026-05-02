"use client";

import Link from "next/link";
import SplashCursor from "@/components/lab/SplashCursor";
import AsciiOrbsBg from "@/components/lab/AsciiOrbsBg";

export default function SplashCursorLabPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Arrière-plan : orbes ASCII */}
      <AsciiOrbsBg />

      {/* Couche fluid au-dessus des orbes mais sous le contenu */}
      <SplashCursor />

      {/* UI au-dessus de tout */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="px-6 py-5 flex items-center justify-between text-xs">
          <Link
            href="/lab"
            className="text-white/60 hover:text-white transition-colors"
          >
            ← Lab
          </Link>
          <span className="text-white/40 uppercase tracking-[0.2em]">
            Splash cursor · expérience
          </span>
        </header>

        <section className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">
              Bougez la souris
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-[-2px] leading-[0.95] mb-6">
              Du <span className="gradient-text">mouvement</span>
              <br />
              dans le pixel.
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto">
              Test d&apos;un hero interactif inspiré Hitem3D — simulation de
              fluide WebGL au-dessus d&apos;orbes ASCII décoratifs.
            </p>
          </div>
        </section>

        <footer className="px-6 py-5 text-center text-[11px] text-white/40">
          Pure prototype — non destiné à la prod tel quel.
        </footer>
      </div>
    </main>
  );
}
