import ServiceLanding from "@/components/services/ServiceLanding";

// Démo à venir : les images aériennes de Benjamin (champ `demo` de ServiceLanding).
export default function VideoDronePage() {
  return (
    <ServiceLanding
      slug="video-drone"
      eyebrow="Vidéo & photo par drone"
      titre="Votre lieu,"
      titreAccent="vu du ciel."
      chapo="Une plage au lever du soleil, l'embouchure du Grau d'Agde, une piste de karting en pleine course : je filme et je photographie votre lieu par drone, puis je monte des images prêtes pour le site, les réseaux et la publicité."
      blocsTitre="Ce que je filme"
      blocs={[
        { titre: "Deux façons de voler", texte: "Des plans larges et stables en très haute définition, et des plans immersifs en vol rapproché (FPV) qui traversent le lieu comme si on y entrait." },
        { titre: "Plages et restaurants", texte: "La mer, le sable, la terrasse en pleine saison : l'image qui donne envie de réserver avant même d'arriver." },
        { titre: "Campings et hébergements", texte: "L'emplacement, la piscine, la distance à la plage : le drone montre en dix secondes ce qu'une brochure met une page à expliquer." },
        { titre: "Loisirs et événements", texte: "Karting, parcs, festivals, soirées : des plans en mouvement qui donnent l'échelle et l'énergie du lieu." },
        { titre: "Immobilier et chantiers", texte: "Une villa et son environnement, un terrain, l'avancement d'un chantier mois après mois." },
        { titre: "Entreprises et cabinets", texte: "Des images de votre territoire pour le site, les vœux, les présentations et les réseaux : l'embouchure de l'Hérault au Grau d'Agde, le port, la ville vue d'en haut." },
        { titre: "Mariages", texte: "Le domaine, le cortège, la sortie de cérémonie : des plans larges qui complètent le film de la journée." },
        { titre: "Photo aérienne", texte: "Des vues fixes en haute définition pour le site, la fiche Google, les affiches et les dépliants." },
      ]}
      etapes={[
        { titre: "Repérage", texte: "On regarde ensemble le lieu, les plans qui comptent et le meilleur moment de la journée pour la lumière." },
        { titre: "Tournage", texte: "Je pilote moi-même et je filme selon la météo : vent et pluie décident du jour, la lumière du moment." },
        { titre: "Montage", texte: "Couleurs, rythme, musique : un film court pour les réseaux, une version longue pour le site, des photos fixes." },
        { titre: "Livraison", texte: "Les fichiers aux bons formats (vertical, horizontal, carré), prêts à publier ou à diffuser en publicité." },
      ]}
      liens={[
        { label: "Réseaux et contenu", href: "/services/reseaux-sociaux", texte: "Les plans aériens deviennent des reels et des posts qui arrêtent le défilement." },
        { label: "Site web", href: "/services/creation-site-web", texte: "Une vidéo aérienne en ouverture de site, ou des photos du lieu vu du ciel dans la galerie." },
        { label: "Campagnes sponsorisées", href: "/services/campagnes-sponsorisees", texte: "Les images aériennes font partie des visuels qui retiennent le mieux l'attention en publicité." },
      ]}
      faq={[
        { question: "Qui pilote le drone ?", answer: "Moi. Je suis télépilote enregistré et je fais le tournage, le montage et la livraison, sans intermédiaire." },
        { question: "Et si la météo ne suit pas ?", answer: "Le vent et la pluie empêchent de voler proprement. On garde une date de repli, et le tournage se cale sur le premier bon créneau." },
        { question: "Peut-on filmer n'importe où ?", answer: "Pas toujours : certains secteurs du littoral sont proches de l'aéroport ou très fréquentés. Je vous dis à l'avance ce qui est faisable sur votre lieu et comment l'organiser." },
        { question: "Qu'est-ce que je reçois ?", answer: "Un film monté (versions verticale et horizontale selon vos besoins), une sélection de photos aériennes, et les fichiers aux formats du web, des réseaux et de l'impression." },
        { question: "Le drone peut-il s'ajouter à un tournage au sol ?", answer: "Oui, c'est souvent le plus efficace : les plans aériens donnent le décor, les plans au sol montrent l'ambiance et les gens." },
        { question: "Combien coûte une vidéo par drone ?", answer: "Selon le lieu, la durée de tournage et le montage. Je fais un devis précis après un échange sur votre projet." },
      ]}
      ctaTitre="Montrez votre lieu comme personne ne l'a vu"
      ctaTexte="Dites-moi où et pour quoi faire, je vous propose les plans et le bon moment pour les tourner."
    />
  );
}
