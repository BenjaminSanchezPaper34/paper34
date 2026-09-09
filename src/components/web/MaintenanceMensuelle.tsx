import Link from "next/link";

/**
 * Section « Maintenance mensuelle » de /services/creation-site-web.
 * Maquette validée le 09/09/2026 (canvas « Maintenance mensuelle Paper34 »).
 * Décision de Benjamin : aucun prix affiché — la mensualité dépend du rythme
 * de modifications du client et se fixe au devis. La section sert à annoncer
 * l'abonnement pour qu'il ne surprenne pas à la lecture du devis.
 * Aucune valeur en dur : tout vient des tokens du thème (globals.css).
 */

type Coverage = { title: string; icon: "search" | "pin" | "shield" | "chart"; items: string[] };

const COVERAGE: Coverage[] = [
  {
    title: "Google, Bing et les IA",
    icon: "search",
    items: [
      "Lecture mensuelle de Search Console : requêtes, positions, pages qui montent ou décrochent",
      "Bing Webmaster et citations dans Copilot, ChatGPT, Perplexity",
      "Chaque modification signalée aux moteurs le jour même (IndexNow, sitemap)",
      "Robots IA autorisés, données structurées vérifiées",
    ],
  },
  {
    title: "Vos fiches d'établissement",
    icon: "pin",
    items: [
      "Google Maps, Apple Plans, Bing Places : horaires, photos, description identiques au site",
      "Note et volume d'avis suivis, alerte quand une fiche décroche ou qu'un doublon apparaît",
      "Une actualité Google par mois (ouverture, carte, événement)",
    ],
  },
  {
    title: "Le site tenu à jour",
    icon: "shield",
    items: [
      "Mises à jour de sécurité, hébergement, nom de domaine, sauvegardes",
      "Vitesse mesurée chaque mois, corrigée si elle baisse",
      "Une modification de contenu par mois incluse : carte, horaires, photos, tarifs",
    ],
  },
  {
    title: "Ce que font vos visiteurs",
    icon: "chart",
    items: [
      "Mesure sans cookie ni bandeau : visites, pages, appareils",
      "Clics téléphone, réservation, itinéraire comptés un par un",
      "D'où viennent les visites : Google, Instagram, fiche Maps, accès direct",
    ],
  },
];

// Exemple de rapport — client fictif, dit tel quel sous le bloc.
const REPORT_KPIS = [
  { label: "Visites", value: "1 030", note: "+41 % vs août" },
  { label: "Appels & itinéraires", value: "86", note: "depuis le site et la fiche" },
  { label: "Position Google", value: "3e", note: "« restaurant vias plage »" },
];

const REPORT_DECISIONS = [
  {
    fact: "« restaurant vias plage » est passé de la 6e à la 3e place.",
    action: "On ajoute la carte du soir pour viser le top 3 sur « dîner vias ».",
  },
  {
    fact: "La fiche Google affiche encore les horaires d'été.",
    action: "On les corrige sur Google, Apple et Bing, alignés sur le site.",
  },
  {
    fact: "Les clics « itinéraire » doublent le week-end.",
    action: "On passe le bouton en premier sur mobile.",
  },
];

function Icon({ name }: { name: Coverage["icon"] }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M4 19h16" />
          <path d="M6 16V9" />
          <path d="M11 16V5" />
          <path d="M16 16v-6" />
          <path d="M21 16V8" />
        </svg>
      );
  }
}

export default function MaintenanceMensuelle() {
  return (
    <section id="maintenance" className="py-20 md:py-28 bg-bg-secondary scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            Maintenance mensuelle
          </p>
          <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
            Un site mis en ligne n&apos;est pas fini.{" "}
            <span className="gradient-text">Il est surveillé.</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Chaque mois, je lis ce que Google, Bing et les IA disent de votre site, je
            tiens vos fiches d&apos;établissement à jour et je vous dis quoi changer. Vous
            recevez un rapport, pas une facture surprise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Ce qui est couvert */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COVERAGE.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-border bg-bg-card p-6 hover:border-border-hover transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon name={c.icon} />
                  </span>
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                </div>
                <ul className="space-y-2 text-sm text-text-secondary leading-relaxed">
                  {c.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Le rapport mensuel — la preuve */}
          <div className="overflow-hidden rounded-2xl border border-accent/40 bg-bg-card shadow-[0_0_60px_var(--color-accent-glow)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-5 md:px-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Votre rapport mensuel
                </p>
                <p className="text-xl font-semibold">Septembre 2026</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-3.5 py-2 text-sm font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Lu par Paper34, expliqué en clair
              </span>
            </div>

            <div className="grid grid-cols-3 border-b border-border">
              {REPORT_KPIS.map((k, i) => (
                <div
                  key={k.label}
                  className={`flex flex-col gap-1 px-4 py-5 md:px-7 ${i < REPORT_KPIS.length - 1 ? "border-r border-border" : ""}`}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                    {k.label}
                  </span>
                  <span className="text-2xl md:text-3xl font-bold tracking-[-1px] leading-none tabular-nums">
                    {k.value}
                  </span>
                  <span className="text-sm text-text-secondary">{k.note}</span>
                </div>
              ))}
            </div>

            <div className="px-6 py-6 md:px-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-4">
                3 décisions pour octobre
              </p>
              <ol className="space-y-3">
                {REPORT_DECISIONS.map((d, i) => (
                  <li key={d.fact} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed">
                      {d.fact} <span className="text-text-secondary">{d.action}</span>
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-text-tertiary">
                Exemple de rapport. Les chiffres sont ceux d&apos;un client fictif.
              </p>
            </div>
          </div>
        </div>

        {/* Pourquoi un abonnement + mensualité au devis */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
          <div className="rounded-2xl border border-border bg-bg-card p-8">
            <h3 className="text-2xl font-bold tracking-[-0.5px] mb-3">
              Pourquoi un abonnement plutôt qu&apos;un site livré et oublié
            </h3>
            <p className="text-text-secondary leading-relaxed mb-5">
              Un site perd des positions dès qu&apos;on cesse de s&apos;en occuper : horaires
              périmés, fiche Google qui diverge, moteurs qui ne repassent plus. La
              maintenance, c&apos;est quelqu&apos;un qui regarde vos résultats tous les mois et
              qui agit avant que vous ne remarquiez la baisse.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Résiliable à tout moment", "Le site vous appartient", "Un interlocuteur, à Agde"].map(
                (t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-2 rounded-full border border-border-hover px-3.5 py-2 text-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    {t}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-accent/40 bg-bg-card p-8 flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Une mensualité à votre rythme
            </p>
            <p className="leading-relaxed">
              Un restaurant qui change sa carte chaque semaine et une entreprise qui ne
              touche à rien pendant un an n&apos;ont pas le même abonnement. Le montant se
              fixe au devis, selon ce que vous modifiez et la fréquence des rapports.
            </p>
            <ul className="space-y-1.5 text-sm text-text-secondary leading-relaxed">
              <li>Compris dans tous les cas : surveillance, fiches, sécurité, rapport</li>
              <li>Variable : le nombre de modifications par mois et la publication sur vos réseaux</li>
            </ul>
            <Link
              href="/contact"
              className="mt-auto inline-flex self-start rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
            >
              Demander un devis gratuit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
