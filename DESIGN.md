# DESIGN.md — PAPER34 · Agde

> DA rétro-formalisée le 30/08/2026, puis mise à jour le soir même avec la refonte 2026
> (branche `refonte-2026`). Référence pour toute évolution du site. Standard studio : garder ce
> fichier en contexte pendant tout build.

**Secteur** : studio graphique (photo, vidéo, web, print)
**Personnalité en 3 mots** : précis, nocturne, lumineux
**Positionnement visuel** : sobriété Apple-like sur fond noir, la lumière comme matière
(glows, fluides, grain) — le site EST la démo du savoir-faire.

---

## 0. Message — Pain · Person · Promise

- **Person** : le commerçant, restaurateur, artisan ou cabinet de l'Hérault (et au-delà) qui
  veut une image pro sans gérer cinq prestataires.
- **Pain** : éparpillé entre un graphiste, un imprimeur, un « webmaster » et un community
  manager → image incohérente ; invisible là où ses clients cherchent désormais (Maps, Apple
  Plans, ChatGPT).
- **Promise** : **« De la carte de visite à ChatGPT. »** — un seul studio pour être reconnu
  sur tous les supports et trouvé partout où l'on vous cherche.

→ Titre du hero, meta title/description, OG, encadré « L'essentiel » du llms.txt. L'offre se
présente en 4 piliers (Être trouvé · Être reconnu · Être vu · Aller plus loin) empilés au scroll.

---

## 1. Tokens couleurs

| Nom | Hex | Variable | Rôle (argumenté) |
|-----|-----|----------|------------------|
| Noir absolu | `#000000` | `--color-bg-primary` | Fond de page et sections « scène » — le noir pur assume le rôle d'écran de projection pour la lumière (glows, fluides, photos) |
| Noir levé | `#0a0a0a` | `--color-bg-secondary` | Alternance des sections — rupture assumée entre deux bandes ; jamais deux fonds identiques adjacents (règle née de la jonction avis/CTA, 30/08) |
| Carte | `#111111` | `--color-bg-card` | Surfaces élevées (cards, témoignages) ; hover `#1a1a1a` |
| Blanc | `#ffffff` | `--color-text-primary` | Titres et texte principal |
| Gris Apple | `#a1a1a6` | `--color-text-secondary` | Corps de texte secondaire, descriptions |
| Gris retrait | `#86868b` | `--color-text-tertiary` | Micro-labels, compteurs, « Scroll » — relevé de #6e6e73 le 30/08 pour tenir 5,5:1 sur noir (WCAG AA) |
| Bleu électrique | `#0071e3` | `--color-accent` | L'unique décision chromatique — en REMPLISSAGE : CTA, fonds, halo `--color-accent-glow` (bleu 40 %), hover `#0077ED` |
| Bleu électrique (texte) | `#3b9dff` | `.text-accent` | Le même bleu, une marche plus claire, dès qu'il est ÉCRIT sur noir (kickers, liens, labels) : #0071e3 ne fait que 4,2:1, sous le seuil AA. Une teinte, deux luminances — pas une seconde couleur |
| Bordure fantôme | `rgba(255,255,255,.08)` | `--color-border` | Contours discrets ; hover `.15` |

Règle : une seule couleur — le bleu. Toute la richesse visuelle vient de la lumière
(glows, gradients de bleu, fluides teal & orange du lab en zone d'exception) et du grain.

## 2. Typographie

- **Fonctionnelle** : Inter via `next/font/google` (auto-hébergée, CNIL-clean), `--font-inter`.
- **Display** : **Bricolage Grotesque** (variable, OFL, `next/font`, `--font-bricolage`,
  utilitaire `font-display`) — réservée au H1 du hero, aux H2 de section et aux titres des
  cartes d'offre. Grotesque à caractère : la personnalité que le site n'avait pas avec Inter
  seule. Jamais en corps de texte.
- Tracking négatif (`-0.03em`) sur les titres display, grands titres en `clamp()`.
- Tailles : corps `text-base`+, descriptions `text-sm`+, `text-xs` réservé aux kickers
  uppercase, helper text et copyright — conforme au minimum studio.

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
- **Effet signature** : la lumière bleue en sillage — hero : une vague lumineuse tracée en
  boucle (moteur wake du lab, canvas 2D) + sillage au curseur, dans les bleus du site ; CTA
  finale : volutes fluides teal & orange (sim Pavel Dobryakov), l'exception chromatique assumée
- **Scroll lock** : UNE section — l'offre en 4 cartes empilées (`sticky` + recul GSAP scrub
  de la carte recouverte). Fallback empilé sur mobile, inactif en reduced-motion
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
