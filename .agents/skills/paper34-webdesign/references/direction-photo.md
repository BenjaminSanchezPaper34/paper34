# Direction photo — un seul monde par site, et le hero en plans

Sources : ScrollCraft `worlds.md`, `hero-depth.md`, `approved-collection.md` §1-4 ; vidéo Maxence Tison
(« ce qui sépare un site IA générique d'un site premium : les images ») ; savoir-faire Paper34
(pipeline Higgsfield, `photos-index.json`).

## 1. Ordre des sources d'image

1. **Les photos du client** (dossier client, `photos-index.json`, déjà décrites et triées) : un vrai lieu,
   de vrais plats, une vraie équipe. Les étalonner vers un seul rendu (même balance, même contraste).
2. **Un shooting Paper34** quand le client n'a rien d'exploitable (c'est un livrable, à deviser).
3. **La génération** (Higgsfield) pour ce qui n'existe pas et ne prétend pas exister : ambiances,
   matières, fonds, plans de décor, objets de marque d'après la vraie référence.

**Honnêteté** : jamais un plat, une salle, une plage ou une personne générés présentés comme ceux du
client. Pour un restaurant, c'est tromper le client final et c'est la première chose qu'il verra sur place.

## 2. Le préambule de style

Écrire **une fois** le préambule du site et le recopier **mot pour mot** en tête de chaque prompt, suivi
d'une ligne vide puis de la scène. C'est ce qui fait que huit images générées séparément ressemblent à un
seul shooting ; le paraphraser donne huit prompts.

Un préambule nomme cinq choses (en oublier une et la série dérive) :
1. **Support et objectif** (« argentique 35 mm », « macro 100 mm », « moyen format »).
2. **Lumière** : compter les sources et les placer (« une source chaude rasante à gauche, ambiance
   froide »). « Belle lumière » ne dirige rien.
3. **Étalonnage** en trois mots (« sable chaud, bleu étang, ombres désaturées »).
4. **Texture** : grain, halo, condensation, imperfection. L'oublier est la première cause du rendu
   plastique « IA ».
5. **Liste négative** : « PAS de rendu 3D, PAS de pâte à modeler, PAS d'illustration, pas de brillance
   numérique, pas de peau plastique ».

Mondes de départ (à accorder à la marque) : clair-obscur cinéma (bars, gastronomie, cabinets haut de
gamme) ; éditorial lumineux sans ombre (beauté, bien-être, boulangerie) ; documentaire en lumière
naturelle (artisans, restaurants, équipes : la confiance vient de « vrais gens ») ; lumière dure
graphique (sport, karting, jeunesse) ; macro matière (cuisine, pain, matériaux) ; architectural (cabinets,
rénovation) ; nocturne (soirées, plage la nuit) ; dessin technique (isolation, artisanat technique : le
seul monde non photographique qui reste haut de gamme parce qu'il assume d'être un schéma). Exemple vu
chez Maxence Tison : « flash argentique, comme si tout venait du même shooting ».

**Refus par défaut** : diorama pâte à modeler, low-poly, miniature tilt-shift. C'est le style maison des
sites IA, et il annonce que rien n'est réel. Exception : une marque réellement illustrée (enfants, jeu),
dans son propre style. Une « maquette artisanale » photographiée en macro (plâtre peint, vraie mousse,
colle visible) peut répondre à une demande de « petit monde » sans faire bon marché.

## 3. Par image

- **Nommer l'espace vide** dans chaque prompt de scène (« grand espace sombre en haut à gauche ») : le
  texte se pose dessus. Générer l'espace, ne pas le recadrer après.
- **Jamais de texte dans l'image** : le texte est du HTML (lisible, traduisible, indexé, net).
- **Passer la vraie référence** (logo, bouteille, emballage, façade) en image de référence à chaque
  prompt qui la contient : une étiquette qui change d'un visuel à l'autre se remarque en premier.
- **Regarder chaque image avant de l'utiliser.** Regénérer coûte moins cher que livrer une image ratée.
- Sujet complet avec marges : une poignée, une roue, une étiquette coupée par le cadre ne se répare pas
  en CSS.

## 4. Contrôle de cohérence (toutes les images côte à côte)

Une direction de lumière (ou une raison écrite de la changer) ; un étalonnage (une image plus froide se
regénère, elle ne se corrige pas par un filtre CSS qui aplatit tout) ; un niveau de réalisme ; l'objet de
marque identique partout.

## 5. Le hero en plans (quand le sujet s'y prête)

Une belle photo plein cadre avec un fondu de texte reste plate. La profondeur vient de plans séparés qui
bougent à des vitesses différentes, se chevauchent, et gardent leurs points de contact.

**Contrat de plans**, à écrire avant de générer :
| Plan | Contenu | Mouvement | Règle |
|---|---|---|---|
| Fond lointain | Plaque nettoyée (le sujet retiré, le fond reconstruit) | Le plus faible | Pas de sujet en double |
| Plan moyen | Lieu, paysage, surface produit | Modéré | Donne l'échelle |
| Sujet | Produit, plat, personne : vrai détourage alpha | Déplacement voulu | Reste posé sur son support (point de contact partagé) |
| Premier plan | Élément qui cadre (feuillage, rebord, verre) | Le plus fort, mais retenu | Ne cache jamais le titre ni l'action |
| Atmosphère | Brume, poussière, lumière, si la scène l'appelle | Lent, indépendant | Sépare sans délaver |
| Texte et boutons | HTML | Stable | Titre complet lisible dès l'ouverture |

- **Écarts faibles entre plans voisins** (10 à 30 % de vitesse) ; le texte voyage à 1× (on ne lit pas un
  texte qui bouge par rapport à son fond). Au-delà, ça ne se lit plus comme de la distance mais comme des
  calques qui glissent.
- Détourages vérifiés sur fond clair ET foncé (halo, bords dentelés) ; un damier généré n'est pas de la
  transparence.
- Chaque plan plein sous sa silhouette ; dégradé vers le fond de page sur les 200-300 px bas de la section.
- Plans en `max-width: none` (sinon `img { max-width: 100% }` les rétrécit sur mobile) ; aucune
  `transition` CSS sur `transform` d'un élément piloté par le scroll (retard d'une seconde au doigt) ;
  nouvelle image = nouveau nom de fichier (cache iPhone).
- Mobile : recomposer (le titre peut passer au-dessus du sujet), pas rétrécir. Mouvement réduit : la
  composition statique garde la profondeur.
- Stack : plans en `transform` pilotés par ScrollTrigger (`scrub`), Lenis pour le défilement. Si le hero
  est le scroll lock de la page, aucune autre section n'est épinglée. 3D réelle (Three.js) seulement si
  la rotation ou la lumière apporte vraiment quelque chose, et dans le harnais studio.
