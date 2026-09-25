import React from 'react';
import { motion, type Variants } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Words rise out of a mask one after another when scrolled into view. */
export const RevealWords: React.FC<{
  text: string;
  className?: string;
  wordClassName?: (word: string, i: number) => string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  animateNow?: boolean;
}> = ({ text, className, wordClassName, delay = 0, as = 'span', animateNow }) => {
  const Tag = motion[as];
  const words = text.split(' ');
  const trigger = animateNow === undefined
    ? { initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-10% 0px' } }
    : { initial: 'hidden', animate: animateNow ? 'visible' : 'hidden' };

  return (
    <Tag
      className={className}
      aria-label={text}
      {...trigger}
      variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-top pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`inline-block ${wordClassName?.(word, i) ?? ''}`}
            variants={{
              hidden: { y: '110%', rotate: 4 },
              visible: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Numbered section header: "(02) — Experience" + large title. */
export const SectionHead: React.FC<{
  index: string;
  label: string;
  title: string;
  accent?: string;
  aside?: React.ReactNode;
}> = ({ index, label, title, accent, aside }) => (
  <div className="grid gap-6 md:grid-cols-12 items-end mb-12 md:mb-16">
    <div className="md:col-span-8">
      <motion.div
        className="kicker flex items-center gap-3 mb-5"
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span className="mono !text-[0.7rem] text-muted">{index}</span>
        <motion.span
          className="h-[2px] w-8 rounded-full bg-[var(--color-accent)] origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        />
        {label}
      </motion.div>
      <h2 className="h-section">
        <RevealWords text={title} />
        {accent && (
          <>
            {' '}
            <RevealWords text={accent} className="serif-i text-[var(--color-navy)] font-normal tracking-[-0.02em]" delay={0.15} />
          </>
        )}
      </h2>
    </div>
    {aside && (
      <motion.div
        className="md:col-span-4 text-muted text-[1.05rem] leading-relaxed md:pb-2"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {aside}
      </motion.div>
    )}
  </div>
);
