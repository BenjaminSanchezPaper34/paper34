import ServiceLanding from "@/components/services/ServiceLanding";

export default function CampagnesSponsoriseesPage() {
  return (
    <ServiceLanding
      slug="campagnes-sponsorisees"
      eyebrow="Campagnes sponsorisées"
      titre="La publicité qui part"
      titreAccent="de vos vraies images."
      chapo="Instagram, Facebook et Google : je crée les visuels sur place, je cible les gens qui peuvent vraiment venir chez vous, puis je pilote la campagne pendant toute sa diffusion pour que chaque euro aille là où il rapporte en appels, réservations et visites."
      blocsTitre="Ce que je prends en charge"
      blocs={[
        { titre: "Instagram et Facebook", texte: "Campagnes de notoriété, d'événement ou de réservation, ciblées autour de chez vous et sur les vacanciers de passage." },
        { titre: "Google Ads", texte: "Annonces sur les recherches qui comptent (« restaurant Vias plage », « karting Agde ») et sur Google Maps, pour capter ceux qui cherchent maintenant." },
        { titre: "Visuels et vidéos", texte: "Les créations sont tournées chez vous : photos, reels, affiches animées. Une pub qui montre le vrai lieu convertit mieux qu'une image de banque." },
        { titre: "Ciblage local", texte: "Rayon autour du lieu, villes du littoral, centres d'intérêt, visiteurs de votre site et de vos réseaux : le budget va aux gens qui peuvent venir." },
        { titre: "Suivi de conversion", texte: "Appels, clics réservation, itinéraires, formulaires : chaque campagne est mesurée sur ce qui fait du chiffre, pas sur les likes." },
        { titre: "Pilotage pendant la diffusion", texte: "Je ne lance pas une campagne pour la laisser tourner : je lis les résultats tout au long de la diffusion et j'ajuste visuels, ciblage et répartition du budget pour dépenser là où ça rapporte. C'est ce que je fais pour Megakart, le karting de Vias." },
      ]}
      etapes={[
        { titre: "Objectif et budget", texte: "On fixe ce que la campagne doit produire (réservations, appels, inscriptions, notoriété d'un événement) et un budget publicitaire adapté à votre saison." },
        { titre: "Création sur place", texte: "Je photographie et je filme ce qui donne envie de venir, puis je décline les formats pour chaque réseau." },
        { titre: "Lancement et pilotage", texte: "Mise en ligne, puis analyse continue de la diffusion : coût par résultat, visuels qui accrochent, publics qui réagissent. On coupe ce qui ne marche pas, on renforce ce qui marche, sans attendre la fin de la campagne." },
        { titre: "Mesure et bilan", texte: "Bilan chiffré à la fin de la campagne et recommandations pour la suivante. Si vous avez une newsletter, les nouveaux contacts y entrent directement." },
      ]}
      liens={[
        { label: "Réseaux sociaux", href: "/services/reseaux-sociaux", texte: "Un compte animé toute l'année rend chaque euro de publicité plus efficace : les gens qui cliquent trouvent un compte vivant." },
        { label: "Site web", href: "/services/creation-site-web", texte: "La pub envoie vers une page rapide qui fait réserver, et chaque conversion y est mesurée." },
        { label: "Newsletter", href: "/services/newsletter-emailing", texte: "Ceux qui découvrent votre lieu par la pub s'inscrivent, et vous pouvez les faire revenir sans repayer." },
      ]}
      faq={[
        { question: "Quel budget prévoir pour une campagne ?", answer: "Il y a deux parts : le budget publicitaire, payé directement à Meta ou Google, que vous fixez et pouvez arrêter à tout moment, et ma prestation (création, réglages, suivi). On cale les deux au devis selon votre objectif et votre saison." },
        { question: "Instagram ou Google, lequel choisir ?", answer: "Google capte les gens qui cherchent déjà (« restaurant ouvert ce soir à Vias »). Instagram et Facebook créent l'envie chez ceux qui ne vous connaissent pas encore. Pour un lieu de loisir ou un restaurant, la combinaison des deux est souvent la plus rentable." },
        { question: "Comment savoir si la campagne a rapporté ?", answer: "Je mesure les appels, les clics de réservation, les itinéraires et les formulaires venus de la campagne. Le rapport donne le coût par résultat, pas seulement le nombre de vues." },
        { question: "Est-ce que je garde la main sur le compte publicitaire ?", answer: "Oui. Les comptes publicitaires sont à votre nom ; j'y interviens comme gestionnaire. Vous voyez les dépenses en direct et vous gardez tout si on arrête." },
      ]}
      ctaTitre="Une saison à remplir, un événement à lancer ?"
      ctaTexte="Dites-moi ce que la campagne doit produire, je vous propose un plan et un budget."
    />
  );
}
