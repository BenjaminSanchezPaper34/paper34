"use client";

import { useEffect, useRef } from "react";

/**
 * Halftone CMJN dynamique.
 *
 * Le curseur dépose des "gouttes d'encre" qui se diffusent puis s'estompent.
 * Le rendu reproduit une trame d'impression offset 4 couleurs : chaque
 * canal (Cyan, Magenta, Jaune, Noir) a sa propre orientation de trame
 * (15°, 75°, 0°, 45°) — comme dans la vraie sépration print.
 *
 * Les points de chaque canal grandissent là où la densité d'encre est forte
 * (proche d'une goutte) et s'effacent ailleurs.
 */

type Drop = {
  x: number;
  y: number;
  /** Rayon de la zone d'influence en pixels */
  radius: number;
  /** Vie restante (0..1) */
  life: number;
};

const CHANNELS = [
  { name: "C", color: "rgba(0, 175, 230, ALPHA)", angle: (15 * Math.PI) / 180 },
  { name: "M", color: "rgba(225, 0, 130, ALPHA)", angle: (75 * Math.PI) / 180 },
  { name: "Y", color: "rgba(255, 215, 0, ALPHA)", angle: (0 * Math.PI) / 180 },
  { name: "K", color: "rgba(15, 15, 25, ALPHA)", angle: (45 * Math.PI) / 180 },
];

const SPACING = 9; // distance entre points en px
const MAX_DOT_R = SPACING / 2; // rayon max d'un point
const DROP_LIFETIME = 1.4; // secondes
const MAX_DROPS = 80;

export default function HalftoneCmyk() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas || !ctx) return;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const drops: Drop[] = [];
    let lastDropX = -9999;
    let lastDropY = -9999;

    function addDrop(x: number, y: number, vel: number) {
      // Ne pas spammer : un drop tous les 8px de mouvement minimum
      const dx = x - lastDropX;
      const dy = y - lastDropY;
      if (dx * dx + dy * dy < 64) return;
      lastDropX = x;
      lastDropY = y;
      drops.push({
        x,
        y,
        radius: 60 + vel * 1.5, // rayon influencé par la vélocité
        life: 1,
      });
      if (drops.length > MAX_DROPS) drops.splice(0, drops.length - MAX_DROPS);
    }

    let prevMouseX = 0,
      prevMouseY = 0,
      prevTime = performance.now();

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();
      const dt = Math.max(1, now - prevTime);
      const vel = Math.hypot(x - prevMouseX, y - prevMouseY) / dt * 16;
      prevMouseX = x;
      prevMouseY = y;
      prevTime = now;
      addDrop(x, y, Math.min(vel, 60));
    }

    window.addEventListener("pointermove", onMove);

    /**
     * Dessine la trame d'un canal dans un bbox autour d'une goutte.
     * On itère un grid en coords TOURNÉES de l'angle du canal,
     * puis on déprojette pour avoir les coords écran.
     */
    function drawChannelDots(
      drop: Drop,
      angle: number,
      colorTpl: string
    ) {
      if (!ctx) return;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const r = drop.radius;
      // bbox carré rotated qui couvre le cercle d'influence
      const span = r * 1.2;
      // origine grid alignée pour stabilité (sinon les points "marchent")
      // on tourne l'origine du monde, pas la goutte
      // u, v = coords dans le repère tourné
      // px = drop.x + (u*cos - v*sin), py = drop.y + (u*sin + v*cos)

      const minU = Math.floor(-span / SPACING) * SPACING;
      const maxU = Math.ceil(span / SPACING) * SPACING;
      const minV = minU;
      const maxV = maxU;

      ctx.beginPath();
      for (let u = minU; u <= maxU; u += SPACING) {
        for (let v = minV; v <= maxV; v += SPACING) {
          const px = drop.x + (u * cos - v * sin);
          const py = drop.y + (u * sin + v * cos);
          if (px < -MAX_DOT_R || px > w + MAX_DOT_R) continue;
          if (py < -MAX_DOT_R || py > h + MAX_DOT_R) continue;
          // Densité = falloff radial gaussien × vie de la goutte
          const dist = Math.hypot(u, v);
          const falloff = Math.max(0, 1 - dist / r);
          const density = falloff * falloff * drop.life;
          const dotR = density * MAX_DOT_R;
          if (dotR < 0.4) continue;
          ctx.moveTo(px + dotR, py);
          ctx.arc(px, py, dotR, 0, Math.PI * 2);
        }
      }
      // Couleur : alpha modulée par la vie, on la met dans le template
      const alpha = 0.8 * drop.life;
      ctx.fillStyle = colorTpl.replace("ALPHA", alpha.toFixed(3));
      ctx.fill();
    }

    let lastFrame = performance.now();
    function frame(now: number) {
      if (!ctx) return;
      const dt = (now - lastFrame) / 1000;
      lastFrame = now;

      // Décrément vie + nettoyage
      for (let i = drops.length - 1; i >= 0; i--) {
        drops[i].life -= dt / DROP_LIFETIME;
        if (drops[i].life <= 0) drops.splice(i, 1);
      }

      // Fond papier crème
      ctx.fillStyle = "#f3ede1";
      ctx.fillRect(0, 0, w, h);

      // Multiply pour superposition d'encres réaliste
      ctx.globalCompositeOperation = "multiply";
      for (const ch of CHANNELS) {
        for (const drop of drops) {
          drawChannelDots(drop, ch.angle, ch.color);
        }
      }
      ctx.globalCompositeOperation = "source-over";

      // Léger grain papier
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
