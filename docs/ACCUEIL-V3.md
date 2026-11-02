# Accueil v3 : stratégie et brief (Labo, validés par Benjamin le 02/11/2026)

Source unique pour Claude Code comme pour Codex. Les briefs précédents (`docs/REFONTE-ACCUEIL.md`) sont remplacés sur le fond.

## Stratégie
- **Moteur** : on découvre Benjamin par ses images vues sur les réseaux de ses clients. « Qui vous a fait ce travail ? » → son nom → le site (1re requête Google en sept. 2026 : « paper 34 »).
- **Rôle du site** : confirmer la qualité des images, rendre la première prestation simple à demander (photo et vidéo le plus souvent, toutes les portes ouvertes), puis montrer par des cas comment une collaboration grandit. Ne pas vendre le global au premier contact.
- **Paper34** reste la marque, **Benjamin Sanchez** est la personne qui parle et signe.
- **Décisions** : pas de prix affichés ; tous les canaux de contact (appel et WhatsApp en avant sur téléphone) ; pas d'entrée par métier (freiner les clients concurrents d'une même zone).
- **Écarté** : le slogan « Toute votre communication. Un seul partenaire. », les quatre familles d'expertises, les visuels générés présentés comme du travail.

## Brief
- **Promesse** : « Des images qui donnent envie de venir. » (assumé même si moins parlant pour les clients de bureau).
- **Plan** : 1. hero filmé ; 2. « Vous les avez peut-être déjà vues » ; 3. « Par quoi on commence ? » (portes d'entrée) ; 4. « Comment une collaboration grandit » (Megakart, O Soleil, Chiringuito) ; 5. Benjamin (portrait, témoignage filmé) ; 6. contact.
- **Approche B** : structure complète, chaque emplacement décrit la pièce attendue (`src/components/accueil/pieces.ts`). La page sert à choisir quoi mettre.
- **Pas de section épinglée** tant que les cas sont vides : ce sont eux qui la recevront.
- DA du `DESIGN.md` (noir, bleu seul, Inter), mobile d'abord, noindex du Labo.

## Illustrations provisoires (02/11, demande de Benjamin)
Chaque emplacement P1 à P12 est rempli par une vraie photo ou vidéo de Benjamin tirée des galeries et des captures de sites (R2), avec son numéro en pastille bleue. Ce ne sont pas des choix définitifs : la pièce attendue reste décrite dans `pieces.ts` et dans la liste en bas de page.

## Apprentissages appliqués (section VEILLE / savoir-faire)
- realfood.gov / america.gov (29/10) : une idée par section, titres plus grands, plus de vide ; grand média à coins arrondis avec bouton lecture/pause ; barre d'action collante en bas sur téléphone.
- Viktor Oddy (01/11) : un seul monde visuel, d'où des illustrations toutes issues des tournages de Benjamin (aucune image générée).
- ScrollCraft / paper34-webdesign : pas de grille de cartes identiques, pas de tout-centré, faits réels uniquement.

## Grammaire « galerie légendée » (choisie par Benjamin le 02/11)
- La page est un **index de réalisations**. Règle : le même schéma de légende pour chaque objet (n°, client, lieu, **ce que j'ai fait**). Cette légende est le geste signature : elle montre l'étendue du travail sans catalogue de services.
- Composition : hero (promesse + film), index en lignes fines (aperçu de l'image au survol, souris seulement), doubles pages alternées par client (grande image, étiquettes, chronologie « comment la collaboration a grandi » pour les 3 cas), portes d'entrée, Benjamin, mot final géant « Parlons-en. ».
- Écart assumé à la grammaire catalogue : la promesse reste en titre du hero (décision de Benjamin).
- Références Mobbin : Nite Riot et Waka Waka (index en lignes, même schéma par objet), A24 (titres empilés), MOUTHWASH (code court sous chaque visuel).
- Boucle image (Viktor Oddy) : deux maquettes générées avec Higgsfield, la B retenue (index + doubles pages + chronologie verticale), puis code calé dessus. Les maquettes contiennent des images et un nom inventés : jamais publiées.
- Données : `src/components/accueil/clients.ts` (faits tirés des dossiers et galeries uniquement).

## Reste à faire
- Remplir les pièces P1 à P12 (liste en bas de l'accueil Labo).
- Accord écrit de Megakart, O Soleil et du Chiringuito ; vérifier les faits (« environ 2 000 personnes », orthographe O Soleil / Au Soleil).
- Confirmer le WhatsApp sur le 07 82 34 32 27.
- Créer une page de service photo et vidéo (la première porte n'en a pas : elle mène aux galeries).
- Ajouter « Comment m'avez-vous connu ? » au formulaire de contact.
- Activer Vercel Web Analytics sur le projet (les clics `tel`, `whatsapp`, `formulaire`, `email` sont déjà mesurés dans le code).
