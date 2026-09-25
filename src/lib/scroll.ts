import Lenis from 'lenis';
import { reducedMotion } from './motion';

let lenis: Lenis | null = null;

/** Starts inertial smooth scrolling. Returns a cleanup function. */
export function startSmoothScroll() {
  if (reducedMotion) return () => {};

  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
  let frame = 0;
  const raf = (time: number) => {
    lenis?.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(frame);
    lenis?.destroy();
    lenis = null;
  };
}

/** Scrolls to a "#id" target (or the top), using Lenis when it is running. */
export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === 'string' ? -24 : 0 });
    return;
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}

export function lockScroll(locked: boolean) {
  if (lenis) (locked ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}
