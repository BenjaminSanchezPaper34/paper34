"use client";

import { useConsent } from "./Consent";

/**
 * Bloc « votre choix actuel » de la page confidentialité : affiche l'état du
 * consentement et permet d'en changer sans avoir à vider son navigateur.
 */
export default function GestionCookies() {
  const { etat, accepter, refuser } = useConsent();

  const libelle =
    etat === "granted"
      ? "Vous avez accepté la mesure d'audience."
      : etat === "denied"
        ? "Vous avez refusé la mesure d'audience."
        : "Vous n'avez pas encore fait de choix.";

  return (
    <div className="rounded-2xl border border-border bg-bg-card p-5">
      <p className="text-sm text-text-primary font-medium mb-4">{libelle}</p>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={refuser}
          disabled={etat === "denied"}
          className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-white/5 hover:border-border-hover disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Refuser
        </button>
        <button
          onClick={accepter}
          disabled={etat === "granted"}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
