import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { projectsData } from '../data/projects';
import ProjectModal from './ProjectModal';
import ProjectCarousel from './ProjectCarousel';
import { ExternalLink, ArrowUpRight, Code2, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Projects() {
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { id: 'all', label: t.projects.filterAll },
    { id: 'backend', label: t.projects.filterBackend },
    { id: 'ai', label: t.projects.filterAi },
    { id: 'desktop', label: t.projects.filterDesktop },
    { id: 'web', label: t.projects.filterWeb }
  ];

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <section
      id="proyectos"
      className="section projects-section"
      style={{
        padding: '110px 0',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div className="container" style={{ maxWidth: '1560px', margin: '0 auto', padding: '0 clamp(20px, 3.5vw, 48px)' }}>
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          style={{ marginBottom: '36px' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--accent-emerald)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}
          >
            {t.projects.tag}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-main)',
              fontSize: 'clamp(30px, 4vw, 50px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              marginBottom: '10px'
            }}
          >
            {t.projects.title}
          </h2>
          <p
            style={{
              fontSize: '15.5px',
              color: 'var(--text-secondary)',
              maxWidth: '720px',
              lineHeight: 1.6
            }}
          >
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Featured Projects Interactive Motion Carousel */}
        <ProjectCarousel
          projects={projectsData}
          onSelectProject={setSelectedProject}
        />

        {/* Filter Tabs with Motion Layout Animation */}
        <div
          className="projects-filter-wrapper"
          style={{
            marginBottom: '32px'
          }}
        >
          {/* Header Row: Filter Label and Project Count Badge */}
          <div
            className="projects-filter-header"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent-emerald)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              // {lang === 'es' ? 'FILTRAR POR CATEGORÍA' : 'FILTER BY CATEGORY'}
            </span>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent-emerald)',
                background: 'rgba(0, 229, 117, 0.06)',
                border: '1px solid rgba(0, 229, 117, 0.18)',
                padding: '4px 10px',
                borderRadius: '6px'
              }}
            >
              [0{filteredProjects.length} PROYECTOS]
            </div>
          </div>

          {/* Filter Pills with Horizontal Scroll & No Edge Clipping */}
          <div
            className="project-filters-track"
            style={{
              position: 'relative',
              width: '100%'
            }}
          >
            <div
              className="project-filters"
              style={{
                display: 'flex',
                gap: '8px',
                padding: '6px 8px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {filters.map((f) => {
                const isActive = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActiveFilter(f.id)}
                    className={`filter-btn ${isActive ? 'active' : ''}`}
                    style={{
                      position: 'relative',
                      background: 'transparent',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 500,
                      fontFamily: 'var(--font-main)',
                      color: isActive ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      transition: 'color 160ms ease'
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 1 }}>{f.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterTab"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0, 229, 117, 0.1)',
                          border: '1px solid rgba(0, 229, 117, 0.28)',
                          borderRadius: '8px',
                          zIndex: 0
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Projects Grid Expanded */}
        <motion.div
          layout
          className="projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '24px'
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="project-card"
                onClick={() => setSelectedProject(project)}
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 200ms ease, box-shadow 200ms ease, transform 180ms ease'
                }}
              >
                {/* Image Wrap */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 10',
                    background: '#040605',
                    overflow: 'hidden',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 350ms cubic-bezier(0.23, 1, 0.32, 1)'
                    }}
                    className="project-thumb"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(6, 8, 7, 0.85)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '9999px',
                      padding: '4px 10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--accent-emerald)',
                      border: '1px solid rgba(0, 229, 117, 0.2)'
                    }}
                  >
                    {project.category.toUpperCase()}
                  </div>
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    {/* Tags */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        marginBottom: '12px'
                      }}
                    >
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            color: 'var(--text-secondary)',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            padding: '3px 8px',
                            borderRadius: '4px'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '19px',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: '4px'
                      }}
                    >
                      {project.title}
                    </h3>

                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        color: 'var(--accent-emerald)',
                        marginBottom: '10px'
                      }}
                    >
                      {project.subtitle}
                    </div>

                    <p
                      style={{
                        fontSize: '13.5px',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.55,
                        marginBottom: '20px'
                      }}
                    >
                      {lang === 'es' ? project.summaryEs : project.summaryEn}
                    </p>
                  </div>

                  {/* Card Bottom Actions */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '12.5px',
                        fontWeight: 500,
                        color: 'var(--accent-emerald)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>{t.projects.inspectArch}</span>
                      <ArrowUpRight size={14} />
                    </span>

                    <div
                      style={{ display: 'flex', gap: '10px' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver código de ${project.title}`}
                          style={{
                            color: 'var(--text-secondary)',
                            transition: 'color 140ms ease'
                          }}
                          className="icon-link"
                        >
                          <GithubIcon size={16} />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver demo en vivo de ${project.title}`}
                          style={{
                            color: 'var(--text-secondary)',
                            transition: 'color 140ms ease'
                          }}
                          className="icon-link"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Conditionally Rendered Modal with Escape and Cleanup */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
