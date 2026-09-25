import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { developerFlowSteps } from '../data/portfolioData';
import { SectionWrapper } from '../components/SectionWrapper';
import { Icon } from '../components/Icon';
import { staggerContainer, fadeInUp } from '../lib/animations';

export const DeveloperFlow: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper
      id="developer-flow"
      label="Process"
      title={
        <>
          How I <span className="gradient-text">Build</span>
        </>
      }
      subtitle="A seamless flow from code to business insight — connecting software development with data analytics."
    >
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-4xl mx-auto"
      >
        {/* Desktop: Horizontal flow */}
        <div className="hidden lg:block">
          <div className="flex items-start justify-between relative">
            {/* Connection line */}
            <div className="absolute top-[28px] left-[60px] right-[60px] h-px bg-gradient-to-r from-[var(--color-accent-primary)] via-[var(--color-accent-cyan)] to-[var(--color-accent-green)]" />

            {developerFlowSteps.map((step, index) => (
              <motion.div
                key={step.label}
                variants={fadeInUp}
                className="flex flex-col items-center text-center relative z-10 w-[140px]"
              >
                {/* Icon circle */}
                <motion.div
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 card-elevated cursor-default"
                  style={{
                    background: `linear-gradient(135deg, rgba(99,102,241,${0.08 + index * 0.02}), rgba(34,211,238,${0.03 + index * 0.02}))`,
                  }}
                >
                  <Icon
                    name={step.icon}
                    size={22}
                    className="text-[var(--color-accent-secondary)]"
                  />
                </motion.div>

                {/* Step number */}
                <div className="text-[10px] text-[var(--color-text-muted)] font-mono mb-1">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Label */}
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
                  {step.label}
                </h3>

                {/* Description */}
                <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: Vertical flow */}
        <div className="lg:hidden relative">
          {/* Vertical line */}
          <div className="absolute left-[26px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent-primary)] via-[var(--color-accent-cyan)] to-[var(--color-accent-green)]" />

          <div className="space-y-6">
            {developerFlowSteps.map((step, index) => (
              <motion.div
                key={step.label}
                variants={fadeInUp}
                className="flex items-start gap-5 relative"
              >
                {/* Icon */}
                <div
                  className="w-[52px] h-[52px] rounded-xl flex items-center justify-center shrink-0 card-elevated relative z-10"
                  style={{
                    background: `linear-gradient(135deg, rgba(99,102,241,${0.08 + index * 0.02}), rgba(34,211,238,${0.03 + index * 0.02}))`,
                  }}
                >
                  <Icon
                    name={step.icon}
                    size={20}
                    className="text-[var(--color-accent-secondary)]"
                  />
                </div>

                {/* Content */}
                <div className="pt-1">
                  <div className="text-[10px] text-[var(--color-text-muted)] font-mono mb-0.5">
                    Step {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-0.5">
                    {step.label}
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};
