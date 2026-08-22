import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site paper34.fr — éditeur, hébergeur, propriété intellectuelle. Paper34, studio graphique à Agde (Hérault).",
  alternates: { canonical: "https://www.paper34.fr/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-bg-primary">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
          Informations légales
        </p>
        <h1 className="text-[clamp(32px,6vw,56px)] font-bold tracking-[-2px] leading-tight mb-10">
          Mentions <span className="gradient-text">légales</span>
        </h1>

        <div className="space-y-10 text-text-secondary leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-3">Éditeur du site</h2>
            <p>
              Le site <strong className="text-text-primary">www.paper34.fr</strong> est édité par
              Benjamin Sanchez, entrepreneur individuel exerçant sous le nom commercial
              <strong className="text-text-primary"> PAPER34</strong>.
            </p>
            <ul className="mt-4 space-y-1.5">
              <li>Adresse : 2 Chemin des Dunes, 34300 Agde, France</li>
              <li>
                Téléphone :{" "}
                <a href="tel:+33782343227" className="text-accent hover:underline">
                  07 82 34 32 27
                </a>
              </li>
              <li>
                Email :{" "}
                <a href="mailto:contact@paper34.fr" className="text-accent hover:underline">
                  contact@paper34.fr
                </a>
              </li>
              <li>SIREN : 532 538 378</li>
              <li>RCS : 532 538 378 RCS Agde</li>
              <li>Répertoire des Métiers : 532 538 378 RM 34</li>
              <li>Numéro de TVA intracommunautaire : FR23532538378</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              Directeur de la publication
            </h2>
            <p>Benjamin Sanchez, en qualité d&apos;éditeur du site.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-primary mb-3">Hébergement</h2>
            <p>
              Le site est hébergé par <strong className="text-text-primary">Vercel Inc.</strong>,
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis —{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                vercel.com
              </a>
              .
            </p>
            <p className="mt-3">
              Les fichiers médias (photographies et vidéos des galeries clients) sont stockés sur
              Cloudflare R2, opéré par Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107,
              États-Unis.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              Propriété intellectuelle
            </h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site — photographies, vidéos, textes,
              identités visuelles, mises en page et code — est protégé par le droit d&apos;auteur.
              Les photographies et vidéos sont la propriété de Benjamin Sanchez, sauf mention
              contraire, et ne peuvent être reproduites, diffusées ou modifiées sans autorisation
              écrite préalable.
            </p>
            <p className="mt-3">
              Les marques, logos et visuels des clients présentés à titre de références restent la
              propriété de leurs titulaires respectifs, et sont publiés avec leur accord.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-primary mb-3">Liens et responsabilité</h2>
            <p>
              Ce site peut contenir des liens vers des sites tiers (sites de clients, réseaux
              sociaux). Paper34 n&apos;exerce aucun contrôle sur ces sites et décline toute
              responsabilité quant à leur contenu. Malgré le soin apporté aux informations
              publiées, des erreurs peuvent subsister : n&apos;hésitez pas à les signaler à
              l&apos;adresse ci-dessus.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              Données personnelles et cookies
            </h2>
            <p>
              Le traitement des données personnelles et l&apos;usage des cookies sont détaillés
              dans la{" "}
              <Link href="/confidentialite" className="text-accent hover:underline">
                politique de confidentialité
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-primary mb-3">Conception du site</h2>
            <p>Site conçu et développé par PAPER34 — studio graphique à Agde.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
