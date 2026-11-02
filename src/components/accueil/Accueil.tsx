/* eslint-disable @next/next/no-img-element -- Labo : vignettes d'aperçu servies telles quelles depuis R2 */
import Link from "next/link";
import ContactActions from "./ContactActions";
import PieceSlot from "./PieceSlot";
import { PIECES, piece } from "./pieces";
import { CLIENTS } from "./clients";
import styles from "./accueil.module.css";

/**
 * Accueil v3, grammaire « galerie légendée » (Labo, 02/11/2026).
 * Moteur : « qui vous a fait ce travail ? ». Le visiteur vient retrouver une image vue chez un client.
 * La page est un index de réalisations ; chaque objet a la même légende (n°, client, lieu, ce que j'ai fait) :
 * c'est cette légende qui montre l'étendue du travail, sans catalogue de services.
 * Références : Nite Riot et Waka Waka (index), A24 (titres empilés), maquette B (Higgsfield, 02/11).
 */

const portes = [
  { titre: "Des photos et des vidéos de mon établissement", href: "/galeries" },
  { titre: "Quelqu’un pour animer mes réseaux", href: "/services/reseaux-sociaux" },
  { titre: "Un site qui fait réserver", href: "/services/creation-site-web" },
  { titre: "Un logo, des menus, des supports", href: "/services/graphisme" },
];

/** Vignette d'aperçu d'une ligne de l'index : l'image, ou l'affiche de la vidéo. */
const vignette = (id: string) => {
  const m = piece(id).media;
  return m ? (m.type === "image" ? m.src : m.poster) : undefined;
};

export default function Accueil() {
  return (
    <div className={styles.home}>
      {/* 1. Hero : la promesse et le film, les trois canaux */}
      <section className={styles.hero} aria-labelledby="accueil-titre">
        <div className={styles.heroText}>
          <h1 id="accueil-titre">Des images qui donnent envie de venir.</h1>
          <p className={styles.lead}>Benjamin Sanchez, photographe, vidéaste et graphiste à Agde. Je fais aussi vivre ces images sur vos réseaux, votre site et vos supports.</p>
          <ContactActions where="hero" />
        </div>
        <div className={styles.heroMedia}><PieceSlot id="P1" legend="" priority /></div>
      </section>

      {/* 2. L'index : on retrouve l'image vue chez un client, et tout ce que j'ai fait pour lui */}
      <section className={styles.index} aria-labelledby="index-titre">
        <h2 id="index-titre" className={styles.indexLabel}>Index</h2>
        <div className={styles.indexHead} aria-hidden="true"><span>N°</span><span>Client</span><span>Ce que j’ai fait</span><span>Lieu</span></div>
        <ol className={styles.indexList}>
          {CLIENTS.map((c) => {
            const thumb = vignette(c.pieces[0]);
            return (
              <li key={c.id}>
                <a href={`#${c.id}`} className={styles.indexRow}>
                  <span className={styles.indexN}>{c.n}</span>
                  <span className={styles.indexNom}>{c.nom}</span>
                  <span className={styles.indexFait}>{c.fait.join(" · ")}</span>
                  <span className={styles.indexLieu}>{c.lieu}</span>
                  {thumb && <img className={styles.indexThumb} src={thumb} alt="" loading="lazy" />}
                </a>
              </li>
            );
          })}
        </ol>
      </section>

      {/* 3. Les planches : une réalisation par double page, côtés alternés ; les cas racontent la relation */}
      <div className={styles.planches}>
        {CLIENTS.map((c, i) => (
          <article key={c.id} id={c.id} className={`${styles.planche} ${i % 2 ? styles.plancheInverse : ""}`} aria-labelledby={`${c.id}-nom`}>
            <div className={styles.plancheMedia}>
              <PieceSlot id={c.pieces[0]} legend="" ratio="4 / 3" />
              {c.pieces[1] && <PieceSlot id={c.pieces[1]} legend="" className={styles.plancheSecond} />}
            </div>
            <div className={styles.plancheTexte}>
              <p className={styles.plancheN}>{c.n} / {String(CLIENTS.length).padStart(2, "0")} · {c.lieu}</p>
              <h3 id={`${c.id}-nom`}>{c.nom}</h3>
              <ul className={styles.tags} aria-label="Ce que j’ai fait">{c.fait.map((f) => <li key={f}>{f}</li>)}</ul>
              {c.cas && (
                <>
                  <p className={styles.grandit}>Comment la collaboration a grandi</p>
                  <ol className={styles.timeline}>{c.cas.etapes.map((e) => <li key={e}>{e}</li>)}</ol>
                  <p className={styles.aujourdhui}><b>Aujourd’hui.</b> {c.cas.aujourdhui}</p>
                  <p className={styles.note}>{c.cas.note}</p>
                </>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* 4. Les portes d'entrée : la première prestation, simple à demander */}
      <section className={styles.portesSection} aria-labelledby="portes-titre">
        <h2 id="portes-titre">Par quoi on commence ?</h2>
        <p className={styles.sub}>La plupart de mes clients commencent par une seule demande, et la suite vient quand elle a du sens.</p>
        <ul className={styles.portes}>{portes.map((p) => <li key={p.titre}><Link href={p.href} className={styles.porte}>{p.titre}<span aria-hidden="true">→</span></Link></li>)}</ul>
      </section>

      {/* 5. La personne derrière le travail */}
      <section className={styles.bio} aria-labelledby="benjamin-titre">
        <PieceSlot id="P11" legend="" />
        <div className={styles.bioTexte}>
          <h2 id="benjamin-titre">Benjamin Sanchez</h2>
          <p>Je suis graphiste de formation, depuis une quinzaine d’années. La photo, la vidéo, les réseaux, les sites et le suivi en ligne sont venus ensuite, parce que mes clients en avaient besoin.</p>
          <p>Vous échangez directement avec moi, du premier rendez-vous au suivi. Une prestation ponctuelle ou un accompagnement dans la durée : c’est vous qui voyez.</p>
        </div>
        <PieceSlot id="P12" legend="" />
      </section>

      {/* 6. Fin : le mot final géant, l'action posée */}
      <section className={styles.fin} aria-labelledby="fin-titre">
        <h2 id="fin-titre">Parlons-en.</h2>
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
