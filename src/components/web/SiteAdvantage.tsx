"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Section « Un site qui travaille pour vous » (/services/creation-site-web).
 *
 * Argumentaire visuel en 3 temps : les surfaces qui remontent le site
 * (moteurs classiques ET IA génératives), trois chiffres mesurés, puis le
 * comparatif frontal avec un site vitrine classique.
 *
 * Règle éditoriale : on parle SURFACES et RÉSULTATS, jamais méthode — pas de
 * détail d'implémentation (fichiers, protocoles, stack) qu'un concurrent
 * n'aurait qu'à recopier.
 */

/**
 * Surfaces où le site du client est trouvable, réparties tous les ~52° autour
 * du centre (7 entrées, Google en tête d'affiche à la verticale).
 */
const SURFACES = [
  { label: "Google", angle: -90, kind: "search" },
  { label: "ChatGPT", angle: -38, kind: "ai" },
  { label: "Gemini", angle: 14, kind: "ai" },
  { label: "Perplexity", angle: 66, kind: "ai" },
  { label: "Copilot", angle: 118, kind: "ai" },
  { label: "Google Maps", angle: 170, kind: "search" },
  { label: "Siri", angle: 222, kind: "search" },
] as const;

const STATS = [
  {
    value: 0.1,
    decimals: 1,
    suffix: " s",
    label: "de réponse serveur",
    detail: "Mesuré sur un site livré. Un visiteur qui attend est un visiteur qui part.",
  },
  {
    value: 100,
    decimals: 0,
    suffix: " %",
    label: "pensé mobile",
    detail: "Plus de 7 visiteurs sur 10 arrivent depuis un téléphone. Le site est conçu pour eux d'abord.",
  },
  {
    value: 24,
    decimals: 0,
    suffix: " h",
    label: "pour être indexable",
    detail: "Le site part en ligne prêt à être référencé, pas à finir de se construire.",
  },
];

const COMPARISON = [
  { critere: "Trouvé sur Google", classique: true, paper34: true },
  { critere: "Cité par ChatGPT, Perplexity et Copilot", classique: false, paper34: true },
  { critere: "Référencé en quelques jours, pas en quelques mois", classique: false, paper34: true },
  { critere: "Chargement instantané sur mobile", classique: false, paper34: true },
  { critere: "Cohérent avec votre fiche Google et vos réseaux", classique: false, paper34: true },
  { critere: "Évolutif sans tout refaire dans deux ans", classique: false, paper34: true },
];

export default function SiteAdvantage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Constellation : les satellites arrivent en cascade, les rayons se tracent.
      // `from` + immediateRender:false plutôt que `fromTo` : si le déclencheur
      // ne partait jamais (onglet en veille, calcul de position raté), les
      // éléments restent VISIBLES au lieu de disparaître.
      gsap.from(".sa-satellite", {
        opacity: 0,
        scale: 0.6,
        duration: 0.6,
        stagger: 0.09,
        ease: "back.out(1.7)",
        immediateRender: false,
        scrollTrigger: { trigger: ".sa-constellation", start: "top 80%" },
      });
      gsap.from(".sa-ray", {
        opacity: 0,
        scaleX: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".sa-constellation", start: "top 80%" },
      });

      // Compteurs : la valeur monte quand la carte entre dans l'écran.
      root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals ?? 0);
        const suffix = el.dataset.suffix ?? "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: "power2.out",
          // Sans ça, GSAP écrit « 0 » dès le montage : le visiteur verrait des
          // compteurs à zéro tant qu'il n'a pas atteint la section.
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate: () => {
            el.textContent = `${obj.v.toFixed(decimals)}${suffix}`;
          },
        });
      });

      // Lignes du comparatif (même principe « fail visible »).
      gsap.from(".sa-row", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.07,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".sa-compare", start: "top 82%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="py-20 md:py-28 bg-bg-secondary overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            Ce qui change
          </p>
          <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
            Un site qui <span className="gradient-text">travaille pour vous</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-base leading-relaxed">
            Un beau site qu&apos;on ne trouve pas ne sert à rien. Chaque site est
            construit pour être remonté par les moteurs de recherche — et
            aujourd&apos;hui aussi par les intelligences artificielles, là où vos
            futurs clients posent désormais leurs questions.
          </p>
        </div>

        {/* 1. Constellation des surfaces */}
        <div className="sa-constellation relative mx-auto mb-20 md:mb-28 max-w-3xl">
          {/* Desktop : disposition rayonnante */}
          <div className="hidden md:block relative h-[420px]">
            {/* preserveAspectRatio="none" : le SVG doit s'étirer exactement sur
                le conteneur, sinon son contenu est centré à l'échelle 1 et les
                rayons n'atteignent plus les pastilles positionnées en %. */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 600 420"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {SURFACES.map((s) => {
                const rad = (s.angle * Math.PI) / 180;
                const x = 300 + Math.cos(rad) * 210;
                const y = 210 + Math.sin(rad) * 150;
                return (
                  <line
                    key={s.label}
                    className="sa-ray origin-center"
                    x1={300}
                    y1={210}
                    x2={x}
                    y2={y}
                    stroke="url(#sa-grad)"
                    strokeWidth={1.5}
                    strokeDasharray="4 5"
                  />
                );
              })}
              <defs>
                <linearGradient id="sa-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.15" />
                </linearGradient>
              </defs>
            </svg>

            {/* Centre : le site du client */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-2xl border border-accent/40 bg-bg-card text-center shadow-[0_0_60px_rgba(0,113,227,0.25)]">
                <svg className="w-7 h-7 text-accent mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
                  <rect x="3" y="4" width="18" height="15" rx="2" />
                  <path strokeLinecap="round" d="M3 9h18" />
                </svg>
                <span className="text-sm font-semibold leading-tight px-2">
                  Votre site
                </span>
              </div>
            </div>

            {/* Satellites */}
            {SURFACES.map((s) => {
              const rad = (s.angle * Math.PI) / 180;
              const left = 50 + (Math.cos(rad) * 210) / 6;
              const top = 50 + (Math.sin(rad) * 150) / 4.2;
              return (
                <div
                  key={s.label}
                  className="sa-satellite absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap ${
                      s.kind === "ai"
                        ? "border-accent/40 bg-accent/10 text-text-primary"
                        : "border-border bg-bg-card text-text-secondary"
                    }`}
                  >
                    {s.kind === "ai" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    )}
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Mobile : liste centrée, même hiérarchie */}
          <div className="md:hidden">
            <div className="mx-auto mb-6 flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-accent/40 bg-bg-card text-center shadow-[0_0_40px_rgba(0,113,227,0.25)]">
              <svg className="w-6 h-6 text-accent mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
                <rect x="3" y="4" width="18" height="15" rx="2" />
                <path strokeLinecap="round" d="M3 9h18" />
              </svg>
              <span className="text-xs font-semibold">Votre site</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {SURFACES.map((s) => (
                <span
                  key={s.label}
                  className={`sa-satellite inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium ${
                    s.kind === "ai"
                      ? "border-accent/40 bg-accent/10 text-text-primary"
                      : "border-border bg-bg-card text-text-secondary"
                  }`}
                >
                  {s.kind === "ai" && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  )}
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-text-secondary">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Les points bleus sont les moteurs de réponse par IA — la
              nouvelle porte d&apos;entrée vers votre activité.
            </span>
          </p>
        </div>

        {/* 2. Les chiffres */}
        <div className="mb-20 md:mb-28 grid gap-4 md:grid-cols-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-bg-card p-6 md:p-7 hover:border-border-hover transition-colors"
            >
              <p className="flex items-baseline gap-1">
                <span
                  className="text-[clamp(34px,5vw,46px)] font-bold tracking-[-2px] gradient-text"
                  data-count={s.value}
                  data-decimals={s.decimals}
                  data-suffix={s.suffix}
                >
                  {`${s.value.toFixed(s.decimals)}${s.suffix}`}
                </span>
              </p>
              <p className="mt-1 text-base font-semibold text-text-primary">
                {s.label}
              </p>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                {s.detail}
              </p>
            </div>
          ))}
        </div>

        {/* 3. Comparatif */}
        <div className="sa-compare">
          <h3 className="text-center text-xl md:text-2xl font-bold mb-8">
            La différence, ligne par ligne
          </h3>

          <div className="overflow-hidden rounded-2xl border border-border bg-bg-card">
            {/* En-têtes */}
            <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_150px_150px] items-center gap-3 border-b border-border px-5 py-4 md:px-7">
              <span className="text-xs uppercase tracking-widest text-text-secondary">
                Critère
              </span>
              <span className="text-center text-xs md:text-sm font-medium text-text-secondary w-16 md:w-auto">
                Site classique
              </span>
              <span className="text-center text-xs md:text-sm font-semibold text-accent w-16 md:w-auto">
                Site Paper34
              </span>
            </div>

            {COMPARISON.map((row) => (
              <div
                key={row.critere}
                className="sa-row grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_150px_150px] items-center gap-3 border-b border-border/60 px-5 py-4 last:border-b-0 md:px-7"
              >
                <span className="text-sm md:text-base text-text-primary leading-snug">
                  {row.critere}
                </span>
                <span className="flex justify-center w-16 md:w-auto">
                  <Mark ok={row.classique} />
                </span>
                <span className="flex justify-center w-16 md:w-auto">
                  <Mark ok={row.paper34} highlight />
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-text-secondary max-w-2xl mx-auto">
            Ces résultats ne tiennent pas à un outil miracle : ils viennent de la
            façon dont le site est construit, page par page. C&apos;est le
            métier, et il est compris dans le prix.
          </p>
        </div>
      </div>
    </section>
  );
}

function Mark({ ok, highlight }: { ok: boolean; highlight?: boolean }) {
  if (ok) {
    return (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
          highlight ? "bg-accent/15 text-accent" : "bg-white/5 text-text-secondary"
        }`}
        role="img"
        aria-label="oui"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    );
  }
  return (
    <span
      className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-text-secondary/50"
      role="img"
      aria-label="non"
    >
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
        <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
      </svg>
    </span>
  );
}
