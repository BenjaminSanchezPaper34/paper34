import Link from "next/link";

type Experiment = {
  slug: string;
  title: string;
  description: string;
  status: string;
  accent: string;
};

/** Effets uniques par moteur de rendu — vraiment différents les uns des autres */
const SIGNATURE: Experiment[] = [
  {
    slug: "halftone-cmyk",
    title: "Halftone CMJN dynamique",
    description:
      "Trame d'impression offset 4 couleurs avec angles 15°/75°/0°/45°. Le curseur dépose des gouttes d'encre.",
    status: "Graphiste",
    accent: "from-cyan-400 via-fuchsia-500 to-amber-300",
  },
  {
    slug: "light-trails",
    title: "Light trails — pose longue",
    description:
      "Vraie traînée lumineuse persistante + particules bokeh additives. Esthétique photo de nuit.",
    status: "Photographe",
    accent: "from-amber-200 via-orange-400 to-rose-500",
  },
  {
    slug: "chroma-vhs",
    title: "Aberration chromatique + VHS",
    description:
      "Shader WebGL : split RGB, scanlines CRT, distorsion lentille au curseur, tracking analogique.",
    status: "Vidéaste",
    accent: "from-rose-500 via-violet-500 to-cyan-400",
  },
  {
    slug: "water-ripples",
    title: "Surface aquatique + ondulations",
    description:
      "Shader WebGL : surface d'eau animée, caustiques, ondes radiales au curseur. Idéal jet ski / nautique.",
    status: "Client jet ski",
    accent: "from-cyan-400 via-sky-500 to-blue-700",
  },
];

/** Variantes couleur du splash WebGL — même moteur, palette différente */
const SPLASH: Experiment[] = [
  {
    slug: "splash-cmyk",
    title: "Splash CMJN",
    description: "Variante couleur : encres CMJN sur fond crème.",
    status: "Variante",
    accent: "from-cyan-400 via-fuchsia-500 to-amber-300",
  },
  {
    slug: "splash-light-painting",
    title: "Splash light painting",
    description: "Variante couleur : traînées chaudes persistantes.",
    status: "Variante",
    accent: "from-amber-200 via-orange-400 to-amber-500",
  },
  {
    slug: "splash-cinema",
    title: "Splash teal & orange",
    description: "Variante couleur : palette cinéma turbulente.",
    status: "Variante",
    accent: "from-teal-400 via-cyan-500 to-orange-400",
  },
  {
    slug: "splash-cursor",
    title: "Splash bleu (référence)",
    description: "Version d'origine inspiration Hitem3D.",
    status: "Référence",
    accent: "from-blue-500 via-indigo-500 to-purple-500",
  },
];

function Card({ exp }: { exp: Experiment }) {
  return (
    <li>
      <Link
        href={`/lab/${exp.slug}`}
        className="block rounded-2xl border border-border bg-bg-card p-6 hover:border-accent/50 transition-colors group relative overflow-hidden"
      >
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${exp.accent}`}
        />
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-1 group-hover:text-accent transition-colors">
              {exp.title}
            </h3>
            <p className="text-sm text-text-secondary">{exp.description}</p>
          </div>
          <span className="text-xs rounded-full px-3 py-1 bg-accent/10 text-accent border border-accent/30 shrink-0">
            {exp.status}
          </span>
        </div>
      </Link>
    </li>
  );
}

export default function LabIndexPage() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary mb-2">
            Page interne · non indexée
          </p>
          <h1 className="text-4xl font-bold tracking-[-1px] mb-3">
            Lab <span className="gradient-text">Paper34</span>
          </h1>
          <p className="text-text-secondary max-w-2xl">
            Bac à sable d&apos;effets et d&apos;animations. Trois moteurs de
            rendu signature (un par métier du studio) + plusieurs variantes
            couleur d&apos;une même base.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-[0.2em] text-text-tertiary mb-4">
            Moteurs signature — un par métier
          </h2>
          <ul className="space-y-3">
            {SIGNATURE.map((exp) => (
              <Card key={exp.slug} exp={exp} />
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-text-tertiary mb-4">
            Variantes splash WebGL
          </h2>
          <ul className="space-y-3">
            {SPLASH.map((exp) => (
              <Card key={exp.slug} exp={exp} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
