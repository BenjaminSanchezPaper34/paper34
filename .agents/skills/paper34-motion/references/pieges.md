# Pièges rencontrés — avec origine

| Date | Piège | Correctif | Source |
|---|---|---|---|
| 15/10/2026 | Maquettes Figma 1440 px qui débordent du canevas 1920 | un seul facteur d'échelle, positionnement depuis le centre | skill launch-motion (Sanji Chien) |
| 15/10/2026 | Police de secours sur les premières images | charger les polices avant l'image 0 | idem |
| 15/10/2026 | Compteur qui saute à la valeur finale en une image | compteur sur ~1 s, `power3.out` | idem |
| 15/10/2026 | Cartes qui arrivent toutes sur la même image | décalage 2–4 images, chaque carte posée avant sa coche | idem |
| 15/10/2026 | Panoramique trop rapide, départ/arrêt secs | `power2.inOut`, ≥ 0,8 s pleine largeur | idem |
| 21/10/2026 | Ornement (vapeur SVG) rogné par le masque de révélation des lignes | masque qui ne coupe qu'en bas : `clip-path: inset(-120% -20% 0 -20%)` | essai VEILLE index gradué |
| 21/10/2026 | Ornement collé à la ligne du dessus (interlignage serré) | le placer là où la ligne du dessus est plus courte, ou augmenter l'interligne | idem |
| 21/10/2026 | `check` signale des débordements pendant une révélation par masque | marquer `data-layout-allow-overflow` sur les lignes masquées (débordement voulu) | essai VEILLE jitter-vs-hyperframes |
| 21/10/2026 | Rendus perçus « pas assez fluides » | master en 60 i/s (nos premiers essais étaient en 30) | comparaison avec la vidéo de Sanji Chien |
