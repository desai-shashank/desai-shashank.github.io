import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { siteConfig } from '../data/portfolioData';
import { Icon } from '../components/Icon';
import { fadeInUp, staggerContainer } from '../lib/animations';

export const Resume: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative overflow-hidden" aria-label="Resume download">
      <div className="section-container">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative"
        >
          <motion.div
            variants={fadeInUp}
            className="gradient-border relative overflow-hidden"
          >
            {/* Background glow */}
            <div
              className="glow-orb w-[300px] h-[300px] -top-20 -right-20 opacity-[0.08]"
              style={{ background: '#6366f1' }}
            />
            <div
              className="glow-orb w-[200px] h-[200px] bottom-0 left-0 opacity-[0.05]"
              style={{ background: '#22d3ee' }}
            />

            <div className="relative z-10 p-8 md:p-12 text-center">
              <div className="section-label mx-auto mb-4">
                <Icon name="file-text" size={14} />
                Resume
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-3">
                Want the full story?
              </h2>

              <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto mb-8">
                View or download my resume for a complete overview of my experience, education, skills,
                and certifications.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href={siteConfig.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <Icon name="eye" size={16} />
                  View Resume
                </a>
                <a
                  href={siteConfig.resumePath}
                  download
                  className="btn-secondary"
                >
                  <Icon name="download" size={16} />
                  Download Resume
                </a>
              </div>

              <p className="text-[11px] text-[var(--color-text-muted)] mt-6">
                Place your resume PDF at{' '}
                <code className="bg-white/[0.04] px-1.5 py-0.5 rounded font-mono text-[10px]">
                  public/resume.pdf
                </code>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
