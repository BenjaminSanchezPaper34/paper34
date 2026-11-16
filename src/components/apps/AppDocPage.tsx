import Link from "next/link";
import { CONTACT_INFO } from "@/lib/constants";
import type { AppInfo, AppSection } from "@/lib/apps";

/** Page de texte d'une app (confidentialité, assistance) : même gabarit que les pages légales du site. */
export default function AppDocPage({
  app,
  kicker,
  title,
  accent,
  intro,
  sections,
  note,
  other,
}: {
  app: AppInfo;
  kicker: string;
  title: string;
  accent: string;
  intro: string;
  sections: AppSection[];
  note?: string;
  other: { href: string; label: string };
}) {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-bg-primary">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Link
          href={`/apps/${app.slug}`}
          className="inline-flex items-center gap-3 min-h-11 mb-8 text-text-secondary hover:text-text-primary transition-colors"
        >
          <img src={app.icon} alt="" width={40} height={40} className="h-10 w-10 rounded-[22%]" />
          <span className="text-sm font-semibold">{app.name}</span>
        </Link>
        <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">{kicker}</p>
        <h1 className="text-[clamp(32px,6vw,56px)] font-bold tracking-[-2px] leading-tight mb-6">
          {title} <span className="gradient-text">{accent}</span>
        </h1>
        <p className="text-text-secondary leading-relaxed mb-10">{intro}</p>

        <div className="space-y-8 text-text-secondary leading-relaxed">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-bold text-text-primary mb-3">{s.title}</h2>
              <p>{s.text}</p>
            </div>
          ))}

          <div className="rounded-2xl border border-border bg-bg-card p-5">
            <h2 className="font-semibold text-text-primary mb-1.5">Contact</h2>
            <p className="text-sm">
              Benjamin Sanchez (PAPER34), Agde :{" "}
              <a href={`mailto:${CONTACT_INFO.email}`} className="text-accent hover:underline">
                {CONTACT_INFO.email}
              </a>
              .
            </p>
          </div>

          {note ? <p className="text-sm">{note}</p> : null}

          <p>
            <Link href={other.href} className="text-accent hover:underline">
              {other.label}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
