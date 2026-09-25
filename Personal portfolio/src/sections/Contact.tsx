import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projectsData, siteConfig } from '../data/portfolioData';
import { RevealWords, fadeUp, stagger } from '../components/Reveal';
import { Magnetic } from '../components/Magnetic';
import { Icon, type IconName } from '../components/Icon';

const topics = ['Full-time role', 'Internship', 'Freelance project', 'Just saying hi'];

const channels: { icon: IconName; label: string; value: string; href?: string; external?: boolean }[] = [
  { icon: 'mail', label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: 'phone', label: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/[^\d+]/g, '')}` },
  { icon: 'linkedin', label: 'LinkedIn', value: 'Connect', href: siteConfig.links.linkedin, external: true },
  { icon: 'github', label: 'GitHub', value: 'Browse code', href: siteConfig.links.github, external: true },
  { icon: 'pin', label: 'Location', value: siteConfig.location },
];

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [topic, setTopic] = useState(topics[0]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  };

  // No backend: compose the message in the visitor's own mail app.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || message.trim().length < 10) {
      setError(!name.trim() ? 'Tell me your name.' : 'A few more words, please (10+ characters).');
      return;
    }
    setError('');
    const subject = `${topic} — from ${name.trim()}`;
    const body = `${message.trim()}\n\n— ${name.trim()}`;
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="section relative overflow-hidden">
      <div className="absolute -bottom-1/3 left-1/2 -translate-x-1/2 w-[90vw] h-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(255,107,61,0.10),transparent)] pointer-events-none" />
      <div className="wrap relative">
        <div className="kicker flex items-center gap-3 mb-6">
          <span className="mono !text-[0.7rem] text-muted">{projectsData.length ? '07' : '06'}</span>
          <span className="h-[2px] w-8 rounded-full bg-[var(--color-accent)]" />
          Contact
        </div>

        <h2 className="m-0 text-[clamp(2.8rem,8.5vw,8rem)] leading-[0.92] tracking-[-0.06em] font-bold">
          <RevealWords text="Got data?" />
          <br />
          <RevealWords text="Let's make it talk." className="serif-i font-normal text-[var(--color-navy)] tracking-[-0.03em]" delay={0.2} />
        </h2>

        <motion.div
          className="mt-14 flex flex-wrap items-center gap-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Magnetic strength={0.2}>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex items-center gap-4 text-[clamp(1.2rem,3.2vw,2.4rem)] tracking-tight link-draw"
              data-cursor="Write"
            >
              {siteConfig.email}
              <span className="grid place-items-center w-12 h-12 rounded-full bg-[var(--color-accent)] text-white shadow-[0_12px_28px_rgba(255,107,61,0.4)] transition-transform duration-500 group-hover:-rotate-45">
                <Icon name="arrow" size={20} />
              </span>
            </a>
          </Magnetic>
          <button
            onClick={copy}
            className="chip !py-2 !px-4 relative"
            aria-live="polite"
          >
            <Icon name={copied ? 'check' : 'copy'} size={14} />
            {copied ? 'Copied!' : 'Copy email'}
          </button>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12 mt-24">
          <motion.ul
            className="lg:col-span-5 list-none m-0 p-3 glass self-start"
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
          >
            {channels.map((c) => {
              const inner = (
                <>
                  <span className="flex items-center gap-4">
                    <span className="w-9 h-9 grid place-items-center rounded-full border border-[var(--line)] bg-white/60 text-dim group-hover:text-white group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors duration-300">
                      <Icon name={c.icon} size={15} />
                    </span>
                    <span className="mono text-muted">{c.label}</span>
                  </span>
                  <span className="flex items-center gap-2 text-right">
                    {c.value}
                    {c.href && <Icon name={c.external ? 'external' : 'arrow'} size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />}
                  </span>
                </>
              );
              return (
                <motion.li key={c.label} variants={fadeUp}>
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-center justify-between gap-4 px-4 py-3.5 rounded-2xl hover:bg-white/70 transition-colors"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex items-center justify-between gap-4 px-4 py-3.5">{inner}</div>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.form
            onSubmit={submit}
            noValidate
            className="lg:col-span-7 glass p-6 md:p-9"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
          >
            <fieldset className="border-0 p-0 m-0">
              <legend className="mono text-muted mb-4">I&rsquo;m reaching out about</legend>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTopic(t)}
                    aria-pressed={topic === t}
                    className={`chip !py-2 !px-4 ${topic === t ? '!bg-[var(--color-navy)] !text-white !border-[var(--color-navy)]' : ''}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block mt-8">
              <span className="mono text-muted">Your name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                placeholder="Jane from Acme Analytics"
                className="mt-2 w-full bg-transparent border-0 border-b border-[var(--line-strong)] py-3 text-xl tracking-tight outline-none placeholder:text-[#9aa0a8] focus:border-[var(--color-accent)] transition-colors"
              />
            </label>

            <label className="block mt-8">
              <span className="mono text-muted">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="We're hiring for a data analyst who can also ship code…"
                className="mt-2 w-full bg-transparent border-0 border-b border-[var(--line-strong)] py-3 text-xl tracking-tight outline-none resize-none placeholder:text-[#9aa0a8] focus:border-[var(--color-accent)] transition-colors"
              />
            </label>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <AnimatePresence mode="wait">
                {error ? (
                  <motion.p key="err" role="alert" className="m-0 text-[var(--color-ember)] text-sm" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    {error}
                  </motion.p>
                ) : (
                  <motion.p key="hint" className="m-0 mono text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Opens in your email app
                  </motion.p>
                )}
              </AnimatePresence>
              <Magnetic>
                <button type="submit" className="btn btn-accent">
                  Send message <Icon name="arrow" size={16} className="arrow" />
                </button>
              </Magnetic>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
