# Labo paper34.fr — branche `labo`

Site d'essai, séparé du vrai site (modèle Labo de Benjamin : `~/.claude/modele-labo.md`).
Conversation qui pilote les essais : « apprentissage » (`TRAVAUX/2026/PAPER34 - AGDE/VEILLE`).

## Règles
- **Rien n'est fusionné depuis le Labo.** Les essais validés passent à la conversation « Site web »
  (Développement) par une **fiche de passage** en haut de `docs/HANDOFF.md`. La fusion attend l'accord explicite de Benjamin.
- **Une branche `proto/<sujet>` par essai**, créée depuis `labo`, poussée, sans PR vers `main`.
- **Le Labo n'est jamais en retard** : avant chaque série d'essais, fusionner `origin/main` dans `labo`.
- **Reconnaissable** : bande violette « LABO » sur toutes les pages, jamais indexé (robots + meta noindex),
  URL de prévisualisation Vercel à part (jamais le domaine paper34.fr).
- **Propre au Labo, à ne jamais reprendre** : `src/components/labo/`, les lignes marquées `// LABO` de
  `src/app/layout.tsx` et `src/app/robots.ts`, ce fichier.
- Dossier de travail local : `TRAVAUX/2026/PAPER34 - AGDE/site-labo` (worktree git du dépôt `paper34`),
  à côté de `site-next` (le vrai site, branche `main`), qui n'est jamais touché par le Labo.
- Les essais appliquent les skills `paper34-webdesign` et `paper34-motion` (TRAVAUX/CLAUDE/PAPER34-SKILLS).

## Journal des essais
| Date | Branche | Sujet | État |
|---|---|---|---|
| 27/10/2026 | `labo` | Création du Labo | prêt |
