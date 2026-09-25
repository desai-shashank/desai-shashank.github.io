import React, { useEffect, useRef, useState } from 'react';
import { reducedMotion } from '../lib/motion';

/**
 * A dot that tracks the pointer exactly and a ring that trails it.
 * The ring grows over anything interactive and shows a label for
 * elements with data-cursor="…". Desktop / fine pointers only.
 */
export const Cursor: React.FC = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('');
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = reducedMotion;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const trail = { ...pos };
    let frame = 0;

    const move = (e: PointerEvent) => {
      pos.x = e.clientX; pos.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      const target = (e.target as HTMLElement).closest<HTMLElement>('a, button, [data-cursor], input, textarea, label');
      setHovering(!!target);
      setLabel(target?.dataset.cursor ?? '');
    };
    const loop = () => {
      trail.x += (pos.x - trail.x) * 0.18;
      trail.y += (pos.y - trail.y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0)`;
      frame = requestAnimationFrame(loop);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  if (!enabled) return null;

  const size = label ? 88 : hovering ? 54 : 30;

  return (
    <>
      <div ref={ring} className="fixed top-0 left-0 z-[110] pointer-events-none" aria-hidden="true">
        <div
          className="flex items-center justify-center rounded-full mono text-[0.6rem] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            width: size, height: size,
            marginLeft: -size / 2, marginTop: -size / 2,
            border: label ? 'none' : '1.5px solid rgba(19,34,56,0.35)',
            background: label ? 'var(--color-accent)' : hovering ? 'rgba(255,107,61,0.08)' : 'transparent',
            color: '#fff',
            transform: `scale(${pressed ? 0.85 : 1})`,
          }}
        >
          {label}
        </div>
      </div>
      <div ref={dot} className="fixed top-0 left-0 z-[111] pointer-events-none" aria-hidden="true">
        <div
          className="w-[6px] h-[6px] -ml-[3px] -mt-[3px] rounded-full bg-[var(--color-accent)] transition-opacity duration-200"
          style={{ opacity: label ? 0 : 1 }}
        />
      </div>
    </>
  );
};
