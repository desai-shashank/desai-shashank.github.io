import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { developerFlowSteps } from '../data/portfolioData';
import { RevealWords } from '../components/Reveal';

/**
 * Pinned horizontal scroll on wide screens: the page scrolls down, the
 * pipeline slides sideways, and each stage lights up as data reaches it.
 */
export const Pipeline: React.FC = () => {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const fill = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '100%']);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setStage(Math.min(developerFlowSteps.length - 1, Math.floor(v * developerFlowSteps.length * 1.02)));
  });

  const n = developerFlowSteps.length;

  return (
    <section
      ref={outer}
      id="pipeline"
      aria-label="How I work"
      className="relative md:h-[400vh]"
    >
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden flex flex-col justify-center py-24 md:py-0">
        <div className="wrap mb-10 md:mb-14 flex items-end justify-between gap-6">
          <div>
            <div className="kicker flex items-center gap-3 mb-5">
              <span className="h-[2px] w-8 rounded-full bg-[var(--color-accent)]" /> How I work
            </div>
            <h2 className="h-section m-0">
              <RevealWords text="From a blank IDE" />
              <br />
              <RevealWords text="to a decision." className="serif-i text-[var(--color-navy)] font-normal tracking-[-0.02em]" delay={0.15} />
            </h2>
          </div>
          <div className="hidden md:block mono text-muted text-right">
            <div className="text-[var(--color-text)] text-5xl display normal-case mb-1">
              0{stage + 1}<span className="text-muted">/0{n}</span>
            </div>
            Stage
          </div>
        </div>

        <motion.div
          ref={track}
          style={{ x, paddingLeft: 'max(var(--gutter), calc((100vw - 1320px) / 2 + var(--gutter)))' }} className="flex flex-col md:flex-row md:w-max px-[var(--gutter)] md:pr-[20vw] gap-4 md:gap-0">
          {developerFlowSteps.map((step, i) => {
            const lit = i <= stage;
            return (
              <div key={step.label} className="relative md:w-[min(34vw,440px)] shrink-0 md:pr-6">
                {/* connector */}
                <div className="hidden md:block absolute top-[1.35rem] left-12 right-0 h-px bg-[var(--line)]">
                  {i < n - 1 && lit && i < stage && (
                    <span className="absolute inset-0 bg-[var(--color-accent)]" />
                  )}
                  {i === stage && i < n - 1 && (
                    <span
                      className="absolute top-1/2 -translate-y-1/2 w-10 h-[2px] bg-gradient-to-r from-transparent to-[var(--color-accent)]"
                      style={{ animation: 'packet 1.4s linear infinite' }}
                    />
                  )}
                </div>

                <div
                  className={`relative w-11 h-11 rounded-full border grid place-items-center mono transition-all duration-500 ${
                    lit ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-[0_10px_24px_rgba(255,107,61,0.35)]' : 'bg-white/60 border-[var(--line-strong)] text-muted'
                  }`}
                >
                  0{i + 1}
                  {i === stage && <span className="absolute inset-0 rounded-full live-dot !w-full !h-full !bg-transparent" />}
                </div>

                <div className={`glass mt-6 md:mt-8 p-6 md:p-7 transition-all duration-700 ${lit ? 'opacity-100' : 'md:opacity-40 md:scale-[0.97]'}`}>
                  <h3 className="text-[clamp(1.6rem,2.6vw,2.3rem)] leading-none tracking-[-0.045em] font-bold m-0">
                    {step.label.split(' / ').map((part, j) => (
                      <span key={j} className={j ? 'serif-i font-normal text-[var(--color-navy)]' : ''}>
                        {j ? ' / ' : ''}{part}
                      </span>
                    ))}
                  </h3>
                  <p className="text-muted mt-4 mb-0 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <div className="wrap mt-14 hidden md:block">
          <div className="h-[3px] rounded-full bg-[var(--line)] relative overflow-hidden">
            <motion.div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-teal)]" style={{ width: fill }} />
          </div>
          <div className="flex justify-between mono text-muted mt-3">
            <span>raw input</span>
            <span>business insight</span>
          </div>
        </div>
      </div>
    </section>
  );
};
