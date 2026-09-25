import React from 'react';

/** Infinite ticker. Content is rendered twice so the loop is seamless. */
export const Marquee: React.FC<{ items: string[]; reverse?: boolean; duration?: number; className?: string }> = ({
  items,
  reverse,
  duration = 40,
  className = '',
}) => {
  const track = (hidden: boolean) => (
    <div className="marquee-track !gap-3 !pr-3" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <span className="chip !text-[0.95rem] !px-4 !py-1.5 !bg-white/70">{item}</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee ${reverse ? 'reverse' : ''} ${className}`}
      style={{ ['--dur' as string]: `${duration}s` }}
    >
      {track(false)}
      {track(true)}
    </div>
  );
};
