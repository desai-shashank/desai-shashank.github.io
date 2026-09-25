import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { experienceData } from '../data/portfolioData';
import { SectionHead, fadeUp, stagger } from '../components/Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

export const Experience: React.FC = () => {
  const [open, setOpen] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.8', 'end 0.6'] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experience" className="section">
      <div className="wrap">
        <SectionHead
          index="02"
          label="Experience"
          title="Where I've"
          accent="shipped work."
          aside={<p className="m-0">From full-stack product work in Vadodara to analytics in Ontario: every role taught me to ask what the numbers are for.</p>}
        />

        <div className="relative">
          {/* Scroll-drawn spine */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--line)] hidden md:block" aria-hidden="true">
            <motion.div className="w-full h-full origin-top bg-[var(--color-accent)]" style={{ scaleY: line }} />
          </div>

          <motion.ol
            ref={listRef}
            className="list-none m-0 p-0 md:pl-10 space-y-4"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
          >
            {experienceData.map((job, i) => {
              const isOpen = open === i;
              return (
                <motion.li key={`${job.company}-${job.title}`} variants={fadeUp} className="relative">
                  <span className={`hidden md:block absolute -left-10 top-10 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 transition-colors duration-500 ${isOpen ? 'bg-[var(--color-accent)] border-[var(--color-accent)]' : 'bg-[var(--color-bg)] border-[var(--line-strong)]'}`} />
                  <div className={`glass overflow-hidden transition-shadow duration-500 ${isOpen ? '!shadow-[0_24px_60px_rgba(19,34,56,0.12)]' : ''}`}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`job-${i}`}
                    data-cursor={isOpen ? 'Close' : 'Open'}
                    className="group w-full text-left grid grid-cols-12 gap-x-4 gap-y-2 items-center px-6 md:px-8 py-6 md:py-7"
                  >
                    <span className="col-span-12 md:col-span-3 mono text-muted order-1">
                      <span className={isOpen ? 'text-accent' : ''}>{String(i + 1).padStart(2, '0')}</span>
                      <span className="mx-2">/</span>
                      {job.period}
                    </span>
                    <span className="col-span-10 md:col-span-6 order-2">
                      <span className={`block text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.05] tracking-[-0.04em] font-bold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 ${isOpen ? 'text-accent' : ''}`}>
                        {job.title}
                      </span>
                      <span className="block text-dim mt-1.5">
                        <span className="serif-i text-xl text-[var(--color-navy)]">{job.company}</span>
                        <span className="text-muted"> — {job.location}</span>
                      </span>
                    </span>
                    <span className="hidden md:flex col-span-2 order-3 justify-end">
                      <span className="chip">{job.type === 'technical' ? 'Technical' : 'Professional'}</span>
                    </span>
                    <span className="col-span-2 md:col-span-1 order-3 flex justify-end">
                      <span className={`relative w-10 h-10 rounded-full border grid place-items-center transition-all duration-500 ${isOpen ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white rotate-180' : 'border-[var(--line-strong)] group-hover:border-[var(--color-accent)]'}`}>
                        <span className="absolute w-3.5 h-px bg-current" />
                        <span className={`absolute w-px h-3.5 bg-current transition-transform duration-500 ${isOpen ? 'scale-y-0' : ''}`} />
                      </span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`job-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-12 gap-4 px-6 md:px-8 pb-8 pt-2 border-t border-[var(--line)] mx-0">
                          <ul className="col-span-12 md:col-span-9 md:col-start-4 list-none m-0 p-0 space-y-3 pt-6">
                            {job.responsibilities.map((r, j) => (
                              <motion.li
                                key={j}
                                className="flex gap-4 text-dim leading-relaxed"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 + j * 0.05, ease: EASE }}
                              >
                                <span className="mono text-muted pt-1 shrink-0">{String(j + 1).padStart(2, '0')}</span>
                                <span>{r}</span>
                              </motion.li>
                            ))}
                          </ul>
                          <div className="col-span-12 md:col-span-9 md:col-start-4 flex flex-wrap gap-2 pt-4">
                            {job.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
};
