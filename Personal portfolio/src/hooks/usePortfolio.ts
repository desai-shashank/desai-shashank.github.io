import { useEffect, useState } from 'react';
import { siteConfig } from '../data/portfolioData';

/** Tracks which section is currently in the viewport for nav highlighting */
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    ['home', ...sectionIds].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}

/** Live clock for a given IANA time zone, e.g. "4:07 PM". */
export function useLocalTime(timeZone = 'America/Toronto') {
  const format = () =>
    new Intl.DateTimeFormat('en-CA', { hour: 'numeric', minute: '2-digit', timeZone }).format(new Date());
  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 15_000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);

  return time;
}

/**
 * True once we have confirmed a real PDF lives at siteConfig.resumePath.
 * (The dev server answers every unknown path with index.html, so a plain
 * status check isn't enough — we look at the content type.)
 */
export function useResumeAvailable() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(siteConfig.resumePath, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled) setAvailable(res.ok && (res.headers.get('content-type') ?? '').includes('pdf'));
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return available;
}
