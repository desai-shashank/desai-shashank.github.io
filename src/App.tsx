import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { navItems, projectsData, skillsData } from './data/portfolioData';
import { startSmoothScroll, lockScroll } from './lib/scroll';
import { reducedMotion } from './lib/motion';
import { Loader } from './components/Loader';
import { Cursor } from './components/Cursor';
import { PointerGlow } from './components/PointerGlow';
import { Navbar } from './components/Navbar';
import { Marquee } from './components/Marquee';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Pipeline } from './sections/Pipeline';
import { Education } from './sections/Education';
import { Certifications } from './sections/Certifications';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';

const nav = projectsData.length
  ? [...navItems.slice(0, -1), { label: 'Projects', href: '#projects' }, navItems[navItems.length - 1]]
  : navItems;

const tickerA = skillsData.flatMap((c) => c.skills).slice(0, 18);
const tickerB = ['Data Analytics', 'Software Development', 'Business Intelligence', 'Dashboards', 'KPI Tracking', 'Full-Stack Web', 'Machine Learning', 'Stakeholder Stories'];

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);

  useEffect(() => startSmoothScroll(), []);
  useEffect(() => {
    lockScroll(loading);
    if (loading) window.scrollTo(0, 0);
  }, [loading]);

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>
      <AnimatePresence>{loading && <Loader key="loader" onDone={done} />}</AnimatePresence>
      <Cursor />
      <div className="bg-grid" aria-hidden="true" />
      <PointerGlow />
      <div className="grain" aria-hidden="true" />
      <Navbar items={nav} ready={!loading} />

      <main>
        <Hero ready={!loading} />

        <div className="wrap">
          <div className="glass !rounded-[24px] py-5 space-y-3 text-[1.05rem] font-medium">
            <Marquee items={tickerA} duration={55} />
            <Marquee items={tickerB} duration={45} reverse />
          </div>
        </div>

        <About />
        <Experience />
        <Skills />
        <Pipeline />
        <Education />
        <Certifications />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  );
};
