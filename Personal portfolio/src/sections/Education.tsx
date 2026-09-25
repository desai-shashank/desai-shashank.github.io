import React from 'react';
import { motion } from 'framer-motion';
import { educationData, type EducationItem } from '../data/portfolioData';
import { SectionHead, fadeUp, stagger } from '../components/Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

/** "3.72 / 4.0" → { score: 3.72, max: 4 } */
const parseGpa = (gpa: string) => {
  const [score, max] = gpa.split('/').map((s) => parseFloat(s));
  return { score, max: max || 4 };
};

const GpaRing: React.FC<{ gpa: string; size: number; dark?: boolean }> = ({ gpa, size, dark }) => {
  const { score, max } = parseGpa(gpa);
  const stroke = 3;
  const r = (size - stroke) / 2;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={dark ? 'rgba(255,255,255,0.14)' : 'var(--line)'} strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="var(--color-accent)" strokeWidth={stroke} strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: score / max }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.3, ease: EASE }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="display tabular-nums" style={{ fontSize: size * 0.24 }}>{score}</div>
          <div className="mono !text-[0.6rem] opacity-60">of {max}</div>
        </div>
      </div>
    </div>
  );
};

/** Card with a soft spotlight that follows the cursor. */
const Card: React.FC<{ item: EducationItem; big?: boolean }> = ({ item, big }) => {
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      variants={fadeUp}
      onPointerMove={onMove}
      className={`group relative overflow-hidden p-7 md:p-9 flex flex-col justify-between gap-10 ${big ? 'panel-navy md:row-span-2 min-h-[420px]' : 'glass glass-hover'}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(420px circle at var(--mx) var(--my), ${big ? 'rgba(255,255,255,0.08)' : 'rgba(255,107,61,0.10)'}, transparent 60%)` }}
      />
      <div className="relative flex items-start justify-between gap-6">
        <div>
          <div className="kicker mb-4">{item.period}</div>
          <h3 className={`m-0 font-bold tracking-[-0.045em] leading-[1.02] ${big ? 'text-[clamp(2rem,4vw,3.4rem)]' : 'text-[1.6rem]'}`}>
            {item.degree}
          </h3>
          {item.field && <p className={`serif-i text-xl mt-2 mb-0 ${big ? 'text-[var(--color-accent-soft)]' : 'text-[var(--color-navy)]'}`}>{item.field}</p>}
        </div>
        <GpaRing gpa={item.gpa} size={big ? 118 : 84} dark={big} />
      </div>

      <div className="relative">
        <p className="m-0 font-semibold">{item.institution}</p>
        <p className="m-0 mono text-muted mt-1">{item.location}</p>
        {item.coursework.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {item.coursework.map((c) => <span key={c} className={big ? 'chip-dark' : 'chip'}>{c}</span>)}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export const Education: React.FC = () => {
  const featured = educationData.find((e) => e.featured) ?? educationData[0];
  const rest = educationData.filter((e) => e !== featured);

  return (
    <section id="education" className="section">
      <div className="wrap">
        <SectionHead
          index="04"
          label="Education"
          title="Trained in"
          accent="both worlds."
          aside={<p className="m-0">Engineering foundations in India, then a Master&rsquo;s in Data Analytics in Canada.</p>}
        />
        <motion.div
          className="grid gap-4 md:grid-cols-2"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <Card item={featured} big />
          {rest.map((e) => <Card key={e.degree} item={e} />)}
        </motion.div>
      </div>
    </section>
  );
};
