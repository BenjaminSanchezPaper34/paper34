---
name: paper34-motion
description: Motion design Paper34 en code (HyperFrames + GSAP) — posts et reels animés, stories, vidéos de lancement, animations de logo, héros vidéo de site, pour Paper34 ou ses clients (restaurants, lieux, commerces, marques locales). À utiliser dès qu'on demande d'animer un storyboard, un post, un logo, une offre, une ouverture de saison, un événement ou une interface, AVANT d'écrire la composition. Couche goût + méthode au-dessus des skills HyperFrames (qui gardent la mécanique).
---

# Paper34 Motion — v1 (26/10/2026)

Je suis motion designer et j'anime en code. Chaque image est une fonction pure du numéro d'image :
timeline GSAP en pause pilotée par HyperFrames, aucun minuteur, aucune transition CSS, aucun aléatoire.
La mécanique (structure, `data-*`, rendu, contrôles) appartient aux skills `/hyperframes` et
`/hyperframes-core` : les charger aussi. Ce skill-ci fixe la méthode, le goût et la checklist.

Règle de maintenance : ce fichier ne change qu'avec l'accord de Benjamin. Toute règle nouvelle est
datée et sourcée dans `SOURCES.md`.

## 0. Entrées — toutes lues avant la première ligne de code

1. **Brief** (`references/brief.md`) : pour qui, LA phrase à retenir, les 5 moments à montrer, formats.
2. **Storyboard** (`references/storyboard.md`) : source de vérité de l'ordre, des durées, de ce qui est
   à l'écran et de la caméra. Je ne réordonne, n'ajoute ni ne retire aucune scène.
3. **Marque** : couleurs (hex + rôle) et polices du `DESIGN.md` du client s'il existe, sinon de sa charte.
4. **Éléments** : logo et interfaces en **SVG** (jamais de capture : floue dès que la caméra zoome),
   photos du client (dossier client / `photos-index.json`), fonds.

Pas de storyboard → je m'arrête et je le propose d'abord à partir du brief. Sans storyboard, les scènes
sortent dans le désordre et tout bouge en même temps.

## 1. Récit

Toujours le même chemin : **accroche → situation (le manque, l'envie) → ce que propose le lieu/la
marque → le bénéfice → logo + appel à l'action**. Une scène qui ne sert aucune de ces étapes sort.
Adapté à nos clients : l'« accroche » est souvent une image forte (plat, lieu, ambiance), le
« bénéfice » une émotion ou une info concrète (date, horaire, offre validée par le client).

## 2. Tempo (à 60 i/s)

- Tout ce qui compte (titre, chiffre, info pratique) reste lisible **≥ 1,5 s (90 images)**.
- Compteurs : **~1 s (60 images)**, ralenti en fin ; jamais de saut en une image.
- Les durées de scène viennent du storyboard ; le total doit tomber juste.
- Lisibilité réseaux : un post se regarde sans le son et souvent sur 3 s ; l'accroche se comprend
  dans la première seconde.

## 3. Règles de mouvement

- **Rien de linéaire.**
- **Entrée** ~0,5 s (30 images) avec léger dépassement : `back.out(1.4)` ou
  `cubic-bezier(0.34, 1.56, 0.64, 1)`.
- **Sortie** plus rapide que l'entrée : ~60 % de sa durée, en accélération (`power2.in`).
- **Clic / pression** : échelle 1 → 0,96 → 1 sur ~8 images.
- **Curseur** (si interface) : jamais en ligne droite ; arc (point de contrôle décalé ~15 % de la
  distance), easing d'entrée et de sortie, petit dépassement à l'arrivée, hésitation humaine quand le
  récit le demande.
- **Règle d'or : rien ne s'arrête jamais complètement.** Un élément au repos garde une dérive lente
  (échelle 1 → 1,02 ou ±4 px) ; la caméra a toujours une micro-poussée.
- **Travailler comme dans After Effects** :
  - *Parentage* : les éléments liés dans un même groupe, on anime le groupe ;
  - *Décalage* : chaque élément d'un groupe part 2 à 4 images après le précédent ;
  - *Chevauchement* : le mouvement suivant démarre dans les derniers ~20 % du précédent.
- **Caméra** : un conteneur caméra par scène ; panoramiques et zooms toujours en `power2.inOut` ;
  un panoramique pleine largeur dure ≥ 0,8 s. Vocabulaire : push-in lent 100 → 106 %, zoom ≈ 130 %
  sur l'action puis retour, recul pour révéler le résultat.
- Traduction GSAP détaillée : `references/regles-gsap.md`.

## 4. Formats et cadrage

| Usage | Taille | Notes |
|---|---|---|
| Post Instagram/Facebook | 1080 × 1350 (4:5) | format principal des clients |
| Reel / story / TikTok | 1080 × 1920 (9:16) | zones d'interface : rien d'important dans les ~250 px du haut ni les ~400 px du bas (repères approximatifs) |
| Héros de site / YouTube | 1920 × 1080 (16:9) | vidéo muette, en boucle, avec poster |
| Carré | 1080 × 1080 | |

- **60 i/s** pour le master : `data-fps="60"` sur la racine (ou `--fps 60` au rendu).
- Tout positionné **depuis le centre**, jamais depuis les bords : la même composition se redécline
  dans les autres formats.
- Titres à ≥ 5 % de chaque bord ; l'élément clé de chaque plan dans le carré central.

## 5. Éléments et marque

- Polices **auto-hébergées** (`@font-face` vers un fichier local), chargées avant l'image 0 :
  une police de secours visible est un bug.
- Couleurs et polices dans un seul bloc de variables ; textes, chiffres et dates dans un seul objet
  de config en tête de script : une révision client = une ligne.
- Maquettes Figma souvent en 1440 px : un seul facteur d'échelle, centrées sur le canevas.
- Photos client : légère parallaxe ou Ken Burns lent plutôt que des effets ; pas de personne
  identifiable sans accord.
- Ne jamais citer d'outil dans un contenu public (pas de « fait avec… »).

## 6. Process

1. Reformuler le storyboard en liste de scènes avec plages d'images ; vérifier la somme.
2. **Chercher d'abord dans la bibliothèque** (`/hyperframes-registry`, ~450 blocs : transitions, grain, titres, graphiques…) avant de construire un effet à la main ; un bloc posé est re-skinné aux couleurs et polices de la marque, jamais laissé à ses réglages d'origine.
3. Une scène = un bloc (clip ou sous-composition) ; variables de marque, constantes d'easing et
   composants communs (caméra, compteur, curseur) partagés.
4. `npx hyperframes check` à 0 erreur, puis **une image fixe par scène** (`snapshot --at`, aux moments
   clés et aux jonctions) ; corriger avant toute vidéo.
5. Rendu du master, puis déclinaisons.
6. Correction ou révision : changer le plus petit élément qui règle le problème, garder tout le reste,
   re-rendre. Corriger par prompts d'une phrase, un défaut à la fois.
7. Fin de mission : proposer à Benjamin d'ajouter au skill (et à `SOURCES.md`) tout correctif ou
   réglage nouveau trouvé pendant le travail.

## 7. Checklist d'avant-rendu (bugs déjà vus)

- [ ] Canevas au bon format ; tout positionné depuis le centre.
- [ ] Polices chargées avant l'image 0 ; aucune police de secours.
- [ ] Aucun texte qui se chevauche à aucune image (images fixes à chaque jonction de scène).
- [ ] Compteurs sur ~1 s, jamais de saut.
- [ ] Éléments répétés (cartes, lignes, coches) décalés, jamais tous sur la même image.
- [ ] Chaque mouvement de caméra a son easing et reste lisible.
- [ ] Rien ne sort du canevas sauf sortie volontaire.
- [ ] Rien n'est totalement immobile plus de ~1 s (dérive, micro-poussée).
- [ ] Ornements qui dépassent d'un masque de révélation : le masque ne coupe qu'en bas
      (`clip-path: inset(-120% -20% 0 -20%)`), sinon l'ornement est rogné.
- [ ] Contraste : `npx hyperframes check` sans échec WCAG.
- Pièges détaillés et leur origine : `references/pieges.md`.

## Références

- `references/brief.md` — le brief (modèle + exemple client local).
- `references/storyboard.md` — le storyboard scène par scène (modèle + exemple).
- `references/regles-gsap.md` — les règles de mouvement en code GSAP / HyperFrames.
- `references/pieges.md` — pièges rencontrés, avec date et source.
- `references/source-launch-motion/` — skill d'origine (Sanji Chien, Higgsfield, 15/10/2026), archivé tel quel.
- `exemples/` — rendus validés par Benjamin, avec leur code : à lire avant de composer.
