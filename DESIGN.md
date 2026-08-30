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
