import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { reducedMotion } from '../lib/motion';

const steps = ['loading dataset', 'cleaning rows', 'dropping nulls', 'fitting model', 'rendering insight'];

/** Intro counter: 0 → 100 with pipeline "log" lines, then a curtain lift. */
export const Loader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      onDone();
      return;
    }
    const duration = 1700;
    const t0 = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else window.setTimeout(onDone, 250);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  const step = Math.min(steps.length - 1, Math.floor((count / 101) * steps.length));

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[var(--color-bg-soft)] flex flex-col justify-between p-[var(--gutter)]"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex justify-between mono text-muted">
        <span>Shashank Desai</span>
        <span>Portfolio / {new Date().getFullYear()}</span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="mono text-dim space-y-1 hidden sm:block">
          {steps.slice(0, step + 1).map((s, i) => (
            <div key={s} className={i === step ? 'text-[var(--color-accent)]' : ''}>
              {i === step ? '›' : '✓'} {s}{i === step ? '…' : ''}
            </div>
          ))}
        </div>
        <div className="display text-[clamp(6rem,22vw,18rem)] tabular-nums leading-[0.8]">
          {count}
          <span className="serif-i text-[var(--color-accent)] text-[0.4em] align-top ml-1 font-normal">%</span>
        </div>
      </div>

      <div className="absolute left-0 bottom-0 h-[3px] bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-teal)]" style={{ width: `${count}%` }} />
    </motion.div>
  );
};
