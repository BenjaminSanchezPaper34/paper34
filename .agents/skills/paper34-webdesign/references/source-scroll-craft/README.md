# Archive — skill ScrollCraft (source de paper34-webdesign)

**Origine** : github.com/nateherkai/scroll-craft, plugin `nateherk-design` v0.3.1, commit `75d81f7`
(30/09/2026). Auteur : Nate Herk. **Licence MIT** (fichier `LICENSE` ci-contre, conservé tel quel).
Archivé le 27/10/2026, en anglais, sans modification.

**Contenu archivé** : textes seulement. `SKILL-original.md` (= `SKILL.md` renommé pour qu'il ne soit
jamais chargé comme un second skill), `references/*.md`, `templates/FINGERPRINTS.md`, `LICENSE`.
**Non archivés** : médias, moteur JS/CSS, scripts, `template.html`, `device-diag.html`, `CHANGELOG.md`,
`EXAMPLES.md` (registre de l'auteur). Ils restent consultables sur le dépôt.

Rien ici ne fait foi pour Paper34 : la source de vérité est `../../SKILL.md` et ses références
traduites. Cette archive sert à revenir au texte d'origine quand une règle traduite paraît floue.

## Ce que font le moteur et les scripts (lus, non exécutés)

| Fichier | Rôle | Réutilisable chez Paper34 ? |
|---|---|---|
| `engine/scrollcraft.js` (~1 300 lignes, vanilla, zéro dépendance) | Lit des attributs `data-sc-*` sur du HTML écrit à la main et les pilote depuis une seule valeur de scroll dans une boucle rAF : actes `scrub` (vidéo scrubbée chargée en Blob, tête de lecture lissée, amorçage iOS), `pin`, `pan`, `flow` ; fondus `cue`, titres `kinetic`, `reveal` en clip-path, `parallax`, compteurs, `drift` de couleur de fond, effets pointeur (tilt, magnet, spotlight) ; mode `worldflight` (une scène fixe, fondus enchaînés sans couture). Publie `--sc-p` (0→1) par acte. | **Non comme moteur** : il ferait doublon avec GSAP + ScrollTrigger + Lenis (règle studio « un seul moteur par élément »). **Oui comme lecture** : les correctifs iOS des vidéos scrubbées (amorçage `play()/pause()` à `loadedmetadata`, relance au `touchend`, seek bloqué relancé après 700 ms, poster gardé jusqu'à la première image peinte) et la cartographie « temps vidéo ≠ temps de l'acte » sont à transposer si on fait un jour une vidéo scrubbée. |
| `engine/scrollcraft.css` | Tokens (6 rôles de couleur, rampe typo fluide avec interlettrage qui se resserre, échelle 4 px, 3 élévations, easing), styles des dispositifs, voiles (coin / bande / colonne), grain, repli `prefers-reduced-motion` (rail devenu zone de défilement native). | Idées reprises dans `references/plancher.md` sous forme de tokens Tailwind ; pas de copie. Le gabarit HTML d'origine ne charge pas de polices tierces, mais nos polices restent auto-hébergées (CNIL). |
| `scripts/doctor.mjs` | Pré-vol : Node, ffmpeg complet, playwright-core, Chrome, clé API, espace de travail. | Inutile tel quel (notre outillage est différent). |
| `scripts/workspace.mjs` | Résout le dossier des builds et du registre d'empreintes. | Non : chez nous le registre est `registre-sites.md`. |
| `scripts/kie.mjs` | Génération d'images (seedream) et de mouvements caméra (kling) via l'API kie.ai. | Non : Paper34 génère via Higgsfield. Leçon reprise : un préambule de style unique, recopié mot pour mot. |
| `scripts/encode.sh` | Encodage ffmpeg pour le scrub : GOP dense (8 bureau / 4 mobile), audio supprimé, faststart. | **Oui, le principe** (une vidéo scrubbée doit avoir des images clés serrées). Recette ffmpeg à réécrire, ou à reprendre avec la mention de copyright. |
| `scripts/serve.mjs` | Petit serveur statique local (127.0.0.1, option `--lan`). | Non : `next dev` / Vercel preview. |
| `scripts/shoot.mjs` (~650 lignes) | Banc de vérification Playwright : parcourt la page à plusieurs positions **par section**, attend que la vidéo soit posée, capture, assemble une planche contact, signale scroll mort, textes qui n'atteignent jamais l'opacité pleine, contraste mesuré sur la page composée (direction choisie ligne par ligne), vidéos figées. | **La méthode est la meilleure trouvaille technique** (voir `references/verification-mobile.md`). Le script est couplé à son moteur (`data-sc-*`, `ScrollCraft.instances`) : il faudrait l'adapter à ScrollTrigger. À proposer comme chantier séparé, pas dans cette v1. |
| `scripts/worldflight-assert.mjs` | Assertions mécaniques du mode monde continu. | Non (grammaire hors périmètre par défaut). |

## Si on reprend du code un jour

La licence MIT autorise copie, modification et usage client. **Obligation unique** : garder la mention
« Copyright (c) 2026 Nate Herk » et le texte de la licence dans toute copie substantielle (en tête du
fichier repris, ou dans un fichier `LICENSES/` du repo client). Aucune obligation pour les idées
reformulées dans nos propres mots, ce que fait ce skill.
