import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { siteConfig } from '../data/portfolioData';
import { useActiveSection, useLocalTime } from '../hooks/usePortfolio';
import { lockScroll, scrollToTarget } from '../lib/scroll';
import { Magnetic } from './Magnetic';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Floating glass header: monogram, pill nav with a sliding navy pill, CTA. */
export const Navbar: React.FC<{ items: { label: string; href: string }[]; ready: boolean }> = ({ items, ready }) => {
  const ids = React.useMemo(() => items.map((i) => i.href.slice(1)), [items]);
  const active = useActiveSection(ids);
  const time = useLocalTime();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev + 2 && y > 500 && !open);
  });

  useEffect(() => { lockScroll(open); }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToTarget(href), open ? 350 : 0);
  };

  const [first, last] = siteConfig.name.split(' ');

  return (
    <>
      <motion.header
        className="fixed top-3 md:top-4 inset-x-0 z-[60] pointer-events-none"
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: ready && !hidden ? 0 : -120, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="wrap">
          <div className="glass pointer-events-auto relative overflow-hidden !rounded-[26px] flex items-center justify-between gap-4 pl-3 pr-3 py-2.5 !shadow-[0_18px_40px_rgba(19,34,56,0.10)]">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); go('#home'); }}
              className="group flex items-center gap-3 shrink-0"
              aria-label={`${siteConfig.name} — back to top`}
            >
              <span className="relative grid place-items-center w-10 h-10 rounded-full text-white font-bold bg-gradient-to-br from-[#ff8a5c] to-[var(--color-accent)] shadow-[0_10px_24px_rgba(255,107,61,0.4)] overflow-hidden">
                <span className="transition-transform duration-500 group-hover:-translate-y-8">{first[0]}</span>
                <span className="absolute translate-y-8 transition-transform duration-500 group-hover:translate-y-0">{last?.[0]}</span>
              </span>
              <span className="font-bold tracking-tight">{siteConfig.name}</span>
            </a>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1 p-1 rounded-full bg-[rgba(19,34,56,0.04)] list-none m-0">
                {items.map((item) => {
                  const isActive = active === item.href.slice(1);
                  return (
                    <li key={item.href} className="relative">
                      <a
                        href={item.href}
                        onClick={(e) => { e.preventDefault(); go(item.href); }}
                        className={`relative z-[1] block px-4 py-2 text-[0.9rem] rounded-full transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                        }`}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        {item.label}
                      </a>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-[var(--color-navy)] shadow-[0_8px_20px_rgba(15,39,68,0.25)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-4 shrink-0">
              <div className="hidden xl:flex items-center gap-2 text-sm text-muted">
                <span className="live-dot" /> {time} · Ontario
              </div>
              <Magnetic className="hidden sm:inline-block">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); go('#contact'); }}
                  className="btn btn-navy !h-11 !px-5 !text-[0.88rem]"
                >
                  Let&rsquo;s talk
                </a>
              </Magnetic>
              <button
                onClick={() => setOpen((o) => !o)}
                className="lg:hidden relative w-11 h-11 rounded-full bg-[var(--color-navy)] text-white grid place-items-center"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
              >
                <span className={`absolute h-[1.5px] w-4 bg-current transition-transform duration-500 ${open ? 'rotate-45' : '-translate-y-[3px]'}`} />
                <span className={`absolute h-[1.5px] w-4 bg-current transition-transform duration-500 ${open ? '-rotate-45' : 'translate-y-[3px]'}`} />
              </button>
            </div>

            {/* scroll progress along the bottom edge of the header */}
            <motion.span
              className="absolute left-5 right-5 bottom-0 h-[2px] origin-left rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-teal)]"
              style={{ scaleX: progress }}
            />
          </div>

          <AnimatePresence>
            {open && (
              <motion.nav
                aria-label="Mobile"
                className="glass pointer-events-auto lg:hidden mt-2 p-3 !rounded-[26px]"
                initial={{ opacity: 0, y: -12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <ul className="list-none m-0 p-0 grid gap-1">
                  {[{ label: 'Home', href: '#home' }, ...items].map((item, i) => {
                    const isActive = active === item.href.slice(1);
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.04, ease: EASE }}
                      >
                        <a
                          href={item.href}
                          onClick={(e) => { e.preventDefault(); go(item.href); }}
                          className={`flex items-center justify-between px-4 py-3 rounded-2xl text-lg font-medium transition-colors ${
                            isActive ? 'bg-[var(--color-navy)] text-white' : 'hover:bg-white/70'
                          }`}
                        >
                          {item.label}
                          <span className={`mono ${isActive ? 'text-white/60' : 'text-muted'}`}>0{i}</span>
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="btn btn-accent w-full justify-center mt-3"
                >
                  Email {first}
                </a>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] bg-[rgba(19,34,56,0.18)] backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
