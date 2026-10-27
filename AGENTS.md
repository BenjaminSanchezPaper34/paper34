<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:paper34-labo — LABO : propre aux branches labo et proto/*, ne jamais reprendre dans main -->
# Labo paper34.fr — règles communes à Claude Code et Codex

Ce fichier est lu par Codex (`AGENTS.md`) et par Claude Code (`CLAUDE.md` l'importe). Réponds en français.

## Branches
- `main` = production (paper34.fr). **Ne jamais committer, pousser ni fusionner dans `main`.**
- `labo` = base des essais : à jour avec `origin/main`, bande violette « LABO », jamais indexée.
- `proto/<sujet>` = une branche par essai, créée depuis `labo`, poussée, **sans PR vers `main`**.
  Rien n'est fusionné dans `labo` ni dans `main` sans l'accord explicite de Benjamin.
- Avant une série d'essais : `git fetch && git merge origin/labo` dans la branche `proto/*`.
- Un essai validé part vers la conversation « Site web » par une **fiche de passage** en haut de
  `docs/HANDOFF.md` (mots exacts de Benjamin, branche, fichiers, ce qui est propre au Labo).
- Claude Code et Codex peuvent travailler en parallèle : **jamais sur la même branche `proto/*` en même
  temps**. Lire `git log` de la branche avant de commencer ; annoncer son travail dans `docs/LABO.md`
  (journal des essais).

## Propre au Labo, ne jamais reprendre dans main
`src/components/labo/`, les lignes `// LABO` de `src/app/layout.tsx` et `src/app/robots.ts`, `docs/LABO.md`,
le bloc `paper34-labo` de ce fichier, `.agents/skills/`.

## Règles studio (résumé de `TRAVAUX/CLAUDE.md`, qui fait foi)
- **Noindex obligatoire** sur tout prototype (hérité de `labo` : ne pas le retirer).
- **DESIGN.md** à la racine = DA validée (noir, un seul accent bleu `#0071e3`, lumière comme matière).
  Toute évolution visible (nouvelle police, nouvelle couleur) s'écrit au DESIGN.md et attend Benjamin.
- **Mobile d'abord** : cibles ≥ 44 px, `svh`/`dvh`, safe areas, aucune info réservée au survol.
- **Animations** : GSAP + ScrollTrigger (storytelling au scroll), Lenis (smooth scroll), Motion seulement
  pour l'UI d'état React ; jamais deux moteurs sur un même élément. **Une seule section épinglée
  (`pin + scrub`) par page**, repli empilé sur mobile, coupée en `prefers-reduced-motion`.
- **WebGL/canvas** : monté via IntersectionObserver, coupé si `pointer: coarse` ou reduced-motion
  (modèle : `src/components/home/CTASection.tsx`).
- **Polices auto-hébergées** (`next/font` ou fichiers locaux) : jamais de CDN de polices (CNIL).
- **Tokens** : aucune couleur, durée ou rayon en dur dans un composant ; un motif répété = un composant.
- **Typo** : corps ≥ 16 px, descriptions ≥ 14 px, 12 px réservé au copyright.
- **Faits réels uniquement** : ni témoignage, ni chiffre, ni client inventé. Médias réels : `public/`,
  galeries (`public/galeries/*/manifest.json`), projets (`src/lib/web-projects.ts`).
- Préserver les URL existantes et le SEO (pas de suppression de route sans accord).
- Footer : signature Paper34 conservée telle quelle.

## Méthode de conception
Skills maison (copie dans `.agents/skills/`, source de vérité : `TRAVAUX/CLAUDE/PAPER34-SKILLS`) :
- `paper34-webdesign` : cadrage, références par section, grammaire, geste signature, porte d'empreinte,
  liste de refus anti « look IA ». **À appliquer avant de dessiner.**
- `paper34-motion` : règles d'animation et pièges GSAP.

## Vérifier avant de rendre
- `npm run lint` puis `npm run build` sans erreur.
- Prévisualisation Vercel de la branche : `https://paper34-git-<branche-avec-tirets>-paper34.vercel.app`
  (protégée : Benjamin l'ouvre connecté à Vercel). Elle doit montrer la bande « LABO ».
- Dire honnêtement ce qui a été vérifié, comment, et ce qui ne l'a pas été (les animations se jugent
  dans un onglet visible ou sur l'iPhone de Benjamin).
- Commits en français, petits, sur la branche `proto/*` uniquement.
<!-- END:paper34-labo -->
