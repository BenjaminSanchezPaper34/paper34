"use client";

import { useEffect, useRef } from "react";
import { fadeInUp } from "@/lib/animations";
import { getProfileUrl, type ManagedAccount } from "@/lib/instagram-accounts";

/** Logos plateformes (SVG inline, monochromes, hérités de currentColor) */
function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.8" cy="6.2" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2.1 0-3.5 1.3-3.5 3.6V11H8.5v3h2.4v7h2.6z" />
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 3c.4 1.9 1.7 3.4 3.9 3.7v3c-1.5 0-2.8-.5-3.9-1.3v6.4c0 3.7-2.6 6.2-6 6.2-3.2 0-5.6-2.3-5.6-5.4 0-3.4 2.9-5.6 6.3-5.3v3.1c-.3-.1-.7-.2-1.1-.2-1.4 0-2.4 1-2.4 2.4 0 1.4 1 2.4 2.6 2.4 1.7 0 2.8-1.3 2.8-3.3V3h3.4z" />
    </svg>
  );
}

/**
 * Bannière compacte « compte que j'anime », pensée pour s'empiler :
 * identité + boutons plateformes (logos), bande de chiffres clés,
 * puis la rangée défilante des derniers posts (débord de carte,
 * barre masquée — le post coupé signale le scroll).
 */
export default function SocialFeature({ account }: { account: ManagedAccount }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const profileUrl = getProfileUrl(account.handle);

  useEffect(() => {
    if (rootRef.current) fadeInUp(rootRef.current, { y: 30 });
  }, []);

  // Les vues 6 mois portent le message ; à défaut, le volume de publications.
  const metrics: { v: string; l: string }[] = [];
  if (account.stats?.views6m)
    metrics.push({ v: account.stats.views6m, l: "vues sur les 6 derniers mois" });
  if (account.stats?.followers) metrics.push({ v: account.stats.followers, l: "abonnés" });
  if (!account.stats?.views6m && account.stats?.posts)
    metrics.push({ v: account.stats.posts, l: "publications" });

  return (
    <div
      ref={rootRef}
      className="rounded-3xl border border-border bg-bg-card p-6 md:p-8 hover:border-border-hover transition-colors"
    >
      {/* En-tête deux colonnes, alignées en haut :
          gauche = titre + légende · droite = liens puis chiffres */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
        <div className="min-w-0 md:max-w-[55%]">
          <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">
            {account.category}
          </p>
          <h3 className="text-xl md:text-2xl font-bold tracking-[-0.5px]">
            {account.name}
          </h3>
          {account.description && (
            <p className="text-sm text-text-secondary leading-relaxed mt-2">
              {account.description}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start md:items-end gap-4 flex-shrink-0">
          <div className="flex flex-wrap md:justify-end items-center gap-2">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
            >
              <InstagramIcon />
              @{account.handle}
            </a>
            {account.facebook && (
              <a
                href={account.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Page Facebook de ${account.name}`}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
              >
                <FacebookIcon />
                Facebook
              </a>
            )}
            {account.tiktok && (
              <a
                href={account.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Compte TikTok de ${account.name}`}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
              >
                <TikTokIcon />
                TikTok
              </a>
            )}
          </div>

          {metrics.length > 0 && (
            <div className="flex gap-8 md:text-right">
              {metrics.map((m) => (
                <div key={m.l}>
                  <p className="text-2xl md:text-3xl font-bold gradient-text leading-none">
                    {m.v}
                  </p>
                  <p className="text-xs md:text-sm text-text-tertiary mt-1.5">{m.l}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Derniers posts publiés — la rangée déborde jusqu'au bord de la carte,
          barre masquée. Des cales en tête et en queue recréent le padding de la
          carte : il défile avec le contenu. Pas de scroll-snap : au chargement,
          il aimantait le premier post au bord et avalait la cale. */}
      {account.feed && account.feed.length > 0 && (
        <div className="flex gap-2.5 overflow-x-auto -mx-6 md:-mx-8 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="w-3.5 md:w-[22px] flex-shrink-0" aria-hidden />
          {account.feed.map((item, i) => (
            <a
              key={i}
              href={item.post ?? profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-shrink-0"
              aria-label={`Voir ce post de ${account.name} sur Instagram`}
            >
              <img
                src={item.img}
                alt={`Post récent de ${account.name}`}
                loading="lazy"
                className="h-40 md:h-52 aspect-[4/5] rounded-lg object-cover transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-lg"
              />
              {item.video && (
                <span className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center pointer-events-none">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <polygon points="6 4 20 12 6 20 6 4" />
                  </svg>
                </span>
              )}
            </a>
          ))}

          {/* Dernière tuile : invitation à poursuivre sur le compte */}
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 h-40 md:h-52 aspect-[4/5] rounded-lg border border-border bg-bg-secondary/60 flex flex-col items-center justify-center gap-2 px-3 text-center transition-all duration-300 hover:border-accent hover:bg-accent/5"
          >
            <span className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent transition-transform duration-300 group-hover:scale-110">
              <InstagramIcon className="w-5 h-5" />
            </span>
            <span className="text-sm font-semibold text-text-primary leading-tight">
              Voir tout le compte
            </span>
            <span className="text-xs text-text-tertiary">@{account.handle}</span>
            <span className="text-accent text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>

          <div className="w-3.5 md:w-[22px] flex-shrink-0" aria-hidden />
        </div>
      )}
    </div>
  );
}
