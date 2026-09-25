import React from 'react';

export type IconName =
  | 'arrow' | 'arrow-down' | 'arrow-up' | 'download' | 'copy' | 'check'
  | 'linkedin' | 'github' | 'mail' | 'phone' | 'pin' | 'external';

/** Minimal inline icon set, stroked to match the type weight. */
export const Icon: React.FC<{ name: IconName; size?: number; className?: string }> = ({
  name,
  size = 18,
  className = '',
}) => {
  const p = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  };

  switch (name) {
    case 'arrow':
      return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case 'arrow-down':
      return <svg {...p}><path d="M12 5v14M6 13l6 6 6-6" /></svg>;
    case 'arrow-up':
      return <svg {...p}><path d="M12 19V5M6 11l6-6 6 6" /></svg>;
    case 'external':
      return <svg {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>;
    case 'download':
      return <svg {...p}><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>;
    case 'copy':
      return <svg {...p}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>;
    case 'check':
      return <svg {...p}><path d="m5 12 5 5 9-10" /></svg>;
    case 'mail':
      return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
    case 'phone':
      return <svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>;
    case 'pin':
      return <svg {...p}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>;
    case 'linkedin':
      return (
        <svg {...p} fill="currentColor" stroke="none">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5c0-1.2-.02-2.73-1.67-2.73-1.66 0-1.92 1.3-1.92 2.64V21h-4z" />
        </svg>
      );
    case 'github':
      return (
        <svg {...p} fill="currentColor" stroke="none">
          <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
        </svg>
      );
  }
};
