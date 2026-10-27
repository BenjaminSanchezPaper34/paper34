# Mobile directionné et vérification d'une page au scroll

Sources : ScrollCraft `verify.md`, `hero-depth.md`, `approved-collection.md` §6-7, `devices.md`
(pièges traduits de leur moteur vers GSAP + ScrollTrigger + Lenis). S'ajoute à la section « Mobile » et
à la définition de « fait » du CLAUDE.md, qui priment.

## 1. Directionner le mobile à part

Le téléphone est la version principale de nos clients. On **recompose**, on ne rétrécit pas.
- Cadrage et position du sujet propres au portrait (une image 16:9 en 9:16 ne garde que le tiers
  central : ce qui était composé dans l'espace vide de gauche disparaît). Garder le sujet dans le tiers
  central et le texte en bande basse, ou fournir un recadrage portrait (`<picture>` / `srcset`), avec un
  poster de vidéo du même cadrage que la vidéo.
- Taille du titre redescendue d'un cran ; titre complet visible, jamais coupé par un plan de premier plan.
- Ordre des plans : le titre peut passer au-dessus du sujet sur mobile même s'il passe derrière au bureau.
- Course et durée des séquences raccourcies ; le scroll lock a son **repli empilé** (règle studio).
- Pas de `object-fit: contain` sur une vidéo de fond : des bandes noires font « intégration cassée ».
- Hauteurs en `svh`/`dvh`, safe areas, cibles ≥ 44 px, rien d'utile caché derrière un survol (règles studio).
- **Deux tailles à vérifier** : un téléphone courant (390 × 844) ET un petit écran (360 × 640).
- Vérifier chaque état intermédiaire : une ouverture peut être belle et le cadre de fin recouvrir le texte.

## 2. Pourquoi une capture ne suffit pas

Une page au scroll n'a pas un état : chaque position est une image différente, et les défauts vivent entre
les deux écrans qu'on a regardés. On la parcourt donc mécaniquement, **par section** (début, milieu, fin de
chaque séquence animée, pas des positions régulières sur toute la page : celles-ci bougent dès qu'une
section change de hauteur), et on lit les captures côte à côte (planche contact).

Outils disponibles sans rien installer : un onglet **Chrome visible** (le panneau navigateur de Claude ne
fait pas tourner `requestAnimationFrame`, donc GSAP/Lenis y sont figés) en fixant la position avec
`window.scrollTo` puis une courte attente, aux largeurs bureau et 390 / 360 px ; puis l'iPhone de Benjamin.
Un banc automatique façon `shoot.mjs` (Playwright, planche contact, contraste composé) serait un chantier
à part, à proposer.

## 3. Ce qu'on cherche sur la planche

- **Scroll mort** : plusieurs positions de suite où rien ne change alors qu'on fait défiler. Le lecteur
  tourne la molette et ne reçoit rien. Corriger en raccourcissant la séquence ou en y ajoutant un temps.
  Exception : une respiration **voulue**, écrite au DESIGN.md.
- **Texte qui n'atteint jamais l'opacité pleine** : fenêtre d'apparition trop étroite ; chaque titre doit
  avoir un plateau à 100 % (sinon il n'est net que sur un pixel de scroll précis).
- **Texte à moitié fondu** sur une position : raccourcir la sortie, pas multiplier les captures.
- **Contraste sur l'image réellement sous le texte**, à l'image la plus claire (texte clair) ou la plus
  sombre (texte foncé) qui passe dessous. Un texte peut passer à 4,5:1 sur le poster et échouer 300 px
  plus loin. Si renforcer le voile ne change pas la mesure, le voile n'était pas dans ce qu'on mesurait.
- Composition (texte sur la zone la plus chargée, sujet coupé au mauvais endroit), fluidité (un mouvement
  qui accroche, recule, cale), sens (des sections qui marchent chacune et ne disent rien ensemble) :
  aucune machine ne les voit.
- Console : aucune erreur, aucune requête en échec (une vidéo en 404 retombe sur son poster et « a l'air
  bien »).

## 4. Pièges de scroll, traduits pour ScrollTrigger

| Symptôme | Cause et correctif |
|---|---|
| Une vidéo scrubbée tourne sous la main, s'arrête, puis toute la page fait glisser une photo figée | La vidéo était calée sur la durée du pin, alors qu'elle est visible un écran avant et un écran après. Caler le temps vidéo sur toute sa vie à l'écran (`start: "top bottom"`, `end: "bottom top"`), garder les textes calés sur le pin |
| Vidéo scrubbée qui saccade | Encodage web normal (image clé toutes les 2-5 s). Encoder avec des images clés serrées (GOP ~8 bureau, ~4 mobile), sans audio ; lisser la tête de lecture (`scrub: 0.5` à `1`) plutôt qu'écrire `currentTime` en direct |
| Vidéo figée sur iPhone alors que tout est vert ailleurs | iOS ne peint pas une vidéo muette jamais lue : l'amorcer (`play()` puis `pause()`) dès `loadedmetadata`, réessayer au `touchend`, garder le poster jusqu'à la première image peinte. Seul l'iPhone réel le prouve |
| Tous les textes d'une section courte claquent de 0 à 1 | Pin trop court (durée ≈ 1 écran ou moins = presque pas de course). Course utile ≥ ~1,2 écran, sinon ce n'est pas une section épinglée |
| Écran vide au début d'une section épinglée | Le premier texte apparaît depuis 0 alors que la scène est déjà visible. « Un fond ou un accueil » : une image déjà là, ou un premier texte déjà visible au départ |
| Un titre d'une section passe par-dessus la suivante | Un texte qui « tient jusqu'à la fin » au milieu de la page reste allumé pendant que le pin se décroche. Seule la dernière section peut tenir ; les autres finissent leur fondu avant la fin |
| Le dernier écran est vide | La dernière fenêtre de texte se termine par un fondu. Elle doit tenir |
| Un rail horizontal ne bouge pas au bureau, mais bouge sur mobile | Le rail est plus étroit que l'écran : la course vaut zéro. Mesurer `rail.scrollWidth - innerWidth` (au moins une demi-largeur d'écran) ; ajouter le titre en premier élément et une note de fin en dernier |
| Une couleur de fond arrive une section en retard | Fondu de fond sur des sections courtes qui se chevauchent : peindre un fond plein par section |
| Un chiffre en volet `clip-path` devient une barre | `clip-path` suit la boîte, pas l'encre : avec un interligne < 1, il coupe les jambages. Mettre le volet sur un conteneur avec de la marge |
| Un titre découpé ligne à ligne perd les queues des g, p, j | Masque de ligne calé sur la boîte de ligne : réserver la place des descendantes ; découper après `document.fonts.ready` |
| Le produit traîne une seconde derrière le pouce | `transition: transform` sur un élément piloté par le scroll. Transition d'opacité seulement |
| Le focus clavier tombe sur un bouton invisible | Bouton dans un texte encore à opacité 0. Sur une section épinglée, ramener le scroll à la position où son texte est visible |
| En mouvement réduit, un rail ne montre que son premier écran | On a mis `transform: none` sur la navigation elle-même. En mouvement réduit, le rail devient un défilement horizontal natif (ou une grille empilée) |
| Section qui suit un pin : un écran presque vide | Marge haute pleine après une scène qui a besoin d'un écran pour sortir : réduire la marge, démarrer la révélation tôt |

## 5. Passes manuelles

- **Mouvement réduit** : la page reste compréhensible ET **atteignable** (aucun contenu supprimé au lieu
  d'être immobilisé). Sert aussi de test bas débit.
- **Clavier** : tabulation dans l'ordre visuel, anneau visible sur tous les fonds traversés, rien de
  focusable à opacité 0.
- **WebGL indisponible** : un poster exact de la scène, jamais une image sans rapport ni un canevas vide.
- **Formulaires et contrôles réels** : envoi réel, validation, pas de faux succès ; formulaire sans
  JavaScript qui ne passe pas en GET avec des données personnelles dans l'URL.
- **Sur le déployé** (Vercel, à sa vraie URL), pas en local : scripts, polices, images, comportement serveur.
- **Yeux neufs** : revoir plus tard ; un réglage travaillé vingt minutes se lit autrement une fois oublié.
- **iPhone réel** de Benjamin avant livraison (règle studio). Quand un défaut mobile est signalé, poser la
  question « qu'est-ce qui diffère entre ce qui marche et ce qui casse, sur le même appareil ? » avant toute
  théorie de plateforme.

Rapporter honnêtement : vérifié / échec avec ce qu'on a vu / non vérifié.
