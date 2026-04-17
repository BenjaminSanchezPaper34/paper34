import Link from "next/link";
import JsonLdSocialMedia, { SOCIAL_FAQ } from "@/components/seo/JsonLdSocialMedia";

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Audit & stratégie",
    text: "On commence par analyser ton compte actuel, tes concurrents et ta cible. On définit ensemble la ligne éditoriale, le ton, les piliers de contenu et les objectifs.",
  },
  {
    n: "02",
    title: "Charte visuelle",
    text: "Création d'une identité visuelle cohérente pour le feed : palette, typographies, templates de stories, gabarits de posts. Ton compte devient instantanément reconnaissable.",
  },
  {
    n: "03",
    title: "Création de contenu",
    text: "Shootings réguliers chez toi : photo, vidéo, reels. Je capture l'authentique de ton activité — produits, équipe, ambiance, événements. Le contenu local et vrai performe toujours mieux.",
  },
  {
    n: "04",
    title: "Publication & animation",
    text: "Planning éditorial mensuel, publication aux meilleurs créneaux, réponses aux commentaires et messages. Tu valides chaque post avant publication si tu le souhaites.",
  },
  {
    n: "05",
    title: "Suivi & optimisation",
    text: "Reporting mensuel des performances (croissance, engagement, portée). On ajuste la stratégie en continu en fonction de ce qui fonctionne le mieux.",
  },
];

export default function ReseauxSociauxPage() {
  return (
    <>
      <JsonLdSocialMedia />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 bg-bg-primary overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Gestion des réseaux sociaux
          </p>
          <h1 className="text-[clamp(36px,7vw,72px)] font-bold tracking-[-2px] leading-tight mb-6">
            Vos réseaux,{" "}
            <span className="gradient-text">votre image.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Stratégie éditoriale, création de contenu photo et vidéo, animation
            de communauté. Je m&apos;occupe de votre présence sociale pour que vous
            puissiez vous concentrer sur votre métier.
          </p>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
            >
              Discuter de mon projet
            </Link>
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-20 md:py-28 bg-bg-secondary">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Processus
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Ma <span className="gradient-text">méthode</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              De la stratégie à la publication, un processus structuré pour
              transformer vos réseaux en véritable canal d&apos;acquisition.
            </p>
          </div>

          <div className="space-y-4">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.n}
                className="flex flex-col md:flex-row gap-6 rounded-2xl border border-border bg-bg-card p-6 md:p-8 hover:border-border-hover transition-colors"
              >
                <div className="flex-shrink-0">
                  <span className="block text-2xl font-mono text-accent font-bold">
                    {step.n}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-bg-primary">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Questions <span className="gradient-text">fréquentes</span>
            </h2>
          </div>

          <div className="space-y-3">
            {SOCIAL_FAQ.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-border bg-bg-card overflow-hidden hover:border-border-hover transition-colors"
              >
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                  <h3 className="text-base md:text-lg font-semibold text-text-primary">
                    {item.question}
                  </h3>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center text-accent transition-transform duration-300 group-open:rotate-45">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-text-secondary leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative py-24 md:py-32 bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent/10 to-bg-primary pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-6">
            Donnons de la voix à{" "}
            <span className="gradient-text">votre marque.</span>
          </h2>
          <p className="text-lg text-text-secondary mb-10">
            Discutons de votre stratégie sociale — devis personnalisé sous 48h.
          </p>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02]"
          >
            Discuter de mon projet
          </Link>
        </div>
      </section>
    </>
  );
}
