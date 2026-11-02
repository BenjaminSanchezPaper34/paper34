import Link from "next/link";
import ContactActions from "./ContactActions";
import PieceSlot from "./PieceSlot";
import { PIECES } from "./pieces";
import styles from "./accueil.module.css";

/**
 * Accueil v3 (Labo, 02/11/2026). Stratégie validée par Benjamin :
 * on le découvre par ses images vues chez ses clients (« qui vous a fait ce travail ? ») ;
 * le site confirme la qualité, rend la première prestation simple à demander,
 * puis montre par les cas comment une collaboration grandit.
 * Approche B : structure complète, emplacements qui décrivent la pièce attendue.
 */

const portes = [
  { titre: "Des photos et des vidéos de mon établissement", texte: "Reportages, contenus pour les réseaux, films courts, soirées et événements.", href: "/galeries", lien: "Voir les reportages" },
  { titre: "Quelqu’un pour animer mes réseaux", texte: "Instagram, Facebook, TikTok : des publications régulières, faites à partir de vos images.", href: "/services/reseaux-sociaux", lien: "Les réseaux sociaux" },
  { titre: "Un site qui fait réserver", texte: "Rapide sur téléphone, clair, facile à trouver sur Google.", href: "/services/creation-site-web", lien: "Les sites internet" },
  { titre: "Un logo, des menus, des supports", texte: "Identité, menus, affiches, signalétique, objets personnalisés.", href: "/services/graphisme", lien: "Le graphisme" },
];

type Cas = { client: string; lieu: string; etapes: string[]; aujourdhui: string; piece: string; note: string };

const cas: Cas[] = [
  {
    client: "Megakart", lieu: "Karting, Vias-Plage",
    etapes: [
      "Tout a commencé par des photos et des vidéos pour les réseaux.",
      "J’ai ensuite pris en charge Instagram, Facebook et TikTok.",
      "Les contenus étaient vus, mais le site convertissait mal sur téléphone : j’en ai fait un nouveau, avec un suivi mensuel.",
      "Je gère aussi sa présence sur les annuaires et les plateformes en ligne.",
    ],
    aujourdhui: "Pour une course, une date suffit. Je fais le visuel, l’événement Facebook, les publications Instagram et TikTok, le formulaire d’inscription sur le site et l’e-mail aux anciens participants.",
    piece: "P8", note: "Texte provisoire, à valider avec Megakart.",
  },
  {
    client: "O Soleil", lieu: "Restaurant, Marseillan",
    etapes: [
      "Une demande ponctuelle : la création du site.",
      "Six mois plus tard, le restaurant revient pour des retouches graphiques.",
      "Puis vient la question des avis Google.",
    ],
    aujourdhui: "Nous parlons maintenant d’un suivi mensuel : avis, fiche Google, horaires, maintenance et optimisation du site. Sans jamais avoir forcé la suite.",
    piece: "P9", note: "Texte provisoire, à valider avec le client (orthographe du nom à confirmer).",
  },
  {
    client: "Le Chiringuito", lieu: "Plage, Vias",
    etapes: [
      "Les photos et les vidéos des événements.",
      "La gestion des réseaux sociaux.",
      "Les menus, les affiches, les supports imprimés et les e-mailings.",
      "Les objets personnalisés : t-shirts, éventails, sous-bocks.",
    ],
    aujourdhui: "Je suis presque intégré à l’équipe, comme un responsable de communication externalisé.",
    piece: "P10", note: "Texte provisoire, à valider avec le Chiringuito.",
  },
];

export default function Accueil() {
  return (
    <div className={styles.home}>
      {/* 1. Hero : confirmer la qualité des images */}
      <section className={styles.hero} aria-labelledby="accueil-titre">
        <div className={styles.heroMedia}><PieceSlot id="P1" /></div>
        <div className={styles.heroText}>
          <p className={styles.kicker}>Benjamin Sanchez · Paper34 · Agde</p>
          <h1 id="accueil-titre">Des images qui donnent envie de venir.</h1>
          <p className={styles.lead}>Photographe, vidéaste et graphiste à Agde. Je fais aussi vivre ces images sur vos réseaux, votre site et vos supports.</p>
          <ContactActions where="hero" />
        </div>
      </section>

      {/* 2. Le travail déjà vu chez les clients */}
      <section className={styles.section} aria-labelledby="vues-titre">
        <div className={styles.head}>
          <h2 id="vues-titre">Vous les avez peut-être déjà vues.</h2>
          <p>Ces images tournent sur les réseaux de mes clients. C’est souvent comme ça qu’on me trouve.</p>
        </div>
        <div className={styles.wall}>
          <PieceSlot id="P2" legend="Le Chiringuito, Vias" className={styles.wallA} />
          <PieceSlot id="P3" legend="Megakart, Vias-Plage" className={styles.wallB} />
          <PieceSlot id="P4" legend="Restaurant (à choisir)" className={styles.wallC} />
          <PieceSlot id="P5" legend="La Guinguette, Saint-Laurent" className={styles.wallD} />
          <PieceSlot id="P6" legend="Fabrikus World, Vias" className={styles.wallE} />
          <PieceSlot id="P7" legend="Midi Cap Thau, en mer" className={styles.wallF} />
        </div>
        <Link className={styles.textLink} href="/galeries">Voir toutes les galeries</Link>
      </section>

      {/* 3. Les portes d'entrée : la première prestation, simple à demander */}
      <section className={`${styles.section} ${styles.alt}`} aria-labelledby="portes-titre">
        <div className={styles.head}>
          <h2 id="portes-titre">Par quoi on commence ?</h2>
          <p>La plupart de mes clients commencent par une seule demande. Choisissez la vôtre.</p>
        </div>
        <ul className={styles.portes}>
          {portes.map((p) => (
            <li key={p.titre}>
              <Link href={p.href} className={styles.porte}>
                <span className={styles.porteTitre}>{p.titre}</span>
                <span className={styles.porteTexte}>{p.texte}</span>
                <span className={styles.porteLien}>{p.lien} →</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className={styles.aussi}>Et aussi : <Link href="/services">fiche Google et présence en ligne</Link>, <Link href="/services/campagnes-sponsorisees">campagnes sponsorisées</Link>, <Link href="/services/newsletter-emailing">e-mailing</Link>, <Link href="/services/applications">applications</Link>.</p>
      </section>

      {/* 4. Les cas : une relation qui grandit (futur pic de la page) */}
      <section className={styles.section} aria-labelledby="cas-titre">
        <div className={styles.head}>
          <h2 id="cas-titre">Comment une collaboration grandit.</h2>
          <p>Je ne vends pas tout d’un coup. On commence par un besoin, et la suite vient quand elle a du sens.</p>
        </div>
        <div className={styles.casList}>
          {cas.map((c) => (
            <article key={c.client} className={styles.cas}>
              <header>
                <h3>{c.client}</h3>
                <p className={styles.casLieu}>{c.lieu}</p>
              </header>
              <ol className={styles.etapes}>{c.etapes.map((e) => <li key={e}>{e}</li>)}</ol>
              <p className={styles.aujourdhui}><b>Aujourd’hui.</b> {c.aujourdhui}</p>
              <PieceSlot id={c.piece} />
              <p className={styles.note}>{c.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 5. La personne derrière le travail */}
      <section className={`${styles.section} ${styles.alt}`} aria-labelledby="benjamin-titre">
        <div className={styles.bio}>
          <PieceSlot id="P11" />
          <div>
            <h2 id="benjamin-titre">Benjamin Sanchez</h2>
            <p>Je suis graphiste de formation, depuis une quinzaine d’années. La photo, la vidéo, les réseaux, les sites et le suivi en ligne sont venus ensuite, parce que mes clients en avaient besoin.</p>
            <p>Vous échangez directement avec moi, du premier rendez-vous au suivi. Une prestation ponctuelle ou un accompagnement dans la durée : c’est vous qui voyez.</p>
          </div>
          <PieceSlot id="P12" />
        </div>
      </section>

      {/* 6. Contact : tous les canaux */}
      <section className={styles.contact} aria-labelledby="contact-titre">
        <h2 id="contact-titre">Parlons de votre projet.</h2>
        <p>Appel, message ou e-mail : comme vous préférez. C’est moi qui vous réponds.</p>
        <ContactActions where="contact" withEmail />
      </section>

      {/* LABO : liste de courses tirée des emplacements (ne jamais reprendre dans main) */}
      <section className={styles.labo} aria-labelledby="pieces-titre">
        <h2 id="pieces-titre">Pièces à fournir (Labo)</h2>
        <ol>{PIECES.map((p) => <li key={p.id}><b>{p.id}</b> · {p.section} · {p.kind} ({p.format}) : {p.sujet}. <i>Piste : {p.source}.</i></li>)}</ol>
      </section>

      <div className={styles.bar}><ContactActions where="barre-mobile" /></div>
    </div>
  );
}
