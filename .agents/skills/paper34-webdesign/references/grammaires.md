# Grammaires de page — traduction Paper34

Source : ScrollCraft `uniqueness.md` §2 (reformulé et adapté). Règles studio prioritaires : un seul
scroll lock (`pin + scrub`) par page, repli empilé sur mobile, coupé en `prefers-reduced-motion`.

**Pourquoi des grammaires.** ScrollCraft a constaté que quatre sites de secteurs différents, faits avec
le même outil, se ressemblaient : même hero, même section épinglée, même rail de cartes, même fin. Seuls
l'ordre du milieu et la palette changeaient. La structure n'avait jamais été une décision. Une grammaire
force cette décision, et ses **interdits** empêchent de dériver vers le squelette habituel en cours de
route. Une grammaire par page ; en mélanger deux, c'est revenir au squelette avec des titres en plus.

**Le squelette Paper34 à surveiller** (notre « one-shot filmique » à nous) : hero photo plein écran +
titre centré, sections alternées texte/photo, galerie, avis Google, carte Google Maps, footer. Il reste
possible, mais le choisir exige d'écrire pourquoi les autres grammaires ne convenaient pas.

Pour chaque grammaire : à qui elle va, ce que ressent le visiteur, ce qu'elle **interdit**, la
navigation / le hero / la fin qui en découlent, et la traduction dans notre stack.

---

## 1. Récit filmé (« one-shot filmique »)

- **Va à** : une seule promesse portée par une émotion — ouverture de saison, lieu spectaculaire (plage
  privée au coucher du soleil), lancement.
- **Ressenti** : être porté, sans couture, chaque moment passant le relais au suivant.
- **Interdit** : toute séquence visible (numéros de chapitre, index, barre de progression) ; les coupes
  franches entre fonds ; une interface qui fait « outil ».
- **Nav / hero / fin** : barre minimale (logo + l'action) ; hero image ou vidéo forte, titre ancré dans
  un coin ; fin posée sur l'action.
- **Stack** : le scroll lock unique va au pic (vidéo scrubbée ou image fixe dont le texte change) ;
  le reste en révélations simples ; fond qui glisse d'une teinte à l'autre (`drift`) dans une même famille.
- **Attention** : c'est la pente naturelle. Charge de la preuve.

## 2. Éditorial en chapitres

- **Va à** : le fond compte plus que l'effet — cabinet d'avocats, expert-comptable, restaurant
  gastronomique qui raconte un chef, un producteur, une méthode.
- **Ressenti** : tourner les pages d'un beau magazine. Intertitres francs, puis doubles pages
  asymétriques. Coupes nettes, pas de fondus enchaînés.
- **Interdit** : hero vidéo plein cadre ; titres centrés ; fond qui glisse en dégradé (chaque chapitre
  change de fond d'un coup) ; bouton magnétique ; média sous le texte (il vit dans sa colonne, légendé).
- **Nav / hero / fin** : pas de barre fixe lourde, un **folio** en marge (n° et titre du chapitre en
  cours) ; hero = **page de titre** typographique, l'image commence au chapitre 1 ; fin = colophon,
  l'action écrite comme une phrase avec un lien.
- **Stack** : révélations à l'entrée, parallaxe légère dans les colonnes image, chiffres réels dans le
  texte. Le folio se met à jour via ScrollTrigger (`onToggle`), sans pin.

## 3. L'outil d'abord (« surface vivante »)

- **Va à** : quand la démonstration EST l'argument — réservation de karting avec créneaux, simulateur
  d'aides à l'isolation, configurateur de prestation, planning de cours de salle de sport.
- **Ressenti** : manipuler quelque chose. Le visiteur est dedans.
- **Interdit** : décor marketing (titre géant sur photo, voiles, logos en bandeau). Le texte parle la
  langue de l'outil : libellés, états vides, aide.
- **Nav / hero / fin** : l'interface de l'outil sert de navigation (onglets, étapes) ; hero = l'outil
  déjà dans un état utile ; fin = **un vrai champ** (créneau, code postal, nom) plutôt qu'un bouton.
- **Règle d'honnêteté** : vrai code, vraies règles, vraies données ou données d'exemple annoncées
  comme telles à l'écran. Une image ou des `div` qui imitent un outil sont interdites : si l'outil ne
  peut pas calculer, cette grammaire est indisponible.
- **Stack** : composants React + état ; Motion pour les transitions d'état (règle studio), GSAP hors
  de ces éléments.

## 4. Monde continu

- **Va à** : un vrai voyage dans un lieu (descendre un domaine viticole, longer une plage de bout en
  bout).
- **Ressenti** : traverser un espace unique, sans jamais quitter le cadre.
- **Interdit** : toute frontière de section ; rien ne défile par-dessus la scène.
- **Statut Paper34 : hors périmètre par défaut.** Toute la page est une seule scène fixe, ce qui revient
  à un scroll lock de page entière (contraire à la règle studio), avec des vidéos générées enchaînées
  coûteuses et fragiles. Ne s'ouvre que sur demande explicite de Benjamin, comme exception écrite au
  DESIGN.md. Mécanique d'origine (fondu à sens unique, coutures, rythme constant) : archive
  `source-scroll-craft/references/worldflight.md`.

## 5. Affiche typographique

- **Va à** : une marque dont l'actif est une phrase ou un nom ; un lieu sans bonnes photos (mieux vaut
  zéro image que huit images génériques) ; boulangerie au nom fort, bar, événement.
- **Ressenti** : des mots qui arrivent à des échelles très différentes. Un mot à 40vw, puis un
  paragraphe en 16 px, puis du silence. Le rythme vient de l'échelle, pas du mouvement.
- **Interdit** : fond photographique, vidéo scrubbée, voiles, cartes, mouvement décoratif.
- **Nav / hero / fin** : le logo fait partie de la composition, à l'échelle de la composition ; hero =
  un mot ou une ligne qui remplit l'écran (vrai `<h1>`) ; fin = l'inverse, la plus petite typo du site,
  l'action en lien souligné.
- **Plancher renforcé** : à 40vw, un mauvais crénage ou un interlettrage par défaut se voit sur toute la
  page ; le contrôle optique se fait sur le rendu.

## 6. Galerie / carte (« catalogue »)

- **Va à** : la question du visiteur est « qu'est-ce qu'il y a ? » — la carte d'un restaurant, les
  prestations d'un institut, la flotte de karts, les produits d'une boulangerie.
- **Ressenti** : flâner dans une collection, chaque objet légendé de faits.
- **Interdit** : promesse unique en hero ; texte sur photo ; persuasion dans les légendes. Une légende
  dit « Daurade royale. Pêche du Grau d'Agde. Beurre blanc. » et pas « Une explosion de saveurs ».
  **Même schéma de légende pour chaque objet**, sans exception : c'est ce qui fait une collection.
- **Nav / hero / fin** : la nav est l'**index des objets** et on y saute ; hero = l'objet n° 1, déjà
  légendé ; fin = le dernier objet ou une demande (réserver, commander) mise en page comme une légende.
- **Stack** : un rail horizontal peut être le scroll lock de la page (mesurer que le rail déborde
  vraiment : un rail plus étroit que l'écran ne bouge pas). Sur mobile : swipe natif (règle studio).
  Les légendes sont souvent lues coupées par le bord : titres de 1 à 2 mots.

## 7. Scène partagée

- **Va à** : un argument à deux côtés — avant/après (isolation, ongles, transformation en salle de
  sport), midi/soir, été/hiver, « chez vous / chez nous ».
- **Ressenti** : une balance qui penche, vers un moment précis où un côté gagne.
- **Interdit** : plein cadre avant la résolution ; texte centré ; fin symétrique. Aucun côté n'est
  décoratif : si l'un devient la légende de l'autre, ce n'est plus qu'un zigzag.
- **Nav / hero / fin** : la **séparation est l'interface** (elle porte les deux libellés et la
  progression) ; hero = la scène coupée 50/50, les deux titres lisibles d'emblée ; fin = **l'effondrement**,
  la séparation file vers un bord, un côté prend toute la largeur et l'action vit dans le côté gagnant.
- **Stack** : c'est le scroll lock de la page (`pin + scrub` pilote la position de la séparation) ;
  sur mobile, les deux côtés s'empilent et la résolution devient une bascule au tap.

## 8. Liste rythmée (« cutlist »)

- **Va à** : l'énergie — karting, soirées de plage privée, salle de sport, événement, street-food.
- **Ressenti** : une coupe par seconde. 12 à 20 sections courtes plutôt que 6 longues.
- **Interdit** : toute section épinglée ; toute pause ; les fondus lents. C'est l'inverse du récit filmé.
- **Nav / hero / fin** : barre forte (pleine largeur, contrastée, éventuellement un bandeau défilant,
  l'action aussi visible que le logo) ; hero qui coupe vers l'écran suivant en moins d'un écran ; fin
  abrupte : la dernière coupe est l'action, pleine page.
- **Le pic sans pin** : le pic se joue dans la couche fixe (la barre qui se déploie, tient, se replie,
  pilotée par le scroll de la page) pendant que les sections continuent de couper dessous. Règle
  générale : quand la grammaire interdit l'outil que le pic voudrait, on sort le pic de la pile de
  sections plutôt que de casser la grammaire.
- **Plancher** : rapide n'excuse pas une entrée de 1,2 s que le lecteur dépasse ; chaque section est
  lisible dans le premier tiers de sa hauteur.

---

## Familles esthétiques (axe séparé de la grammaire)

Le sobre-premium (sombre, un accent, de l'air) est **un** choix, pas l'uniforme du studio. Selon le
cadrage : brutaliste (brut, structurel), généreux/maximaliste (dense, festif : restauration, événements),
ludique (couleurs, rondeurs : enfants, loisirs), rétro (une décennie précise, pas une nostalgie vague),
dense (beaucoup d'info, petite typo maîtrisée : catalogues, cabinets), éditorial (papier, folios),
sobre-premium (luxe, et seulement si demandé). Si le client dit « festif » et que la page revient en
anthracite + un accent, le cadrage a été décoratif. Le plancher (`plancher.md`) tient dans toutes.

## Candidat Paper34 (proposition, non validée)

**Le comptoir** : pour le commerce de proximité dont le visiteur veut d'abord « c'est ouvert ? où ?
j'appelle ». Hero = réponse pratique composée comme une enseigne (statut ouvert/fermé calculé,
adresse, appel) ; nav = trois gestes (appeler, itinéraire, réserver) ; interdit : toute section avant
l'info pratique, tout hero décoratif ; fin = l'enseigne qui revient, éclairée. À tester sur un vrai
client avant d'entrer dans la liste (une nouvelle grammaire doit définir de vrais interdits, pas un nom).
