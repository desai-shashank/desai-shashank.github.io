import React, { useEffect, useRef } from 'react';
import { reducedMotion } from '../lib/motion';

interface SignalFieldProps {
  /** Lines of text the particles assemble into. */
  lines: string[];
  /** Start assembling once true (e.g. after the loader finishes). */
  start: boolean;
  className?: string;
  /** "r, g, b" of the resting dots and of the accent / displaced dots. */
  baseColor?: string;
  accentColor?: string;
}

interface Particle {
  x: number; y: number;      // current position
  vx: number; vy: number;    // velocity
  tx: number; ty: number;    // target (inside the glyphs)
  sx: number; sy: number;    // scattered start position
  delay: number;             // stagger, 0..1
  size: number;
  signal: boolean;           // accent-coloured particle
}

interface Drifter { x: number; y: number; vx: number; vy: number; a: number }

const ASSEMBLE_MS = 2600;
// Give the loader's curtain time to lift before the dots start moving.
const START_DELAY_MS = 450;

/**
 * "Noise → signal": scattered particles assemble into the name, then
 * behave like a spring field the cursor can push through.
 */
export const SignalField: React.FC<SignalFieldProps> = ({
  lines,
  start,
  className,
  baseColor: PAPER = '248, 242, 235',
  accentColor: SIGNAL = '255, 107, 61',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    if (start && startedAt.current === null) startedAt.current = performance.now() + START_DELAY_MS;
  }, [start]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = reducedMotion;
    let particles: Particle[] = [];
    let drifters: Drifter[] = [];
    let w = 0, h = 0, dpr = 1;
    let frame = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999, active: false };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rasterise the text offscreen and sample its pixels.
      const off = document.createElement('canvas');
      off.width = Math.round(w); off.height = Math.round(h);
      const o = off.getContext('2d', { willReadFrequently: true });
      if (!o) return;

      const gap = w < 640 ? 4 : w < 1100 ? 5 : 6;
      const lineCount = lines.length;
      let fontSize = h / (lineCount * 1.02);
      o.font = `700 ${fontSize}px 'Space Grotesk', sans-serif`;
      const widest = Math.max(...lines.map((l) => o.measureText(l).width));
      fontSize = Math.min(fontSize, (fontSize * w * 0.98) / widest);
      o.font = `700 ${fontSize}px 'Space Grotesk', sans-serif`;
      o.textAlign = 'center';
      o.textBaseline = 'middle';
      o.fillStyle = '#fff';
      const lineH = fontSize * 0.98;
      const top = h / 2 - (lineH * (lineCount - 1)) / 2;
      lines.forEach((line, i) => {
        // Tight tracking to match the display type.
        (o as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${-fontSize * 0.04}px`;
        o.fillText(line, w / 2, top + i * lineH);
      });

      const data = o.getImageData(0, 0, off.width, off.height).data;
      const next: Particle[] = [];
      for (let y = 0; y < off.height; y += gap) {
        for (let x = 0; x < off.width; x += gap) {
          if (data[(y * off.width + x) * 4 + 3] > 140) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.max(w, h) * (0.35 + Math.random() * 0.6);
            const sx = w / 2 + Math.cos(angle) * radius;
            const sy = h / 2 + Math.sin(angle) * radius * 0.6;
            next.push({
              x: sx, y: sy, vx: 0, vy: 0, tx: x, ty: y, sx, sy,
              delay: (x / off.width) * 0.45 + Math.random() * 0.35,
              size: gap * (0.28 + Math.random() * 0.2),
              signal: Math.random() < 0.06,
            });
          }
        }
      }
      particles = next;

      const drifterCount = Math.round((w * h) / 9000);
      drifters = Array.from({ length: drifterCount }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        a: 0.08 + Math.random() * 0.18,
      }));
    };

    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);

      // Background noise — the stuff the signal is pulled out of.
      for (const d of drifters) {
        if (!reduced) {
          d.x += d.vx; d.y += d.vy;
          if (d.x < 0) d.x += w; if (d.x > w) d.x -= w;
          if (d.y < 0) d.y += h; if (d.y > h) d.y -= h;
        }
        ctx.fillStyle = `rgba(${PAPER}, ${d.a})`;
        ctx.fillRect(d.x, d.y, 1.2, 1.2);
      }

      const began = startedAt.current;
      const elapsed = began === null ? 0 : Math.max(0, now - began);
      const assembling = !reduced && elapsed < ASSEMBLE_MS + 400;

      for (const p of particles) {
        if (reduced) {
          p.x = p.tx; p.y = p.ty;
        } else if (began === null) {
          // Waiting for the loader: gentle Brownian jitter.
          p.x = p.sx + Math.sin(now / 900 + p.delay * 20) * 6;
          p.y = p.sy + Math.cos(now / 1100 + p.delay * 30) * 6;
        } else if (assembling) {
          const local = Math.min(1, Math.max(0, (elapsed / ASSEMBLE_MS - p.delay * 0.5) / 0.5));
          const k = ease(local);
          const wobble = (1 - k) * 18;
          p.x = p.sx + (p.tx - p.sx) * k + Math.sin(p.delay * 40 + now / 300) * wobble;
          p.y = p.sy + (p.ty - p.sy) * k + Math.cos(p.delay * 50 + now / 340) * wobble;
          p.vx = 0; p.vy = 0;
        } else {
          // Spring back to target, pushed away by the cursor.
          let fx = (p.tx - p.x) * 0.06;
          let fy = (p.ty - p.y) * 0.06;
          if (mouse.active) {
            const dx = p.x - mouse.x, dy = p.y - mouse.y;
            const dist2 = dx * dx + dy * dy;
            const r = 110;
            if (dist2 < r * r) {
              const dist = Math.sqrt(dist2) || 1;
              const force = (1 - dist / r) * 7;
              fx += (dx / dist) * force;
              fy += (dy / dist) * force;
            }
          }
          p.vx = (p.vx + fx) * 0.82;
          p.vy = (p.vy + fy) * 0.82;
          p.x += p.vx; p.y += p.vy;
        }

        const displaced = Math.min(1, Math.hypot(p.x - p.tx, p.y - p.ty) / 60);
        if (p.signal || displaced > 0.25) {
          ctx.fillStyle = `rgba(${SIGNAL}, ${0.55 + displaced * 0.45})`;
        } else {
          ctx.fillStyle = `rgba(${PAPER}, ${0.92 - displaced * 0.4})`;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      if (visible) draw(now);
      frame = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y > -60 && mouse.y < h + 60;
    };
    const onLeave = () => { mouse.active = false; };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        // Skip straight to the assembled state after a resize.
        if (startedAt.current !== null) startedAt.current = performance.now() - ASSEMBLE_MS * 2;
        particles.forEach((p) => { p.x = p.tx; p.y = p.ty; });
        if (reduced) draw(performance.now());
      }, 150);
    };

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(canvas);

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      build();
      if (reduced) draw(performance.now());
      else frame = requestAnimationFrame(loop);
    });

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [lines, PAPER, SIGNAL]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};
