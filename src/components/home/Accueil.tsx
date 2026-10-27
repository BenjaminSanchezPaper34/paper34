import Image from "next/image";
import Link from "next/link";
import { CONTACT_INFO, TESTIMONIALS } from "@/lib/constants";
import { WEB_PROJECTS, getScreenshotUrl } from "@/lib/web-projects";
import { MANAGED_ACCOUNTS } from "@/lib/instagram-accounts";
import AccueilMotion from "./AccueilMotion";
import styles from "./accueil.module.css";

const R2 = "https://pub-054d5e4ec36144bea38e07a1452fe2b0.r2.dev";
const MEDIA = {
  chiringuito: `${R2}/galeries/chiringuito-opening/display/A7V-96.jpg`,
  photo: `${R2}/galeries/chiringuito-opening/display/A7V-113.jpg`,
  kart: `${R2}/galeries/megakart-100-tours/display/A7502148-DxO_DeepPRIME%20XD3%20-%20HDR.jpg`,
  film: `${R2}/galeries/actah-associes/display/film-cabinet.jpg`,
  video: `${R2}/galeries/actah-associes/video/film-cabinet.mp4`,
};
const social = MANAGED_ACCOUNTS[0].feed![0];
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
function Project({ image, alt, name, description, href, large = false }: { image: string; alt: string; name: string; description: string; href: string; large?: boolean }) {
  return <Link href={href} className={`${styles.project} ${large ? styles.projectLarge : ""}`}>
    <div className={styles.projectImage} data-image-reveal><Image src={image} alt={alt} fill sizes={large ? "(max-width: 767px) 100vw, 64vw" : "(max-width: 767px) 100vw, 36vw"} /><span className={styles.projectArrow}><Arrow diagonal /></span></div>
    <div className={styles.caption}><h3>{name}</h3><p>{description}</p></div>
  </Link>;
}

export default function Accueil() {
  const reviews = [TESTIMONIALS.find(t => t.name === "Guinguette Bessan")!, TESTIMONIALS.find(t => t.name === "Languedoc Débarras")!];
  return <AccueilMotion><div className={styles.home} id="accueil">
    <a className={styles.skip} href="#realisations">Passer aux réalisations</a>
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.heroMeta}><span>Paper34 · Communication globale</span><span>Agde & au-delà</span></div>
      <h1 id="home-title"><span data-title-line>Toute votre<br className={styles.mobileBreak} /> communication.</span><span data-title-line>Un seul partenaire<span className={styles.blue}>.</span></span></h1>
      <div className={styles.heroBottom}><p>De la première idée au quotidien de votre marque.<br />Je crée, je coordonne, je vous accompagne.</p><ProjectLink href="/contact" primary>Démarrer un projet</ProjectLink></div>
      <div className={styles.heroStrip} aria-label="Un aperçu des réalisations"><div><Image src={MEDIA.chiringuito} alt="Reportage de la soirée d’ouverture du Chiringuito à Vias" fill preload sizes="(max-width: 767px) 63vw, 49vw" /></div><div><Image src={getScreenshotUrl("Actah & Associés")} alt="Site internet du cabinet Actah & Associés" fill sizes="(max-width: 767px) 37vw, 30vw" /></div><div><Image src={MEDIA.kart} alt="Photographie de course sur le circuit Megakart" fill sizes="22vw" /></div></div>
      <div className={styles.stripCaption}><span>Du terrain à l’écran. Une même exigence.</span><a href="#realisations">Découvrir le travail <Arrow /></a></div>
    </section>

    <section id="realisations" className={`${styles.section} ${styles.work}`} aria-labelledby="work-title">
      <div className={styles.workIntro}><div><p className={styles.label}>Sélection de réalisations</p><h2 id="work-title">Des univers différents.<br /><span className={styles.muted}>Le même engagement.</span></h2></div><ProjectLink href="/portfolio">Tout le portfolio</ProjectLink></div>
      <div className={styles.projectGrid}>
        <Project image={MEDIA.chiringuito} alt="Bon Entendeur aux platines face au public du Chiringuito" name="Chiringuito" description="Photographie · Événementiel / Vias" href="/galerie/chiringuito-opening" large />
        <Project image={getScreenshotUrl("Actah & Associés")} alt="Accueil du site Actah & Associés, cabinet d’avocats" name="Actah & Associés" description="Site internet / Béziers" href={WEB_PROJECTS[0].url} />
        <Project image={MEDIA.kart} alt="Un pilote en piste au Megakart" name="Megakart" description="Reportage photo / Vias-Plage" href="/galerie/megakart-100-tours" />
        <div className={styles.film}><div className={styles.filmPlayer}><video controls playsInline preload="none" poster={MEDIA.film} aria-label="Le film du cabinet Actah & Associés"><source src={MEDIA.video} type="video/mp4" /><a href={MEDIA.video}>Voir le film du cabinet</a></video></div><div className={styles.caption}><h3>Une équipe, en mouvement.</h3><p>Actah & Associés · Film du cabinet · 44 s</p></div></div>
      </div>
    </section>

    <section id="accompagnement" className={`${styles.section} ${styles.partnership}`} aria-labelledby="partner-title">
      <div className={styles.partnerIntro}><p className={styles.label}>L’accompagnement global</p><h2 id="partner-title">Tout se répond.<br /><span className={styles.muted}>Enfin.</span></h2><p>Votre site ne vit pas seul. Vos réseaux non plus. Je relie vos images, vos messages et vos supports pour construire une communication cohérente, dans la durée.</p></div>
      <div className={styles.channelStage} data-channel-stage>
        <div className={styles.stageHeading}><h3>Un lieu. Une direction.<br />Plusieurs points de contact.</h3><p>Chiringuito Vias<br /><span className={styles.muted}>Photographie, réseaux sociaux & site web</span></p></div>
        <div className={styles.channelRail}><span className={styles.channelLine} data-channel-line aria-hidden="true" />
          <figure className={styles.channel} data-channel><div className={styles.channelPhoto}><Image src={MEDIA.photo} alt="Portrait d’un DJ photographié au Chiringuito" fill sizes="(max-width: 767px) 100vw, 30vw" /></div><figcaption><span>Créer la matière</span><p>Des images prises sur place.</p></figcaption></figure>
          <figure className={`${styles.channel} ${styles.channelSocial}`} data-channel><a href={social.post} aria-label="Voir la publication réelle du Chiringuito sur Instagram"><Image src={social.img} alt="Publication du Chiringuito : une membre de l’équipe en service" fill sizes="(max-width: 767px) 100vw, 26vw" /></a><figcaption><span>Faire vivre la marque</span><p>Des contenus pour vos réseaux.</p></figcaption></figure>
          <figure className={`${styles.channel} ${styles.channelWeb}`} data-channel><a href={WEB_PROJECTS.find(p => p.name === "Chiringuito")!.url} aria-label="Découvrir le site du Chiringuito"><Image src={getScreenshotUrl("Chiringuito")} alt="Capture réelle du site Chiringuito Vias-Plage" fill sizes="(max-width: 767px) 100vw, 35vw" /></a><figcaption><span>Donner une destination</span><p>Un site dans la continuité.</p></figcaption></figure>
        </div><p className={styles.stageFoot}>Une direction commune, du premier visuel au prochain rendez-vous.</p>
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

    <section className={`${styles.section} ${styles.trust}`} aria-label="Références et témoignages"><SectionHeading label="La confiance se construit" title="Et se retrouve dans leurs mots." /><div className={styles.reviews}>{reviews.map(review => <figure key={review.name}><blockquote>« {review.text} »</blockquote><figcaption>{review.name}<span>Client Paper34</span></figcaption></figure>)}</div><div className={styles.clientNames} aria-label="Quelques références clients">{["Chiringuito", "Megakart", "Actah & Associés", "La Guinguette", "Les Délices de Farinette", "Infini Mouv"].map(name => <span key={name}>{name}</span>)}</div></section>

    <section id="contact" className={`${styles.section} ${styles.contact}`} aria-labelledby="contact-title"><p className={styles.label}>La suite commence par un échange</p><h2 id="contact-title">Votre communication.<br /><span className={styles.muted}>On en parle ?</span></h2><div className={styles.contactBottom}><div><p>Un lancement, une nouvelle direction,<br />ou l’envie de mieux communiquer au quotidien.</p><div className={styles.contactLinks}><a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a><a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}>{CONTACT_INFO.phone}</a></div></div><ProjectLink href="/contact" primary>Démarrer un projet</ProjectLink></div><p className={styles.colophon}>Benjamin Sanchez · Paper34 · Agde</p></section>
  </div></AccueilMotion>;
}
