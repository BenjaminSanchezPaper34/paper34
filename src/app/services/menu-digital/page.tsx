import ServiceLanding from "@/components/services/ServiceLanding";
import PhoneMockup from "@/components/web-portfolio/PhoneMockup";
import { WEB_PROJECTS } from "@/lib/web-projects";

// Référence réelle : la carte du Galion (Sanary-sur-Mer), essayable dans l'iPhone sur ordinateur.
const galion = WEB_PROJECTS.find((p) => p.name === "Le Galion");

export default function MenuDigitalPage() {
  return (
    <ServiceLanding
      slug="menu-digital"
      eyebrow="Menu digital & QR code"
      titre="Votre carte,"
      titreAccent="dans la poche de vos clients."
      chapo="Un QR code sur la table, et la carte s'ouvre sur le téléphone : lisible, en plusieurs langues, à jour à la minute près. Pas d'appli à installer, pas de PDF à zoomer."
      demo={
        galion && (
          <div className="mx-auto max-w-xs">
            <PhoneMockup project={galion} />
            <p className="mt-6 text-center text-sm text-text-tertiary">
              Cliquez sur le téléphone pour essayer la carte du Galion, comme vos clients.
            </p>
          </div>
        )
      }
      blocsTitre="Ce que je mets en place"
      blocs={[
        { titre: "Pensée pour le téléphone", texte: "Des catégories qu'on parcourt du pouce, des prix lisibles, une carte qui s'ouvre en une seconde, même avec une connexion faible en terrasse." },
        { titre: "En plusieurs langues", texte: "Français, anglais, espagnol, allemand, italien, néerlandais : vos clients étrangers lisent la carte dans leur langue, d'un geste." },
        { titre: "À jour en un instant", texte: "Un prix qui change, un plat du jour, la carte d'hiver : la modification est en ligne tout de suite, sans réimprimer." },
        { titre: "Un QR code qui ne change jamais", texte: "Il pointe vers une adresse fixe : la carte évolue derrière, les QR déjà imprimés sur vos tables et vos menus restent bons." },
        { titre: "À votre image", texte: "Votre logo, vos couleurs, vos typographies : la carte prolonge l'identité du restaurant au lieu de ressembler à un modèle." },
        { titre: "Trouvée sur Google", texte: "Une vraie page web, pas un PDF : elle peut ressortir quand on cherche le nom du restaurant et « carte » ou « menu »." },
      ]}
      etapes={[
        { titre: "Votre carte", texte: "Vous m'envoyez la carte actuelle et vos photos ; je structure les catégories et je prépare les traductions." },
        { titre: "Le design", texte: "Une carte à votre image, testée sur téléphone, que vous validez avant la mise en ligne." },
        { titre: "Les QR codes", texte: "QR codes pour les tables, chevalets, menus imprimés et vitrine, dessinés pour être scannés du premier coup." },
        { titre: "La vie de la carte", texte: "Nouveaux plats, prix, saison : je mets à jour sur simple message, la carte suit votre restaurant." },
      ]}
      liens={[
        { label: "Site web", href: "/services/creation-site-web", texte: "La carte peut vivre sur son propre domaine ou dans le site du restaurant, avec la réservation à côté." },
        { label: "Print", href: "/services/graphisme", texte: "Chevalets de table, sets, cartes papier et vitrophanie portent le QR code, dans la même identité." },
        { label: "Réseaux et contenu", href: "/services/reseaux-sociaux", texte: "Les photos des plats servent à la carte, aux réseaux et à la fiche Google : une seule séance." },
      ]}
      faq={[
        { question: "Faut-il installer une application pour lire la carte ?", answer: "Non. L'appareil photo du téléphone lit le QR code et la carte s'ouvre dans le navigateur, sur iPhone comme sur Android." },
        { question: "Pourquoi pas un simple PDF ?", answer: "Un PDF se lit mal sur téléphone (il faut zoomer), il est lourd à ouvrir et chaque modification oblige à refaire le fichier. Une carte en ligne s'adapte à l'écran, se parcourt par catégorie et se met à jour en un instant." },
        { question: "Si je change mes prix, faut-il réimprimer les QR codes ?", answer: "Non. Le QR code renvoie toujours vers la même adresse, seule la carte change derrière. Les QR déjà imprimés restent valables." },
        { question: "La carte peut-elle être traduite ?", answer: "Oui, dans les langues de votre clientèle. Le visiteur choisit sa langue en haut de la carte, comme sur celle du Galion, proposée en six langues." },
        { question: "Est-ce que je garde aussi une carte papier ?", answer: "Comme vous voulez : beaucoup de restaurants gardent une carte papier et ajoutent le QR code. Les deux restent cohérentes, je dessine aussi les supports imprimés." },
        { question: "Combien coûte un menu digital ?", answer: "Cela dépend du nombre de plats, de langues et de la fréquence des mises à jour. Je fais un devis précis après avoir vu votre carte actuelle." },
      ]}
      ctaTitre="Votre carte sur tous les téléphones de la salle"
      ctaTexte="Envoyez-moi votre carte actuelle, je vous montre à quoi ressemblerait la version en ligne."
    />
  );
}
