# Pages des apps sur paper34.fr : la méthode

Chaque app conçue par Paper34 a sa page sur le site. Elle sert à deux choses : montrer le savoir-faire en
développement, et héberger les deux pages exigées par l'App Store (assistance et confidentialité).

## Qui fait quoi

- **La conversation de l'app** (celle qui développe l'app) prépare le contenu et ouvre une PR vers `main`.
  Elle ne fusionne jamais : la production du site se décide dans la conversation « Site web ».
- **La conversation « Site web »** relit la PR (charte, ton, SEO), corrige si besoin, et fusionne avec
  l'accord de Benjamin.
- **La conversation de l'app** saisit ensuite les URL dans App Store Connect.

## Ce qu'une app ajoute au site

Tout part du registre `src/lib/apps.ts`. Une entrée génère, sans autre code :

| Page                            | Rôle                                                   |
| ------------------------------- | ------------------------------------------------------ |
| `/apps/<slug>`                  | Présentation (URL marketing dans App Store Connect)     |
| `/apps/<slug>/assistance`       | Questions fréquentes et contact (URL de l'assistance)   |
| `/apps/<slug>/confidentialite`  | Politique de confidentialité (URL demandée par Apple)   |

L'app apparaît aussi seule dans la page `/apps`, dans le menu (rubrique « Apps ») et dans le sitemap.

## Une app qui a déjà son propre site

Si l'app a son site avec ses pages d'aide et de confidentialité (déjà déclarées chez Apple ou chez le
vendeur), on ne les recopie pas : l'entrée porte `external` (site, assistance, confidentialité) et la page
paper34.fr renvoie vers elles. Seule `/apps/<slug>` est alors générée. Exemple : JaugeAI.
Autres champs utiles dans ce cas : `macDownloadUrl` (app Mac hors Mac App Store, second bouton),
`screenshotsLayout: "devices"` pour des visuels déjà encadrés de formats différents (Mac, iPhone,
montre), exportés en 880 px de haut.

## Étapes pour une nouvelle app

1. Partir de `main` : `git fetch origin main` puis une branche `feat/app-<slug>`. Ne pas travailler dans un
   clone Labo ni sur une branche `proto/*`.
2. Images dans `public/apps/<slug>/` :
   - `icone.webp` : l'icône de l'app en 512 px (`cwebp -q 90`).
   - 3 ou 4 captures `capture-N-<sujet>.webp`, 598 px de large pour un iPhone (`sips -Z 1300` puis
     `cwebp -q 80`), prises sur la version réellement publiée.
3. Une entrée dans `APPS` (`src/lib/apps.ts`), en copiant celle de Puppy Drop :
   - `tagline` : la promesse en une phrase (elle sert de titre et de meta description).
   - `features` : 4 à 6 points, faits réels uniquement.
   - `commitments` : ce qui rassure (données, publicité, achats).
   - `privacy` : doit dire exactement ce que fait l'app. La reprendre du fichier de confidentialité tenu
     dans le dépôt de l'app, et la garder identique à l'étiquette de confidentialité de l'App Store.
   - `support` : comment jouer ou utiliser, achats et restauration, remboursement (Apple), progression.
   - `devices` : les appareils affichés avec leur pictogramme sous le bouton App Store (`mac`, `iphone`, `ipad`, `watch`).
   - `preview` (facultatif) : la vidéo d'aperçu de l'App Store, placée avant les captures. Version web en
     600 x 1300 sans son (`ffmpeg -an -vf scale=600:1300 -crf 25 -movflags +faststart`), déposée sur R2 sous
     `apps/<slug>/apercu.mp4`, et une affiche `public/apps/<slug>/apercu-affiche.webp`.
   - `offerPrice` (app payante, prix pour les données structurées, ex. `"2.99"`) et `screenshotShape: "watch"`
     pour des captures d'Apple Watch sans cadre. Préférer les captures dans l'appareil : cadres officiels d'Apple
     dans `APP/JaugeAI Créations/02 Identité et icônes/bezels/` (Watch Ultra 600 x 960, capture 422 x 514
     collée en (89, 223)), puis `screenshotsLayout: "devices"`. Exemple : WatchRoad.
   - `showcase` et `cover` : la phrase et le visuel de la carte « Références » de `/apps`.
   - `ogImage` : **image de partage 1200 x 630 obligatoire** (`public/apps/<slug>/partage.png`). La générer avec
     `python3 scripts/og-apps.py` après y avoir ajouté l'app (icône, nom, promesse, appareils, visuel dans son
     appareil), ou fournir une image dessinée par la conversation de l'app.
   - `storeUrl` : vide tant que l'app n'est pas publiée (la page affiche « Bientôt sur l'App Store »).
4. Vérifier : `npm run build`, `npx eslint src/lib/apps.ts`, puis le rendu en mobile et en bureau
   (`npx next start`), menu mobile ouvert.
5. Ouvrir la PR vers `main` avec la fiche de passage ci-dessous. Ne pas fusionner.
6. Après la mise en ligne : saisir les trois URL dans App Store Connect (version : URL de l'assistance et URL
   marketing ; Confidentialité de l'app : URL de la politique).
7. À la sortie de l'app : renseigner `storeUrl` par une petite PR. La page affiche alors le badge officiel
   d'Apple « Télécharger dans l'App Store » (`public/apps/badge-app-store-fr.svg`, tiré de
   toolbox.marketingtools.apple.com), à utiliser tel quel.

## Fiche de passage (à coller dans la PR)

```
App : <nom> (<plateformes>)
Dépôt de l'app : <chemin ou dépôt>
Demande de Benjamin (ses mots) : « … »
Ajouté : entrée `<slug>` dans src/lib/apps.ts, images public/apps/<slug>/
URL attendues par App Store Connect : /apps/<slug>/assistance, /apps/<slug>/confidentialite
Vérifié : build, lint, rendu mobile et bureau
Non vérifié / à décider : …
```

## Règles à tenir

- **Les URL d'une app publiée ne changent plus** : Apple les affiche sur la fiche et les relit à chaque revue.
- Adresse de contact : `CONTACT_INFO.email` (jamais une adresse en dur).
- Charte du site inchangée (DESIGN.md) : pas de nouvelle couleur ni de nouvelle police pour une app.
- La page de confidentialité d'une app pour enfants ne doit rien promettre de plus que l'app : la relire à
  chaque version qui touche aux données, aux achats ou à un service tiers.

## État

| App        | Pages en ligne | URL dans App Store Connect | Lien App Store |
| ---------- | -------------- | -------------------------- | -------------- |
| Puppy Drop | 2026-11-16     | 2026-11-16                 | à la sortie    |
| WatchRoad  | 2026-11-17     | 2026-11-17                 | à la sortie    |
| JaugeAI    | (site propre)  | jaugeai.com                | 2026-11-17     |
