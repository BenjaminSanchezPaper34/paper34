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

## Reste à faire
- Remplir les pièces P1 à P12 (liste en bas de l'accueil Labo).
- Accord écrit de Megakart, O Soleil et du Chiringuito ; vérifier les faits (« environ 2 000 personnes », orthographe O Soleil / Au Soleil).
- Confirmer le WhatsApp sur le 07 82 34 32 27.
- Créer une page de service photo et vidéo (la première porte n'en a pas : elle mène aux galeries).
- Ajouter « Comment m'avez-vous connu ? » au formulaire de contact.
- Activer Vercel Web Analytics sur le projet (les clics `tel`, `whatsapp`, `formulaire`, `email` sont déjà mesurés dans le code).
