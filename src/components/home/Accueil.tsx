import Link from "next/link";
import { CONTACT_INFO } from "@/lib/constants";
import AccueilMotion from "./AccueilMotion";
import styles from "./accueil.module.css";

const expertises = [
  { title: "Identité & design", text: "Une identité qui vous ressemble, reconnaissable sur chaque support.", services: ["Identité visuelle", "Direction artistique", "Illustration", "Supports imprimés", "Tenues & objets"], href: "/services/graphisme", action: "Découvrir le design" },
  { title: "Photo & vidéo", text: "Vos lieux, vos équipes et vos produits. Le contenu se crée chez vous.", services: ["Reportage photo", "Films promotionnels", "Reels & formats courts", "Communication événementielle"], href: "/galeries", action: "Explorer les reportages" },
  { title: "Web & digital", text: "Un site pour vous trouver. Des outils pour simplifier votre quotidien.", services: ["Sites vitrines & e-commerce", "Référencement", "Applications", "Maintenance"], href: "/services/creation-site-web", action: "Découvrir le web" },
  { title: "Communication & visibilité", text: "Garder le lien avec vos clients, de la première découverte à la prochaine visite.", services: ["Réseaux sociaux", "Campagnes publicitaires", "Emailing", "Fiche Google"], href: "/services/reseaux-sociaux", action: "Découvrir l’accompagnement" },
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
    <div className={styles.resourceLabel}><span className={styles.resourceMark} aria-hidden="true" /><span>{label}</span></div>
    <span className={styles.resourceFormat}>{format}</span>
  </div>;
}
function ProjectSlot({ title, description, format, large = false }: { title: string; description: string; format: string; large?: boolean }) {
  return <figure className={`${styles.project} ${large ? styles.projectLarge : ""}`}>
    <ResourceSlot className={styles.projectImage} label={title} format={format} />
    <figcaption className={styles.caption}><h3>{title}</h3><p>{description}</p></figcaption>
  </figure>;
}

export default function Accueil() {
  return <AccueilMotion><div className={styles.home} id="accueil">
    <a className={styles.skip} href="#realisations">Passer aux réalisations</a>
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.heroMeta}><span>Paper34 · Communication globale</span><span>Agde & au-delà</span></div>
      <h1 id="home-title"><span data-title-line>Toute votre<br className={styles.mobileBreak} /> communication.</span><span data-title-line>Un seul partenaire<span className={styles.blue}>.</span></span></h1>
      <div className={styles.heroBottom}><p>De la première idée au quotidien de votre marque.<br />Je crée, je coordonne, je vous accompagne.</p><ProjectLink href="/contact" primary>Démarrer un projet</ProjectLink></div>
      <div className={styles.heroStrip} aria-label="Emplacements des futurs visuels"><ResourceSlot label="Photographie" format="Image" /><ResourceSlot label="Projet web" format="Capture" /><ResourceSlot label="Film" format="Vidéo" /></div>
      <div className={styles.stripCaption}><span>Les futurs visuels prendront place ici.</span><a href="#realisations">Explorer les réalisations <Arrow /></a></div>
    </section>

    <section id="realisations" className={`${styles.section} ${styles.work}`} aria-labelledby="work-title">
      <div className={styles.workIntro}><div><p className={styles.label}>Sélection de réalisations</p><h2 id="work-title">Des univers différents.<br /><span className={styles.muted}>Le même engagement.</span></h2></div><ProjectLink href="/portfolio">Tout le portfolio</ProjectLink></div>
      <div className={styles.projectGrid}>
        <ProjectSlot title="Reportage photo" description="Sélection et légende à ajouter" format="Photographie" large />
        <ProjectSlot title="Projet web" description="Capture et présentation à ajouter" format="Site internet" />
        <ProjectSlot title="Identité visuelle" description="Supports et contexte à ajouter" format="Design" />
        <ProjectSlot title="Film de présentation" description="Vidéo et résumé à ajouter" format="Vidéo" />
      </div>
    </section>

    <section id="accompagnement" className={`${styles.section} ${styles.partnership}`} aria-labelledby="partner-title">
      <div className={styles.partnerIntro}><p className={styles.label}>L’accompagnement global</p><h2 id="partner-title">Tout se répond.<br /><span className={styles.muted}>Enfin.</span></h2><p>Votre site ne vit pas seul. Vos réseaux non plus. Je relie vos images, vos messages et vos supports pour construire une communication cohérente, dans la durée.</p></div>
      <div className={styles.channelStage}>
        <div className={styles.stageHeading}><h3>Une direction commune.<br />Plusieurs points de contact.</h3><p className={styles.muted}>Un futur cas d’accompagnement<br />sera présenté dans ces emplacements.</p></div>
        <div className={styles.channelRail}>
          <figure className={styles.channel}><ResourceSlot className={styles.channelPhoto} label="Contenu source" format="Photo / vidéo" /><figcaption><span>Créer la matière</span><p>Le point de départ visuel.</p></figcaption></figure>
          <figure className={`${styles.channel} ${styles.channelSocial}`}><ResourceSlot label="Déclinaison sociale" format="Publication" /><figcaption><span>Faire vivre la marque</span><p>Le contenu adapté aux réseaux.</p></figcaption></figure>
          <figure className={`${styles.channel} ${styles.channelWeb}`}><ResourceSlot label="Déclinaison web" format="Capture" /><figcaption><span>Donner une destination</span><p>Le prolongement sur le site.</p></figcaption></figure>
        </div>
      </div>
      <div className={styles.partnerFoot}><p>Un besoin précis ? Bien sûr.<br /><span className={styles.muted}>Un partenaire pour la suite ? C’est aussi le métier.</span></p><ProjectLink href="/contact">Démarrer un projet</ProjectLink></div>
    </section>

    <section id="expertises" className={`${styles.section} ${styles.expertise}`} aria-label="Les quatre familles d’expertises">
      <SectionHeading label="Les expertises" title="Une vision d’ensemble. Les bons savoir-faire." />
      <div className={styles.expertiseList}>{expertises.map((item) => <details key={item.title} className={styles.expertiseRow}><summary><h3>{item.title}</h3><span className={styles.plus} aria-hidden="true">+</span></summary><div className={styles.expertiseContent}><p>{item.text}</p><ul>{item.services.map(service => <li key={service}>{service}</li>)}</ul><ProjectLink href={item.href}>{item.action}</ProjectLink></div></details>)}</div>
    </section>

    <section id="a-propos" className={`${styles.section} ${styles.method}`} aria-labelledby="method-title"><div><p className={styles.label}>La méthode & la relation</p><h2 id="method-title">Une personne.<br />Toute l’histoire.</h2><p className={styles.methodIntro}>Je suis Benjamin Sanchez.<br />Votre interlocuteur du premier échange aux projets qui suivent.</p><a className={styles.textLink} href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}>Échanger de vive voix <Arrow diagonal /></a></div><ol className={styles.steps}>{[
      ["On pose les bonnes questions.", "Votre activité, vos clients, vos priorités. On définit ce qui mérite votre temps et votre budget."],
      ["Je crée et je coordonne.", "Identité, images, site, supports : les décisions se prennent ensemble, la réalisation reste cohérente."],
      ["On garde le fil.", "Mises à jour, nouveaux contenus, temps forts et campagnes. Votre communication avance avec votre entreprise."],
    ].map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ol></section>

    <section className={`${styles.section} ${styles.trust}`} aria-label="Emplacements des futures preuves"><SectionHeading label="Espace réservé" title="Les preuves viendront compléter le parcours." /><div className={styles.proofSlots}><ResourceSlot label="Retour d’expérience" format="Témoignage à sélectionner" /><ResourceSlot label="Cas d’accompagnement" format="Ressources à réunir" /></div></section>

    <section id="contact" className={`${styles.section} ${styles.contact}`} aria-labelledby="contact-title"><p className={styles.label}>La suite commence par un échange</p><h2 id="contact-title">Votre communication.<br /><span className={styles.muted}>On en parle ?</span></h2><div className={styles.contactBottom}><div><p>Un lancement, une nouvelle direction,<br />ou l’envie de mieux communiquer au quotidien.</p><div className={styles.contactLinks}><a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a><a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}>{CONTACT_INFO.phone}</a></div></div><ProjectLink href="/contact" primary>Démarrer un projet</ProjectLink></div><p className={styles.colophon}>Benjamin Sanchez · Paper34 · Agde</p></section>
  </div></AccueilMotion>;
}
