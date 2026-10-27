# Porte d'empreinte — ne jamais refaire le même site

Source : ScrollCraft `uniqueness.md` §3-4 et `templates/FINGERPRINTS.md` (reformulé, adapté au
portefeuille Paper34). Registre : `../registre-sites.md`.

## Pourquoi

« Tous les sites qui se ressemblent » est le premier défaut que le CLAUDE.md demande d'éviter. Une
palette différente ne suffit pas : deux sites au même squelette se reconnaissent même en noir et blanc.
La porte transforme ce souhait en contrôle : un plan est comparé, dimension par dimension, à chaque site
déjà livré, avant la première ligne de code.

## Les six dimensions

| # | Dimension | Ce qu'on relève (en une expression) |
|---|---|---|
| 1 | **Grammaire** | Laquelle des 8 (`grammaires.md`), ou « squelette Paper34 », ou une nouvelle nommée avec ses interdits |
| 2 | **Navigation** | Ce qu'est la nav et à quoi elle sert : barre fixe transparente logo + CTA, folio en marge, index d'objets, séparation de scène, bouton d'appel fixe mobile… |
| 3 | **Hero** | Ce que fait le premier écran : photo plein cadre + titre centré, vidéo muette en boucle, page de titre typo, outil en état, scène 50/50… |
| 4 | **Forme des sections** | L'ordre des types de section, leur nombre, la présence et la place du scroll lock (ex. « 7 sections : hero / offre / pin galerie / avis / carte / CTA ») |
| 5 | **Fin** | Comment se comporte le dernier écran avant le footer et où vit l'action (section CTA plein écran, phrase-lien, champ réel, effondrement de scène…) |
| 6 | **Geste signature** | L'effet signature du DESIGN.md §4, en une expression |

Colonnes de contexte (non comptées dans la porte, mais utiles pour voir les collisions) : secteur,
zone, direction photo (« monde »), palette + typo, date de livraison.

## La règle

- Le plan doit différer de **chaque** ligne du registre sur **au moins 4 dimensions sur 6**. Quatre
  contre chaque ligne prise seule, pas en moyenne sur le tableau.
- La dimension 6 compte d'office (un geste signature est unique par définition) : il faut donc
  **3 différences sur les 5 autres**. Un site qui ne change que de grammaire et de couleurs échoue.
- **Échec → on change le plan, jamais le registre.** Le registre décrit ce qui existe, pas ce qu'on
  aimerait qu'il existe.
- « Différent » se juge comme un visiteur le verrait : renommer un hero ou changer un réglage ne compte
  pas. En cas de doute sur une dimension, la compter comme identique.
- Hors comparaison : la signature Paper34 du footer, les pages légales, le panneau de préférences de
  confidentialité, les éléments imposés par les règles studio (ils sont communs à tous par décision).
- Le seuil (4/6 partout, ou 4/6 dans le même secteur et la même zone et 3/6 ailleurs) est **à arbitrer
  par Benjamin** (SKILL.md §12). Tant que ce n'est pas tranché : 4/6 partout.

## Quand l'appliquer

- **Nouveau site, refonte, nouvelle landing** : oui, au moment où grammaire, courbe et geste sont
  posés, avant la validation du DESIGN.md.
- **Nouvelle section sur un site existant** : non pour la porte ; mais vérifier que la section ne copie
  pas le geste signature d'un autre site.
- **« Passe le site aux standards studio »** : non (aucune refonte visuelle sans demande). En revanche,
  c'est le bon moment pour **relever** la ligne du site dans le registre.

## Relever un site déjà livré

Une ligne « à relever » ne peut pas servir de comparaison. Pour la remplir :
1. Ouvrir le site déployé (bureau puis 390 px de large) et le faire défiler en entier.
2. Lire son `DESIGN.md` s'il existe (le §4 donne souvent le geste signature) et la structure de la page
   d'accueil dans le code (ordre des composants de section).
3. Écrire chaque dimension en une expression factuelle, sans jugement (« photo plein cadre + titre
   centré + bouton », pas « hero réussi »).
4. Noter dans « Ce qui est pris » ce que ce site occupe désormais.
Priorité : les sites du même secteur et de la même zone que le prochain projet.

## Modèle de ligne

```
| Site | Secteur · zone | Grammaire | Navigation | Hero | Forme des sections | Fin | Geste signature | Direction photo | Palette · typo | Livré |
| O Soleil | Restaurant · Marseillan | galerie/carte | index des plats | plat n°1 légendé | 6 sections, rail carte = scroll lock | demande de table en légende | ardoise qui se réécrit au scroll | photos client, lumière de fin de journée | sable + bleu étang · serif display | 2026-xx |
```
(exemple fictif de format, ne pas recopier dans le registre)

Après livraison : ajouter la ligne (append-only : un site remplacé reste, l'espace qu'il occupe reste
occupé) et compléter « Ce qui est pris ». Dire franchement ce que le site partage avec les lignes
existantes : c'est la contrainte du suivant.

## Ce qui ne compte pas comme différence

- Une autre couleur, une autre police, un autre secteur.
- Le même effet avec un autre réglage (inclinaison, durée, rayon, nombre de cartes).
- Un preset ReactBits différent mais de même nature (deux fonds animés WebGL interchangeables).
- Inverser l'ordre de deux sections du milieu.
- Une section de plus du même type.
