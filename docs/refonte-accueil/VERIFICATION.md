# Vérification de la V1 — 27/10/2026

## Résultat
Accueil complet implémenté dans `src/components/home/Accueil.tsx`, composition dans `accueil.module.css`, GSAP isolé dans `AccueilMotion.tsx`. Développé dans une copie locale isolée ; aucun changement du checkout partagé site-next. Aucun commit ni fusion sur main/labo, aucune PR.

## Vérifié
- `npm run lint` : code de sortie 0, aucune erreur, 28 avertissements existants (images historiques et variables inutilisées).
- `npm run build` : succès, routes générées. Avertissement historique Cal Sans dans une démo, fallback Instagram sans token local ; Inter de l'accueil inchangée.
- `npx tsc --noEmit` : succès.
- `git diff --check` : succès.
- Quatre erreurs historiques de lint corrigées sans désactivation de règle : constante dans AsciiOrbsBg, reset du filtre déplacé dans son événement, lecture du consentement via snapshot externe, fermeture du menu dans les événements de navigation.
- Build de production observé en navigateur : desktop 1440 × 1000, mobile 390 × 844, petit écran 360 × 640 ; tablette 768 × 1024 contrôlée pour débordement. Aucun débordement horizontal observé. Captures locales et du déployé.
- Sur Vercel : navigation par chapitres, menu mobile qui se ferme sur lien, ouverture d'expertise par Entrée, focus visible ; zéro erreur console remontée pendant cette passe. Tous les supports de l'accompagnement chargés. Un pin au bureau ; zéro pin sur téléphone/tablette.
- Animation contrôlée à plusieurs positions au scroll ; réduction de l'angle et des décalages des supports après observation d'un chevauchement de légende.
- Routes HTTP 200 : portfolio, galeries, les deux reportages liés, graphisme, création de site web, réseaux sociaux, contact, robots.txt.
- `robots.txt` renvoie `Disallow: /` ; meta accueil `noindex, nofollow`, bande LABO conservée et visible ; un seul h1.
- CTA : « Démarrer un projet » sur tout l'accueil. Navigation Contact conservée comme libellé de destination.
- Vidéo à la demande, `preload=none`, poster réel en vignette ; pas de téléchargement automatique du film. Images Next optimisées depuis R2, priorité élevée pour le premier média, tailles réservées pour le logo.
- Consentement : refus testé dans le navigateur, choix mémorisé lors du rechargement, aucune hydratation en erreur. Aucun envoi de formulaire ni message réel pour les tests.

## Lighthouse
Deux passes sur build de production local avec émulation mobile, performance + accessibilité. Première : 83 / 96. Après priorité du média LCP et poster vidéo allégé : **93 / 96**, LCP 3,2 s, TBT 0 ms. Ces chiffres sont locaux, pas une garantie Vercel ou iPhone. La tentative sur la prévisualisation protégée a audité la connexion Vercel : résultats écartés.
Les défauts de contraste relevés concernent le footer et le panneau de consentement existants (texte gris tertiaire et lien bleu). La signature/footer est conservée conformément au brief ; correction transversale à décider séparément.

## Limites explicites
- Pas de test sur iPhone physique ; aucune affirmation de fluidité iOS réelle.
- Repli reduced-motion relu dans le code et CSS (GSAP/Lenis coupés, contenu visible), pas de simulation du réglage système dans le navigateur intégré.
- Pas de validation exhaustive de toutes les anciennes pages, ni d'envoi de formulaire réel.
- Le seuil d'empreinte de tous les sites clients n'est pas certifié : registre fourni incomplet, cf. CONCEPTION.md.
- Les captures du déployé ont été prises sur la version visuelle ; les derniers ajustements portent sur priorité d'image, poster et ancre du logo.

## Itération suivante proposée
Benjamin juge d'abord le rythme, le hero et « Démarrer un projet » sur son téléphone. Ensuite : constituer un vrai cas d'accompagnement documenté avec supports issus d'une même campagne, et vérifier Safari/iPhone, reduced-motion et Lighthouse sur un déploiement accessible à l'audit. Ne développer les pages secondaires qu'après validation de l'accueil.

## Incident de vérification résolu
`vercel curl --yes` dans la copie non liée a créé automatiquement un projet annexe `paper34-refonte-accueil`. Ce projet créé pendant la passe a été supprimé aussitôt ; la copie est maintenant liée au projet existant `paper34`. Aucun déploiement de production n'a été lancé. Les aperçus de la branche passent par l'intégration GitHub/Vercel existante.

Dernière passe clavier : les liens de chapitres de la navigation utilisent des ancres HTML natives, pour éviter l'ajout successif de fragments par le routeur lors de passages entre chapitres. Retour logo et changement de chapitre revérifiés après correction.


## V2 — isoler la navigation, 27/10/2026

À la demande de Benjamin, l'accueil ne présente plus de noms, citations, photos, captures, publications ni film clients. Douze emplacements indiquent le contenu attendu et son format, sans faux lien ni commande de lecture. Les pages secondaires sont conservées. Suppression de la séquence épinglée pour faciliter le parcours.

Validation de cette passe : lint (0 erreur, 28 avertissements historiques), build et TypeScript réussis ; contrôle DOM du build de production : 12 blocs réservés, aucun nom client, aucune image/vidéo/citation dans le main, aucun bloc réservé focusable et aucun pin. Navigation desktop vers les expertises, ouverture clavier par Entrée, menu mobile 360 × 640 et lien Réalisations vérifiés ; aucun débordement horizontal ni erreur console observé. Les scores Lighthouse de V1 ne sont pas présentés comme une mesure de V2.


## V3 — comprendre l’accompagnement et rejoindre le contact, 27/10/2026

Demande de Benjamin : navigation surtout mobile, accès simple à « Démarrer un projet », ton sobre, direct et doux, sans punchline.

- Premier écran réécrit à la première personne avec les réalisations concrètes ; suppression de l'ancien slogan et de l'animation du hero. Métadonnées alignées.
- Ordre : présentation → accompagnement → prestations → réalisations → méthode → contact. Le message distingue projet ponctuel et suivi régulier.
- Navigation de l'accueil dédiée : toujours visible, quatre chapitres, CTA explicite. Sur mobile : accès Accompagnement et Démarrer un projet hors du menu. Menu en texte, fermeture sur choix, Échap et sortie du focus ; cibles >=44 px, safe areas et ancres sous le header. Les autres routes conservent leur navigation.
- Descriptions des quatre familles de prestations visibles même repliées. Les neuf emplacements de futures ressources sont conservés, derrière deux volets natifs fermés, pour éviter des écrans vides dans le parcours. Aucun contenu client ajouté.
- Destination /contact : intro cohérente, options « Accompagnement global » et « À définir ensemble », champs 16 px, autocomplete nom/email/téléphone. Aucun envoi réel.

Validation : lint sans erreur (28 avertissements historiques), build et TypeScript réussis, diff sans erreurs d'espacement. Navigation contrôlée en navigateur à 360 × 640 et 1440 × 1000. À 360 px : CTA d'en-tête visible, CTA du hero entièrement avant 521 px, aucun débordement horizontal ; après clic Accompagnement, titre sous le header (bas du header 126 px, titre à 247 px). Menu vers Prestations, ouverture par Entrée et Échap avec retour de focus testés. Accès /contact depuis le CTA mobile testé ; hauteur des champs >=47 px, police 16 px. Pas de test physique iPhone et pas de nouvel audit Lighthouse ; les scores V1 ne mesurent pas cette version.
