import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { aboutData } from '../data/portfolioData';
import { SectionHead, fadeUp, stagger } from '../components/Reveal';

const approach = [
  'Start from the business question, not the dataset.',
  'Clean, validate, and explore before anything gets charted.',
  'Present findings as recommendations stakeholders can act on.',
];

const icons: Record<string, React.ReactNode> = {
  chart: <path d="M4 19V5M4 19h16M8 15l3-4 3 2 5-6" />,
  code: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
};

/** Each word brightens as the paragraph scrolls through the viewport. */
const ScrollWord: React.FC<{ word: string; range: [number, number]; progress: MotionValue<number> }> = ({ word, range, progress }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const highlight = /^(code|data|insights|software)/i.test(word);
  return (
    <motion.span style={{ opacity }} className={highlight ? 'serif-i text-accent font-normal' : ''}>
      {word}{' '}
    </motion.span>
  );
};

const ScrollParagraph: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.22] tracking-[-0.03em] font-semibold m-0">
      {words.map((w, i) => (
        <ScrollWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
};

export const About: React.FC = () => (
  <section id="about" className="section">
    <div className="wrap">
      <SectionHead
        index="01"
        label="About"
        title="Analytics depth with"
        accent="an engineer's range."
        aside={<p className="m-0">{aboutData.detailParagraph}</p>}
      />

      <div className="max-w-5xl">
        <ScrollParagraph text={aboutData.intro} />
      </div>

      <motion.div
        className="grid gap-5 lg:grid-cols-12 mt-16"
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px' }}
      >
        <motion.div variants={fadeUp} className="lg:col-span-7">
          <div className="glass glass-hover p-7 md:p-9 h-full">
            <h3 className="text-2xl font-bold tracking-tight m-0">How I approach the work</h3>
            <p className="text-muted mt-3 mb-6 leading-relaxed">
              A Computer Science foundation and a Master&rsquo;s in Data Analytics mean I can move between the query, the
              code, and the conversation with stakeholders without losing the thread.
            </p>
            <ul className="list-none m-0 p-0 space-y-3">
              {approach.map((a) => (
                <li key={a} className="flex items-start gap-3">
                  <span className="mt-2 w-2 h-2 rounded-full bg-[var(--color-accent)] shrink-0" />
                  <span className="text-dim">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="lg:col-span-5">
          <div className="panel-navy relative overflow-hidden p-7 md:p-9 h-full flex flex-col justify-between gap-10 min-h-[280px]">
            <span className="display text-[5rem] leading-none text-white/10">01</span>
            <p className="text-[1.45rem] leading-snug tracking-[-0.02em] font-semibold m-0">
              A good analysis isn&rsquo;t the chart. It&rsquo;s the{' '}
              <span className="serif-i font-normal text-[var(--color-accent-soft)]">decision someone makes</span> because of it.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.ul
        className="list-none p-0 m-0 mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px' }}
      >
        {aboutData.cards.map((card, i) => (
          <motion.li key={card.title} variants={fadeUp}>
            <div className="group glass glass-hover p-6 h-full">
              <div className="flex items-center justify-between">
                <span className="grid place-items-center w-11 h-11 rounded-2xl bg-[var(--color-navy)] text-white transition-colors duration-500 group-hover:bg-[var(--color-accent)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {icons[card.icon]}
                  </svg>
                </span>
                <span className="mono text-muted">0{i + 1}</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight mt-6 mb-2">{card.title}</h3>
              <p className="text-muted m-0 leading-relaxed">{card.description}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  </section>
);
