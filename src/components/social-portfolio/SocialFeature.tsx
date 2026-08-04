"use client";

import { useEffect, useRef } from "react";
import { fadeInUp } from "@/lib/animations";
import PhoneMockup from "./PhoneMockup";
import { getProfileUrl, type ManagedAccount } from "@/lib/instagram-accounts";

/**
 * Bloc vedette « compte que j'anime » : mockup iPhone avec le vrai feed,
 * infos + chiffres du compte, liens vers chaque plateforme, puis une bande
 * défilante de visuels (affiches créées + photos shootées) pour montrer
 * l'étendue du contenu produit. Chaque visuel renvoie vers le profil.
 */
export default function SocialFeature({ account }: { account: ManagedAccount }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const profileUrl = getProfileUrl(account.handle);

  useEffect(() => {
    if (rootRef.current) fadeInUp(rootRef.current, { y: 40 });
  }, []);

  const metrics: { v: string; l: string }[] = [];
  if (account.stats?.followers) metrics.push({ v: account.stats.followers, l: "abonnés" });
  if (account.stats?.posts) metrics.push({ v: account.stats.posts, l: "publications" });
  if (account.stats?.reach6m)
    metrics.push({ v: account.stats.reach6m, l: "comptes touchés (6 mois)" });
  if (account.since)
    metrics.push({ v: `${new Date().getFullYear() - account.since} ans`, l: "d'accompagnement" });

  return (
    <div ref={rootRef}>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-center">
        {/* iPhone avec le vrai feed */}
        <div className="justify-self-center">
          <PhoneMockup account={account} />
        </div>

        {/* Infos du compte */}
        <div>
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">
            {account.category}
          </p>
          <h3 className="text-2xl md:text-3xl font-bold tracking-[-1px] mb-3">
            {account.name}
          </h3>
          {account.description && (
            <p className="text-text-secondary leading-relaxed mb-6 max-w-xl">
              {account.description}
            </p>
          )}

          {/* Chiffres */}
          {metrics.length > 0 && (
            <div className="flex flex-wrap gap-x-10 gap-y-4 mb-8">
              {metrics.map((m) => (
                <div key={m.l}>
                  <p className="text-2xl md:text-3xl font-bold gradient-text">{m.v}</p>
                  <p className="text-sm text-text-tertiary mt-0.5">{m.l}</p>
                </div>
              ))}
            </div>
          )}

          {/* Plateformes */}
          <div className="flex flex-wrap gap-3">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
            >
              Instagram · @{account.handle}
            </a>
            {account.facebook && (
              <a
                href={account.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
              >
                Facebook
              </a>
            )}
            {account.tiktok && (
              <a
                href={account.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-text-primary transition-all duration-300 hover:bg-white/5 hover:border-border-hover"
              >
                TikTok
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bande de visuels : tout le contenu, défilement horizontal */}
      {account.feed && account.feed.length > 0 && (
        <div className="mt-12 md:mt-16">
          <p className="text-sm text-text-tertiary mb-4">
            Un aperçu du contenu créé pour ce compte — affiches, photos
            d&apos;événements, visuels de posts :
          </p>
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory [-webkit-overflow-scrolling:touch]">
            {account.feed.map((src, i) => (
              <a
                key={i}
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-shrink-0 snap-start"
              >
                <img
                  src={src}
                  alt={`Visuel créé pour ${account.name}`}
                  loading="lazy"
                  className="h-44 md:h-56 w-auto rounded-xl object-cover transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
