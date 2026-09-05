import Link from "next/link";
import JsonLdSocialMedia, { SOCIAL_FAQ } from "@/components/seo/JsonLdSocialMedia";
import JsonLdBreadcrumb from "@/components/seo/JsonLdBreadcrumb";
import SocialFeature from "@/components/social-portfolio/SocialFeature";
import { MANAGED_ACCOUNTS } from "@/lib/instagram-accounts";

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Audit & stratégie",
    text: "Analyse de votre compte actuel, de vos concurrents et de votre cible. Nous définissons ensemble la ligne éditoriale, le ton, les piliers de contenu et les objectifs.",
  },
  {
    n: "02",
    title: "Charte visuelle",
    text: "Création d'une identité visuelle cohérente pour le feed : palette, typographies, templates de stories, gabarits de posts. Votre compte devient instantanément reconnaissable.",
  },
  {
    n: "03",
    title: "Création de contenu",
    text: "Shootings réguliers sur place : photo, vidéo, reels. Je capture l'authentique de votre activité — produits, équipe, ambiance, événements. Le contenu local et vrai performe toujours mieux.",
  },
  {
    n: "04",
    title: "Publication & animation",
    text: "Planning éditorial mensuel, publication aux meilleurs créneaux, réponses aux commentaires et messages. Vous validez chaque publication avant mise en ligne si vous le souhaitez.",
  },
  {
    n: "05",
    title: "Suivi & optimisation",
    text: "Reporting mensuel des performances (croissance, engagement, portée). Nous ajustons la stratégie en continu en fonction de ce qui fonctionne le mieux.",
  },
];

// Villes servies et clients nommés (comptes animés ou contenus produits pour
// leurs réseaux). Ordre : du studio vers l'extérieur.
const LOCAL_CASES = [
  {
    city: "Agde et le Cap d'Agde",
    text: "Infini Mouv, la salle de sport d'Agde : compte animé, contenus tournés en salle. Megakart, le karting du Cap : reportages photo des sessions pour leurs réseaux. Plages, loisirs et commerces du Cap : la saison se prépare au printemps.",
  },
  {
    city: "Marseillan",
    text: "La Team C, le restaurant du boulevard Lamartine : photos de l'équipe et des plats pour ses réseaux et ses fiches. Midi Cap Thau, sorties en mer : reportage à bord, dauphins et grand bleu pour Instagram.",
  },
  {
    city: "Vias-Plage",
    text: "Le Chiringuito de Vias-Plage, le Pampa et Fabrikus World : trois comptes animés à la saison, contenus produits sur place, publication aux créneaux où les vacanciers regardent. Les Délices de Farinette : compte et site.",
  },
  {
    city: "Bessan",
    text: "La Guinguette de Bessan : compte animé, reportages des soirées et des concerts, galeries photo partagées aux clients le lendemain matin pour qu'ils repartagent.",
  },
  {
    city: "Pézenas",
    text: "Les Scènes d'Oc, troupe de théâtre : reportage de représentation pour leurs réseaux et leur presse. Métiers d'art, antiquaires et commerces du centre : le contenu se tourne dans vos ateliers et vos rues.",
  },
  {
    city: "Sète et Béziers",
    text: "Restaurants, commerces et PME : même méthode, shooting sur place, calendrier local, reporting mensuel. Déplacement inclus dans l'Hérault, le reste de la France à distance.",
  },
];

export default function ReseauxSociauxPage() {
  return (
    <>
      <JsonLdSocialMedia />
      <JsonLdBreadcrumb
        items={[
          { name: "Accueil", url: "https://www.paper34.fr" },
          { name: "Services", url: "https://www.paper34.fr/services" },
          { name: "Réseaux sociaux", url: "https://www.paper34.fr/services/reseaux-sociaux" },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 bg-bg-primary overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Gestion des réseaux sociaux
          </p>
          <h1 className="text-[clamp(36px,7vw,72px)] font-bold tracking-[-2px] leading-tight mb-6">
            Gestion des réseaux sociaux{" "}
            <span className="gradient-text">à Agde et sur le littoral.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Stratégie éditoriale, photo, vidéo et publication pour les
            restaurants, commerces et loisirs d&apos;Agde, Marseillan, Vias,
            Bessan, Pézenas, Sète et Béziers. Je m&apos;occupe de votre présence
            sociale pour que vous puissiez vous concentrer sur votre métier.
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

      {/* Comptes gérés — la preuve par l'image, dès l'arrivée */}
      <section className="py-20 md:py-28 bg-bg-secondary">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Références
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Les comptes que <span className="gradient-text">j&apos;anime</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Stratégie, création, publication : des comptes gérés au quotidien.
              Les chiffres viennent de Meta Business Suite, les posts sont les
              vrais derniers publiés — cliquez, tout est réel.
            </p>
          </div>

          <div className="space-y-6">
            {MANAGED_ACCOUNTS.filter((a) => a.feed && a.feed.length > 0).map(
              (account) => (
                <SocialFeature key={account.handle} account={account} />
              )
            )}
          </div>
        </div>
      </section>

      {/* Ancrage local — audit GSC 05/09/2026 : la page ne nommait ni ville
          ni client, position 61-76 sur « gestion réseaux sociaux pézenas /
          béziers ». Villes servies + cas clients nommés. */}
      <section id="local" className="py-20 md:py-28 bg-bg-primary scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Community manager local
            </p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-[-2px] mb-4">
              Des comptes qui vivent{" "}
              <span className="gradient-text">ici, pas depuis un bureau.</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Je photographie et je filme sur place : la terrasse au coucher du
              soleil, le service du midi, l&apos;équipe, la soirée. C&apos;est ce
              contenu vrai, tourné à Agde, Vias ou Marseillan, qui fait remonter
              un compte local. Et je connais le calendrier d&apos;ici : rentrée,
              vacances de la zone C, saison, marchés, fêtes de village.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LOCAL_CASES.map((c) => (
              <div
                key={c.city}
                className="rounded-2xl border border-border bg-bg-card p-6 hover:border-border-hover transition-colors"
              >
                <h3 className="text-lg font-semibold mb-2">{c.city}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {c.text}
                </p>
              </div>
            ))}
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

      {/* FAQ — fond primaire : la section Processus au-dessus est déjà en
          secondaire, deux fonds identiques adjacents sont interdits. */}
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
