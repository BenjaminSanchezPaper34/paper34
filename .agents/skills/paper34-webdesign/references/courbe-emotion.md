# Courbe d'émotion, pic unique, phrase test

Source : ScrollCraft `feel.md` (reformulé, transposé des « actes » en viewport-heights vers nos
sections Next.js/GSAP). Exemples locaux fictifs, pour le format.

## 1. La courbe — écrite avant la liste des sections

Une page n'est pas une liste de sections : c'est une suite d'états par lesquels passe quelqu'un, le
pouce sur l'écran. On écrit ces états **avant** de choisir les sections, dans le DESIGN.md.

- Une ligne par section : **l'émotion**, puis **ce qui la provoque à l'écran**. Le nom d'un effet ne
  peut apparaître que dans la seconde colonne, et en second : c'est le ressenti qui choisit l'effet.
- États utiles (liste ouverte) : curiosité, reconnaissance, envie, faim, doute, tension, émerveillement,
  plaisir, soulagement, intimité, confiance, décision, calme.
- **Deux sections voisines au même ressenti = l'une est du remplissage.** Deux émerveillements de suite,
  c'est un émerveillement suivi d'un lecteur habitué. Chaque émotion se définit par ce qui précède : le
  soulagement a besoin d'une tension avant, l'émerveillement d'un calme, l'intimité d'une grande échelle.
- La courbe prime sur la liste des informations : quand les deux divergent, la courbe gagne, parce
  qu'on ne retient rien d'une page qui n'a rien fait ressentir.

### Exemples (fictifs)

Restaurant gastronomique, grammaire éditoriale :
```
1 Calme          page de titre, le nom du chef, beaucoup de papier
2 Curiosité      le producteur du matin, une photo en colonne, une légende factuelle
3 Faim           LE PIC : le plat signature en très grand, seule image plein cadre du site
4 Confiance      le menu en texte, prix réels, sans adjectifs
5 Décision       une phrase : « Réserver pour ce soir » en lien, le téléphone à côté
```
Plage privée, liste rythmée :
```
1 Pulsation      coupe immédiate : l'eau, le transat, la musique suggérée
2 Envie          visages en gros plan, un par écran, disparus
3 Jalousie       la saison dernière en douze coupes
4 Urgence        la vraie date d'ouverture, les vrais créneaux
5 Appartenance   LE PIC : la seule image tenue de la page, la terrasse pleine au coucher du soleil
6 Décision       abrupt, plein écran, « Réserver un transat »
```
(Sur une page faite de coupes, s'arrêter est le geste le plus fort : le pic se définit par contraste
avec sa propre page, pas par la quantité d'effets.)

Cabinet d'expertise comptable, grammaire « l'outil d'abord » :
```
1 Inquiétude familière   « Votre TVA est due le 19 » : la vraie échéance du mois, calculée
2 Clarté                 le simulateur répond en une ligne
3 Contrôle               le visiteur change un chiffre, tout se recalcule
4 Confiance              l'équipe, les deux bureaux (Agde, Paris), vrais noms
5 Décision               un champ : « Votre SIREN », pas un bouton
```

## 2. Le pic

On retient un moment fort et la fin ; le milieu se compresse en impression générale (règle pic-fin).
Donc chaque page a **un pic délibéré**, écrit au DESIGN.md comme la phrase qu'un visiteur dirait à un
ami : « l'écran est devenu noir et toute la terrasse s'est allumée d'un coup ». Pas « le hero est beau ».

Le pic reçoit, au détriment des autres sections :
| Il reçoit | Parce que |
|---|---|
| Le meilleur visuel (la meilleure photo, la seule vidéo) | Le budget image va là, pas à la section 2 |
| Un temps calme juste avant (section sobre, respiration) | Un changement a besoin de quelque chose dont changer |
| Le plus d'espace ; le scroll lock s'il y en a un | La règle studio en autorise un : il va au pic |

**Trois pics = aucun.** Si une autre section concurrence : moins d'espace, visuel plus simple, effet plus
sobre. Quelque chose doit être la plus grande chose de la page.

**La fin résout.** Le dernier état ressenti est celui qu'on emporte. Une fin qui se fond dans le footer
efface le pic. Résoudre = la page arrive quelque part et s'arrête : la scène se referme, la typo descend
à son réglage le plus calme, l'outil tend un champ, l'action est posée et reste visible.

## 3. La phrase test

« C'est le site où ___ ». Le blanc doit être une expérience vécue par le visiteur, de son point de vue :
- « il y a une vidéo au scroll » → nom d'effet, pas de souvenir.
- « le fond change de couleur » → nom d'effet déguisé.
- « on glisse du midi au soir et toute la terrasse change de lumière » → souvenir.
Le geste signature vit en général dans cette phrase. Si la phrase et le geste désignent deux moments
différents, l'un des deux est de la décoration : les fusionner, ou couper celui qui n'est pas le pic.
Si la phrase est vraie d'un site du registre, la page n'est pas nouvelle.

## 4. Être dedans, pas devant (une ou deux touches par page)

- Le décor qui bouge légèrement avec le pointeur (pas une carte qui s'incline).
- Un détail qui n'arrive que si l'on s'arrête (récompense de la pause, jamais nécessaire au sens).
- La page qui dit « vous » **une seule fois**, au tournant émotionnel.
- Une trace de ce qu'on a parcouru (un ticket qui s'additionne, un parcours qui se dessine).
Une page qui réagit à tout paraît hantée : on arrête de lire pour tripoter. Tout ceci est réservé à
`(hover: hover) and (pointer: fine)` et coupé en mouvement réduit : ce qui n'existe qu'au bureau ne peut
pas porter le sens de la page (nos visiteurs sont sur téléphone).

## 5. Le rythme est une émotion

| Rythme | Se lit comme | Avec notre stack |
|---|---|---|
| Sections courtes, coupes franches | Énergie, impatience | Révélations courtes, fonds peints par section |
| Le scroll lock | Souffle retenu, attention | `pin + scrub`, une seule idée, au pic |
| Un écran presque vide avant une révélation | Le silence avant la chute | Section de respiration **voulue** (l'écrire au DESIGN.md) |
| Entrée rapide, longue tenue | Assurance | Révélation 0,6 s puis rien ne bouge |

- **Compresser l'administratif** : horaires, accès, FAQ, mentions sont de l'information, pas de
  l'expérience. Sections simples, pas épinglées. Mais toujours **atteignables en un geste** (nav, bouton
  fixe mobile) : chez nos clients, le téléphone et l'itinéraire sont l'action principale.
- **Le silence s'écrit** : un écran vide voulu se lit comme une attente ; un écran vide subi se lit comme
  un site qui charge mal.

## 6. Contrôle à froid (après la vérification technique)

1. Faire défiler la page une fois, à vitesse de lecture, sans relire le DESIGN.md, sans corriger.
2. Noter un mot par section, ce qu'on a ressenti. Rien ressenti = ne rien écrire : c'est le constat.
3. Ouvrir le DESIGN.md et comparer les deux courbes. **En cas d'écart, la page a tort, pas la courbe.**
   Réécrire la courbe pour coller au résultat, c'est la même faute que réécrire le registre.
Puis trois questions : le pic est-il le plus grand changement visuel et le plus d'espace ? y a-t-il du
calme juste avant ? le dernier écran tient-il debout avec son contenu ? Deux sections voisines au même
mot = le remplissage, trouvé tard : couper. Rapporter les deux courbes et ce qui a changé.
