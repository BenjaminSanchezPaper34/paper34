import type { Metadata } from "next";
import Link from "next/link";
import GestionCookies from "@/components/legal/GestionCookies";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Paper34 traite vos données personnelles : formulaire de contact, galeries clients, mesure d'audience, cookies et vos droits (RGPD).",
  alternates: { canonical: "https://www.paper34.fr/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-bg-primary">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
          Vos données
        </p>
        <h1 className="text-[clamp(32px,6vw,56px)] font-bold tracking-[-2px] leading-tight mb-6">
          Politique de <span className="gradient-text">confidentialité</span>
        </h1>
        <p className="text-text-secondary leading-relaxed mb-10">
          Je collecte le strict nécessaire pour répondre à vos demandes et livrer mes prestations.
          Aucune donnée n&apos;est vendue ni cédée à des tiers à des fins commerciales.
        </p>

        <div className="space-y-10 text-text-secondary leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              Responsable du traitement
            </h2>
            <p>
              Benjamin Sanchez (PAPER34), 2 Chemin des Dunes, 34300 Agde —{" "}
              <a href="mailto:contact@paper34.fr" className="text-accent hover:underline">
                contact@paper34.fr
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              Données collectées et finalités
            </h2>

            <div className="mt-4 space-y-5">
              <div className="rounded-2xl border border-border bg-bg-card p-5">
                <h3 className="font-semibold text-text-primary mb-1.5">
                  Formulaire de contact
                </h3>
                <p className="text-sm">
                  Nom, adresse email, téléphone si vous le renseignez, et contenu de votre
                  message. Ces données servent uniquement à vous répondre et à établir un devis.
                  <br />
                  <span className="text-text-primary">Base légale :</span> votre démarche
                  volontaire (mesures précontractuelles).
                  <br />
                  <span className="text-text-primary">Conservation :</span> 3 ans à compter du
                  dernier échange, puis suppression.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-bg-card p-5">
                <h3 className="font-semibold text-text-primary mb-1.5">
                  Galeries photo clients
                </h3>
                <p className="text-sm">
                  Les photographies et vidéos livrées peuvent contenir l&apos;image de personnes
                  présentes lors d&apos;un événement. Elles sont hébergées dans des galeries
                  privées accessibles par lien, non référencées sur les moteurs de recherche.
                  <br />
                  <span className="text-text-primary">Base légale :</span> exécution du contrat
                  conclu avec le client, et intérêt légitime à présenter mon travail lorsque la
                  publication a été autorisée.
                  <br />
                  <span className="text-text-primary">Conservation :</span> durée de la relation
                  commerciale ; retrait possible à tout moment sur simple demande.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-bg-card p-5">
                <h3 className="font-semibold text-text-primary mb-1.5">
                  Mesure d&apos;audience
                </h3>
                <p className="text-sm">
                  Pages consultées, provenance et type d&apos;appareil, afin de savoir quels
                  contenus sont utiles. Google Analytics n&apos;est activé qu&apos;avec votre
                  accord ; la mesure interne de Vercel, elle, ne dépose aucun cookie et
                  n&apos;identifie personne.
                  <br />
                  <span className="text-text-primary">Base légale :</span> votre consentement
                  pour Google Analytics, intérêt légitime pour la mesure anonyme.
                  <br />
                  <span className="text-text-primary">Conservation :</span> 14 mois maximum.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              Destinataires et sous-traitants
            </h2>
            <p>
              Vos données ne sont accessibles qu&apos;à moi-même et aux prestataires techniques
              strictement nécessaires au fonctionnement du site :
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <strong className="text-text-primary">Vercel Inc.</strong> (États-Unis) —
                hébergement du site et mesure d&apos;audience anonyme.
              </li>
              <li>
                <strong className="text-text-primary">Formspree, Inc.</strong> (États-Unis) —
                acheminement des messages envoyés depuis le formulaire de contact.
              </li>
              <li>
                <strong className="text-text-primary">Cloudflare, Inc.</strong> (États-Unis) —
                stockage des photos et vidéos des galeries.
              </li>
              <li>
                <strong className="text-text-primary">Google Ireland Ltd.</strong> — mesure
                d&apos;audience Google Analytics, uniquement si vous l&apos;avez acceptée.
              </li>
              <li>
                <strong className="text-text-primary">Hostinger International Ltd.</strong>{" "}
                (Lituanie) — hébergement de la messagerie contact@paper34.fr.
              </li>
            </ul>
            <p className="mt-4 text-sm">
              Certains de ces prestataires sont établis aux États-Unis. Les transferts s&apos;y
              opèrent dans le cadre du Data Privacy Framework ou de clauses contractuelles types
              approuvées par la Commission européenne.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-primary mb-3">Cookies</h2>
            <p>
              Ce site ne dépose <strong className="text-text-primary">aucun cookie publicitaire</strong>{" "}
              et ne pratique aucun suivi entre sites. Seuls les cookies de mesure d&apos;audience
              Google Analytics peuvent être déposés, et uniquement après votre accord explicite.
              Refuser n&apos;altère en rien le fonctionnement du site.
            </p>
            <p className="mt-3">
              Votre choix est conservé pendant 6 mois et reste modifiable à tout moment :
            </p>
            <div className="mt-4">
              <GestionCookies />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-primary mb-3">Vos droits</h2>
            <p>
              Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
              limitation, d&apos;opposition et de portabilité sur vos données. Pour l&apos;exercer,
              écrivez à{" "}
              <a href="mailto:contact@paper34.fr" className="text-accent hover:underline">
                contact@paper34.fr
              </a>{" "}
              : je réponds sous un mois.
            </p>
            <p className="mt-3">
              Si une photographie vous représente et que vous souhaitez son retrait, un simple
              message suffit — elle sera dépubliée sans que vous ayez à vous justifier.
            </p>
            <p className="mt-3">
              En cas de désaccord persistant, vous pouvez saisir la CNIL — 3 place de Fontenoy,
              TSA 80715, 75334 Paris Cedex 07 —{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                cnil.fr
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-primary mb-3">Mise à jour</h2>
            <p>
              Dernière mise à jour : 22 août 2026. Voir aussi les{" "}
              <Link href="/mentions-legales" className="text-accent hover:underline">
                mentions légales
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
