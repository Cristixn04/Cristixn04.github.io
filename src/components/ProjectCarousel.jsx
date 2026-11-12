import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { ChevronLeft, ChevronRight, ExternalLink, ArrowUpRight, Cpu, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectCarousel({ projects, onSelectProject }) {
  const { lang, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const featuredProjects = projects.filter(p => p.featured);
  const currentProject = featuredProjects[currentIndex] || featuredProjects[0];

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = featuredProjects.length - 1;
      if (nextIndex >= featuredProjects.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 320, damping: 32 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 }
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring', stiffness: 320, damping: 32 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div
      className="project-carousel-container"
      style={{
        width: '100%',
        borderRadius: '24px',
        background: 'linear-gradient(180deg, rgba(14, 20, 16, 0.75) 0%, rgba(8, 12, 10, 0.9) 100%)',
        border: '1px solid rgba(0, 229, 117, 0.2)',
        padding: 'clamp(20px, 3.5vw, 40px)',
        marginBottom: '56px',
        boxShadow: '0 24px 60px -20px rgba(0,0,0,0.85), 0 0 30px -10px rgba(0, 229, 117, 0.08)'
      }}
    >
      {/* Carousel Top Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px',
          paddingBottom: '18px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--accent-emerald)',
              background: 'rgba(0, 229, 117, 0.08)',
              border: '1px solid rgba(0, 229, 117, 0.25)',
              padding: '4px 10px',
              borderRadius: '9999px'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)' }} />
            {lang === 'es' ? 'PROYECTO DESTACADO' : 'FEATURED PROJECT'}
          </span>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-muted)'
            }}
          >
            [0{currentIndex + 1} / 0{featuredProjects.length}]
          </span>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Proyecto anterior"
            className="btn btn-secondary"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Proyecto siguiente"
            className="btn btn-secondary"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Main Slide Animated Stage */}
      <div className="carousel-stage" style={{ position: 'relative', overflow: 'hidden', minHeight: '420px' }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
              gap: '36px',
              alignItems: 'center',
              touchAction: 'pan-y'
            }}
            className="carousel-slide-grid"
          >
            {/* Visual Image Preview */}
            <div
              onClick={() => onSelectProject(currentProject)}
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#040605',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.8)'
              }}
              className="carousel-img-wrap"
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 10',
                  position: 'relative'
                }}
              >
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                {/* Stand-in Overlay Notice */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    right: '12px',
                    background: 'rgba(6, 8, 7, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <span>{lang === 'es' ? 'VISTA ARQUITECTURA' : 'SYSTEM ARCHITECTURE'}</span>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>{lang === 'es' ? 'CLIC PARA DETALLES TÉCNICOS' : 'CLICK FOR TECHNICAL DETAILS'}</span>
                </div>
              </div>
            </div>

            {/* Slide Information */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                {currentProject.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--accent-emerald)',
                      background: 'rgba(0, 229, 117, 0.06)',
                      border: '1px solid rgba(0, 229, 117, 0.2)',
                      padding: '2px 8px',
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
                  fontSize: 'clamp(24px, 2.5vw, 34px)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.025em',
                  marginBottom: '6px'
                }}
              >
                {currentProject.title}
              </h3>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'var(--accent-emerald)',
                  marginBottom: '16px'
                }}
              >
                {currentProject.subtitle}
              </div>

              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  marginBottom: '24px'
                }}
              >
                {lang === 'es' ? currentProject.summaryEs : currentProject.summaryEn}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => onSelectProject(currentProject)}
                  className="btn btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '11px 22px',
                    borderRadius: '10px',
                    background: 'var(--accent-emerald)',
                    color: '#050706',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: 'none'
                  }}
                >
                  <span>{t.projects.inspectArch}</span>
                  <ArrowUpRight size={15} />
                </button>

                {currentProject.repoUrl && (
                  <a
                    href={currentProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '11px 18px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    <GithubIcon size={16} />
                    <span>{t.projects.viewCode}</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicator Dots */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '28px'
        }}
      >
        {featuredProjects.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            aria-label={`Ir al proyecto ${idx + 1}`}
            style={{
              width: idx === currentIndex ? '32px' : '8px',
              height: '8px',
              borderRadius: '9999px',
              background: idx === currentIndex ? 'var(--accent-emerald)' : 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 200ms ease'
            }}
          />
        ))}
      </div>
    </div>
  );
}
