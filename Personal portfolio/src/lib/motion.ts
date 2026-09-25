/**
 * Single source of truth for "should we tone the motion down?".
 *
 * Follows the OS setting (on Windows: Settings → Accessibility → Visual
 * effects → Animation effects). Add ?motion=full to the URL to preview
 * the full experience regardless of that setting.
 */
export const reducedMotion = (() => {
  if (typeof window === 'undefined') return false;
  if (new URLSearchParams(window.location.search).get('motion') === 'full') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
})();

if (typeof document !== 'undefined') {
  document.documentElement.classList.toggle('reduce-motion', reducedMotion);
}
