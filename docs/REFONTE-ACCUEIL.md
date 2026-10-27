# Refonte de l'accueil — brief (branche `proto/refonte-accueil`)

> Brief rédigé par Benjamin avec ChatGPT le 27/10/2026, déposé tel quel ci-dessous. Destiné à Codex comme à
> Claude Code. Les règles de `AGENTS.md` (branches, noindex, règles studio) s'appliquent en plus et priment.

## Contexte déjà acquis (Labo, 27/10/2026)
- Branche créée depuis `labo` (60f2a28) : bande « LABO » et noindex déjà en place.
- Le prototype `src/app/lab/refonte-accueil/page.tsx` cité plus bas **n'existe pas encore** : partir de
  l'accueil actuel (`src/app/page.tsx` et `src/components/home/`).
- Cadrage de la section services déjà fait par Claude Code : `docs/proto-services/CADRAGE.md` sur la
  branche `proto/services` (`git show origin/proto/services:docs/proto-services/CADRAGE.md`). À lire : il
  constate que `PartenaireComplet` et `ServicesPreview` disent la même chose, que la grille de 11 cartes
  identiques est à remplacer, et propose le geste « une photo, tous les canaux ». Il nourrit les parties
  « Accompagnement global » et « Expertises » ci-dessous.
- Deux libellés coexistent pour l'action principale (« Me contacter 💌 », « Démarrer un projet ») : en
  choisir un seul, sans emoji, à faire valider.
- Inter est la seule police du site ; changer de police est une décision de Benjamin (DESIGN.md §2).
- Aucune section épinglée sur l'accueil actuel : la place du scroll lock unique est libre.

---

## Brief

Tu es chargé de concevoir et développer une refonte ambitieuse du site Paper34, avec un niveau de finition digne d'un studio créatif premium.

### 1. Environnement et sécurité

* Dépôt GitHub : `BenjaminSanchezPaper34/paper34`
* Branche de production : `main` — ne jamais la modifier
* Branche expérimentale : `labo`
* Branche de travail prévue : `proto/refonte-accueil`
* Commence par vérifier l'état réel des branches et les commits existants.
* Consulte `docs/LABO.md`, `docs/REFONTE-ACCUEIL.md` si présent, `DESIGN.md` et les instructions du projet.
* Un premier prototype peut exister dans `src/app/lab/refonte-accueil/page.tsx`. Utilise-le comme base de réflexion, pas comme une direction artistique définitive.
* Si la branche expérimentale n'existe pas, crée-la depuis `labo`.
* Ne fusionne rien dans `main` ou `labo` sans validation.

### 2. Objectif commercial

Paper34 est une agence de communication portée par un interlocuteur unique, capable d'accompagner durablement une entreprise sur l'ensemble de ses besoins.

Positionnement central : « Toute votre communication. Un seul partenaire. »

Le site doit faire comprendre que Paper34 n'est pas seulement un photographe, un graphiste ou un créateur de sites internet.

C'est un partenaire extérieur qui coordonne la communication de ses clients : identité visuelle, création de contenus, photographie, vidéo, réseaux sociaux, sites internet, campagnes publicitaires, emailing, supports imprimés et communication événementielle.

Les prestations ponctuelles restent possibles, mais l'accompagnement global et les relations durables sont la proposition de valeur principale.

### 3. Direction artistique

Je veux une véritable évolution visuelle, pas une simple réorganisation des blocs actuels.

Références d'ambiance :

* Apple pour la précision, les proportions et la fluidité.
* Studios créatifs haut de gamme pour l'audace et la composition.
* Une interface contemporaine, immersive, lisible et mémorable.

Respecte les fondamentaux de `DESIGN.md` : univers sombre, typographie soignée, contraste fort, accent bleu électrique et animations maîtrisées.

Tu peux explorer des compositions originales, des typographies monumentales, des transitions GSAP, des effets de profondeur et des interactions élégantes.

Attention : évite les effets gratuits, les animations permanentes fatigantes et les présentations génériques de type template d'agence.

Le site doit mettre en valeur les vraies réalisations, notamment les photos et vidéos, plutôt que multiplier les illustrations artificielles.

### 4. Nouvelle architecture de l'accueil

Construis une page d'accueil avec une narration commerciale claire :

1. Hero spectaculaire : « Toute votre communication. Un seul partenaire. » avec une présentation visuelle forte et un appel à l'action évident.
2. Réalisations : montrer rapidement la qualité et la diversité du travail.
3. Accompagnement global : expliquer comment plusieurs prestations se complètent pour un même client.
4. Expertises : organiser les compétences en quatre familles cohérentes :
   * Identité & design
   * Photo & vidéo
   * Web & digital
   * Communication & visibilité
5. Méthode et relation client : proximité, interlocuteur unique, réactivité, continuité.
6. Preuves de confiance : références clients et éléments réels disponibles dans le dépôt.
7. Contact : terminer avec une invitation claire à discuter d'un projet.

La page ne doit pas ressembler à un catalogue de prestations.

### 5. Navigation

Étudie une navigation simple :

* Accueil
* Accompagnement
* Expertises
* Réalisations
* À propos
* Contact

Pour cette première itération, concentre-toi sur une page d'accueil réellement aboutie. Ne développe pas toutes les pages secondaires tant que l'accueil n'est pas validé.

### 6. Contraintes techniques

* Réutilise intelligemment les composants, contenus et médias existants.
* Préserve les URL existantes et les acquis SEO.
* Prévois les métadonnées adaptées et le `noindex` obligatoire pour les prototypes.
* Respecte le responsive mobile, tablette et desktop.
* Soigne l'accessibilité, la navigation clavier et `prefers-reduced-motion`.
* Optimise les images, vidéos, animations et performances.
* N'invente ni témoignages, ni chiffres, ni références clients.
* Utilise les compétences `paper34-webdesign` et `paper34-motion` si elles sont disponibles.

### 7. Méthode d'exécution

1. Audite rapidement le code et les ressources existantes.
2. Identifie ce qui mérite d'être conservé, amélioré ou remplacé.
3. Propose une direction visuelle cohérente.
4. Développe directement une première version complète et consultable, sans t'arrêter à une simple description ou à des wireframes.
5. Lance les vérifications techniques disponibles (lint, TypeScript, build).
6. Corrige les erreurs rencontrées.
7. Commit et push uniquement sur `proto/refonte-accueil`.
8. Donne-moi l'URL de prévisualisation si elle est disponible.

### 8. Livrable attendu

Une page d'accueil suffisamment travaillée pour que je puisse juger :

* L'impact visuel dès les premières secondes.
* La qualité des animations.
* La lisibilité du positionnement.
* La mise en avant des réalisations.
* La qualité sur mobile.
* Le niveau de finition général.

Ne te contente pas d'une maquette fonctionnelle : cherche un résultat visuel remarquable.

À la fin, résume les modifications, les tests effectués, les éventuels points bloquants et ce que tu recommandes pour la deuxième itération.

Prévisualisation attendue : https://paper34-git-proto-refonte-accueil-paper34.vercel.app
