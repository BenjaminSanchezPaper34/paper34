# Proposition — chapitre « Récit de données » (à tester, pas encore dans SKILL.md)

Source : intro Finary (YouTube mQDSMWurSCU, 0:00–0:26), référence motion préférée de Benjamin.

## Quand l'appliquer
Dès que la pièce raconte des chiffres (bilan, avis, fréquentation, rapport mensuel, offre chiffrée).

## Règles
1. **Un chiffre = un moment.** Chaque chiffre a sa scène ou son temps fort, jamais trois chiffres en même temps à l'écran.
2. **Chiffres héros** : énormes, centrés, dans la police display ; ils défilent (compteur ~1 s, `power3.out`) puis tiennent ≥ 1,5 s avec une dérive lente.
3. **Espace en profondeur** : les éléments vivent dans un espace 3D (`perspective` sur le conteneur, `translateZ` sur les panneaux) ; la caméra avance ou glisse entre eux ; ce qui est loin est flou (`filter: blur()` proportionnel à la distance) et plus sombre. Profondeur de champ = premium.
4. **Jauge signature** : une jauge faite de traits verticaux fins et serrés (40 à 80 traits générés en code), remplie de gauche à droite par une **tête lumineuse** (petit halo flou de la couleur d'accent qui suit le front, légère traînée) ; le compteur au-dessus est piloté par la même valeur GSAP que la jauge ; un segment peut être annoté sous la jauge.
5. **Révélation par recul** : quand une jauge ou un chiffre est posé, la caméra recule pour révéler le contexte (l'objectif, l'année précédente, la comparaison).
6. **Lumière plutôt que couleurs** : fond profond ou très clair, une seule couleur d'accent, des lueurs (`box-shadow`/`text-shadow` flous de l'accent) sur la tête de jauge et les chiffres clés ; le négatif en accent, le positif en blanc chaud (ou l'inverse selon la marque, mais toujours un code constant).
7. **Rythme de narration** : même muet, le texte arrive comme s'il était dit — mot par mot ou groupe de mots, 3 à 5 images d'écart, au tempo d'une phrase parlée.
