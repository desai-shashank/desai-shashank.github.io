import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { aboutData } from '../data/portfolioData';
import { Icon } from '../components/Icon';
import { SectionWrapper } from '../components/SectionWrapper';
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '../lib/animations';

const cardColors = [
  { border: 'rgba(99, 102, 241, 0.2)', glow: 'rgba(99, 102, 241, 0.06)' },
  { border: 'rgba(34, 211, 238, 0.2)', glow: 'rgba(34, 211, 238, 0.06)' },
  { border: 'rgba(167, 139, 250, 0.2)', glow: 'rgba(167, 139, 250, 0.06)' },
  { border: 'rgba(52, 211, 153, 0.2)', glow: 'rgba(52, 211, 153, 0.06)' },
];

export const About: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper
      id="about"
      label="About Me"
      title={
        <>
          Bridging <span className="gradient-text">Code & Data</span>
        </>
      }
      subtitle="A background that spans software engineering and data analytics."
    >
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
      >
        {/* Left: Introduction */}
        <motion.div variants={fadeInLeft} className="space-y-5">
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-base">
            {aboutData.intro}
          </p>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-base">
            {aboutData.detailParagraph}
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="glass-card px-5 py-3 text-center">
              <div className="text-xl font-bold gradient-text">M.D.A.</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">Master's Degree</div>
            </div>
            <div className="glass-card px-5 py-3 text-center">
              <div className="text-xl font-bold gradient-text">3.72</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">GPA / 4.0</div>
            </div>
            <div className="glass-card px-5 py-3 text-center">
              <div className="text-xl font-bold gradient-text">B.Eng.</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">CS Engineering</div>
            </div>
          </div>
        </motion.div>

        {/* Right: Cards */}
        <motion.div
          variants={fadeInRight}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {aboutData.cards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-elevated p-5 group cursor-default"
              style={{
                borderColor: cardColors[i]?.border,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: cardColors[i]?.glow }}
              >
                <Icon
                  name={card.icon}
                  size={20}
                  className="text-[var(--color-accent-secondary)]"
                />
              </div>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1.5">
                {card.title}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
};
