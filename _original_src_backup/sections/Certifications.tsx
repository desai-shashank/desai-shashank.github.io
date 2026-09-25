import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { certificationsData } from '../data/portfolioData';
import { SectionWrapper } from '../components/SectionWrapper';
import { Icon } from '../components/Icon';
import { staggerContainer, fadeInUp } from '../lib/animations';

export const Certifications: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper
      id="certifications"
      label="Certifications"
      title={
        <>
          Professional <span className="gradient-text">Certifications</span>
        </>
      }
      subtitle="Validated skills and expertise through industry-recognized certifications."
    >
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
      >
        {certificationsData.map((cert, index) => (
          <motion.div
            key={cert.name}
            variants={fadeInUp}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="card-elevated p-5 group"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--color-accent-primary)]/10 shrink-0 group-hover:bg-[var(--color-accent-primary)]/15 transition-colors">
                <Icon
                  name="award"
                  size={18}
                  className="text-[var(--color-accent-secondary)]"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1 leading-tight">
                  {cert.name}
                </h3>
                {cert.provider && (
                  <p className="text-xs text-[var(--color-text-muted)]">{cert.provider}</p>
                )}
                {cert.date && (
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">{cert.date}</p>
                )}
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[var(--color-accent-secondary)] hover:text-[var(--color-accent-primary)] transition-colors mt-2 no-underline"
                  >
                    View Certificate
                    <Icon name="external-link" size={12} />
                  </a>
                ) : (
                  <span className="text-[10px] text-[var(--color-text-muted)]/60 mt-2 block">
                    {/* Certificate link can be added in portfolioData.ts */}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};
