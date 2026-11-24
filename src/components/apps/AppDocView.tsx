"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppFeedbackForm from "@/components/apps/AppFeedbackForm";
import type { DocApp, Lang } from "@/lib/app-docs";

/**
 * Modèle unique des pages d'appli sans site (assistance et confidentialité), habillé par la couleur de l'appli.
 * Français et anglais servis par nos propres textes ; le choix de langue bascule sans recharger.
 */

const UI = {
  fr: {
    support: "Assistance",
    privacy: "Confidentialité",
    privacyTitle: "Politique de confidentialité",
    faq: "Questions fréquentes",
    updated: "Dernière mise à jour",
    store: "Voir sur l'App Store",
    soon: "Bientôt sur l'App Store",
    contact: "Éditeur : Benjamin Sanchez (Paper34), Agde, France.",
    toSupport: "Écrire au développeur",
    switchLabel: "Langue",
    back: "Présentation de l'appli",
  },
  en: {
    support: "Support",
    privacy: "Privacy",
    privacyTitle: "Privacy policy",
    faq: "Frequently asked questions",
    updated: "Last updated",
    store: "View on the App Store",
    soon: "Coming soon to the App Store",
    contact: "Publisher: Benjamin Sanchez (Paper34), Agde, France.",
    toSupport: "Write to the developer",
    switchLabel: "Language",
    back: "About the app",
  },
} as const;

const KEY = "paper34-app-lang";

export default function AppDocView({ app, page }: { app: DocApp; page: "support" | "privacy" }) {
  const [lang, setLang] = useState<Lang>("fr");

  // Langue au chargement : ?lang=en dans l'adresse, sinon le dernier choix sur cet appareil.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {}
    const next = fromUrl === "en" || fromUrl === "fr" ? fromUrl : stored === "en" ? "en" : "fr";
    if (next !== "fr") setLang(next);
  }, []);

  function choose(next: Lang) {
    setLang(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    const url = new URL(window.location.href);
    if (next === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    window.history.replaceState(null, "", url);
  }

  const t = UI[lang];
  const base = `/apps/${app.slug}`;
  const supportHref = `${base}/assistance${lang === "en" ? "?lang=en" : ""}`;
  const privacyHref = `${base}/confidentialite${lang === "en" ? "?lang=en" : ""}`;
  const support = app.support[lang];
  const privacy = app.privacy[lang];

  return (
    <section
      lang={lang}
      className="pt-28 pb-24 md:pt-40 md:pb-32 bg-bg-primary"
      style={{ ["--app-color" as string]: app.color, ["--app-on-color" as string]: app.onColor }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10">
          <nav aria-label={app.name} className="flex gap-1 rounded-full border border-border p-1">
            <Link
              href={supportHref}
              aria-current={page === "support" ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-full px-3.5 text-sm font-semibold transition-colors ${page === "support" ? "bg-bg-card-hover text-text-primary" : "text-text-secondary hover:text-text-primary"}`}
            >
              {t.support}
            </Link>
            <Link
              href={privacyHref}
              aria-current={page === "privacy" ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-full px-3.5 text-sm font-semibold transition-colors ${page === "privacy" ? "bg-bg-card-hover text-text-primary" : "text-text-secondary hover:text-text-primary"}`}
            >
              {t.privacy}
            </Link>
          </nav>
          <div role="group" aria-label={t.switchLabel} className="flex gap-1 rounded-full border border-border p-1">
            {(["fr", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                lang={l}
                onClick={() => choose(l)}
                aria-pressed={lang === l}
                className={`min-h-11 min-w-11 rounded-full px-2 text-sm font-semibold uppercase transition-colors ${lang === l ? "bg-bg-card-hover text-text-primary" : "text-text-secondary hover:text-text-primary"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-5">
            <img
              src={app.icon}
              alt=""
              width={72}
              height={72}
              className="h-16 w-16 md:h-[72px] md:w-[72px] rounded-[22%] shadow-[0_8px_30px_-8px_var(--app-color)]"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--app-color)]">
                {page === "support" ? t.support : t.privacy}
              </p>
              <h1 className="text-[clamp(30px,6vw,48px)] font-bold tracking-[-1.5px] leading-tight">{app.name}</h1>
            </div>
          </div>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">{app.phrase[lang]}</p>
          {page === "support" ? (
            app.storeUrl ? (
              lang === "fr" ? (
                <a href={app.storeUrl} className="inline-block" aria-label={`${app.name} : ${t.store}`}>
                  <img src="/apps/badge-app-store-fr.svg" alt="Télécharger dans l'App Store" width={150} height={50} className="h-[50px] w-auto" />
                </a>
              ) : (
                <a
                  href={app.storeUrl}
                  className="inline-flex min-h-12 items-center rounded-full border border-border-hover px-6 text-sm font-semibold text-text-primary hover:bg-bg-card"
                >
                  {t.store}
                </a>
              )
            ) : (
              <p className="text-sm font-semibold text-text-secondary">{t.soon}</p>
            )
          ) : null}
        </header>

        {page === "support" ? (
          <>
            <AppFeedbackForm appKey={app.feedbackKey} lang={lang} privacyHref={privacyHref} />
            <p className="mt-6 text-text-secondary leading-relaxed">{support.intro}</p>
            <h2 className="text-2xl font-bold text-text-primary mt-14 mb-6">{t.faq}</h2>
            <div className="space-y-8 text-text-secondary leading-relaxed">
              {support.questions.map((q) => (
                <div key={q.title}>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{q.title}</h3>
                  <p>{q.text}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-text-primary mb-4">{t.privacyTitle}</h2>
            <p className="text-text-secondary leading-relaxed mb-10">{privacy.intro}</p>
            <div className="space-y-8 text-text-secondary leading-relaxed">
              {privacy.sections.map((s) => (
                <div key={s.title}>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
              <p className="text-sm">
                {t.updated}
                {lang === "fr" ? " : " : ": "}
                {app.privacy.updated[lang]}. {t.contact}
              </p>
              <p>
                <Link href={supportHref} className="font-semibold text-[var(--app-color)] hover:underline">
                  {t.toSupport}
                </Link>
              </p>
            </div>
          </>
        )}

        {app.showcase ? (
          <p className="mt-14">
            <Link href={base} className="text-sm text-text-secondary underline underline-offset-2 hover:text-text-primary">
              {t.back}
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
