# Conception — accueil, 27/10/2026

Brief exécuté sur proto/refonte-accueil, après lecture des skills webdesign et motion. Le storyboard est celui des sept chapitres du brief, détaillé dans DESIGN.md ; les règles de film HyperFrames (60 i/s, dérive permanente) ne s'appliquent pas à cette page web, dont le brief refuse les animations permanentes.

## Audit
Ancien accueil : hero vidéo centré, PartenaireComplet puis ServicesPreview redondants, chiffres agrégés, mosaïque sociale et carrousel d'avis. Conservés : Inter, palette, sources R2, routes et pages secondaires, consentement, footer/signature, noindex et bande LABO. Remplacés sur l'accueil : grille de onze services et carrousel automatique. Les anciens composants restent disponibles pour les autres routes et comparaisons.

## Références candidates observées
Les cinq retenues et principes figurent dans DESIGN.md. Candidates par section : hero Fiasco (échelle), OFF+BRAND (espace négatif, décor non retenu), Locomotive (média dominant, fond vidéo non retenu) ; réalisations Wild (légendes factuelles), Instrument (asymétrie), Büro (grand format) ; accompagnement et expertises Mother Design (liste), Koto (phrase et sous-liste), basement.studio (image dans sa colonne) ; méthode/confiance Analogue (phrase directe), Aino / about (proximité), Aino / studio (texte argumenté) ; contact Aino (coordonnées), Unseen (une invitation), Shader (contact personnel). Les références de cadrage services sont lues sur origin/proto/services, sans reprendre ses hypothèses comme des faits.

## Empreinte : résultat honnête
Le registre fourni est presque entièrement « à relever ». Aucun seuil 4/6 contre tous les clients ne peut donc être certifié. Pour l'ancien accueil observé dans le code : grammaire (éditorial vs vitrine), hero (titre vs vidéo), sections (asymétrie/index vs cartes), fin (colophon vs WebGL), geste (supports réunis vs fluide) diffèrent ; navigation vers les chapitres également. Le relevé exhaustif des sites clients n'est pas présenté comme accompli et n'empêche pas l'itération directement demandée. Aucun site livré n'est réécrit dans le registre.

## Sources des preuves
- Galeries publiques : Chiringuito Opening, Megakart 100 tours et Actah & Associés, manifest.json.
- Captures réelles de sites : src/lib/web-projects.ts, hébergement R2 existant.
- Publication réelle Chiringuito : src/lib/instagram-accounts.ts (post-01).
- Témoignages : TESTIMONIALS dans src/lib/constants.ts, texte intégral conservé.
- Pas de promesse chiffrée nouvelle, pas d'attribution de tous les supports à une même séance.
