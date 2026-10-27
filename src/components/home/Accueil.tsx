import Link from "next/link";
import Image from "next/image";
import { CONTACT_INFO } from "@/lib/constants";
import AccueilMotion from "./AccueilMotion";
import styles from "./accueil.module.css";

const expertises = [
  { title: "Identité & design", summary: "Logos, chartes graphiques et supports imprimés.", text: "Je crée votre logo, votre charte graphique et vos supports de communication.", services: ["Identité visuelle", "Direction artistique", "Illustration", "Supports imprimés", "Tenues & objets"], href: "/services/graphisme", action: "Découvrir le design" },
  { title: "Photo & vidéo", summary: "Reportages, films et contenus pour vos réseaux.", text: "Je réalise des photos et des vidéos de votre activité, de vos équipes et de vos produits.", services: ["Reportage photo", "Films promotionnels", "Reels & formats courts", "Communication événementielle"], href: "/galeries", action: "Explorer les reportages" },
  { title: "Web & digital", summary: "Sites internet, applications et maintenance.", text: "Je conçois et entretiens votre site internet. Je développe aussi des applications adaptées à votre activité.", services: ["Sites vitrines & e-commerce", "Référencement", "Applications", "Maintenance"], href: "/services/creation-site-web", action: "Découvrir le web" },
  { title: "Communication & visibilité", summary: "Réseaux sociaux, campagnes publicitaires et emailing.", text: "Je prépare vos contenus, vos publications et vos campagnes de communication.", services: ["Réseaux sociaux", "Campagnes publicitaires", "Emailing", "Fiche Google"], href: "/services/reseaux-sociaux", action: "Voir les réseaux sociaux" },
];

/** Les six supports du hero ; ils se rejoignent ensuite autour d'un seul interlocuteur (geste signature). */
const supports = ["Logo & identité", "Photographies", "Vidéos", "Site internet", "Réseaux sociaux", "Supports imprimés"];

const pillars = [
  { title: "Des supports cohérents", text: "Votre site, vos publications et vos documents reprennent la même identité." },
  { title: "Des contenus à jour", text: "Je renouvelle vos images et vos publications au rythme de votre activité." },
  { title: "Des actions suivies", text: "Nous regardons ce qui fonctionne et ajustons les prochaines actions." },
];

const steps = [
  ["Nous définissons vos besoins.", "Nous discutons de votre activité et de vos priorités pour définir le contenu, le budget et le calendrier."],
  ["Je réalise vos supports.", "Je vous présente les propositions et nous les ajustons ensemble avant leur mise en ligne ou leur fabrication."],
  ["Je fais évoluer votre communication.", "Je m’occupe des mises à jour, des nouveaux contenus et du suivi des actions. Nous ajustons les priorités ensemble."],
];

/** Nombre de traits de la jauge de méthode (traits fins façon règle graduée). */
const GAUGE_TICKS = 48;

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} /></svg>;
}
function ProjectLink({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return <Link className={primary ? styles.button : styles.textLink} href={href}>{children}<Arrow diagonal /></Link>;
}
/** Emplacement éditorial explicite, au format de la future ressource, non interactif tant qu'elle manque. */
function ResourceSlot({ label, format, className = "" }: { label: string; format: string; className?: string }) {
  return <figure className={`${styles.slot} ${className}`} data-reveal>
    <div className={styles.slotFrame} aria-label={`Emplacement réservé : ${label}`}>
      <span className={styles.slotStatus}>Ressource à venir</span>
      <span className={styles.slotFormat}>{format}</span>
    </div>
    <figcaption>{label}</figcaption>
  </figure>;
}

export default function Accueil() {
  return <AccueilMotion><div className={styles.home} id="accueil">
    <a className={styles.skip} href="#accompagnement">Passer à l’accompagnement</a>

    {/* 1 · Présentation — titre à gauche, la feuille de papier dans la lumière à droite */}
    <section className={styles.hero} aria-labelledby="home-title" data-hero>
      <div className={styles.heroVisual} data-hero-visual aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/accueil/papier-lumiere-portrait.jpg" />
          <Image src="/images/accueil/papier-lumiere.jpg" alt="" fill priority sizes="(max-width: 767px) 100vw, 60vw" />
        </picture>
      </div>
      <div className={styles.heroText} data-hero-text>
        <p className={styles.heroMeta}>Benjamin Sanchez · Paper34 · Agde</p>
        <h1 id="home-title">
          <span className={styles.line}><span data-title-line>Je vous accompagne</span></span>{" "}
          <span className={styles.line}><span data-title-line>dans votre communication.</span></span>
        </h1>
        <p className={styles.heroDescription} data-hero-item>Je conçois et réalise les supports de votre communication :</p>
        <ul className={styles.supportList} aria-label="Les services proposés">{supports.map(s => <li key={s} data-hero-item>{s}</li>)}</ul>
        <div className={styles.heroActions} data-hero-item><ProjectLink href="/contact" primary>Démarrer un projet</ProjectLink><a className={styles.textLink} href="#accompagnement">Comprendre l’accompagnement <Arrow /></a></div>
      </div>
    </section>

    {/* 2 · Accompagnement — le pic : les six supports se rejoignent autour d'un seul interlocuteur */}
    <section id="accompagnement" className={styles.partnership} aria-labelledby="partner-title" data-converge>
      <div className={styles.partnerStage}>
        <div className={styles.partnerIntro}>
          <p className={styles.label}>L’accompagnement</p>
          <h2 id="partner-title">Un accompagnement dans la durée.</h2>
          <p>Je prends le temps de connaître votre activité, puis je crée et fais évoluer vos supports. Nous suivons les retours de vos actions pour améliorer votre communication au fil du temps.</p>
        </div>
        <div className={styles.orbit} aria-hidden="true">
          {supports.map((s, i) => <span key={s} className={styles.orbitItem} style={{ "--i": i } as React.CSSProperties} data-orbit>{s}</span>)}
          <div className={styles.core} data-core><span>Un seul interlocuteur</span></div>
        </div>
        <dl className={styles.pillars}>{pillars.map(p => <div key={p.title} data-pillar><dt>{p.title}</dt><dd>{p.text}</dd></div>)}</dl>
        <div className={styles.partnerFoot}><ProjectLink href="/contact" primary>Démarrer un projet</ProjectLink><a className={styles.textLink} href="#expertises">Voir les prestations <Arrow /></a></div>
      </div>
    </section>

    {/* 3 · Prestations — index typographique en quatre familles, sans cartes */}
    <section id="expertises" className={`${styles.section} ${styles.expertise}`} aria-label="Les quatre familles d’expertises">
      <div className={styles.sectionHeading} data-reveal><p className={styles.label}>Les prestations</p><h2>Ce que je réalise pour vous.</h2></div>
      <div className={styles.expertiseList}>{expertises.map((item, i) => <details key={item.title} className={styles.expertiseRow} open={i === 0} data-reveal>
        <summary><span className={styles.rowIndex}>{i + 1}</span><div><h3>{item.title}</h3><p>{item.summary}</p></div><span className={styles.plus} aria-hidden="true">+</span></summary>
        <div className={styles.expertiseContent}><p>{item.text}</p><ul>{item.services.map(service => <li key={service}>{service}</li>)}</ul><ProjectLink href={item.href}>{item.action}</ProjectLink></div>
      </details>)}</div>
    </section>

    {/* 4 · Réalisations — composition asymétrique déjà en place, ressources à venir */}
    <section id="realisations" className={`${styles.section} ${styles.work}`} aria-labelledby="work-title">
      <div className={styles.workIntro} data-reveal><div><p className={styles.label}>Les réalisations</p><h2 id="work-title">Quelques exemples de mon travail.</h2><p className={styles.sectionNote}>Les contenus seront ajoutés dans les emplacements ci-dessous.</p></div><ProjectLink href="/portfolio">Voir le portfolio</ProjectLink></div>
      <div className={styles.workGrid}>
        <ResourceSlot className={styles.slotFeature} label="Reportage photo" format="Photographie · 3:2" />
        <ResourceSlot className={styles.slotTall} label="Film de présentation" format="Vidéo · 4:5" />
        <ResourceSlot className={styles.slotWide} label="Projet web" format="Site internet · 16:10" />
        <ResourceSlot className={styles.slotSquare} label="Identité visuelle" format="Design · 1:1" />
      </div>
      <div className={styles.proofSlots}><ResourceSlot label="Retour d’expérience" format="Témoignage à sélectionner" /><ResourceSlot label="Cas d’accompagnement" format="Ressources à réunir" /></div>
    </section>

    {/* 5 · Méthode — jauge de traits fins qui se remplit au fil des étapes */}
    <section id="a-propos" className={`${styles.section} ${styles.method}`} aria-labelledby="method-title">
      <div data-reveal><p className={styles.label}>À propos</p><h2 id="method-title">Comment nous travaillons.</h2><p className={styles.methodIntro}>Je suis Benjamin Sanchez, graphiste, photographe et développeur web à Agde. Vous échangez directement avec moi pour la préparation, la réalisation et le suivi de votre projet.</p><p className={styles.oneOffNote}>Un besoin ponctuel reste possible, par exemple pour un logo, des photos ou un site.</p><a className={styles.textLink} href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}>M’appeler <Arrow diagonal /></a></div>
      <div className={styles.methodTrack} data-gauge-track>
        <div className={styles.gauge} aria-hidden="true">
          <div className={styles.gaugeTicks}>{Array.from({ length: GAUGE_TICKS }, (_, i) => <i key={i} />)}</div>
          <div className={`${styles.gaugeTicks} ${styles.gaugeLit}`} data-gauge-lit>{Array.from({ length: GAUGE_TICKS }, (_, i) => <i key={i} />)}</div>
          <span className={styles.gaugeHead} data-gauge-head />
        </div>
        <ol className={styles.steps}>{steps.map(([title, text]) => <li key={title} data-step><h3>{title}</h3><p>{text}</p></li>)}</ol>
      </div>
    </section>

    {/* 6 · Contact — l'action posée, coordonnées sans détour */}
    <section id="contact" className={`${styles.section} ${styles.contact}`} aria-labelledby="contact-title"><p className={styles.label}>Contact</p><h2 id="contact-title" data-reveal>Parlons de votre projet.</h2><div className={styles.contactBottom}><div><p>Décrivez-moi votre activité et ce dont vous avez besoin. Nous prendrons le temps d’en discuter.</p><div className={styles.contactLinks}><a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a><a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}>{CONTACT_INFO.phone}</a></div></div><ProjectLink href="/contact" primary>Démarrer un projet</ProjectLink></div><p className={styles.colophon}>Benjamin Sanchez · Paper34 · Agde</p></section>
  </div></AccueilMotion>;
}
