"use client";

import { useEffect, useRef } from "react";
import { fadeInUp } from "@/lib/animations";
import { getProfileUrl, type ManagedAccount } from "@/lib/instagram-accounts";

/**
 * Bannière compacte « compte que j'anime », pensée pour s'empiler :
 * en-tête (nom, catégorie, chiffres, boutons plateformes) puis une rangée
 * défilante des derniers posts publiés. Chaque tuile pointe vers le post
 * réel ; les reels portent un badge lecture.
 */
export default function SocialFeature({ account }: { account: ManagedAccount }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const profileUrl = getProfileUrl(account.handle);

  useEffect(() => {
    if (rootRef.current) fadeInUp(rootRef.current, { y: 30 });
  }, []);

  // Priorité aux chiffres de visibilité 6 mois ; les publications ne
  // s'affichent qu'à défaut (moins parlantes qu'une portée réelle).
  const metrics: { v: string; l: string }[] = [];
  if (account.stats?.followers) metrics.push({ v: account.stats.followers, l: "abonnés" });
  if (account.stats?.views6m)
    metrics.push({ v: account.stats.views6m, l: "vues · 6 derniers mois" });
  if (account.stats?.reach6m)
    metrics.push({ v: account.stats.reach6m, l: "comptes touchés · 6 mois" });
  if (!account.stats?.views6m && !account.stats?.reach6m && account.stats?.posts)
    metrics.push({ v: account.stats.posts, l: "publications" });

  return (
    <div
      ref={rootRef}
      className="rounded-3xl border border-border bg-bg-card p-6 md:p-8 hover:border-border-hover transition-colors"
    >
      {/* En-tête : identité + chiffres + plateformes */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 mb-6">
        <div className="min-w-0 lg:flex-1">
          <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">
            {account.category}
          </p>
          <h3 className="text-xl md:text-2xl font-bold tracking-[-0.5px]">
            {account.name}
          </h3>
          {account.description && (
            <p className="text-sm text-text-secondary leading-relaxed mt-2 max-w-xl">
              {account.description}
            </p>
          )}
        </div>

        {metrics.length > 0 && (
          <div className="flex gap-8 flex-shrink-0">
            {metrics.map((m) => (
              <div key={m.l}>
                <p className="text-xl md:text-2xl font-bold gradient-text">{m.v}</p>
                <p className="text-xs text-text-tertiary mt-0.5">{m.l}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 flex-shrink-0">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
          >
            @{account.handle}
          </a>
          {account.facebook && (
            <a
              href={account.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
            >
              Facebook
            </a>
          )}
          {account.tiktok && (
            <a
              href={account.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
            >
              TikTok
            </a>
          )}
        </div>
      </div>

      {/* Derniers posts publiés — la rangée déborde jusqu'au bord de la carte :
          le post coupé suffit à signaler le scroll, la barre est masquée */}
      {account.feed && account.feed.length > 0 && (
        <div className="flex gap-2.5 overflow-x-auto -mx-6 md:-mx-8 px-6 md:px-8 snap-x [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {account.feed.map((item, i) => (
            <a
              key={i}
              href={item.post ?? profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-shrink-0 snap-start"
              aria-label={`Voir ce post de ${account.name} sur Instagram`}
            >
              <img
                src={item.img}
                alt={`Post récent de ${account.name}`}
                loading="lazy"
                className="h-32 md:h-40 aspect-[4/5] rounded-lg object-cover transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-lg"
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
        </div>
      )}
    </div>
  );
}
