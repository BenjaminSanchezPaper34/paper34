"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { fadeInUp } from "@/lib/animations";
import { MANAGED_ACCOUNTS } from "@/lib/instagram-accounts";

/**
 * Preuve sociale en home : les vrais derniers posts des comptes clients
 * animés par le studio, avec le chiffre de visibilité qui porte le message.
 * Objectif : rendre la page « Gestion des réseaux sociaux » accessible en
 * un clic depuis l'accueil (elle était à deux niveaux de profondeur).
 */
export default function SocialProof() {
  const headerRef = useRef<HTMLDivElement>(null);

  const accounts = MANAGED_ACCOUNTS.filter((a) => a.feed && a.feed.length > 0);

  // Posts de tous les comptes, entrelacés pour varier les univers.
  const posts = accounts
    .flatMap((a) =>
      (a.feed ?? []).map((item, i) => ({ ...item, account: a, rank: i }))
    )
    .sort((x, y) => x.rank - y.rank)
    .slice(0, 12);

  // Chiffre mis en avant : celui du compte le plus exposé.
  const headline = accounts.find((a) => a.stats?.views6m)?.stats?.views6m;

  useEffect(() => {
    if (headerRef.current) fadeInUp(headerRef.current, { y: 30 });
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-bg-secondary overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Réseaux sociaux
            </p>
            <h2 className="text-[clamp(28px,5vw,56px)] font-bold tracking-[-2px] leading-tight">
              J&apos;anime leurs comptes
              <br />
              <span className="gradient-text">au quotidien.</span>
            </h2>
            {headline && (
              <p className="text-lg text-text-secondary mt-5 max-w-lg">
                Stratégie, shooting, publication — jusqu&apos;à{" "}
                <strong className="text-text-primary font-semibold">
                  {headline} de vues sur les 6 derniers mois
                </strong>{" "}
                pour un seul compte. Voici leurs dernières publications.
              </p>
            )}
          </div>

          <Link
            href="/services/reseaux-sociaux"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
          >
            Voir les comptes et les chiffres
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Rangée de posts : déborde volontairement de la grille pour inviter au scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="w-6 lg:w-8 flex-shrink-0" aria-hidden />
        {posts.map((item, i) => (
          <a
            key={i}
            href={item.post ?? `https://www.instagram.com/${item.account.handle}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-shrink-0"
            aria-label={`Voir ce post de ${item.account.name} sur Instagram`}
          >
            <img
              src={item.img}
              alt={`Publication récente pour ${item.account.name}`}
              loading="lazy"
              className="h-48 md:h-64 aspect-[4/5] rounded-xl object-cover transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl"
            />
            {item.video && (
              <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center pointer-events-none">
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 p-3 pt-8 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="block text-xs font-semibold text-white truncate">
                @{item.account.handle}
              </span>
            </span>
          </a>
        ))}

        {/* Dernière tuile : accès à la page complète */}
        <Link
          href="/services/reseaux-sociaux"
          className="group flex-shrink-0 h-48 md:h-64 aspect-[4/5] rounded-xl border border-border bg-bg-card flex flex-col items-center justify-center gap-2 px-4 text-center transition-all duration-300 hover:border-accent hover:bg-accent/5"
        >
          <span className="text-sm font-semibold text-text-primary leading-tight">
            Tous les comptes
            <br />
            et leurs résultats
          </span>
          <span className="text-accent text-xl leading-none transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
        <div className="w-6 lg:w-8 flex-shrink-0" aria-hidden />
      </div>
    </section>
  );
}
