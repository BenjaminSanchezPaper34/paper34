---
name: paper34-webdesign
description: Méthode et goût Paper34 pour concevoir un site web qui ne ressemble à aucun autre — création ou refonte d'un site, d'une page, d'une section ou d'une landing pour Paper34 ou un client (restaurants, plages, loisirs, commerces, cabinets). À utiliser AVANT de dessiner ou de coder : cadrage du message, références par section (Mobbin, godly, recent), grammaire de page, geste signature, porte d'empreinte contre les sites déjà livrés, courbe d'émotion, direction photo, plancher typo/couleur, mobile, liste de refus anti « look IA ». Ne remplace pas les règles studio du CLAUDE.md (stack, conformité, SEO, signature) : il s'y ajoute. Pas pour une simple « passe aux standards » sans changement visuel.
---

# Paper34 Webdesign — v1 (27/10/2026, en attente de validation par Benjamin)

Je conçois des sites qui ont une identité propre. Ce skill fixe la **méthode, le goût et l'anti-uniformité**.
Tout le reste vient des règles studio de `TRAVAUX/CLAUDE.md`, qui **priment** en cas de conflit : stack
(Next.js, Tailwind, GSAP + ScrollTrigger, Lenis), DESIGN.md validé avant le code, mobile-first, polices
auto-hébergées, harnais WebGL, **un seul scroll lock par page**, conformité RGPD et cookies opt-out,
signature Paper34, Vercel, SEO/GEO, définition de « fait ». Je ne les recopie pas : je les applique.

Pour un héros vidéo ou une pièce animée, charger aussi `paper34-motion`. Origine des règles :
`SOURCES.md`. Ce fichier ne change qu'avec l'accord de Benjamin.

## 0. Pourquoi ce skill existe

Sans direction, Claude produit toujours le même site : tout centré, Inter, sombre + un accent, cartes
identiques, emojis. Et changer la palette ne change pas la page : **le décor change l'apparence, la
grammaire change ce que la page est.** Un site qui ne change que de couleurs est un re-skin. Chez
Paper34, le risque concret : deux restaurants voisins avec le même squelette (hero photo plein écran,
sections alternées, galerie, avis, carte, footer).

## 1. Cadrage — avant toute référence

1. **Message** : remplir le §0 du DESIGN.md (Person · Pain · Promise). La Promise devient le titre du
   hero. Sans Promise écrite, je ne cherche pas de références : je chercherais des looks, pas des réponses.
2. **Trois questions à poser au client ou à Benjamin**, dans cet ordre :
   - **Public** : qui arrive sur ce site, d'où, sur quel écran (souvent : téléphone, depuis Google Maps
     ou Instagram) ?
   - **Sensation** : que doit-il ressentir en 3 mots ? (pas « moderne » ni « premium » : ça ne dirige rien)
   - **Action attendue** : la seule chose qu'il doit faire (appeler, réserver, venir, demander un devis).
     Un seul libellé pour cette action, utilisé partout sur le site.
3. **Faits réels seulement** : horaires, prix, avis, chiffres, labels viennent du client ou de ses fiches.
   Ce qui manque est demandé, jamais inventé (chiffre inventé = risque juridique et perte de confiance).
4. **Délégation explicite** (« fais comme tu le sens ») : je rédige moi-même le cadrage, marqué
   « rédigé sous délégation », hypothèses distinguées des faits, et j'avance sans réinterroger.
5. **La phrase test** : « c'est le site où… » complétée par une expérience vécue côté visiteur
   (« on fait glisser le curseur du matin au soir et toute la terrasse change de lumière »), pas par un
   nom d'effet (« il y a un parallax »). Elle va dans le DESIGN.md. Si elle est vraie d'un site déjà
   livré, la page n'est pas encore nouvelle.

## 2. Références — par section, jamais par site entier

- **Pour chaque section** (hero, offre/carte, preuve, lieu, pratique, fin), proposer **3 à 5
  références** de sites différents : connecteur Mobbin (`search_sections`, filtrer par type de section
  et couleur), godly.design (par fragment), recent.design (global, inclut print et packaging),
  hors web bienvenu (affiche, menu imprimé, enseigne). Raison : 5 sections de 5 sites donnent une
  grammaire neuve ; 1 site entier donne un décalque.
- Pour chacune, une ligne : **observé → pourquoi ça marche → principe repris**. Une liste d'URL n'est
  pas une recherche.
- Benjamin garde ses coups de cœur ; seules les retenues entrent au DESIGN.md (moodboard global : 3 à 5,
  règle studio). Grammaire reprise, jamais identité reconnaissable.

## 3. Grammaire de page — en choisir une, jamais deux

Une grammaire fixe ce qu'est une section, à quoi sert la navigation, comment le visiteur sait où il est,
et comment la page finit. Chacune **interdit** quelque chose : c'est l'interdit qui empêche de retomber
au milieu du build sur le squelette par défaut. Les huit, adaptées à nos clients :
`references/grammaires.md` (récit filmé, éditorial en chapitres, l'outil d'abord, monde continu,
affiche typographique, galerie/carte, scène partagée, liste rythmée).

- Choisir celle que le cadrage appelle ; écrire au DESIGN.md pourquoi les autres ont perdu.
- Navigation, hero et fin **découlent** de la grammaire ; on ne les décide pas séparément.
- Le squelette Paper34 par défaut (hero photo + sections alternées + galerie + avis + carte) porte
  désormais la charge de la preuve : le reprendre exige une justification écrite.

## 4. Geste signature — un par site

Une interaction inventée pour ce site seul : c'est l'« effet signature » du §4 du DESIGN.md, et
souvent ce qui remplit la phrase test. Exemples de forme : un plan qui se dessine au scroll (trait SVG),
une poignée unique qui fait passer toute la page du midi au soir, un ticket qui s'additionne au fil des
plats choisis, la carte du circuit parcourue par le scroll.
- **Ne compte pas** : un preset ReactBits laissé tel quel, un réglage d'effet déjà utilisé (inclinaison
  6° → 9°), « plus » d'un effet existant, un effet d'un autre site du registre renommé.
- **Test** : décrit à quelqu'un qui a vu nos autres sites, il doit le reconnaître comme nouveau.
- Le geste n'est jamais le seul accès à une information : au doigt et en mouvement réduit, une version
  simple ou statique garde le sens (harnais studio).

## 5. Porte d'empreinte — contre le registre des sites livrés

Le registre est `registre-sites.md`. Avant d'écrire du code, comparer le plan à **chaque** ligne sur
six dimensions : **grammaire, navigation, hero, forme des sections, fin, geste signature**.
- **Règle** : différer de chaque site sur **au moins 4 dimensions sur 6**, ligne par ligne (pas en
  moyenne). Le geste signature compte d'office : il en faut donc 3 autres.
- **Si le plan échoue, on change le plan, jamais le registre.** Réécrire une ligne pour faire de la
  place rend le fichier inutile.
- Un site encore « à relever » ne peut pas servir de comparaison : relever d'abord au moins les sites
  du même secteur et de la même zone.
- La signature Paper34 du footer et les pages légales sont communes à tous : hors comparaison.
- Après livraison : ajouter une ligne, dire ce que le site partage avec les autres.
- Détail, méthode de relevé et modèle de ligne : `references/porte-empreinte.md`.

## 6. Courbe d'émotion et pic unique — avant de lister les sections

- **Une ligne par section** : l'émotion, puis ce qui la provoque à l'écran. L'émotion d'abord : un
  effet choisi avant le ressenti est un effet qui cherche une raison.
- **Deux sections voisines au même ressenti** : l'une est du remplissage, on la coupe ou on la change.
- **Un seul pic** (règle pic-fin : on retient un moment et la fin). Il reçoit la meilleure photo ou la
  seule vidéo, un temps calme juste avant, et le plus d'espace. **Si la page a un scroll lock, c'est au
  pic qu'il va.** Trois moments forts s'annulent : rétrograder les autres.
- **La fin résout** : le dernier écran tient debout avec son contenu (l'action attendue, posée), il ne
  se dissout pas dans le footer.
- **Le pratique se compresse dans le scroll, pas dans l'accès** : horaires, adresse, téléphone restent
  atteignables en un geste partout (nav, bouton fixe mobile), mais n'occupent pas de section épinglée.
- Méthode, exemples locaux et contrôle « à froid » : `references/courbe-emotion.md`.

## 7. Direction photo — un seul monde par site

- **D'abord les vraies photos du client** (`photos-index.json` du dossier) : un lieu réel vend mieux
  qu'une image générée. Les étalonner vers un seul rendu.
- **Génération (Higgsfield)** : un **préambule de style unique**, recopié mot pour mot en tête de chaque
  prompt (objectif, lumière, étalonnage, texture, liste négative). Le paraphraser donne huit prompts au
  lieu d'un shooting.
- **Jamais un plat, un lieu ou une personne générés présentés comme réels** chez un restaurant ou un
  commerce : c'est tromper le client final.
- Nommer dans chaque prompt **où va l'espace vide** pour le texte ; jamais de texte incrusté dans
  l'image (le texte reste du HTML : lisible, traduisible, indexé).
- Refus par défaut : diorama pâte à modeler, low-poly, miniature tilt-shift.
- Détail, préambules de départ et hero en plans : `references/direction-photo.md`.

## 8. Plancher — typo, espacements, couleur (vérifié sur le rendu)

Le plancher ne bouge pas, quelle que soit l'esthétique choisie (brutaliste, généreuse, éditoriale…).
- **Typo** : 2 familles maximum ; minimums studio (corps 16 px, descriptions 14 px) ; interlettrage qui
  se resserre quand la taille monte ; 45 à 75 caractères par ligne ; `text-wrap: balance` sur les titres ;
  titre du hero redescendu d'un cran sous 700 px (sinon 6 lignes sur iPhone).
- **Espacements** : échelle base 4 px ; plus d'espace au-dessus d'un titre qu'en dessous ; marges de
  section fluides (le téléphone n'hérite pas de l'air du bureau).
- **Couleur** : 6 rôles, 1 accent (l'unique décision chromatique du DESIGN.md) ; texte secondaire teinté,
  jamais gris neutre ; contraste mesuré sur la page rendue (corps ≥ 4,5:1).
- **Profondeur** : ombres décalées et teintées, lumière de bord 1 px, échelle + flou = distance,
  chevauchement, grain ; 3 niveaux d'élévation maximum.
- Détail, traduction Tailwind et pièges : `references/plancher.md`.

## 9. Mobile — directionné à part

Le téléphone est la version principale (règle studio). On **recompose**, on ne rétrécit pas : cadrage,
position du sujet, taille de titre, ordre des plans, longueur des séquences. Vérifier un téléphone
courant ET un petit écran 360 × 640. Procédure : `references/verification-mobile.md`.

## 10. Vérification — en plus de la définition de « fait » du CLAUDE.md

- **Captures à plusieurs positions dans chaque section** (début, milieu, fin d'une séquence animée),
  bureau et téléphone, puis une planche contact lue en entier : les défauts vivent entre deux écrans.
- **Scroll mort** (on fait défiler, rien ne change), **textes qui n'atteignent jamais l'opacité
  pleine**, **contraste sur l'image réellement sous le texte**, **mouvement réduit** : tout reste
  lisible ET atteignable.
- **Contrôle d'émotion à froid** : faire défiler sans relire le DESIGN.md, noter un mot par section,
  puis comparer à la courbe prévue. En cas d'écart, c'est la page qui a tort.
- Rappel : le panneau navigateur de Claude ne fait pas tourner les animations ; preuve = onglet visible
  ou iPhone de Benjamin.

## 11. Liste de refus Paper34 — anti « look IA »

Refus par défaut : le cadrage ou la charte du client peuvent en lever un, par écrit. En prendre un
« parce que c'est libre » veut dire qu'on n'a pas décidé.

| Jamais (par défaut) | À la place |
|---|---|
| Tout centré, section après section | Varier l'ancrage : gauche, droite, centre, partagé |
| Inter par défaut sur un nouveau site | Une police choisie pour la marque (Fontshare, `next/font`) |
| Emojis en guise d'icônes | Lucide (règle studio) ou icônes dessinées |
| Dégradé violet → bleu « IA », néon | La palette du DESIGN.md |
| Grille de cartes identiques icône + titre + texte ; 3 colonnes égales ; cartes imbriquées | Grille asymétrique, rail, zigzag (2 max d'affilée), texte sur espace |
| Chiffres, avis, témoignages, labels inventés | Les vrais, ou rien |
| Faux tableaux de bord, fausses captures en `div` | Le vrai outil, ou des données d'exemple annoncées comme telles |
| Texte incrusté dans une image générée | HTML |
| Palette crème + laiton + brun par défaut (boulangerie, bistrot, artisan) | Une palette qui vient de la marque ; crème-laiton seulement si la marque le nomme |
| Mots creux : « sublimer », « l'art de… », « une expérience unique », « révolutionner » | Le fait concret (« pâte maturée 48 h ») |
| Hero qui déborde : titre > 2 lignes, sous-titre > 20 mots, > 4 éléments | Le reste descend dans sa propre section |
| Deux libellés pour la même action (« Réserver » / « Je réserve ») | Un seul libellé partout |
| Voile sombre plein cadre pour lire sur une photo | Voile local (coin, bande, colonne) ou image masquée côté texte |
| Section de remplissage (« Nos valeurs » sans contenu) | Couper : la courbe d'émotion le révèle |
| `transition: all`, animer `top/left/width/height`, `scale(0)` | `transform` + `opacity` (+ `clip-path`), entrée depuis `scale(0.95)` |
| Même effet de révélation sur toutes les sections | Chaque section a sa raison d'exister et son mouvement |

## 12. Écarts autorisés s'ils sont justifiés (décision de Benjamin, 27/10/2026)

ScrollCraft refuse ces éléments. **Décision de Benjamin (27/10/2026) : tous autorisés, à condition d'être
justifiés par écrit dans le DESIGN.md du site** (quelle intention, pourquoi ici). Sans justification écrite, on s'en abstient.
1. **Compteurs de section « 01 / 04 »** — refusés par ScrollCraft (« la séquence n'est pas une
   information ») ; utilisés dans l'essai « index gradué » (21/10) comme règle graduée d'objectif photo.
   Piste : autorisés seulement quand la séquence EST l'information (étapes, index photographique).
2. **Mot clé en dégradé** (façon pub Apple iPad mini) et `gradient-text` de paper34.fr — refusés
   (« texte en dégradé »).
3. **Halos lumineux / glow** — refusés hors effet précis ; listés dans les effets studio du CLAUDE.md
   et cœur de la DA paper34.fr (la profondeur par la lumière).
4. **Indicateur de scroll** — refusé (« ils regardent le hero, ils savent ») ; le CLAUDE.md prévoit une
   « flèche scroll animée (bounce) » dans le hero.
5. **Curseur personnalisé** — refusé ; « optionnel » dans les effets studio.
6. **Tirets cadratins visibles** — refusés ; la typographie française les emploie pour les incises.
7. **Noir pur `#000`** — refusé (« pas d'air ») ; fond « écran de projection » assumé sur paper34.fr.
8. **Surtitre (kicker) au-dessus de chaque section** — refusé au-delà d'1 section sur 3 ; systématique
   sur paper34.fr.
9. **Seuil de la porte d'empreinte** — 4/6 contre tous les sites (ScrollCraft) ou seulement contre le
   même secteur / la même zone, avec 3/6 ailleurs ?
10. **Références** : 3 à 5 par section (méthode Mobbin) vs 3 à 5 au total (règle studio du kick-off) —
    la v1 concilie (candidates par section, retenues au DESIGN.md) ; à confirmer.

## 13. Process

1. Cadrage (§1) → §0 du DESIGN.md ; phrase test.
2. Références par section (§2) → retenues au DESIGN.md.
3. Grammaire (§3) + courbe d'émotion et pic (§6) + geste signature (§4).
4. Porte d'empreinte (§5) contre `registre-sites.md` ; échec = on revient à l'étape 3.
5. Direction photo (§7) ; tokens et plancher (§8) au DESIGN.md → **validation de Benjamin**.
6. Code, section par section (process studio) ; mobile recomposé en même temps (§9).
7. Vérification (§10) + définition de « fait » du CLAUDE.md.
8. Rapport court : grammaire et pourquoi les autres ont perdu, geste signature, résultat de la porte
   ligne par ligne, courbe prévue vs ressentie et ce qui a changé, ce qui n'a pas pu être vérifié.
9. Ligne ajoutée au registre ; correctifs de méthode proposés à Benjamin pour ce skill (`propositions/`).

## Références

- `references/grammaires.md` — les 8 grammaires, leurs interdits, à quels clients elles vont.
- `references/porte-empreinte.md` — les 6 dimensions, la règle, relever un site, modèle de ligne.
- `references/courbe-emotion.md` — courbe, pic, phrase test, rythme, contrôle à froid.
- `references/direction-photo.md` — monde unique, préambules, hero en plans.
- `references/plancher.md` — typo, espacements, couleur, profondeur, texte sur image (Tailwind).
- `references/verification-mobile.md` — mobile directionné, planche contact, pièges ScrollTrigger.
- `registre-sites.md` — le registre d'empreintes du portefeuille.
- `references/source-scroll-craft/` — skill d'origine (Nate Herk, MIT), archivé tel quel.
