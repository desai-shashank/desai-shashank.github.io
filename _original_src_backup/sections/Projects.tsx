import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projectsData } from '../data/portfolioData';
import { SectionWrapper } from '../components/SectionWrapper';
import { Icon } from '../components/Icon';
import { staggerContainer, fadeInUp } from '../lib/animations';

/** Placeholder project card for when no real projects are added yet */
const PlaceholderCard: React.FC<{ index: number }> = ({ index }) => {
  const placeholders = [
    {
      title: 'Your Project Here',
      description: 'Add your first project by editing the projectsData array in src/data/portfolioData.ts',
      tags: ['Technology', 'Framework', 'Tool'],
    },
    {
      title: 'Another Project',
      description: 'Each project card supports title, description, technologies, features, GitHub, and live demo links.',
      tags: ['Design', 'Development', 'Analytics'],
    },
    {
      title: 'Portfolio Piece',
      description: 'Showcase dashboards, web apps, data pipelines, or any work that demonstrates your skills.',
      tags: ['Data', 'Visualization', 'Insight'],
    },
  ];

  const p = placeholders[index % placeholders.length];

  return (
    <motion.div
      variants={fadeInUp}
      className="card-elevated p-6 relative overflow-hidden group"
    >
      {/* Placeholder indicator */}
      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
        Placeholder
      </div>

      {/* Simulated image area */}
      <div className="w-full h-36 rounded-xl bg-gradient-to-br from-white/[0.02] to-white/[0.005] border border-white/[0.04] mb-4 flex items-center justify-center">
        <Icon name="code" size={32} className="text-[var(--color-text-muted)]/30" />
      </div>

      <h3 className="text-base font-semibold text-[var(--color-text-secondary)] mb-2">
        {p.title}
      </h3>
      <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed">
        {p.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {p.tags.map((tag) => (
          <span key={tag} className="tag-pill opacity-50">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <span className="btn-secondary text-xs py-2 px-3 opacity-40 cursor-default">
          <Icon name="github" size={14} />
          GitHub
        </span>
        <span className="btn-ghost text-xs py-2 px-3 opacity-40 cursor-default">
          <Icon name="external-link" size={14} />
          Live Demo
        </span>
      </div>
    </motion.div>
  );
};

/** Real project card */
const ProjectCard: React.FC<{ project: (typeof projectsData)[0] }> = ({ project }) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="card-elevated overflow-hidden group"
    >
      {/* Project image */}
      {project.image ? (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-full h-36 bg-gradient-to-br from-[var(--color-accent-primary)]/10 to-[var(--color-accent-cyan)]/5 flex items-center justify-center">
          <Icon name="code" size={32} className="text-[var(--color-accent-secondary)]/40" />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="tag-pill">
              {tech}
            </span>
          ))}
        </div>

        {/* Features */}
        {project.features.length > 0 && (
          <ul className="mb-4 space-y-1">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="text-xs text-[var(--color-text-muted)] flex items-center gap-2"
              >
                <Icon name="check" size={12} className="text-[var(--color-accent-green)]" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Links */}
        <div className="flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs py-2 px-3"
            >
              <Icon name="github" size={14} />
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-xs py-2 px-3"
            >
              <Icon name="external-link" size={14} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const hasRealProjects = projectsData.filter((p) => !p.placeholder).length > 0;

  return (
    <SectionWrapper
      id="projects"
      label="Projects"
      title={
        <>
          Selected <span className="gradient-text">Work</span>
        </>
      }
      subtitle={
        hasRealProjects
          ? 'A selection of projects that showcase my technical capabilities.'
          : 'Projects coming soon. This section is ready for my latest work.'
      }
    >
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {hasRealProjects ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData
              .filter((p) => !p.placeholder)
              .map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
          </div>
        ) : (
          <>
            {/* Coming soon state with placeholder cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <PlaceholderCard key={i} index={i} />
              ))}
            </div>

            {/* Instruction note */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 glass-card p-5 max-w-2xl mx-auto text-center"
            >
              <p className="text-sm text-[var(--color-text-muted)]">
                <span className="text-[var(--color-accent-secondary)] font-semibold">
                  Add your projects:
                </span>{' '}
                Edit the{' '}
                <code className="text-xs bg-white/[0.04] px-1.5 py-0.5 rounded font-mono">
                  projectsData
                </code>{' '}
                array in{' '}
                <code className="text-xs bg-white/[0.04] px-1.5 py-0.5 rounded font-mono">
                  src/data/portfolioData.ts
                </code>{' '}
                to populate this section with real projects.
              </p>
            </motion.div>
          </>
        )}
      </motion.div>
    </SectionWrapper>
  );
};
