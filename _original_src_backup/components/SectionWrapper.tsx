import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, staggerContainer } from '../lib/animations';

interface SectionWrapperProps {
  id: string;
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

/**
 * Reusable section wrapper with consistent layout, scroll-reveal animation,
 * section label, title, and subtitle.
 */
export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  label,
  title,
  subtitle,
  children,
  className = '',
  fullWidth = false,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '-50px 0px',
  });

  return (
    <section id={id} className={`relative ${className}`} aria-labelledby={`${id}-title`}>
      <div className={fullWidth ? 'px-4 md:px-6' : 'section-container'}>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeInUp} className="mb-12">
            <span className="section-label">{label}</span>
            <h2 id={`${id}-title`} className="section-title">
              {title}
            </h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </motion.div>

          <motion.div variants={fadeInUp}>{children}</motion.div>
        </motion.div>
      </div>
    </section>
  );
};
