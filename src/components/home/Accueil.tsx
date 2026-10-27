import Link from "next/link";
import { CONTACT_INFO } from "@/lib/constants";
import styles from "./accueil.module.css";

const expertises = [
  { title: "Identité & design", summary: "Logos, chartes graphiques et supports imprimés.", text: "Je crée votre logo, votre charte graphique et vos supports de communication.", services: ["Identité visuelle", "Direction artistique", "Illustration", "Supports imprimés", "Tenues & objets"], href: "/services/graphisme", action: "Découvrir le design" },
  { title: "Photo & vidéo", summary: "Reportages, films et contenus pour vos réseaux.", text: "Je réalise des photos et des vidéos de votre activité, de vos équipes et de vos produits.", services: ["Reportage photo", "Films promotionnels", "Reels & formats courts", "Communication événementielle"], href: "/galeries", action: "Explorer les reportages" },
  { title: "Web & digital", summary: "Sites internet, applications et maintenance.", text: "Je conçois et entretiens votre site internet. Je développe aussi des applications adaptées à votre activité.", services: ["Sites vitrines & e-commerce", "Référencement", "Applications", "Maintenance"], href: "/services/creation-site-web", action: "Découvrir le web" },
  { title: "Communication & visibilité", summary: "Réseaux sociaux, campagnes publicitaires et emailing.", text: "Je prépare vos contenus, vos publications et vos campagnes de communication.", services: ["Réseaux sociaux", "Campagnes publicitaires", "Emailing", "Fiche Google"], href: "/services/reseaux-sociaux", action: "Voir les réseaux sociaux" },
];

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} /></svg>;
}
function ProjectLink({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return <Link className={primary ? styles.button : styles.textLink} href={href}>{children}<Arrow diagonal /></Link>;
}
function SectionHeading({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return <div className={styles.sectionHeading}><p className={styles.label}>{label}</p><h2>{title}</h2>{children}</div>;
}
/** Emplacement éditorial explicite, non interactif tant que la ressource manque. */
function ResourceSlot({ label, format = "Visuel", className = "" }: { label: string; format?: string; className?: string }) {
  return <div className={`${styles.resourceSlot} ${className}`} aria-label={`Emplacement réservé : ${label}`}>
    <span className={styles.resourceStatus}>Ressource à venir</span>
    <div className={styles.resourceLabel}><span>{label}</span></div>
    <span className={styles.resourceFormat}>{format}</span>
  </div>;
}
function ProjectSlot({ title, description, format }: { title: string; description: string; format: string }) {
  return <figure className={styles.project}>
    <ResourceSlot className={styles.projectImage} label={title} format={format} />
    <figcaption className={styles.caption}><h3>{title}</h3><p>{description}</p></figcaption>
  </figure>;
}

export default function Accueil() {
  return <div className={styles.home} id="accueil">
    <a className={styles.skip} href="#accompagnement">Passer à l’accompagnement</a>
    <section className={styles.hero} aria-labelledby="home-title">
      <p className={styles.heroMeta}>Benjamin Sanchez · Paper34 · Agde</p>
      <h1 id="home-title">Je vous accompagne dans votre communication.</h1>
      <p className={styles.heroDescription}>Je conçois et réalise les supports de votre communication :</p>
      <ul className={styles.serviceObjects} aria-label="Les services proposés">{["Logo & identité", "Photographies", "Vidéos", "Site internet", "Réseaux sociaux", "Supports imprimés"].map(service => <li key={service}>{service}</li>)}</ul>
      <div className={styles.heroActions}><ProjectLink href="/contact" primary>Démarrer un projet</ProjectLink><a className={styles.textLink} href="#accompagnement">Comprendre l’accompagnement <Arrow /></a></div>
    </section>


    <section id="accompagnement" className={`${styles.section} ${styles.partnership}`} aria-labelledby="partner-title">
      <div className={styles.partnerIntro}><div><p className={styles.label}>L’accompagnement</p><h2 id="partner-title">Un accompagnement dans la durée.</h2></div><p>Je prends le temps de connaître votre activité, puis je crée et fais évoluer vos supports. Nous suivons les retours de vos actions pour améliorer votre communication au fil du temps.</p></div>
      <dl className={styles.supportOptions}><div><dt>Des supports cohérents</dt><dd>Votre site, vos publications et vos documents reprennent la même identité.</dd></div><div><dt>Des contenus à jour</dt><dd>Je renouvelle vos images et vos publications au rythme de votre activité.</dd></div><div><dt>Des actions suivies</dt><dd>Nous regardons ce qui fonctionne et ajustons les prochaines actions.</dd></div></dl>
      <div className={styles.partnerFoot}><ProjectLink href="/contact" primary>Démarrer un projet</ProjectLink><a className={styles.textLink} href="#expertises">Voir les prestations <Arrow /></a></div>
      <details className={styles.reservedDetails}><summary>Emplacements du futur cas d’accompagnement <span aria-hidden="true">+</span></summary><div className={styles.channelRail}>
        <ResourceSlot label="Photos et vidéos" format="Contenus à sélectionner" />
        <ResourceSlot label="Publication sur les réseaux" format="Exemple à ajouter" />
        <ResourceSlot label="Site internet" format="Capture à ajouter" />
      </div></details>
    </section>

    <section id="expertises" className={`${styles.section} ${styles.expertise}`} aria-label="Les quatre familles d’expertises">
      <SectionHeading label="Les prestations" title="Ce que je réalise pour vous." />
      <div className={styles.expertiseList}>{expertises.map((item) => <details key={item.title} className={styles.expertiseRow}><summary><div><h3>{item.title}</h3><p>{item.summary}</p></div><span className={styles.plus} aria-hidden="true">+</span></summary><div className={styles.expertiseContent}><p>{item.text}</p><ul>{item.services.map(service => <li key={service}>{service}</li>)}</ul><ProjectLink href={item.href}>{item.action}</ProjectLink></div></details>)}</div>
    </section>

    <section id="realisations" className={`${styles.section} ${styles.work}`} aria-labelledby="work-title">
      <div className={styles.workIntro}><div><p className={styles.label}>Les réalisations</p><h2 id="work-title">Quelques exemples de mon travail.</h2><p className={styles.sectionNote}>Les contenus seront ajoutés dans les emplacements ci-dessous.</p></div><ProjectLink href="/portfolio">Voir le portfolio</ProjectLink></div>
      <details className={styles.reservedDetails}><summary>Voir les emplacements prévus <span aria-hidden="true">+</span></summary><div className={styles.projectGrid}>
        <ProjectSlot title="Reportage photo" description="Sélection et légende à ajouter" format="Photographie" />
        <ProjectSlot title="Projet web" description="Capture et présentation à ajouter" format="Site internet" />
        <ProjectSlot title="Identité visuelle" description="Supports et contexte à ajouter" format="Design" />
        <ProjectSlot title="Film de présentation" description="Vidéo et résumé à ajouter" format="Vidéo" />
      </div><div className={styles.proofSlots}><ResourceSlot label="Retour d’expérience" format="Témoignage à sélectionner" /><ResourceSlot label="Cas d’accompagnement" format="Ressources à réunir" /></div></details>
    </section>

    <section id="a-propos" className={`${styles.section} ${styles.method}`} aria-labelledby="method-title"><div><p className={styles.label}>À propos</p><h2 id="method-title">Comment nous travaillons.</h2><p className={styles.methodIntro}>Je suis Benjamin Sanchez, graphiste, photographe et développeur web à Agde. Vous échangez directement avec moi pour la préparation, la réalisation et le suivi de votre projet.</p><p className={styles.oneOffNote}>Un besoin ponctuel reste possible, par exemple pour un logo, des photos ou un site.</p><a className={styles.textLink} href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}>M’appeler <Arrow diagonal /></a></div><ol className={styles.steps}>{[
      ["Nous définissons vos besoins.", "Nous discutons de votre activité et de vos priorités pour définir le contenu, le budget et le calendrier."],
      ["Je réalise vos supports.", "Je vous présente les propositions et nous les ajustons ensemble avant leur mise en ligne ou leur fabrication."],
      ["Je fais évoluer votre communication.", "Je m’occupe des mises à jour, des nouveaux contenus et du suivi des actions. Nous ajustons les priorités ensemble."],
    ].map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ol></section>



    <section id="contact" className={`${styles.section} ${styles.contact}`} aria-labelledby="contact-title"><p className={styles.label}>Contact</p><h2 id="contact-title">Parlons de votre projet.</h2><div className={styles.contactBottom}><div><p>Décrivez-moi votre activité et ce dont vous avez besoin. Nous prendrons le temps d’en discuter.</p><div className={styles.contactLinks}><a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a><a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}>{CONTACT_INFO.phone}</a></div></div><ProjectLink href="/contact" primary>Démarrer un projet</ProjectLink></div><p className={styles.colophon}>Benjamin Sanchez · Paper34 · Agde</p></section>
  </div>;
}
