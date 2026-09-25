import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { heroData, siteConfig } from '../data/portfolioData';
import { Icon } from './Icon';

/** Interactive code/data visual on the right side of the hero */
const HeroVisual: React.FC = () => {
  const [typedLine, setTypedLine] = useState(0);

  const codeLines = [
    { text: 'import pandas as pd', color: '#818cf8' },
    { text: 'import numpy as np', color: '#818cf8' },
    { text: '', color: '' },
    { text: 'df = pd.read_csv("data.csv")', color: '#22d3ee' },
    { text: 'kpis = df.groupby("channel")', color: '#22d3ee' },
    { text: '    .agg({"revenue": "sum"})', color: '#a78bfa' },
    { text: '', color: '' },
    { text: '# Visualize insights', color: '#6b6b80' },
    { text: 'dashboard.render(kpis)', color: '#34d399' },
  ];

  useEffect(() => {
    if (typedLine < codeLines.length) {
      const timer = setTimeout(() => setTypedLine((p) => p + 1), 400);
      return () => clearTimeout(timer);
    }
  }, [typedLine, codeLines.length]);

  return (
    <div className="relative w-full max-w-md">
      {/* Glow orbs */}
      <div
        className="glow-orb w-48 h-48 -top-10 -right-10"
        style={{ background: '#6366f1', animation: 'pulse-glow 4s ease-in-out infinite' }}
      />
      <div
        className="glow-orb w-36 h-36 bottom-10 -left-8"
        style={{ background: '#22d3ee', animation: 'pulse-glow 5s ease-in-out infinite 1s' }}
      />

      {/* Terminal Window */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative glass-card p-0 overflow-hidden"
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
          <div className="w-3 h-3 rounded-full bg-red-400/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <div className="w-3 h-3 rounded-full bg-green-400/70" />
          <span className="ml-2 text-xs text-[var(--color-text-muted)] font-mono">
            analytics.py
          </span>
        </div>

        {/* Code content */}
        <div className="p-4 font-mono text-xs leading-6 min-h-[220px]">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={i < typedLine ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <span className="text-[var(--color-text-muted)] select-none w-5 text-right text-[10px]">
                {i + 1}
              </span>
              <span style={{ color: line.color || 'transparent' }}>
                {line.text || '\u00A0'}
              </span>
              {i === typedLine - 1 && typedLine < codeLines.length && (
                <span className="typing-cursor text-[var(--color-accent-cyan)]">▊</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating SQL card */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute -bottom-6 -right-4 md:-right-12 glass-card px-4 py-3"
        style={{ animation: 'float 6s ease-in-out infinite' }}
      >
        <div className="font-mono text-[10px] text-[var(--color-text-muted)] mb-1">SQL</div>
        <div className="font-mono text-xs">
          <span className="text-[var(--color-accent-purple)]">SELECT</span>{' '}
          <span className="text-[var(--color-accent-cyan)]">insights</span>
        </div>
        <div className="font-mono text-xs">
          <span className="text-[var(--color-accent-purple)]">FROM</span>{' '}
          <span className="text-[var(--color-accent-green)]">data</span>
        </div>
      </motion.div>

      {/* Floating KPI card */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute -top-4 -left-4 md:-left-12 glass-card px-4 py-3"
        style={{ animation: 'float 5s ease-in-out infinite 0.5s' }}
      >
        <div className="text-[10px] text-[var(--color-text-muted)] mb-1">KPI Dashboard</div>
        <div className="flex items-center gap-2">
          <Icon name="chart" size={14} className="text-[var(--color-accent-green)]" />
          <span className="text-sm font-semibold text-[var(--color-accent-green)]">Active</span>
        </div>
      </motion.div>
    </div>
  );
};

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div
          className="glow-orb w-[500px] h-[500px] top-1/4 left-1/4 opacity-[0.08]"
          style={{ background: '#6366f1' }}
        />
        <div
          className="glow-orb w-[400px] h-[400px] bottom-1/4 right-1/4 opacity-[0.06]"
          style={{ background: '#22d3ee' }}
        />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-label mb-6"
            >
              <Icon name="code" size={14} />
              Data Analytics × Software Development
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight mb-4"
            >
              {heroData.headline}
              <br />
              <span className="gradient-text-warm">{heroData.headlineAccent}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-lg mb-8 leading-relaxed"
            >
              {heroData.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-3"
            >
              {heroData.ctas.map((cta) => (
                <a
                  key={cta.label}
                  href={cta.href}
                  className={`btn-${cta.variant}`}
                  {...(cta.download ? { download: true, target: '_blank', rel: 'noopener' } : {})}
                  onClick={(e) => {
                    if (!cta.download && cta.href.startsWith('#')) {
                      e.preventDefault();
                      document.querySelector(cta.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {cta.variant === 'secondary' && <Icon name="download" size={16} />}
                  {cta.variant === 'primary' && <Icon name="arrow-down" size={16} />}
                  {cta.label}
                </a>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex items-center gap-4 mt-10"
            >
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-secondary)] transition-colors"
                aria-label="LinkedIn"
              >
                <Icon name="linkedin" size={20} />
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-secondary)] transition-colors"
                aria-label="GitHub"
              >
                <Icon name="github" size={20} />
              </a>
              <span className="w-px h-5 bg-white/10 mx-2" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-secondary)] transition-colors text-sm"
              >
                {siteConfig.email}
              </a>
            </motion.div>
          </div>

          {/* Right: Interactive Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[var(--color-text-muted)]"
        >
          <Icon name="chevron-down" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};
