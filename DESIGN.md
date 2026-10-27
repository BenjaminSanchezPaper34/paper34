# DESIGN.md — PAPER34 · Agde

> DA rétro-formalisée depuis le code le 30/08/2026 (révision complète). Référence pour toute
> évolution du site. Standard studio : garder ce fichier en contexte pendant tout build.

**Secteur** : studio graphique (photo, vidéo, web, print)
**Personnalité en 3 mots** : précis, nocturne, lumineux
**Positionnement visuel** : sobriété Apple-like sur fond noir, la lumière comme matière
(glows, fluides, grain) — le site EST la démo du savoir-faire.

---

## 1. Tokens couleurs

| Nom | Hex | Variable | Rôle (argumenté) |
|-----|-----|----------|------------------|
| Noir absolu | `#000000` | `--color-bg-primary` | Fond de page et sections « scène » — le noir pur assume le rôle d'écran de projection pour la lumière (glows, fluides, photos) |
| Noir levé | `#0a0a0a` | `--color-bg-secondary` | Alternance des sections — rupture assumée entre deux bandes ; jamais deux fonds identiques adjacents (règle née de la jonction avis/CTA, 30/08) |
| Carte | `#111111` | `--color-bg-card` | Surfaces élevées (cards, témoignages) ; hover `#1a1a1a` |
| Blanc | `#ffffff` | `--color-text-primary` | Titres et texte principal |
| Gris Apple | `#a1a1a6` | `--color-text-secondary` | Corps de texte secondaire, descriptions |
| Gris retrait | `#6e6e73` | `--color-text-tertiary` | Micro-labels, kickers uppercase |
| Bleu électrique | `#0071e3` | `--color-accent` | L'unique décision chromatique : CTA, liens, kickers, gradient-text — hover `#0077ED`, halo `--color-accent-glow` (bleu 40 %) |
| Bordure fantôme | `rgba(255,255,255,.08)` | `--color-border` | Contours discrets ; hover `.15` |

Règle : une seule couleur — le bleu. Toute la richesse visuelle vient de la lumière
(glows, gradients de bleu, fluides teal & orange du lab en zone d'exception) et du grain.

## 2. Typographie

- **Fonctionnelle ET display** : Inter via `next/font/google` (auto-hébergée au build,
  CNIL-clean), variable `--font-inter`.
- Hiérarchie par la graisse et le tracking négatif (`tracking-[-1px]`/`[-2px]`) plutôt que
  par un second caractère. Grands titres en `clamp()`.
- Tailles : corps `text-base`+, descriptions `text-sm`+, `text-xs` réservé aux kickers
  uppercase, helper text et copyright — conforme au minimum studio.
- ⚠️ À arbitrer un jour : Inter est LA police par défaut du web — une display distinctive
  (type Fontshare) différencierait davantage. Décision Benjamin, refonte visible.

## 3. Matière

- **Rayons** : `rounded-full` boutons pill · `rounded-2xl` cards et encadrés
- **Ombres** : pas d'ombres portées classiques — la profondeur se fait par GLOWS bleus
  (`.glow`, halo pulsant `.bg-accent::before` au hover des CTA)
- **Espacements** : sections `py-24 md:py-32` (CTA finale `py-32 md:py-40`), conteneurs
  `max-w-3xl` (texte) à `max-w-7xl` (grilles)
- **Grain** : classe `grain` sur le body — texture globale du site

## 4. Animation

- **Tempo** : feutré, jamais sec — reveals `fadeInUp` (fade + translateY) via GSAP,
  staggers 0.1-0.15s, smooth scroll Lenis (durée 1.2, désactivé sur /lab et /galerie/)
- **Au scroll (GSAP + ScrollTrigger)** : reveals de sections, hero, staggers de grilles —
  patterns maison : `gsap.context()` cleanup, `immediateRender: false`, `from()` fail-visible
- **Ne bouge jamais** : corps de texte, pages légales
- **Effet signature** : les volutes fluides teal & orange au curseur (CTA home + /lab/splash-cinema,
  sim Pavel Dobryakov) — l'exception chromatique assumée du site
- **UI d'état (Motion)** : non utilisé à ce jour ; candidat naturel : lightbox galeries
- Tout WebGL : harnais standard (IntersectionObserver + coupé pointer coarse /
  `prefers-reduced-motion`) — modèle : `CTASection.tsx`. Le /lab (noindex, démos) est
  la zone franche : plein écran, sans harnais.

## 5. Interdits de ce site

- Aucune seconde couleur d'accent — le bleu est seul, le teal & orange n'existe que dans
  l'effet signature
- Pas de mode clair
- Pas d'ombres portées grises — la profondeur est lumineuse ou n'est pas
- Deux fonds identiques adjacents
- Esthétique template gratuit, presets ReactBits d'origine, deux moteurs sur un même élément

---
*Rétro-formalisé par Claude le 30/08/2026 — à valider par Benjamin.*


## 0. Accueil prototype — 27/10/2026

Cadrage de l'itération explicitement demandée dans `docs/REFONTE-ACCUEIL.md` ; hypothèses de public reprises du cadrage services, pas de nouvelle identité à valider avant cet essai.
- Person : dirigeant de commerce, restaurant, loisirs ou entreprise locale ; mobile en premier.
- Pain : plusieurs prestataires, des supports déconnectés, du temps perdu à coordonner.
- Promise : « Toute votre communication. Un seul partenaire. »
- Sensation proposée : assurance, curiosité, proximité.
- Action proposée pour validation sur le prototype : « Démarrer un projet ».
- Phrase test : c'est le site où les images, les publications et le site d'un client se réunissent sous une même direction.

Grammaire : éditorial en chapitres. Page de titre monumentale alignée à gauche, médias légendés hors texte, doubles pages asymétriques, index fin des chapitres et colophon de contact. Pas de hero vidéo en fond, pas de boutons magnétiques, pas de cartes d'expertises identiques. Le catalogue perd car il vendrait les métiers séparément ; le récit filmé perd car il laisserait trop peu de place aux preuves ; l'outil d'abord perd car aucun configurateur réel n'est demandé.

Geste : trois supports réels du Chiringuito se déploient autour d'une ligne commune au scroll. Un seul pin, sur bureau à pointeur fin et hauteur suffisante. Sur mobile et en mouvement réduit : supports empilés, sans pin. Il s'agit d'un rapprochement de réalisations, pas d'une affirmation de séance commune. Les textes ne bougent jamais dans cette séquence.

Courbe : promesse (assurance / échelle typographique), réalisations (curiosité / images grandes), accompagnement (compréhension / déploiement, pic unique), expertises (clarté / index), méthode (proximité / paroles directes), confiance (rassurance / avis existants), contact (décision / colophon).

Palette et fonte inchangées : Inter auto-hébergée, noir absolu / levé, bleu #0071e3 seul accent. Noir pur justifié par l'écran de projection (§1). Aucun dégradé typographique, nouveau glow ni animation infinie. Durées et rayons centralisés dans les tokens de l'itération. Corps 16 px, légendes 14 px. Footer et signature conservés.

Références retenues, observées via Mobbin (27/10) :
- [Fiasco](https://mobbin.com/sites/sections/b1072dab-8faa-4336-8cdf-980edf4d3213) : nom monumental isolé → hiérarchie immédiate → poids du titre, sans reprendre sa palette.
- [Instrument](https://mobbin.com/sites/sections/05811dd7-a07a-41ae-9fa7-192b8eede1b1) : images de tailles différentes et légendes séparées → diversité sans bruit → sélection asymétrique.
- [Mother Design](https://mobbin.com/sites/sections/83653e9e-1c8a-4dbb-b9e2-103d731e662f) : liste typographique sans cartes → étendue lisible → quatre familles d'expertises.
- [Aino](https://mobbin.com/sites/sections/0553efc5-ac3a-4b83-9105-c0a16d2ce221) : images séparées du discours et texte concret → relation humaine → méthode en colonne.
- [Aino contact](https://mobbin.com/sites/sections/1083cf3c-a197-4ee7-9632-e9bfe0d4e416) : coordonnées immédiatement accessibles → passage à l'action → email et téléphone sans détour.

Les candidates et la limite de la porte d'empreinte sont consignées dans `docs/refonte-accueil/CONCEPTION.md`. La DA ne change pas ; l'accord demandé ensuite porte sur le résultat du prototype et le libellé CTA.


### Itération navigation — demande de Benjamin, 27/10/2026

« retire les référence client pour qu'on se concentre uniquement sur l'efficacité de la navigation, prévoit des bloc pour les futures ressources »

Cette demande remplace, sur l'accueil de cette itération, l'emploi de médias et preuves clients : noms, photographies, captures, film, publications et témoignages sont remplacés par des blocs explicitement réservés. Les blocs indiquent la nature et le format de la future ressource ; ils ne sont pas cliquables et ne simulent pas une réalisation. Les ancres de chapitres et CTA réels restent actifs. Aucun scroll épinglé : la page sert maintenant à évaluer la lisibilité du parcours. Palette, Inter et footer inchangés. Les anciennes routes et leurs contenus restent disponibles.
