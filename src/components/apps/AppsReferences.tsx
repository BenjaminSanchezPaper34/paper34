"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AppInfo } from "@/lib/apps";

/**
 * Références de la page /apps, avec un filtre par catégorie (Jeux, Utilitaires…).
 * Toutes les apps sont rendues côté serveur (lisibles par Google) ; le filtre ne fait
 * que masquer à l'écran. Le choix se reflète dans l'adresse : /apps?categorie=jeux.
 */
const CATEGORIES: Record<AppInfo["category"], { slug: string; label: string }> = {
  GameApplication: { slug: "jeux", label: "Jeux" },
  UtilitiesApplication: { slug: "utilitaires", label: "Utilitaires" },
  LifestyleApplication: { slug: "style-de-vie", label: "Style de vie" },
};

type RefApp = Pick<AppInfo, "slug" | "name" | "kind" | "icon" | "tagline" | "showcase" | "cover" | "category"> & {
  framed: boolean;
  watch: boolean;
};

export default function AppsReferences({ apps }: { apps: RefApp[] }) {
  const [current, setCurrent] = useState<string>("tout");

  // Catégories réellement utilisées, dans l'ordre d'apparition des apps.
  const used = [...new Set(apps.map((a) => a.category))].map((c) => ({
    ...CATEGORIES[c],
    count: apps.filter((a) => a.category === c).length,
  }));

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("categorie");
    if (c && used.some((u) => u.slug === c)) setCurrent(c);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function choose(slug: string) {
    setCurrent(slug);
    const url = new URL(window.location.href);
    if (slug === "tout") url.searchParams.delete("categorie");
    else url.searchParams.set("categorie", slug);
    window.history.replaceState(null, "", url);
  }

  const visible = (app: RefApp) => current === "tout" || CATEGORIES[app.category].slug === current;

  const pills = [{ slug: "tout", label: "Tout", count: apps.length }, ...used];

  return (
    <>
      {used.length > 1 && (
        <div role="group" aria-label="Filtrer les apps par catégorie" className="mb-10 flex flex-wrap gap-3">
          {pills.map((p) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => choose(p.slug)}
              aria-pressed={current === p.slug}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors ${
                current === p.slug
                  ? "border-accent bg-accent text-white"
                  : "border-border text-text-primary hover:border-border-hover hover:bg-white/5"
              }`}
            >
              {p.label}
              <span className={current === p.slug ? "text-white/80" : "text-text-tertiary"}>{p.count}</span>
            </button>
          ))}
        </div>
      )}
      <ul className="space-y-8">
        {apps.map((app) => (

              <li key={app.slug} hidden={!visible(app)}>
                <Link
                  href={`/apps/${app.slug}`}
                  className="group grid grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl border border-border bg-bg-card p-6 transition-colors hover:border-border-hover md:grid-cols-[1fr_1.1fr] md:gap-12 md:p-10"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={app.icon}
                        alt={`Icône de ${app.name}`}
                        width={64}
                        height={64}
                        className="h-16 w-16 shrink-0 rounded-[22%]"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-text-primary">{app.name}</h3>
                        <p className="text-sm text-text-secondary">{app.kind}</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-text-primary mb-3">{app.tagline}</p>
                    <p className="text-text-secondary leading-relaxed mb-6">{app.showcase}</p>
                    <span className="inline-flex min-h-11 items-center text-accent group-hover:underline">
                      Découvrir {app.name}
                    </span>
                  </div>
                  <div className="flex h-72 items-center justify-center md:h-96">
                    <img
                      src={app.cover.src}
                      alt=""
                      width={app.cover.width}
                      height={app.cover.height}
                      loading="lazy"
                      className={`max-h-full w-auto max-w-full object-contain ${
                        app.framed
                          ? ""
                          : app.watch
                            ? "rounded-[20%/16%]"
                            : app.cover.height > app.cover.width
                              ? "rounded-[13.5%/6.2%]"
                              : ""
                      }`}
                    />
                  </div>
                </Link>
              </li>
        ))}
      </ul>
    </>
  );
}
