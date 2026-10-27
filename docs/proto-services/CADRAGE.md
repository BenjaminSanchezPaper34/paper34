# Cadrage — refonte de la section services de l'accueil (Labo, `proto/services`)

> Skill `paper34-webdesign` v1, étapes 1 à 4 (cadrage, références, grammaire, geste signature).
> 27/10/2026. **Faits** = tirés du code de paper34.fr (branche `labo`). **Hypothèses** = à confirmer par Benjamin.
> Aucun code tant que ce cadrage n'est pas validé.

## Constat (faits)

- L'accueil enchaîne **deux sections qui disent la même chose** : `PartenaireComplet` (« Une séance photo,
  tous vos canaux », 4 temps en cartes) puis `ServicesPreview` (« Tous vos besoins, un seul interlocuteur »,
  11 cartes). Courbe d'émotion : deux voisines au même ressenti, l'une est du remplissage (§6).
- `ServicesPreview` est une **grille de cartes identiques icône + titre + texte** sur 4 colonnes : premier
  refus de la liste anti « look IA » (§11). Le seul mouvement est un halo bleu qui suit le curseur, et il
  disparaît au doigt.
- Aucune section n'est épinglée sur l'accueil : **la place du scroll lock unique est libre**.
- L'action principale porte **deux libellés** (« Me contacter 💌 » dans le hero, avec un emoji ;
  « Démarrer un projet » en bas de page). C'est un refus du §11, à trancher (question 3).
- Il n'y a pas de §0 Message (Person · Pain · Promise) dans le `DESIGN.md` du site.

**Proposition de périmètre** : fusionner les deux sections en **une seule section services**. Elle porte la
promesse « une séance, tous les canaux » et l'index complet des 11 prestations, avec un lien vers chaque page.

## §0 Message (hypothèses)

- **Person** : gérant·e d'un restaurant, d'une plage, d'un commerce ou d'un cabinet entre Agde, Béziers,
  Sète et Marseille. Il ou elle arrive sur téléphone, depuis Google, Instagram ou une recommandation.
- **Pain** : jongler entre photographe, agence web, community manager et imprimeur, avec des images qui ne
  se ressemblent pas et sans savoir ce qui rapporte.
- **Promise** (déjà sur le site) : « Une séance photo, tous vos canaux. »

## Les 3 questions

1. **Public** : est-ce bien ce profil, d'abord sur téléphone ? Faut-il ajouter un autre public (B2B,
   cabinets) ?
2. **Sensation en 3 mots** : je propose **« vu, réuni, tranquille »**. « Vu » : on voit du vrai travail,
   pas des icônes. « Réuni » : tout part d'une même image. « Tranquille » : un seul interlocuteur.
3. **Action** : un seul libellé partout. Je propose **« Demander un devis »**, l'action la plus claire pour
   un commerçant. Sinon, on garde « Démarrer un projet » et on retire l'emoji du hero.

## Phrase test (proposée)

« C'est le site où, en faisant défiler, on voit **une seule photo prise chez un client devenir tour à tour
son site, son post Instagram, sa publicité et son menu imprimé**. »

## Références (Mobbin, pour cette section)

| Référence | Observé → pourquoi ça marche → principe repris |
|---|---|
| [Koto](https://mobbin.com/sites/sections/968754c4-c525-4315-a823-07721be58b1b) | Un métier à gauche, une phrase-promesse, puis la liste des sous-prestations en lignes fines ; un visuel de projet en coin → on lit le *quoi* sans carte → **un temps = une phrase + ses prestations en liste filetée**. |
| [Mother Design](https://mobbin.com/sites/sections/83653e9e-1c8a-4dbb-b9e2-103d731e662f) | Les prestations en grande typo empilée, une colonne d'intro étroite à gauche → l'échelle donne la richesse, sans décor → **l'index des 11 services en liste typographique, chaque ligne étant un lien**. |
| [Büro](https://mobbin.com/sites/sections/bc636344-6e5b-4b98-9baa-809b622456fb) | 4 familles, sous-listes en gris, très dense, aucune carte → l'étendue de l'offre se voit d'un coup d'œil → **regrouper les 11 services sous les 4 temps** (trouvé, vu, revenir, en vrai). |
| [Fiasco « What we do »](https://mobbin.com/sites/sections/6fbcef4f-e8df-4aa5-a71a-abe9504f619e) | Liste à droite, une seule image au centre qui change selon l'élément actif → une preuve à la fois, attention guidée → **une image centrale pilotée par l'étape en cours**. |
| Imagen Intelligent Studio (veille, essai « index gradué » du 21/10) | Règles graduées et section aimantée par étape → la séquence *est* l'information (un cycle en 4 temps) → **mécanique de pin, d'aimantation et de règle, reprise de l'essai**. |
| Hors web : une charte d'identité imprimée | Le même visuel décliné sur l'affiche, la carte de visite et l'écran → c'est littéralement la promesse → **le geste signature**. |

## Grammaire de la section

L'accueil garde sa grammaire actuelle (hors périmètre). Pour la section, trois pistes :

- **A. Index gradué** (essai du 21/10 tel quel) : 4 métiers, photo plein cadre, règle graduée, pin.
  Solide, mais c'est une galerie de métiers : il ne montre pas le lien entre les canaux.
- **B. « Une photo, tous les canaux »** (recommandée) : la mécanique de A au service de la promesse. Une seule
  vraie photo client reste à l'écran pendant le pin, et son **cadre se transforme** à chaque temps :
  écran de téléphone (site et fiche Google) → post Instagram, puis publicité → e-mail → menu ou affiche A4.
  La règle graduée porte les 4 temps (écart §12.1 justifié : la séquence est l'information). Sous le pin,
  l'**index typographique des 11 services** (Mother Design et Büro), sans carte.
- **C. Liste typographique seule** (Mother Design et Koto), sans pin : sobre, mais elle perd la preuve
  par l'image.

A perd parce qu'il montre des métiers, pas la promesse. C perd parce que c'est un discours sans preuve.

## Geste signature (piste B)

**Le cadre qui change de support autour d'une même image.** La photo ne bouge pas ; c'est son contenant qui
se transforme au scroll (`clip-path` et rayons, plus une maquette d'interface en vrai HTML, jamais une
capture qui imiterait un faux écran). Il n'existe nulle part sur paper34.fr : les volutes fluides restent
l'effet de la CTA finale.

- **Au doigt et en mouvement réduit** : pas de pin ; les 4 états s'empilent, la même photo étant à chaque fois
  dans son support.
- **DA** : noir, bleu seul et Inter, selon le `DESIGN.md`. La typo Zodiak + Switzer de l'essai du 21/10
  n'entre pas sans ta décision (l'arbitrage sur Inter est déjà noté au `DESIGN.md`).

## Faits à fournir (on n'invente rien)

- **Un client qui a vraiment les 4 supports** issus de la même séance : site, post Instagram, publicité ou
  e-mail, print. Chiringuito Vias ? Midi Cap Thau ? Plus les fichiers réels (capture du site, post publié,
  menu en PDF).
- **Accord pour montrer ses visuels** sur paper34.fr, et pour les personnes identifiables.

## Porte d'empreinte

On ne peut pas encore la passer honnêtement : toutes les lignes du registre sont « à relever » sauf
paper34.fr. Avant de coder, je relève au moins les sites où ce geste pourrait déjà exister (Chiringuito,
Guinguette, Infini Mouv).
