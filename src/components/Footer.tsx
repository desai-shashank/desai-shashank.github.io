import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteConfig } from '../data/portfolioData';
import { useLocalTime } from '../hooks/usePortfolio';
import { scrollToTarget } from '../lib/scroll';
import { Magnetic } from './Magnetic';
import { Icon } from './Icon';

export const Footer: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const time = useLocalTime();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], ['40%', '0%']);
  const clip = useTransform(scrollYProgress, [0.4, 1], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);

  return (
    <footer ref={ref} className="relative overflow-hidden">
      <div className="wrap pt-6 pb-8">
        <div className="glass p-7 md:p-9 grid gap-8 md:grid-cols-4 text-muted text-sm">
          <div>
            <div className="kicker mb-3">Local time</div>
            <div className="text-[var(--color-text)] flex items-center gap-2"><span className="live-dot" /> {time} · Ontario</div>
          </div>
          <div>
            <div className="kicker mb-3">Elsewhere</div>
            <div className="flex flex-col gap-1.5 text-[var(--color-text)]">
              <a className="link-draw w-fit" href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="link-draw w-fit" href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
          <div>
            <div className="kicker mb-3">Say hello</div>
            <a className="link-draw text-[var(--color-text)] break-all" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
          <div className="md:text-right self-center">
            <Magnetic>
              <button onClick={() => scrollToTarget(0)} className="btn btn-line !h-11" data-cursor="Top">
                Back to top <Icon name="arrow-up" size={15} />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      <motion.div style={{ y }} className="relative select-none pointer-events-none" aria-hidden="true">
        <div className="relative display text-[18.5vw] leading-[0.78] whitespace-nowrap text-center pb-[2vw]">
          <span className="outline-text">{siteConfig.name.split(' ')[0]}</span>
          <motion.span
            className="absolute inset-0 overflow-hidden bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-teal)] bg-clip-text text-transparent"
            style={{ clipPath: clip }}
          >
            {siteConfig.name.split(' ')[0]}
          </motion.span>
        </div>
      </motion.div>

      <div className="wrap flex flex-wrap justify-between gap-2 py-6 text-sm text-muted border-t border-[var(--line)]">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        
      </div>
    </footer>
  );
};
