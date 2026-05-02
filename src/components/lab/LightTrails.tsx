"use client";

import { useEffect, useRef } from "react";

/**
 * Light trails — pose longue.
 *
 * Au lieu d'effacer le canvas à chaque frame, on dépose un voile noir
 * semi-transparent (fade), puis on dessine en additif (`lighter`) une
 * fine ligne lumineuse entre la position précédente et la position
 * courante du curseur. Résultat : la traînée persiste plusieurs secondes
 * comme sur une photo en pose longue.
 *
 * Bonus : particules bokeh qui se détachent et flottent doucement.
 */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  maxLife: number;
  color: { r: number; g: number; b: number };
};

const PALETTE = [
  { r: 255, g: 245, b: 220 }, // blanc chaud
  { r: 255, g: 200, b: 100 }, // doré
  { r: 255, g: 130, b: 50 },  // orange flamme
  { r: 255, g: 220, b: 160 }, // ambre
];

export default function LightTrails() {
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
      // Reset noir au resize
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let mouseX = -1,
      mouseY = -1;
    let prevX = -1,
      prevY = -1;
    let active = false;

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      if (!active) {
        prevX = mouseX;
        prevY = mouseY;
        active = true;
      }
    }
    function onLeave() {
      active = false;
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    const particles: Particle[] = [];
    let frameCount = 0;

    function spawnBokeh(x: number, y: number, vel: number) {
      // Plus la vélocité est haute, plus on émet
      const n = Math.min(3, Math.floor(vel / 8));
      for (let i = 0; i < n; i++) {
        const ang = Math.random() * Math.PI * 2;
        const speed = 0.2 + Math.random() * 0.8;
        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed - 0.3, // léger upward drift
          r: 4 + Math.random() * 18,
          life: 1,
          maxLife: 1.5 + Math.random() * 2,
          color: PALETTE[(Math.random() * PALETTE.length) | 0],
        });
      }
      // cap
      if (particles.length > 250) {
        particles.splice(0, particles.length - 250);
      }
    }

    let lastFrame = performance.now();
    function frame(now: number) {
      if (!ctx) return;
      const dt = (now - lastFrame) / 1000;
      lastFrame = now;
      frameCount++;

      // 1. Voile noir semi-transparent → fade des pixels existants (= pose longue)
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(5, 4, 8, 0.045)";
      ctx.fillRect(0, 0, w, h);

      if (active && mouseX >= 0) {
        const vel = Math.hypot(mouseX - prevX, mouseY - prevY);

        // 2. Trait lumineux additif entre prev et current
        ctx.globalCompositeOperation = "lighter";
        const grad = ctx.createLinearGradient(prevX, prevY, mouseX, mouseY);
        grad.addColorStop(0, "rgba(255, 240, 200, 0.0)");
        grad.addColorStop(0.5, "rgba(255, 230, 180, 0.95)");
        grad.addColorStop(1, "rgba(255, 240, 210, 0.7)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(1.2, 4 - vel * 0.04);
        ctx.lineCap = "round";
        ctx.shadowBlur = 18;
        ctx.shadowColor = "rgba(255, 200, 120, 0.9)";
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 3. Petit halo plus large à la pointe
        const haloR = 14 + vel * 0.15;
        const halo = ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          haloR
        );
        halo.addColorStop(0, "rgba(255, 230, 180, 0.6)");
        halo.addColorStop(1, "rgba(255, 200, 120, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, haloR, 0, Math.PI * 2);
        ctx.fill();

        spawnBokeh(mouseX, mouseY, vel);

        prevX = mouseX;
        prevY = mouseY;
      }

      // 4. Particules bokeh (additif)
      ctx.globalCompositeOperation = "lighter";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt / p.maxLife;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vy *= 0.995;
        const a = p.life * 0.35;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(
          0,
          `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${a.toFixed(3)})`
        );
        grad.addColorStop(
          0.5,
          `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${(a * 0.4).toFixed(3)})`
        );
        grad.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
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
