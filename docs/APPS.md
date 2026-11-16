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

L'app apparaît aussi seule dans la page `/apps`, dans le menu (icône) et dans le sitemap.

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
   - `storeUrl` : vide tant que l'app n'est pas publiée (la page affiche « Bientôt sur l'App Store »).
4. Vérifier : `npm run build`, `npx eslint src/lib/apps.ts`, puis le rendu en mobile et en bureau
   (`npx next start`), menu mobile ouvert.
5. Ouvrir la PR vers `main` avec la fiche de passage ci-dessous. Ne pas fusionner.
6. Après la mise en ligne : saisir les trois URL dans App Store Connect (version : URL de l'assistance et URL
   marketing ; Confidentialité de l'app : URL de la politique).
7. À la sortie de l'app : renseigner `storeUrl` par une petite PR.

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
- Au-delà de trois ou quatre apps, remplacer les icônes en ligne du menu par un sous-menu.

## État

| App        | Pages en ligne | URL dans App Store Connect | Lien App Store |
| ---------- | -------------- | -------------------------- | -------------- |
| Puppy Drop | 2026-11-16     | 2026-11-16                 | à la sortie    |
