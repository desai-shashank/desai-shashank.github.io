import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { educationData } from '../data/portfolioData';
import { SectionWrapper } from '../components/SectionWrapper';
import { Icon } from '../components/Icon';
import { staggerContainer, fadeInUp } from '../lib/animations';

export const Education: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper
      id="education"
      label="Education"
      title={
        <>
          Academic <span className="gradient-text">Foundation</span>
        </>
      }
      subtitle="A strong academic foundation in data analytics, computer science, and engineering."
    >
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid gap-6 max-w-3xl mx-auto"
      >
        {educationData.map((edu, index) => (
          <motion.div
            key={edu.degree}
            variants={fadeInUp}
            className={`relative overflow-hidden ${
              edu.featured ? 'gradient-border' : 'card-elevated'
            }`}
          >
            {/* Featured badge */}
            {edu.featured && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-secondary)] text-[10px] font-semibold uppercase tracking-wider">
                <Icon name="graduation" size={12} />
                Current
              </div>
            )}

            <div className={`p-6 md:p-8 ${edu.featured ? 'relative z-10' : ''}`}>
              {/* Period */}
              <div className="text-xs text-[var(--color-text-muted)] font-medium mb-2">
                {edu.period}
              </div>

              {/* Degree */}
              <h3
                className={`font-bold mb-1 ${
                  edu.featured
                    ? 'text-xl md:text-2xl text-[var(--color-text-primary)]'
                    : 'text-lg text-[var(--color-text-primary)]'
                }`}
              >
                {edu.degree}
              </h3>
              {edu.field && (
                <p className="text-sm text-[var(--color-accent-secondary)] font-medium mb-1">
                  {edu.field}
                </p>
              )}

              {/* Institution */}
              <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                {edu.institution}{' '}
                <span className="text-[var(--color-text-muted)]">• {edu.location}</span>
              </p>

              {/* GPA */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] mb-4">
                <span className="text-xs text-[var(--color-text-muted)]">
                  {edu.gpa.includes('CGPA') || edu.gpa.includes('/10') ? 'CGPA' : 'GPA'}
                </span>
                <span
                  className={`text-sm font-bold ${
                    edu.featured ? 'gradient-text' : 'text-[var(--color-text-primary)]'
                  }`}
                >
                  {edu.gpa}
                </span>
              </div>

              {/* Coursework */}
              {edu.coursework.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                    Relevant Coursework
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course) => (
                      <span key={course} className="tag-pill">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};
