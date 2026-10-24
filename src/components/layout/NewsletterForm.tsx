"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { CONTACT_INFO } from "@/lib/constants";

/** Inscription à la newsletter Paper34, dans le pied de page. Consentement explicite (RGPD). */
export default function NewsletterForm() {
  const [etat, setEtat] = useState<"repos" | "envoi" | "ok" | "erreur" | "indispo">("repos");

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setEtat("envoi");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: f.get("email"),
          consentement: f.get("consentement") === "on",
          site: f.get("site"),
        }),
      });
      if (res.status === 503) return setEtat("indispo");
      if (!res.ok) return setEtat("erreur");
      track("newsletter_inscription", { provenance: window.location.pathname });
      setEtat("ok");
    } catch {
      setEtat("erreur");
    }
  }

  if (etat === "ok") {
    return <p className="text-sm text-text-primary">Merci, vous êtes inscrit. À bientôt dans votre boîte mail.</p>;
  }

  return (
    <form onSubmit={envoyer} className="space-y-3" noValidate={false}>
      <p className="text-sm font-semibold text-text-primary">La newsletter</p>
      <p className="text-sm text-text-secondary">Une fois par mois : réalisations, conseils pour être trouvé et nouveautés du studio.</p>
      <div className="flex gap-2">
        <label htmlFor="nl-email" className="sr-only">Adresse e-mail</label>
        <input
          id="nl-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="vous@exemple.fr"
          className="min-w-0 flex-1 rounded-full border border-border bg-bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={etat === "envoi"}
          className="shrink-0 rounded-full bg-accent hover:bg-accent-hover px-5 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-70"
        >
          {etat === "envoi" ? "…" : "S'inscrire"}
        </button>
      </div>
      {/* Champ piège pour les robots, invisible pour les visiteurs */}
      <input type="text" name="site" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <label className="flex items-start gap-2 text-xs text-text-tertiary leading-relaxed">
        <input type="checkbox" name="consentement" required className="mt-0.5 accent-[var(--color-accent)]" />
        <span>
          J&apos;accepte de recevoir la newsletter de Paper34. Désinscription en un clic dans chaque e-mail (
          <a href="/confidentialite#newsletter" className="underline hover:text-text-primary">confidentialité</a>).
        </span>
      </label>
      {etat === "erreur" && <p className="text-sm text-red-400">L&apos;inscription n&apos;a pas abouti. Réessayez dans un instant.</p>}
      {etat === "indispo" && (
        <p className="text-sm text-text-secondary">
          L&apos;inscription en ligne arrive bientôt. En attendant, écrivez-moi à {CONTACT_INFO.email}.
        </p>
      )}
    </form>
  );
}
