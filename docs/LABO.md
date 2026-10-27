# Labo paper34.fr — branche `labo`

Site d'essai, séparé du vrai site (modèle Labo de Benjamin : `~/.claude/modele-labo.md`).
Créé depuis la conversation « apprentissage » (`TRAVAUX/2026/PAPER34 - AGDE/VEILLE`) ; les essais sont menés par la conversation **Labo**.

## Règles
- **Rien n'est fusionné depuis le Labo.** Les essais validés passent à la conversation « Site web »
  (Développement) par une **fiche de passage** en haut de `docs/HANDOFF.md`. La fusion attend l'accord explicite de Benjamin.
- **Une branche `proto/<sujet>` par essai**, créée depuis `labo`, poussée, sans PR vers `main`.
- **Le Labo n'est jamais en retard** : avant chaque série d'essais, fusionner `origin/main` dans `labo`.
- **Reconnaissable** : bande violette « LABO » sur toutes les pages, jamais indexé (robots + meta noindex),
  URL de prévisualisation Vercel à part (jamais le domaine paper34.fr).
- **Propre au Labo, à ne jamais reprendre** : `src/components/labo/`, les lignes marquées `// LABO` de
  `src/app/layout.tsx` et `src/app/robots.ts`, ce fichier, le bloc `paper34-labo` de `AGENTS.md`, `.agents/skills/`.
- **Deux agents** : Claude Code et Codex travaillent tous deux dans le Labo, avec les mêmes règles (`AGENTS.md`,
  importé par `CLAUDE.md`) et les mêmes skills (`.agents/skills/`). Jamais sur la même branche `proto/*` en même temps.
- **Ouvrir le Labo** : dans Claude, projet `site-next`, sélecteur de branches → `labo` (ou une branche
  `proto/<sujet>` partie de `labo`). Plus de dossier local séparé (l'ancien `site-labo` n'existe plus).
  Le dossier `site-next` partagé reste sur `main` : le Labo n'y change jamais de branche.
- Conversation Labo : pilote les essais ; prévisualisation Vercel protégée :
  https://paper34-git-labo-paper34.vercel.app (une URL `paper34-git-proto-<sujet>-paper34.vercel.app` par essai).
- Les essais appliquent les skills `paper34-webdesign` et `paper34-motion` (TRAVAUX/CLAUDE/PAPER34-SKILLS).

## Journal des essais
| Date | Branche | Sujet | État |
|---|---|---|---|
| 27/10/2026 | `labo` | Création du Labo | prêt |
| 27/10/2026 | `labo` | Ouverture via le sélecteur de branches (fin du dossier `site-labo`) | fait |
| 27/10/2026 | `proto/services` | Cadrage de la section services (Claude Code) | cadrage, attend Benjamin |
| 27/10/2026 | `proto/refonte-accueil` | Refonte de l'accueil, brief `docs/REFONTE-ACCUEIL.md` (Codex) | Codex : V1 développée, vérifiée et poussée ; attend le retour visuel de Benjamin |
| 27/10/2026 | `labo` | Environnement Codex : `AGENTS.md` commun, skills dans `.agents/skills/` | fait |
