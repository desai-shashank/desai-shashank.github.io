import React, { useMemo, useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { educationData, experienceData, focusData, heroData, siteConfig, skillsData } from '../data/portfolioData';
import { SignalField } from '../components/SignalField';
import { RevealWords } from '../components/Reveal';
import { Magnetic } from '../components/Magnetic';
import { Counter } from '../components/Counter';
import { Icon } from '../components/Icon';
import { scrollToTarget } from '../lib/scroll';
import { useLocalTime, useResumeAvailable } from '../hooks/usePortfolio';

const EASE = [0.22, 1, 0.36, 1] as const;

const master = educationData.find((e) => e.featured) ?? educationData[0];
const stats = [
  { value: parseFloat(master.gpa), suffix: '', label: `GPA in my ${master.degree}` },
  { value: experienceData.length, suffix: '', label: 'Roles across analytics, development & retail' },
  { value: Math.floor(skillsData.reduce((n, c) => n + c.skills.length, 0) / 10) * 10, suffix: '+', label: 'Tools, languages & methods in my stack' },
];

/** Dark "current focus" card that tilts toward the pointer. */
const FocusPanel: React.FC<{ ready: boolean }> = ({ ready }) => {
  const ref = useRef<HTMLDivElement>(null);
  const time = useLocalTime();
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 16 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 16 });
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(0);
  const shine = useTransform([shineX, shineY], ([x, y]) =>
    `radial-gradient(600px circle at ${x}% ${y}%, rgba(255,255,255,0.10), transparent 45%)`);
  const firstName = useMemo(() => [siteConfig.name.split(' ')[0].toUpperCase()], []);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 9);
    rx.set(-(py - 0.5) * 7);
    shineX.set(px * 100);
    shineY.set(py * 100);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <div className="relative" style={{ perspective: 1400 }}>
      {/* floating badges */}
      <motion.div
        className="absolute -top-5 right-6 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.3, duration: 0.7, ease: EASE }}
      >
        <div className="glass !rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2" style={{ animation: 'float-y 6s ease-in-out infinite' }}>
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" /> Live KPI tracking
        </div>
      </motion.div>
      <motion.div
        className="absolute -bottom-5 -left-4 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.5, duration: 0.7, ease: EASE }}
      >
        <div className="glass !rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2" style={{ animation: 'float-y 7s ease-in-out infinite 1s' }}>
          <span className="text-accent">✦</span> Data → decisions
        </div>
      </motion.div>

      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry }}
        className="panel-navy relative overflow-hidden p-6 md:p-8"
      >
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: shine }} />

        <span className="relative inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm">
          <span className="live-dot" /> {focusData.status}
        </span>
        <p className="relative text-muted text-sm mt-3 mb-0">
          {siteConfig.location} | {focusData.timezone} · {time}
        </p>

        <div className="relative mt-5 rounded-2xl border border-white/10 bg-white/[0.03] px-2">
          <SignalField lines={firstName} start={ready} className="block w-full h-[92px] md:h-[110px]" />
          <span className="absolute right-3 bottom-2 mono !text-[0.6rem] text-muted">hover the dots</span>
        </div>

        <div className="relative mt-6 kicker">Current focus</div>
        <h2 className="relative text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.08] tracking-[-0.04em] font-bold mt-2 mb-3">
          {focusData.title}
        </h2>
        <p className="relative text-dim text-[0.95rem] leading-relaxed m-0">{focusData.description}</p>

        <div className="relative grid gap-2 mt-6">
          {focusData.pillars.map((p) => (
            <div key={p.label} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-all duration-300 hover:bg-white/[0.08] hover:translate-x-1">
              <div className="w-24 shrink-0 text-[0.62rem] font-bold tracking-[0.14em] uppercase text-accent">{p.label}</div>
              <div className="text-[0.9rem] font-semibold leading-snug">{p.text}</div>
            </div>
          ))}
        </div>

        <div className="relative flex flex-wrap gap-2 mt-5">
          {focusData.tools.map((t) => <span key={t} className="chip-dark">{t}</span>)}
        </div>
      </motion.div>
    </div>
  );
};

export const Hero: React.FC<{ ready: boolean }> = ({ ready }) => {
  const ref = useRef<HTMLElement>(null);
  const resumeAvailable = useResumeAvailable();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const panelY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  const show = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section id="home" ref={ref} className="relative pt-32 md:pt-36 pb-16 overflow-hidden" aria-label="Introduction">
      <div className="orb w-[420px] h-[420px] -top-24 -left-24 bg-[rgba(255,107,61,0.22)]" />
      <div className="orb w-[380px] h-[380px] top-10 right-[-80px] bg-[rgba(14,165,164,0.18)]" style={{ animationDelay: '-6s' }} />

      <div className="wrap relative grid gap-14 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7">
          <motion.div {...show(0.1)} className="eyebrow max-w-full !tracking-[0.12em] sm:!tracking-[0.16em] leading-snug">
            <span>{heroData.eyebrow}</span>
          </motion.div>

          <h1 className="mt-7 mb-0 text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.98] tracking-[-0.055em] font-bold">
            <RevealWords text={heroData.headline} animateNow={ready} delay={0.2} />{' '}
            <RevealWords text={heroData.headlineAccent} animateNow={ready} delay={0.45} className="serif-i text-[var(--color-navy)] tracking-[-0.02em]" />
          </h1>

          <motion.p {...show(0.8)} className="text-dim text-lg leading-relaxed max-w-xl mt-7 mb-0">
            {heroData.description}
          </motion.p>

          <motion.div {...show(0.95)} className="flex flex-wrap items-center gap-3 mt-9">
            <Magnetic>
              <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToTarget('#experience'); }} className="btn btn-accent">
                See my work <Icon name="arrow" size={16} className="arrow" />
              </a>
            </Magnetic>
            {resumeAvailable && (
              <Magnetic>
                <a href={siteConfig.resumePath} download className="btn btn-line">
                  <Icon name="download" size={16} /> Download Résumé
                </a>
              </Magnetic>
            )}
            <Magnetic>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToTarget('#contact'); }} className="btn btn-line">
                Get in touch
              </a>
            </Magnetic>
          </motion.div>

          <motion.button
            {...show(1.1)}
            onClick={() => scrollToTarget('#about')}
            className="group mt-8 flex items-center gap-3 text-sm text-muted hover:text-[var(--color-text)] transition-colors"
          >
            Scroll to explore
            <motion.span
              className="w-2 h-2 rounded-full bg-[var(--color-accent)]"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10">
            {stats.map((s, i) => (
              <motion.div key={s.label} {...show(1.15 + i * 0.1)}>
                <div className="glass glass-hover p-5 h-full">
                  <div className="display text-[2.4rem]">
                    <Counter value={s.value} suffix={s.suffix} start={ready} />
                  </div>
                  <p className="text-sm text-muted mt-2 mb-0 leading-snug">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div className="lg:col-span-5" style={{ y: panelY }}>
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 2 }}
            animate={ready ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          >
            <FocusPanel ready={ready} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
