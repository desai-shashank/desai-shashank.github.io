import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { skillsData } from '../data/portfolioData';
import { SectionHead } from '../components/Reveal';
import { reducedMotion } from '../lib/motion';

const EASE = [0.22, 1, 0.36, 1] as const;
const CYCLE_MS = 7000;

/** The skills section is a tiny SQL console: pick a category, watch it query. */
export const Skills: React.FC = () => {
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState(0);
  const [auto, setAuto] = useState(true);
  const consoleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(consoleRef, { margin: '-20% 0px' });

  const category = skillsData[active];
  const query = `SELECT skill FROM stack WHERE category = '${category.name}';`;
  const done = typed >= query.length;

  // Type the query out character by character.
  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) { setTyped(query.length); return; }
    if (typed >= query.length) return;
    const id = window.setTimeout(() => setTyped((t) => t + 2), 18);
    return () => window.clearTimeout(id);
  }, [typed, query.length, inView]);

  // Walk through categories on its own until someone clicks.
  useEffect(() => {
    if (!auto || !inView || !done) return;
    const id = window.setTimeout(() => select((active + 1) % skillsData.length, false), CYCLE_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, inView, done, active]);

  const select = (i: number, byUser = true) => {
    if (byUser) setAuto(false);
    if (i === active) return;
    setActive(i);
    setTyped(0);
  };

  return (
    <section id="skills" className="section">
      <div className="wrap">
        <SectionHead
          index="03"
          label="Stack"
          title="Query the"
          accent="toolkit."
          aside={<p className="m-0">Pick a category, or let it run. Every skill here comes from real coursework or real work.</p>}
        />

        <div className="grid gap-8 lg:grid-cols-12">
          <ul className="lg:col-span-4 list-none m-0 p-2.5 glass self-start" role="tablist" aria-label="Skill categories">
            {skillsData.map((c, i) => {
              const isActive = i === active;
              return (
                <li key={c.name}>
                  <button
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="skills-console"
                    onClick={() => select(i)}
                    className={`group relative w-full text-left flex items-center justify-between gap-4 px-4 py-3.5 rounded-2xl overflow-hidden transition-colors duration-300 ${isActive ? 'bg-[var(--color-navy)] text-white shadow-[0_12px_28px_rgba(15,39,68,0.25)]' : 'hover:bg-white/70'}`}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className={`mono transition-colors ${isActive ? 'text-accent' : 'text-muted'}`}>0{i + 1}</span>
                      <span className={`text-lg tracking-tight transition-all duration-500 ${isActive ? 'font-semibold text-white' : 'text-dim group-hover:text-[var(--color-text)] group-hover:translate-x-1'}`}>
                        {c.name}
                      </span>
                    </span>
                    <span className={`mono ${isActive ? 'text-white/60' : 'text-muted'}`}>{c.skills.length}</span>
                    {isActive && auto && done && (
                      <motion.span
                        key={`bar-${active}`}
                        className="absolute left-4 bottom-1.5 h-[2px] rounded-full bg-[var(--color-accent)] max-w-[calc(100%-2rem)]"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            ref={consoleRef}
            id="skills-console"
            role="tabpanel"
            className="lg:col-span-8 panel-navy overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 mono text-muted">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-ember)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#e7c34a]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]" />
                <span className="ml-3 normal-case tracking-normal">shashank@stack:~</span>
              </span>
              <span>psql</span>
            </div>

            <div className="p-5 md:p-7 font-mono text-[0.86rem] min-h-[380px]">
              <div className="leading-relaxed break-words">
                <span className="text-[#5eead4]">stack=#</span>{' '}
                <SqlHighlight text={query.slice(0, typed)} />
                {!done && <span className="caret ml-0.5" />}
              </div>

              <AnimatePresence mode="wait">
                {done && (
                  <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="mt-6 border-t border-b border-white/10 py-2 text-muted">
                      <span className="pl-3">skill</span>
                    </div>
                    <motion.ul
                      className="list-none m-0 p-0 grid sm:grid-cols-2"
                      initial="hidden"
                      animate="visible"
                      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                    >
                      {category.skills.map((s, i) => (
                        <motion.li
                          key={s}
                          variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } } }}
                          className="group flex items-center gap-3 py-2.5 pl-3 border-b border-dashed border-white/10 hover:bg-white/[0.05] transition-colors"
                        >
                          <span className="text-muted w-6">{String(i + 1).padStart(2, '0')}</span>
                          <span className="font-sans text-[1rem] text-[#f8f2eb] group-hover:text-[var(--color-accent)] transition-colors">{s}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                    <motion.p
                      className="mt-5 mb-0 text-muted"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + category.skills.length * 0.05 }}
                    >
                      ({category.skills.length} rows) <span className="text-[#34d399]">✓</span>
                      <span className="caret ml-3" />
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/** Colours SQL keywords and string literals in the typed query. */
const SqlHighlight: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\bSELECT\b|\bFROM\b|\bWHERE\b|'[^']*'?)/g);
  return (
    <>
      {parts.map((part, i) =>
        /^(SELECT|FROM|WHERE)$/.test(part) ? (
          <span key={i} className="text-[var(--color-accent)]">{part}</span>
        ) : part.startsWith("'") ? (
          <span key={i} className="text-[#5eead4]">{part}</span>
        ) : (
          <span key={i} className="text-[#f8f2eb]">{part}</span>
        )
      )}
    </>
  );
};
