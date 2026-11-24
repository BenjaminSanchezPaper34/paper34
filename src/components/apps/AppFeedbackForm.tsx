"use client";

import { useId, useState } from "react";
import type { Lang } from "@/lib/app-docs";

/** Service commun des retours (dépôt paper34-retours) : même stockage, même e-mail, même ticket que les applis. */
const ENDPOINT = "https://retours.paper34.fr/api/retours";

type Kind = "bug" | "idea" | "other";
type State = "idle" | "sending" | "sent" | "error" | "limit";

const T = {
  fr: {
    title: "Écrire au développeur",
    lead: "Un bug, une idée, une question : le message m'arrive directement.",
    kind: "C'est plutôt",
    kinds: { bug: "Un bug", idea: "Une idée", other: "Autre chose" },
    message: "Message",
    placeholder: "Ce qui s'est passé, sur quel appareil, ce que vous attendiez…",
    email: "E-mail (facultatif)",
    emailHint: "Seulement si vous voulez une réponse.",
    send: "Envoyer",
    sending: "Envoi…",
    sent: "Merci, votre message est bien arrivé. Si vous avez laissé votre adresse, je vous réponds dès que possible.",
    again: "Écrire un autre message",
    error: "Le message n'est pas parti. Vérifiez la connexion et réessayez.",
    limit: "Trop de messages envoyés en peu de temps. Réessayez dans une heure.",
    tooShort: "Quelques mots de plus, s'il vous plaît.",
    badEmail: "Cette adresse e-mail semble incomplète.",
    privacy: "Ce qui est envoyé et combien de temps c'est gardé : voir la politique de confidentialité.",
  },
  en: {
    title: "Write to the developer",
    lead: "A bug, an idea, a question: your message comes straight to me.",
    kind: "This is",
    kinds: { bug: "A bug", idea: "An idea", other: "Something else" },
    message: "Message",
    placeholder: "What happened, on which device, what you expected…",
    email: "Email (optional)",
    emailHint: "Only if you would like a reply.",
    send: "Send",
    sending: "Sending…",
    sent: "Thank you, your message has arrived. If you left your address, I will reply as soon as I can.",
    again: "Write another message",
    error: "The message was not sent. Check your connection and try again.",
    limit: "Too many messages in a short time. Please try again in an hour.",
    tooShort: "A few more words, please.",
    badEmail: "This email address looks incomplete.",
    privacy: "What is sent and how long it is kept: see the privacy policy.",
  },
} as const;

/** Navigateur et type d'appareil, sans plus de détail (pour reproduire un bug d'affichage). */
function browserSummary(): string {
  const ua = navigator.userAgent;
  const browser = /Edg\//.test(ua) ? "Edge" : /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "navigateur";
  const device = /iPhone/.test(ua) ? "iPhone" : /iPad/.test(ua) ? "iPad" : /Android/.test(ua) ? "Android" : /Mac OS X/.test(ua) ? "Mac" : /Windows/.test(ua) ? "Windows" : "autre";
  return `${browser}, ${device}`;
}

export default function AppFeedbackForm({
  appKey,
  lang,
  privacyHref,
}: {
  /** Clé de l'appli dans le service (puppydrop, watchroad, jaugecloud). */
  appKey: string;
  lang: Lang;
  privacyHref: string;
}) {
  const t = T[lang];
  const id = useId();
  const [kind, setKind] = useState<Kind>("bug");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [state, setState] = useState<State>("idle");
  const [hint, setHint] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (message.trim().length < 3) {
      setHint(t.tooShort);
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setHint(t.badEmail);
      return;
    }
    setHint("");
    setState("sending");
    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: crypto.randomUUID(),
          // Pas d'identifiant durable côté web : un nouveau à chaque message.
          install: crypto.randomUUID(),
          app: appKey,
          kind,
          message: message.trim(),
          email: email.trim() || undefined,
          source: "web",
          platform: "web",
          version: "-",
          build: "-",
          device: browserSummary(),
          system: "-",
          language: navigator.language,
          sentAt: new Date().toISOString(),
          site: trap,
        }),
      });
      if (r.ok) {
        setState("sent");
        setMessage("");
        setEmail("");
      } else setState(r.status === 429 ? "limit" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-3xl border border-border bg-bg-card p-6 md:p-8" role="status">
        <p className="text-text-primary leading-relaxed mb-5">{t.sent}</p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="min-h-11 text-sm font-semibold text-[var(--app-color)] hover:underline"
        >
          {t.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative rounded-3xl border border-border bg-bg-card p-6 md:p-8">
      <h2 className="text-2xl font-bold text-text-primary mb-2">{t.title}</h2>
      <p className="text-text-secondary leading-relaxed mb-6">{t.lead}</p>

      <fieldset className="mb-6">
        <legend className="text-sm font-semibold text-text-primary mb-3">{t.kind}</legend>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(t.kinds) as Kind[]).map((k) => (
            <label key={k} className="cursor-pointer">
              <input
                type="radio"
                name={`${id}-kind`}
                value={k}
                checked={kind === k}
                onChange={() => setKind(k)}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-semibold text-text-secondary transition-colors peer-checked:border-[var(--app-color)] peer-checked:bg-[var(--app-color)] peer-checked:text-[var(--app-on-color)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--app-color)] hover:border-border-hover">
                {t.kinds[k]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label htmlFor={`${id}-message`} className="block text-sm font-semibold text-text-primary mb-2">
        {t.message}
      </label>
      <textarea
        id={`${id}-message`}
        required
        rows={6}
        maxLength={5000}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t.placeholder}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="w-full rounded-2xl border border-border bg-bg-primary px-4 py-3 text-base text-text-primary placeholder:text-text-tertiary focus:border-[var(--app-color)] focus:outline-none mb-2"
      />
      {hint ? (
        <p id={`${id}-hint`} className="text-sm text-[var(--app-color)] mb-4">
          {hint}
        </p>
      ) : (
        <div className="mb-4" />
      )}

      <label htmlFor={`${id}-email`} className="block text-sm font-semibold text-text-primary mb-1">
        {t.email}
      </label>
      <p id={`${id}-email-hint`} className="text-sm text-text-secondary mb-2">
        {t.emailHint}
      </p>
      <input
        id={`${id}-email`}
        type="email"
        inputMode="email"
        autoComplete="email"
        maxLength={254}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-describedby={`${id}-email-hint`}
        className="w-full min-h-12 rounded-2xl border border-border bg-bg-primary px-4 text-base text-text-primary focus:border-[var(--app-color)] focus:outline-none mb-6"
      />

      {/* Champ piège : invisible pour les gens, rempli par les robots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-site`}>Site</label>
        <input id={`${id}-site`} type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full sm:w-auto min-h-12 rounded-full bg-[var(--app-color)] px-8 text-base font-semibold text-[var(--app-on-color)] transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {state === "sending" ? t.sending : t.send}
      </button>

      <p aria-live="polite" className="mt-4 text-sm text-text-secondary">
        {state === "error" ? t.error : state === "limit" ? t.limit : null}
      </p>
      <p className="mt-2 text-sm text-text-secondary">
        <a href={privacyHref} className="underline underline-offset-2 hover:text-text-primary">
          {t.privacy}
        </a>
      </p>
    </form>
  );
}
