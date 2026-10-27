# Règles de mouvement → GSAP dans HyperFrames

Timeline unique `gsap.timeline({ paused: true })` enregistrée dans `window.__timelines["<id>"]`
(voir `/hyperframes-core`). Les durées GSAP sont en secondes : à 60 i/s, 1 image = 1/60 s.

```js
// Constantes partagées — une seule source pour tout le film
const I = 1 / 60;                          // une image
const ENTREE = 30 * I;                     // 0,5 s
const SORTIE = ENTREE * 0.6;               // sorties plus rapides que les entrées
const DECALAGE = 3 * I;                    // 2 à 4 images entre éléments d'un groupe
const EASE_ENTREE = "back.out(1.4)";       // ≈ cubic-bezier(0.34, 1.56, 0.64, 1)
const EASE_SORTIE = "power2.in";
const EASE_CAMERA = "power2.inOut";

// Entrée d'un groupe (parentage + décalage)
tl.fromTo("#scene1 .carte", { y: 40, opacity: 0 },
  { y: 0, opacity: 1, duration: ENTREE, ease: EASE_ENTREE, stagger: DECALAGE }, 0.2);

// Chevauchement : le suivant part pendant les derniers 20 % du précédent
tl.fromTo("#scene1 .titre", { yPercent: 110 },
  { yPercent: 0, duration: ENTREE, ease: EASE_ENTREE }, `-=${ENTREE * 0.2}`);

// Pression de clic : 1 → 0,96 → 1 sur ~8 images
tl.to("#bouton", { scale: 0.96, duration: 4 * I, ease: "power1.out" })
  .to("#bouton", { scale: 1, duration: 4 * I, ease: "power1.in" });

// Compteur sur ~1 s, ralenti en fin, jamais de saut
const n = { v: 0 };
tl.to(n, { v: 200, duration: 60 * I, ease: "power3.out",
  onUpdate: () => (document.querySelector("#compteur").textContent = Math.round(n.v)) }, 1);

// Règle d'or : dérive pendant le maintien (fini, borné par la durée de la scène — pas de repeat:-1 hors data-duration fini)
tl.to("#scene1 .groupe", { scale: 1.02, duration: 2.5, ease: "sine.inOut" }, "<");

// Caméra : conteneur par scène, push-in lent
tl.fromTo("#scene1 .camera", { scale: 1 }, { scale: 1.06, duration: 4, ease: EASE_CAMERA }, 0);
```

Curseur en arc : animer `x`/`y` le long d'un chemin quadratique (MotionPathPlugin, ou interpolation
maison avec point de contrôle décalé de ~15 % de la distance perpendiculairement), `power2.inOut`,
puis petit dépassement (`back.out(2)` sur 6 images) à l'arrivée.

Rappels HyperFrames : ne jamais animer `visibility`/`autoAlpha` d'un `.clip` ; pas de `transform`
CSS initial sur une propriété que GSAP anime (utiliser `fromTo`) ; `<br>` interdit dans les textes.
