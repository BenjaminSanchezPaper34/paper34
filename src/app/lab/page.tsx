import Link from "next/link";

const EXPERIMENTS = [
  {
    slug: "splash-cmyk",
    title: "Encre CMJN — graphiste",
    description:
      "Splash cyan/magenta/jaune/noir sur fond crème, comme une presse offset. La signature 4 couleurs du print.",
    status: "À tester",
    accent: "from-cyan-400 via-fuchsia-500 to-amber-300",
  },
  {
    slug: "splash-light-painting",
    title: "Light painting — photographe",
    description:
      "Pose longue : traînées blanches/dorées qui persistent. Inspiration feux d'artifice et photo nuit.",
    status: "À tester",
    accent: "from-amber-200 via-orange-400 to-amber-500",
  },
  {
    slug: "splash-cinema",
    title: "Color grading — vidéaste",
    description:
      "Teal & orange, la palette cinéma. Volutes turbulentes, ambiance étalonnage film.",
    status: "À tester",
    accent: "from-teal-400 via-cyan-500 to-orange-400",
  },
  {
    slug: "splash-cursor",
    title: "Splash bleu — base Hitem3D",
    description:
      "Version d'origine, palette bleus accent + orbes ASCII. Référence neutre pour comparer.",
    status: "Référence",
    accent: "from-blue-500 via-indigo-500 to-purple-500",
  },
];

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
            Bac à sable pour tester des effets, animations et morceaux de design
            système avant de les intégrer au site principal. Chaque expérience
            décline le splash WebGL avec une palette et des paramètres alignés
            à un métier du studio.
          </p>
        </header>

        <ul className="space-y-3">
          {EXPERIMENTS.map((exp) => (
            <li key={exp.slug}>
              <Link
                href={`/lab/${exp.slug}`}
                className="block rounded-2xl border border-border bg-bg-card p-6 hover:border-accent/50 transition-colors group relative overflow-hidden"
              >
                {/* Bandeau couleur fin pour situer la palette */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${exp.accent}`}
                />
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold mb-1 group-hover:text-accent transition-colors">
                      {exp.title}
                    </h2>
                    <p className="text-sm text-text-secondary">
                      {exp.description}
                    </p>
                  </div>
                  <span className="text-xs rounded-full px-3 py-1 bg-accent/10 text-accent border border-accent/30 shrink-0">
                    {exp.status}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
