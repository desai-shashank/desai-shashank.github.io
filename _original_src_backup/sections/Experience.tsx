import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experienceData } from '../data/portfolioData';
import { SectionWrapper } from '../components/SectionWrapper';
import { Icon } from '../components/Icon';
import { staggerContainer, timelineItem } from '../lib/animations';

export const Experience: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <SectionWrapper
      id="experience"
      label="Experience"
      title={
        <>
          Professional <span className="gradient-text">Journey</span>
        </>
      }
      subtitle="Building expertise across data analytics, software development, and customer-facing roles."
    >
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative max-w-3xl mx-auto"
      >
        {/* Timeline line */}
        <div className="absolute left-[22px] md:left-[26px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent-primary)] via-[var(--color-border-card)] to-transparent" />

        {experienceData.map((exp, index) => (
          <motion.div
            key={`${exp.company}-${exp.title}`}
            variants={timelineItem}
            className="relative pl-14 md:pl-16 pb-10 last:pb-0"
          >
            {/* Timeline dot */}
            <div className="absolute left-3 md:left-4 top-1 flex items-center justify-center">
              <div
                className={`w-[14px] h-[14px] rounded-full border-2 ${
                  exp.type === 'technical'
                    ? 'border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/20'
                    : 'border-[var(--color-accent-cyan)] bg-[var(--color-accent-cyan)]/20'
                }`}
              />
            </div>

            {/* Card */}
            <motion.div
              className={`card-elevated overflow-hidden cursor-pointer ${
                expandedIndex === index ? 'border-[var(--color-border-hover)]' : ''
              }`}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          exp.type === 'technical'
                            ? 'text-[var(--color-accent-secondary)] bg-[var(--color-accent-primary)]/10'
                            : 'text-[var(--color-accent-cyan)] bg-[var(--color-accent-cyan)]/10'
                        }`}
                      >
                        {exp.type === 'technical' ? 'Technical' : 'Professional'}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)]">{exp.period}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {exp.company}{' '}
                      <span className="text-[var(--color-text-muted)]">• {exp.location}</span>
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[var(--color-text-muted)] mt-1 shrink-0"
                  >
                    <Icon name="chevron-down" size={18} />
                  </motion.div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {exp.tags.slice(0, expandedIndex === index ? exp.tags.length : 4).map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                  {expandedIndex !== index && exp.tags.length > 4 && (
                    <span className="tag-pill opacity-60">+{exp.tags.length - 4}</span>
                  )}
                </div>
              </div>

              {/* Expanded responsibilities */}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-white/[0.04] pt-4">
                      <h4 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2.5">
                        {exp.responsibilities.map((resp, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex gap-3 text-sm text-[var(--color-text-secondary)] leading-relaxed"
                          >
                            <span className="text-[var(--color-accent-primary)] mt-1.5 shrink-0">
                              <Icon name="arrow-right" size={12} />
                            </span>
                            {resp}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};
