import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skillsData } from '../data/portfolioData';
import { SectionWrapper } from '../components/SectionWrapper';
import { Icon } from '../components/Icon';
import { staggerContainer, fadeInUp } from '../lib/animations';

const categoryAccents = [
  '#6366f1', '#22d3ee', '#a78bfa', '#34d399', '#f59e0b', '#818cf8',
];

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper
      id="skills"
      label="Skills"
      title={
        <>
          Technical <span className="gradient-text">Arsenal</span>
        </>
      }
      subtitle="A diverse skill set spanning programming, analytics, machine learning, and web development."
    >
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Category Tabs */}
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-8">
          {skillsData.map((cat, index) => {
            const isActive = activeCategory === index;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(index)}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? 'bg-white/[0.06] border-white/[0.12] text-[var(--color-text-primary)]'
                    : 'bg-transparent border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-white/[0.03]'
                }`}
                aria-pressed={isActive}
              >
                <Icon
                  name={cat.icon}
                  size={16}
                  className={isActive ? '' : 'opacity-50 group-hover:opacity-75'}
                  />
                <span className="hidden sm:inline">{cat.name}</span>
                <span className="sm:hidden">{cat.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {skillsData[activeCategory].skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: i * 0.04,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -3,
                    transition: { duration: 0.2 },
                  }}
                  className="card-elevated p-4 flex items-center gap-3 group cursor-default"
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0 transition-all duration-300 group-hover:scale-125"
                    style={{
                      background: categoryAccents[activeCategory],
                      boxShadow: `0 0 8px ${categoryAccents[activeCategory]}40`,
                    }}
                  />
                  <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors font-medium">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Category summary */}
            <div className="mt-6 flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: categoryAccents[activeCategory] }}
              />
              <span>
                {skillsData[activeCategory].skills.length} skills in{' '}
                {skillsData[activeCategory].name}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
};
