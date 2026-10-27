# Plancher — typo, espacements, couleur, profondeur

Source : ScrollCraft `taste.md` (reformulé, traduit en Tailwind / variables CSS du DESIGN.md).
Les minimums du CLAUDE.md (corps 16 px, descriptions 14 px, boutons ≥ 14 px, cibles ≥ 44 px) priment.

**Tout se vérifie sur le rendu, pas sur l'intention.** « J'ai utilisé une échelle » n'est pas une preuve ;
une valeur calculée dans l'inspecteur ou une capture, si. Le plancher tient dans toutes les familles
esthétiques : une page brutaliste a quand même besoin de 4,5:1 ; une page généreuse a encore plus besoin
d'une échelle d'espacement, parce que la densité sans rythme n'est que du bruit.

## Espacements

- **Échelle base 4 px** (celle de Tailwind : 1 = 4 px). Les crans intermédiaires (12, 20, 28 px) que
  l'échelle base 8 n'a pas sont utiles.
- **Plus d'espace au-dessus d'un titre qu'en dessous.** L'espace appartient à la frontière entre
  sections, pas au couple titre-texte. L'inverser est l'erreur la plus courante : la page se lit comme une
  liste. Ex. `mt-24 mb-6` plutôt que `my-12`.
- **Rythme = contraste entre serré et généreux.** Si on ne sait pas montrer quels intervalles sont serrés
  et lesquels sont des respirations, la page n'a pas de rythme.
- **Marges de section fluides** (`py-16 md:py-24 lg:py-32` ou `clamp()`) : 8rem de marge sur 375 px est
  une taxe de scroll.
- Grouper par proximité avant d'ajouter un cadre : si une bordure est là pour dire « ces deux choses vont
  ensemble », l'espacement était faux d'abord.
- Les médias pleine largeur vont bord à bord ; le texte, jamais.
- **Optique, pas mathématique** : une forme au poids visuel inégal semble mal centrée à marges égales ;
  corriger à l'œil sur le rendu.

## Typographie

- **2 familles maximum** : une display qui porte la voix, une de texte qui porte la lecture. Une
  troisième est un déguisement.
- **L'interlettrage se resserre quand la taille monte** : un titre de 6rem en interlettrage par défaut
  paraît lâche et amateur (`tracking-tight` / `tracking-[-0.02em]` en display, normal en texte).
- **45 à 75 caractères par ligne** pour le corps (`max-w-[62ch]` sur le paragraphe lui-même : un `ch`
  posé sur le conteneur se calcule sur la taille du conteneur, pas sur celle du titre dedans).
- **Interligne inverse de la longueur de ligne** : display 0,94 à 1,06 ; corps ~1,6.
- **Texte clair sur fond sombre** : compenser sur trois axes (un peu plus d'interligne, un peu plus
  d'interlettrage, un cran de graisse en plus), sinon il paraît maigre et flou.
- `text-wrap: balance` sur les titres, `text-wrap: pretty` sur le corps (supprime le mot orphelin).
- Display ≤ ~6rem hors vrai moment de hero. Plus gros n'est pas plus sûr de soi.
- **Hero redescendu d'un cran sous ~700 px** : sinon un titre normal fait 6 lignes sur iPhone.
- **Choix de police** : Inter déconseillée par défaut (la plus utilisée des pages IA, elle se lit comme
  une absence de décision) ; correcte si la marque veut du neutre ou si l'accessibilité est le sujet.
  Toujours auto-hébergée (règle studio).
- **Serif ≠ premium.** « Ça fait éditorial » n'est pas une raison ; une serif quand la marque la nomme ou
  quand le sujet est vraiment éditorial, patrimonial, luxe, et qu'on sait dire pourquoi celle-ci.
  Compatible avec la règle studio « display réservée à certains moments » du DESIGN.md.
- **Accent dans un titre** : italique ou gras de la même famille. Glisser un mot serif dans un titre sans
  serif « pour l'effet » est amateur.

## Couleur

- **6 rôles, 1 accent** : fond, surface, texte, texte secondaire, accent, texte sur accent (les tokens du
  DESIGN.md §1). L'accent possède une zone ou un rôle ; des petits accents éparpillés font des confettis.
- **Accent verrouillé pour toute la page**. Exception : une page qui coupe franchement entre fonds clairs
  et sombres peut porter le même accent en deux luminosités (une par famille de fond). Toujours une seule
  teinte.
- **Texte secondaire teinté**, dérivé de la teinte du fond ou du texte (`color-mix(in oklab, …)`), jamais
  `#888` sur un fond chaud (ça fait sale).
- Pas de noir pur par défaut (`#000` n'a pas d'air) : un quasi-noir. **À arbitrer** pour paper34.fr, où le
  noir pur est assumé (SKILL.md §12).
- **Contraste mesuré sur le rendu** : corps ≥ 4,5:1, grand texte ≥ 3:1, contrôles et anneau de focus ≥ 3:1.
- **Piège** : redéfinir `--color-text-primary` sur une section inversée ne recolore pas le texte dont la
  couleur a déjà été calculée sur `<body>`. Redéclarer `color: var(--color-text-primary)` sur la même
  section.
- **Piège palette** : crème chaud + laiton/terre cuite + brun expresso est le réflexe pour tout artisan,
  boulangerie, bien-être ; il rend toutes ces marques identiques. Alternatives : argent froid et chrome ;
  vert forêt, os et ambre ; quasi-noir et fauve ; cobalt et un neutre ; olive et brique.

## Texte sur image

- Pas de voile sombre plein cadre (il éteint la photo). Trois formes selon l'endroit du texte :
  **coin** (texte ancré dans un coin sur grand écran), **bande** basse transparente au-dessus de ~58 %
  (texte sur toute la largeur, ce que deviennent les coins sous ~860 px), **colonne** sous une colonne de
  texte. Mieux encore : **masquer l'image** côté texte (`mask-image`).
- Le voile est un **frère** du bloc de texte, pas un `::before` de celui-ci.
- **Mesurer** : un voile réglé à l'œil est souvent à 9:1 (photo gâchée) ou à 2,8:1 sur la seule image où
  la photo s'éclaircit.
- Attributs `width`/`height` des images : les surcharger **par paire** en CSS (`w-full h-auto`), sinon
  l'image prend la hauteur brute de l'attribut et pousse tout hors de l'écran.

## Profondeur — cinq outils ensemble

1. **Ombre décalée et floutée**, teintée de la couleur du fond (une ombre noire sur fond coloré fait
   sale ; un halo coloré sans décalage est de la décoration, pas de la profondeur).
2. **Lumière de bord** : 1 px clair en haut d'une surface (`shadow-[inset_0_1px_0_rgba(255,255,255,.08)]`).
3. **Échelle + flou = distance** : plus loin = plus petit, plus doux, moins contrasté. Une parallaxe sans
   ça se lit comme un glissement.
4. **Chevauchement** : un élément qui déborde sur un autre crée plus de profondeur que n'importe quelle
   ombre. Gratuit et sous-utilisé.
5. **Grain** à 4-5 % sur les fonds sombres (évite les bandes de dégradé, « une pièce éclairée » plutôt
   qu'« une page sombre »).
Trois niveaux d'élévation maximum : si tout est élevé, rien ne l'est.

## Cartes

Avant chaque carte, se demander ce qu'elle fait que la proximité, un filet ou l'espace ne feraient pas.
Jamais de grille de cartes identiques comme structure de page, jamais de cartes imbriquées, jamais trois
colonnes égales de « points forts ». Une cellule vide en fin de grille = grille mal pensée (la refaire,
pas coller une tuile blanche). Une seule échelle de rayons sur toute la page (boutons pilule sur une page
de cartes carrées = cassé, pas éclectique).

## Mouvement (hors effets de scroll)

- `transform` et `opacity` seulement (+ `clip-path` pour les volets). Jamais `transition: all`, jamais
  animer `width/height/margin/top/left`.
- Pas d'`ease-in` sur l'interface ; easing de sortie franc (`cubic-bezier(0.23, 1, 0.32, 1)`).
- Transitions d'interface < 300 ms (survol 120-180 ms, boutons 100-160 ms). Les effets de scroll en sont
  exemptés : c'est la main qui les cadence.
- Jamais `scale(0)` : entrer depuis `scale(0.95)` + `opacity: 0`.
- Retour de pression : `scale(0.97)` ou `translateY(1px)`.
- Décalages de groupe 30 à 80 ms (la règle studio 0,1-0,15 s vaut pour les grilles de cartes ; au-delà de
  ça, c'est lent).
- Révélation premium : opacité + montée de ~14 px sur ~0,6 s, déclenchée un peu à l'intérieur de l'écran.
  Une montée > 24 px devient une glissade ; plus gros, plus lent, plus rebondi n'est jamais plus premium.
- Survol réservé à `(hover: hover) and (pointer: fine)`.
- Mouvement réduit = **moins et plus doux, pas zéro** : garder l'opacité qui porte la compréhension,
  supprimer les déplacements.

## États, contenu, surfaces du navigateur

- Chaque élément interactif a survol, `focus-visible` (visible, à l'accent, décalé), actif, désactivé.
- Libellé de bouton sur une ligne au bureau, 1 à 3 mots ; contraste des boutons vérifié (bouton fantôme
  sur photo sans voile = échec).
- Vrais textes, vrais noms, vrais chiffres ou pas de chiffres.
- Thémer aussi ce qu'on n'a pas dessiné : couleur de sélection, curseur de saisie, anneau de focus, barre
  de défilement, soulignement (épaisseur, décalage), chiffres tabulaires dans tout ce qui compte.

## Le test du plissement d'yeux

Flouter la page jusqu'à perdre les détails : on doit encore nommer l'élément principal, le secondaire et
les grands groupes, dans cet ordre. Si tout devient un gris uniforme, le problème est la hiérarchie, et
aucune ombre, aucun dégradé, aucun mouvement ne la réparera.
