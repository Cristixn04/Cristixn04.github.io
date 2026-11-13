import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectCarousel({ projects, onSelectProject }) {
  const { lang, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const startXRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const dragStartTimeRef = useRef(0);
  const isDraggingRef = useRef(false);
  const rafIdRef = useRef(null);
  const wheelCooldownRef = useRef(false);

  const featuredProjects = projects.filter((p) => p.featured);
  const total = featuredProjects.length || 1;
  const currentProject = featuredProjects[currentIndex] || featuredProjects[0];

  const stepSize = isMobile ? 150 : 340;

  // Mobile detection for dynamic 3D perspective & offsets
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const paginate = useCallback((newDirection) => {
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = total - 1;
      if (nextIndex >= total) nextIndex = 0;
      return nextIndex;
    });
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  // Cinema Cue Sheet metadata matching reference (media_1794532946949.png)
  const projectCues = [
    {
      code: 'CF26-01',
      time: '2026 // IA CAMPUS',
      shortTitle: 'OPSCENTER',
      tech: 'CAMPUS AI & QR'
    },
    {
      code: 'CF26-02',
      time: '2026 // DDD SPRING',
      shortTitle: 'RENTATOOLS',
      tech: 'HEXAGONAL & 4FN'
    },
    {
      code: 'CF26-03',
      time: '2026 // 3072D RAG',
      shortTitle: 'PADDOCK F1',
      tech: 'VECTOR ENGINE'
    }
  ];

  // Shortest circular offset for 3 items
  const getCircularOffset = (index) => {
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  // Continuous offset tracking cursor displacement
  const getContinuousOffset = (index) => {
    const baseOffset = getCircularOffset(index);
    return baseOffset + dragX / stepSize;
  };

  const getX = (dCont) => {
    return dCont * stepSize;
  };

  const getZ = (dCont) => {
    return Math.max(isMobile ? -90 : -140, -Math.abs(dCont) * (isMobile ? 80 : 130));
  };

  const getRotateY = (dCont) => {
    if (shouldReduceMotion) return 0;
    return Math.max(-42, Math.min(42, -dCont * (isMobile ? 32 : 38)));
  };

  const getScale = (dCont) => {
    return Math.max(isMobile ? 0.74 : 0.8, 1 - Math.abs(dCont) * (isMobile ? 0.24 : 0.18));
  };

  const getOpacity = (dCont) => {
    return Math.max(isMobile ? 0.45 : 0.55, 1 - Math.abs(dCont) * 0.45);
  };

  const handlePointerDown = (e) => {
    if (e.target.closest('button.btn, a.btn, .cue-cell')) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX;
    dragDistanceRef.current = 0;
    dragStartTimeRef.current = performance.now();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const diff = e.clientX - startXRef.current;
    dragDistanceRef.current = Math.abs(diff);

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => {
      setDragX(diff);
    });
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

    const diff = e.clientX - startXRef.current;
    const elapsed = Math.max(1, performance.now() - dragStartTimeRef.current);
    const velocity = (diff / elapsed) * 1000;

    setDragX(0);

    const threshold = isMobile ? 30 : 55;
    const velocityThreshold = 250;

    if (diff < -threshold || velocity < -velocityThreshold) {
      paginate(1);
    } else if (diff > threshold || velocity > velocityThreshold) {
      paginate(-1);
    }

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handleWheel = (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
    if (Math.abs(delta) > 18 && !wheelCooldownRef.current) {
      wheelCooldownRef.current = true;
      if (delta > 0) {
        paginate(1);
      } else {
        paginate(-1);
      }
      setTimeout(() => {
        wheelCooldownRef.current = false;
      }, 350);
    }
  };

  return (
    <div
      className="project-carousel-container coverflow-container"
      style={{
        width: '100%',
        background: 'transparent',
        border: 'none',
        borderRadius: 0,
        boxShadow: 'none',
        padding: 0,
        marginBottom: '48px',
        position: 'relative',
        overflow: 'visible'
      }}
    >
      {/* ── Top Header Section (matching media_1794532946949.png) ── */}
      <div
        className="coverflow-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '20px',
          marginBottom: '28px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.07)'
        }}
      >
        {/* Left: Headline & Monospace System Tag */}
        <div className="coverflow-header-left" style={{ flex: '1 1 360px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent-emerald)',
                boxShadow: '0 0 8px var(--accent-emerald)'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--accent-emerald)',
                letterSpacing: '0.08em'
              }}
            >
              {lang === 'es' ? 'PROYECTOS DESTACADOS // COVERFLOW REEL' : 'FEATURED PROJECTS // COVERFLOW REEL'}
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-main)',
              fontSize: 'clamp(24px, 3.4vw, 38px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              textTransform: 'uppercase',
              margin: 0
            }}
          >
            GALLERY COVERFLOW
          </h3>
        </div>

        {/* Right: Active Project Metadata Readout */}
        <div
          className="coverflow-header-right"
          style={{
            flex: '1 1 320px',
            textAlign: isMobile ? 'left' : 'right'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isMobile ? 'flex-start' : 'flex-end',
              gap: '14px',
              marginBottom: '6px'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11.5px',
                fontWeight: 700,
                color: 'var(--accent-emerald)',
                letterSpacing: '0.08em'
              }}
            >
              {projectCues[currentIndex]?.code || `CF26-0${currentIndex + 1}`}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11.5px',
                color: 'var(--text-muted)'
              }}
            >
              0{currentIndex + 1} / 0{total}
            </span>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-main)',
              fontSize: 'clamp(18px, 2vw, 22px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '4px',
              lineHeight: 1.2
            }}
          >
            {currentProject.title}
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              lineHeight: 1.4
            }}
          >
            {currentProject.subtitle}
          </div>
        </div>
      </div>

      {/* ── 3D Coverflow Stage (Interactive Drag-to-Scroll Reel) ── */}
      <div
        className="coverflow-stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        style={{
          position: 'relative',
          width: '100%',
          height: isMobile ? '290px' : '440px',
          perspective: isMobile ? '850px' : '1200px',
          perspectiveOrigin: '50% 50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'pan-y'
        }}
      >
        {featuredProjects.map((project, idx) => {
          const dCont = getContinuousOffset(idx);
          const circularOffset = getCircularOffset(idx);
          const isCenter = Math.abs(dCont) < 0.35;

          return (
            <motion.div
              key={project.id}
              animate={{
                x: getX(dCont),
                z: getZ(dCont),
                rotateY: getRotateY(dCont),
                scale: getScale(dCont),
                opacity: getOpacity(dCont),
                filter: `brightness(${Math.max(0.45, 1 - Math.abs(dCont) * 0.45)})`
              }}
              transition={
                isDragging
                  ? { duration: 0 }
                  : {
                      type: 'spring',
                      stiffness: 280,
                      damping: 28,
                      mass: 0.9
                    }
              }
              onClick={() => {
                if (dragDistanceRef.current > 6) return;
                if (circularOffset !== 0) {
                  setCurrentIndex(idx);
                } else {
                  onSelectProject(project);
                }
              }}
              style={{
                position: 'absolute',
                width: isMobile ? 'clamp(270px, 78vw, 340px)' : 'clamp(460px, 50vw, 660px)',
                aspectRatio: '16 / 10',
                borderRadius: isMobile ? '14px' : '18px',
                overflow: 'hidden',
                background: '#040605',
                border: isCenter
                  ? '1px solid rgba(0, 229, 117, 0.45)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: isCenter
                  ? '0 24px 60px -15px rgba(0, 0, 0, 0.92), 0 0 40px -10px rgba(0, 229, 117, 0.22)'
                  : '0 12px 35px -10px rgba(0, 0, 0, 0.8)',
                zIndex: Math.round(20 - Math.abs(dCont) * 10),
                cursor: circularOffset === 0 ? (isDragging ? 'grabbing' : 'pointer') : 'pointer',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Project Screenshot Still */}
              <img
                src={project.image}
                alt={project.title}
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              {/* Ambient Film Reflection & Bottom Shade */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: isCenter
                    ? 'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(4, 6, 5, 0.88) 100%)'
                    : 'linear-gradient(180deg, rgba(4, 6, 5, 0.3) 0%, rgba(4, 6, 5, 0.8) 100%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Center Slide Action Overlay */}
              {isCenter && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: isMobile ? '10px 12px' : '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '8px',
                    zIndex: 20
                  }}
                  onPointerDownCapture={(e) => e.stopPropagation()}
                >
                  {/* Architecture Tag */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: isMobile ? '9.5px' : '11px',
                        color: 'var(--accent-emerald)',
                        background: 'rgba(0, 229, 117, 0.1)',
                        border: '1px solid rgba(0, 229, 117, 0.3)',
                        padding: isMobile ? '2px 6px' : '3px 8px',
                        borderRadius: '4px',
                        letterSpacing: '0.04em',
                        fontWeight: 600
                      }}
                    >
                      {lang === 'es' ? 'VISTA ARQUITECTURA' : 'SYSTEM ARCHITECTURE'}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="btn btn-primary"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: isMobile ? '7px 12px' : '9px 18px',
                        borderRadius: '8px',
                        background: 'var(--accent-emerald)',
                        color: '#050706',
                        fontSize: isMobile ? '11px' : '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        border: 'none',
                        boxShadow: '0 0 15px rgba(0, 229, 117, 0.3)'
                      }}
                    >
                      <span>{t.projects.inspectArch}</span>
                      <ArrowUpRight size={isMobile ? 13 : 15} />
                    </button>

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-secondary"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: isMobile ? '7px 10px' : '9px 14px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.14)',
                          color: 'var(--text-primary)',
                          fontSize: isMobile ? '11px' : '12px',
                          fontWeight: 600,
                          textDecoration: 'none'
                        }}
                      >
                        <GithubIcon size={isMobile ? 14 : 15} />
                        <span>{t.projects.viewCode}</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Side Slide Click-to-Focus Indicator */}
              {!isCenter && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(4, 6, 5, 0.45)',
                    transition: 'background 200ms ease'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: isMobile ? '10px' : '11.5px',
                      color: 'var(--text-primary)',
                      background: 'rgba(6, 8, 7, 0.85)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {project.title}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── Bottom Cue Sheet / Filmstrip Table (matching media_1794532946949.png) ── */}
      <div className="coverflow-cue-table">
        {featuredProjects.map((project, idx) => {
          const isActive = idx === currentIndex;
          const cue = projectCues[idx] || {
            code: `CF26-0${idx + 1}`,
            time: '2026',
            shortTitle: project.title.toUpperCase(),
            tech: 'SOFTWARE'
          };

          return (
            <button
              key={project.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`cue-cell ${isActive ? 'active' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: '5px',
                padding: '14px 18px',
                background: isActive
                  ? 'linear-gradient(180deg, rgba(0, 229, 117, 0.12) 0%, rgba(0, 229, 117, 0.03) 100%)'
                  : 'transparent',
                border: 'none',
                borderRight: idx < total - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                borderTop: isActive ? '2px solid var(--accent-emerald)' : '2px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 200ms ease',
                outline: 'none',
                position: 'relative',
                boxShadow: isActive ? 'inset 0 1px 0 rgba(0, 229, 117, 0.4)' : 'none'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  gap: '8px'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: isActive ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                    letterSpacing: '0.04em'
                  }}
                >
                  0{idx + 1} {cue.shortTitle}
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10.5px',
                    color: isActive ? 'var(--accent-emerald)' : 'var(--text-muted)'
                  }}
                >
                  {cue.time}
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%'
                }}
              >
                {cue.tech}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
