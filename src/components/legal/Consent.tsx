"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------
   Consentement aux traceurs (CNIL / RGPD)

   Google Analytics dépose des cookies et transfère des données : il ne
   doit PAS être chargé avant un consentement explicite. Le script n'est
   donc injecté qu'une fois l'accord donné — un bandeau décoratif qui
   laisse le tag se charger ne vaut rien juridiquement.

   Sont volontairement HORS consentement (exemptés) : la mesure d'audience
   anonyme de Vercel (sans cookie ni suivi entre sites) et les polices,
   servies depuis notre propre domaine.
   ------------------------------------------------------------------ */

const KEY = "p34-consent-mesure";
const GA_ID = "G-8GK54Y4FEL";

type Etat = "inconnu" | "granted" | "denied";

const ConsentContext = createContext<{
  etat: Etat;
  accepter: () => void;
  refuser: () => void;
  rouvrir: () => void;
}>({ etat: "inconnu", accepter: () => {}, refuser: () => {}, rouvrir: () => {} });

export const useConsent = () => useContext(ConsentContext);

/** Injecte Google Analytics — appelé uniquement après accord. */
function chargerAnalytics() {
  if (document.getElementById("ga-script")) return;

  const s = document.createElement("script");
  s.id = "ga-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  const init = document.createElement("script");
  init.id = "ga-init";
  init.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}', { anonymize_ip: true });
  `;
  document.head.appendChild(init);
}

/** Supprime les cookies déposés par GA (retrait du consentement). */
function purgerCookiesAnalytics() {
  const domaine = window.location.hostname.replace(/^www\./, "");
  document.cookie.split(";").forEach((c) => {
    const nom = c.split("=")[0].trim();
    if (nom.startsWith("_ga") || nom.startsWith("_gid")) {
      for (const d of [domaine, `.${domaine}`, window.location.hostname]) {
        document.cookie = `${nom}=; Max-Age=0; path=/; domain=${d}`;
      }
      document.cookie = `${nom}=; Max-Age=0; path=/`;
    }
  });
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [etat, setEtat] = useState<Etat>("inconnu");
  const [pret, setPret] = useState(false);

  useEffect(() => {
    let v: string | null = null;
    try {
      v = localStorage.getItem(KEY);
    } catch {}
    if (v === "granted") {
      setEtat("granted");
      chargerAnalytics();
    } else if (v === "denied") {
      setEtat("denied");
    }
    setPret(true);
  }, []);

  const enregistrer = useCallback((v: "granted" | "denied") => {
    setEtat(v);
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    if (v === "granted") {
      chargerAnalytics();
    } else {
      purgerCookiesAnalytics();
    }
  }, []);

  const rouvrir = useCallback(() => {
    setEtat("inconnu");
    try {
      localStorage.removeItem(KEY);
    } catch {}
    purgerCookiesAnalytics();
  }, []);

  return (
    <ConsentContext.Provider
      value={{
        etat,
        accepter: () => enregistrer("granted"),
        refuser: () => enregistrer("denied"),
        rouvrir,
      }}
    >
      {children}

      {pret && etat === "inconnu" && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Gestion des cookies"
          className="fixed bottom-0 left-0 right-0 z-[100] border-t border-border bg-bg-card/95 backdrop-blur-md px-6 py-5 md:px-8"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm leading-relaxed text-text-secondary">
              <strong className="block text-text-primary mb-1">
                Cookies de mesure d&apos;audience
              </strong>
              <p>
                J&apos;utilise Google Analytics pour comprendre quelles pages
                intéressent les visiteurs. Ces cookies ne sont déposés
                qu&apos;avec votre accord, et le site fonctionne parfaitement
                sans.{" "}
                <Link href="/confidentialite" className="text-accent underline underline-offset-2">
                  En savoir plus
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={() => enregistrer("denied")}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-white/5 hover:border-border-hover"
              >
                Refuser
              </button>
              <button
                onClick={() => enregistrer("granted")}
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      )}
    </ConsentContext.Provider>
  );
}

/** Lien « Gérer mes cookies » à placer dans le footer. */
export function LienGestionCookies({ className }: { className?: string }) {
  const { rouvrir } = useConsent();
  return (
    <button type="button" onClick={rouvrir} className={className}>
      Gérer mes cookies
    </button>
  );
}
