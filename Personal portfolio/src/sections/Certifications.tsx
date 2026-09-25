import React from 'react';
import { motion } from 'framer-motion';
import { certificationsData } from '../data/portfolioData';
import { SectionHead, fadeUp, stagger } from '../components/Reveal';
import { Icon } from '../components/Icon';

/** A credits-style list; each row floods with the signal colour on hover. */
export const Certifications: React.FC = () => (
  <section id="certifications" className="section !pt-0">
    <div className="wrap">
      <SectionHead index="05" label="Certifications" title="Always" accent="learning." />
      <motion.ul
        className="list-none m-0 p-0 grid gap-3"
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px' }}
      >
        {certificationsData.map((cert, i) => {
          const Row = cert.url ? 'a' : 'div';
          return (
            <motion.li key={cert.name} variants={fadeUp} className="glass overflow-hidden !rounded-[22px]">
              <Row
                {...(cert.url ? { href: cert.url, target: '_blank', rel: 'noopener noreferrer', 'data-cursor': 'View' } : {})}
                className="group relative flex items-center justify-between gap-6 px-6 md:px-8 py-5 md:py-6 overflow-hidden"
              >
                <span className="absolute inset-0 bg-[var(--color-navy)] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                <span className="relative flex items-baseline gap-5 md:gap-10 transition-colors duration-300 group-hover:text-white">
                  <span className="mono text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[clamp(1.25rem,2.8vw,2.2rem)] leading-none tracking-[-0.04em] font-bold transition-transform duration-500 group-hover:translate-x-3">
                    {cert.name}
                  </span>
                </span>
                <span className="relative mono text-muted group-hover:text-white/70 transition-colors flex items-center gap-3 shrink-0">
                  <span className="hidden sm:inline">{[cert.provider, cert.date].filter(Boolean).join(' · ') || 'Certificate'}</span>
                  {cert.url && <Icon name="external" size={16} />}
                </span>
              </Row>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  </section>
);
