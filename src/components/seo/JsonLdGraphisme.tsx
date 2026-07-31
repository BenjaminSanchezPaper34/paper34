/**
 * JSON-LD enrichi pour la page /services/graphisme
 * Combine un schema Service détaillé + un schema FAQPage.
 * Les FAQs ici doivent rester strictement identiques au contenu visible sur la page.
 * (Le breadcrumb est géré par JsonLdBreadcrumb sur la page.)
 */

export const FAQ_ITEMS = [
  {
    question: "Gérez-vous l'impression ou seulement la création graphique ?",
    answer:
      "Les deux. Je conçois vos supports, je prépare les fichiers aux normes d'imprimerie (haute définition, fonds perdus, profils couleur) et je lance la fabrication chez des imprimeurs partenaires sélectionnés. Vous recevez l'objet fini, livré directement chez vous — un seul interlocuteur et un seul devis, de la création à la livraison.",
  },
  {
    question: "Quels supports pouvez-vous créer et imprimer ?",
    answer:
      "Tout le print classique (cartes de visite, flyers, dépliants, brochures, affiches, papeterie, menus), le grand format et la signalétique (bâches, banderoles, kakemonos, roll-ups, panneaux de chantier, stickers, vitrophanie, marquage véhicule) ainsi que le textile et l'objet publicitaire (t-shirts, polos, sweats, vêtements de travail brodés ou floqués, casquettes, tote bags, mugs, goodies).",
  },
  {
    question: "Faites-vous le textile personnalisé pour les équipes ?",
    answer:
      "Oui : vêtements de travail, polos, t-shirts et sweats personnalisés par broderie ou flocage, du logo à la livraison. C'est une demande fréquente des ateliers, entreprises du BTP, restaurants et associations sportives qui veulent habiller leur équipe à leurs couleurs.",
  },
  {
    question: "Valide-t-on la maquette avant l'impression ?",
    answer:
      "Toujours. Rien ne part en fabrication sans votre validation : je conçois la maquette, nous l'ajustons ensemble, et l'impression n'est lancée qu'une fois le visuel approuvé. C'est ce qui garantit zéro mauvaise surprise à la réception.",
  },
  {
    question: "Travaillez-vous uniquement autour d'Agde ?",
    answer:
      "Non. Le studio est basé à Agde et intervient naturellement dans l'Hérault (Béziers, Sète, Montpellier), mais la création se fait à distance et les supports imprimés sont livrés directement à votre adresse, partout en France.",
  },
  {
    question: "Comment obtenir un devis ?",
    answer:
      "Décrivez votre besoin via le formulaire de contact ou par téléphone : le devis est gratuit, personnalisé, et inclut la création graphique, la fabrication et la livraison. Vous connaissez le coût total avant de vous engager.",
  },
];

export default function JsonLdGraphisme() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Graphisme & impression",
    serviceType: "Création graphique, impression et objets personnalisés",
    provider: {
      "@type": "LocalBusiness",
      name: "PAPER34",
      url: "https://www.paper34.fr",
      telephone: "+33782343227",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Agde",
        postalCode: "34300",
        addressRegion: "Hérault",
        addressCountry: "FR",
      },
    },
    areaServed: { "@type": "Country", name: "France" },
    description:
      "Du logo à l'objet imprimé : création graphique, impression et livraison de supports print (cartes de visite, flyers, affiches), grand format et signalétique (bâches, kakemonos, panneaux), textile personnalisé (broderie, flocage) et objets publicitaires. Studio basé à Agde, livraison partout en France.",
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      url: "https://www.paper34.fr/services/graphisme",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
