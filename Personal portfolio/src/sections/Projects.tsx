import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { projectsData, type Project } from '../data/portfolioData';
import { SectionHead, fadeUp, stagger } from '../components/Reveal';
import { Icon } from '../components/Icon';

/** Card that tilts toward the cursor in 3D. */
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <motion.article variants={fadeUp} style={{ perspective: 1000 }}>
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry }}
        className="group relative glass glass-hover overflow-hidden h-full flex flex-col"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-surface-2)] dotgrid">
          {project.image ? (
            <img
              src={project.image}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center display text-[7rem] outline-text">
              {String(index + 1).padStart(2, '0')}
            </div>
          )}
        </div>
        <div className="p-7 flex flex-col gap-4 flex-1">
          <h3 className="m-0 text-2xl font-bold tracking-tight">{project.title}</h3>
          <p className="m-0 text-dim">{project.description}</p>
          {project.features.length > 0 && (
            <ul className="m-0 p-0 list-none space-y-1.5">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 text-dim text-[0.95rem]">
                  <span className="text-accent">→</span>{f}
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {project.technologies.map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
          <div className="flex gap-5 pt-2">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex items-center gap-1.5">
                Live <Icon name="external" size={14} />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex items-center gap-1.5">
                Code <Icon name="github" size={14} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};

export const Projects: React.FC = () => {
  if (projectsData.length === 0) return null;
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <SectionHead index="06" label="Projects" title="Selected" accent="work." />
        <motion.div
          className="grid gap-5 md:grid-cols-2"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {projectsData.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </motion.div>
      </div>
    </section>
  );
};
