import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { reducedMotion } from '../lib/motion';

/** Counts up to `value` once visible, keeping the decimals of the target. */
export const Counter: React.FC<{ value: number; suffix?: string; start?: boolean }> = ({ value, suffix = '', start = true }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const decimals = (value.toString().split('.')[1] ?? '').length;
  const [n, setN] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (!inView || !start || reducedMotion) return;
    const t0 = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / 1600);
      setN(value * (1 - Math.pow(1 - t, 4)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, start, value]);

  return <span ref={ref} className="tabular-nums">{n.toFixed(decimals)}{suffix}</span>;
};
