import Link from "next/link";

const EXPERIMENTS = [
  {
    slug: "splash-cursor",
    title: "Splash cursor + ASCII orbs",
    description:
      "Simulation de fluide WebGL réactive à la souris, avec orbes ASCII en arrière-plan. Inspiration Hitem3D.",
    status: "En test",
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
            système avant de les intégrer au site principal.
          </p>
        </header>

        <ul className="space-y-3">
          {EXPERIMENTS.map((exp) => (
            <li key={exp.slug}>
              <Link
                href={`/lab/${exp.slug}`}
                className="block rounded-2xl border border-border bg-bg-card p-6 hover:border-accent/50 transition-colors group"
              >
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
