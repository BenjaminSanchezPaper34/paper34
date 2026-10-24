import ServiceLanding from "@/components/services/ServiceLanding";

export default function NewsletterEmailingPage() {
  return (
    <ServiceLanding
      slug="newsletter-emailing"
      eyebrow="Newsletter & emailing"
      titre="Vos clients reviennent"
      titreAccent="quand vous leur écrivez."
      chapo="Un formulaire d'inscription sur votre site, une liste de clients qui vous appartient, et des e-mails conçus avec vos propres photos, envoyés au moment où ils donnent envie de revenir."
      blocsTitre="Ce que je mets en place"
      blocs={[
        { titre: "Inscription sur votre site", texte: "Un bloc d'inscription sobre, intégré au design du site, avec le consentement clair que demande le RGPD." },
        { titre: "Une liste qui vous appartient", texte: "Contrairement aux abonnés Instagram, une liste d'e-mails ne dépend d'aucun algorithme : vous joignez vraiment vos clients." },
        { titre: "Des e-mails à votre image", texte: "Mise en page à votre charte, photos de vos soirées et de vos plats, textes courts qui donnent une raison de revenir." },
        { titre: "Le bon moment", texte: "Ouverture de saison, nouvelle carte, soirée, vacances scolaires, fin d'année : chaque envoi colle à un moment qui compte pour vos clients." },
        { titre: "Conformité RGPD", texte: "Consentement explicite, désinscription en un clic, données conservées le temps nécessaire, mentions à jour sur votre page de confidentialité." },
        { titre: "Résultats mesurés", texte: "Taux d'ouverture, clics, réservations générées : chaque campagne a son bilan, intégré à votre rapport mensuel." },
      ]}
      etapes={[
        { titre: "Collecte", texte: "Formulaire sur le site, QR code sur vos supports imprimés, inscription à la réservation ou au comptoir : la liste se remplit toute seule." },
        { titre: "Calendrier", texte: "On choisit les temps forts de l'année et la fréquence qui ne lasse pas : souvent une à deux campagnes par mois en saison." },
        { titre: "Création et envoi", texte: "Je rédige, je mets en page avec vos photos, vous validez, j'envoie." },
        { titre: "Bilan", texte: "Ouvertures, clics, réservations : on garde ce qui fait revenir, on change ce qui ne prend pas." },
      ]}
      liens={[
        { label: "Site web", href: "/services/creation-site-web", texte: "L'inscription vit sur votre site, et chaque e-mail renvoie vers une page qui fait réserver." },
        { label: "Réseaux et contenu", href: "/services/reseaux-sociaux", texte: "Les photos et vidéos tournées pour vos réseaux nourrissent aussi vos e-mails : une seule séance, tous les canaux." },
        { label: "Print", href: "/services/graphisme", texte: "Flyers, menus et affiches portent un QR code d'inscription : vos clients de passage deviennent des contacts." },
      ]}
      faq={[
        { question: "Une newsletter, ça marche encore ?", answer: "Oui, et c'est le canal le plus rentable pour faire revenir des clients : l'e-mail arrive chez des gens qui vous connaissent déjà et ont choisi de vous suivre, sans dépendre d'un algorithme." },
        { question: "Je n'ai pas encore de liste de contacts, par où commencer ?", answer: "Par la collecte : formulaire sur le site, QR code sur les tables, les menus et les flyers, inscription à la réservation. Une liste se construit vite quand les points de collecte sont bien placés." },
        { question: "Est-ce conforme au RGPD ?", answer: "Oui : chaque inscrit donne son accord explicitement, peut se désinscrire en un clic, et votre page de confidentialité décrit le traitement. Je n'importe jamais de liste achetée ou de contacts qui n'ont pas consenti." },
        { question: "À quelle fréquence envoyer ?", answer: "Assez pour qu'on pense à vous, pas au point de lasser : en général une à deux campagnes par mois en saison, moins hors saison, toujours avec une vraie raison d'écrire." },
      ]}
      ctaTitre="Faire revenir vos clients sans repayer de publicité"
      ctaTexte="Je vous montre comment collecter les premiers contacts et à quoi ressemblerait votre première campagne."
    />
  );
}
