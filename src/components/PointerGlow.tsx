import React, { useEffect, useRef } from 'react';
import { reducedMotion } from '../lib/motion';

/** A soft coral/teal light that trails the pointer across the page. */
export const PointerGlow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const target = { x: window.innerWidth * 0.7, y: window.innerHeight * 0.2 };
    const pos = { ...target };
    let frame = 0;
    const move = (e: PointerEvent) => { target.x = e.clientX; target.y = e.clientY; };
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      if (ref.current) ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move, { passive: true });
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
    };
  }, []);

  return <div ref={ref} className="pointer-glow" aria-hidden="true" style={{ transform: 'translate3d(70vw, 20vh, 0)' }} />;
};
