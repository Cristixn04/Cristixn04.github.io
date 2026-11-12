import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import HeroScene from './HeroScene';
import { ArrowDownRight, Users, FileText, CheckCircle2, ShieldCheck, Database, Cpu, MapPin } from 'lucide-react';

export default function Hero({ isIntroActive = false }) {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] }
    }
  };

  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 24px 80px',
        overflow: 'hidden'
      }}
    >
      {/* Three.js Bespoke Kinetic Core with Scroll Disassembly/Reassembly (only active when intro is dismissed) */}
      {!isIntroActive && <HeroScene />}

      {/* Grid Pattern Ground Accent */}
      <div
        className="hero-grid-pattern"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 65% 55% at 50% 45%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 45%, #000 40%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div
        className="container"
        style={{
          maxWidth: '1560px',
          margin: '0 auto',
          padding: '0 clamp(20px, 3.5vw, 48px)',
          position: 'relative',
          zIndex: 1,
          width: '100%'
        }}
      >
        <motion.div
          className="hero-layout"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.85fr)',
            gap: '48px',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Lead & Action */}
          <div className="hero-text-col">
            {/* Live Operational Status */}
            <motion.div variants={itemVariants} className="hero-status-wrap" style={{ marginBottom: '20px' }}>
              <div
                className="status-pill"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  background: 'rgba(0, 229, 117, 0.06)',
                  border: '1px solid rgba(0, 229, 117, 0.22)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: 'var(--accent-emerald)'
                }}
              >
                <span
                  className="status-dot-pulse"
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-emerald)',
                    boxShadow: '0 0 10px var(--accent-emerald)'
                  }}
                />
                {t.hero.statusBadge}
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="hero-headline"
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(36px, 5.2vw, 64px)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                color: 'var(--text-primary)',
                marginBottom: '18px'
              }}
            >
              {t.hero.greeting}
            </motion.h1>

            {/* Sub-role */}
            <motion.div
              variants={itemVariants}
              className="hero-subrole"
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(18px, 2.2vw, 24px)',
                fontWeight: 500,
                color: 'var(--accent-emerald)',
                marginBottom: '20px',
                letterSpacing: '-0.01em'
              }}
            >
              {t.hero.titleRole}
            </motion.div>

            {/* Detailed statement */}
            <motion.p
              variants={itemVariants}
              className="hero-bio-desc"
              style={{
                fontSize: 'clamp(15px, 1.1vw, 17px)',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                maxWidth: '720px',
                marginBottom: '36px'
              }}
            >
              {t.hero.desc}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="hero-buttons-group"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                alignItems: 'center',
                marginBottom: '48px'
              }}
            >
              <button
                type="button"
                onClick={() => scrollTo('proyectos')}
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--accent-emerald)',
                  color: '#050706',
                  fontWeight: 600,
                  fontSize: '14px',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span>{t.hero.primaryAction}</span>
                <ArrowDownRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('blandas')}
                className="btn btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  fontSize: '14px',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer'
                }}
              >
                <Users size={15} color="var(--accent-emerald)" />
                <span>{t.hero.secondaryAction}</span>
              </button>

              <a
                href="docs/CV_Cristian_Munoz.pdf"
                download="CV_Cristian_Munoz.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                  fontSize: '14px',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  border: '1px solid transparent',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
              >
                <FileText size={15} />
                <span>{t.hero.downloadCv}</span>
              </a>
            </motion.div>

            {/* Verified Metrics Row */}
            <motion.div
              variants={itemVariants}
              className="hero-metrics-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '16px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.07)',
                maxWidth: '820px'
              }}
            >
              {t.hero.verifiedMetrics.map((m, i) => (
                <div key={i} className="metric-cell">
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '4px'
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '2px'
                    }}
                  >
                    {m.val}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--accent-emerald)',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {m.detail}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Elevated HUD Profile Frame */}
          <motion.div
            variants={itemVariants}
            className="hero-visual-col"
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {/* Ambient Background Glow behind card */}
            <div
              style={{
                position: 'absolute',
                inset: '-20px',
                background: 'radial-gradient(circle at 50% 50%, rgba(0, 229, 117, 0.14) 0%, transparent 68%)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            <div
              className="profile-craft-card"
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '440px',
                borderRadius: '20px',
                padding: '20px',
                background: 'rgba(11, 15, 13, 0.88)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 24px 70px -15px rgba(0, 0, 0, 0.85), 0 0 50px -10px rgba(0, 229, 117, 0.12)'
              }}
            >
              {/* HUD Corner Brackets */}
              <svg className="hud-corner-bracket" width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ position: 'absolute', top: '-1px', left: '-1px', pointerEvents: 'none' }}>
                <path d="M0 12V0H12" stroke="#00e575" strokeWidth="2.5" />
              </svg>
              <svg className="hud-corner-bracket" width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ position: 'absolute', top: '-1px', right: '-1px', pointerEvents: 'none' }}>
                <path d="M18 12V0H6" stroke="#00e575" strokeWidth="2.5" />
              </svg>
              <svg className="hud-corner-bracket" width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ position: 'absolute', bottom: '-1px', left: '-1px', pointerEvents: 'none' }}>
                <path d="M0 6V18H12" stroke="#00e575" strokeWidth="2.5" />
              </svg>
              <svg className="hud-corner-bracket" width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ position: 'absolute', bottom: '-1px', right: '-1px', pointerEvents: 'none' }}>
                <path d="M18 6V18H6" stroke="#00e575" strokeWidth="2.5" />
              </svg>

              {/* HUD Top Metadata Header */}
              <div
                className="hud-header"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '14px',
                  marginBottom: '14px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  gap: '8px'
                }}
              >
                <div className="hud-id-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flexShrink: 0 }}>
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: 'var(--accent-emerald)',
                      boxShadow: '0 0 8px var(--accent-emerald)',
                      flexShrink: 0
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    SYS_ID // CCM-04
                  </span>
                </div>

                <div
                  className="hud-coords-wrap"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10.5px',
                    color: 'var(--accent-emerald)',
                    background: 'rgba(0, 229, 117, 0.08)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(0, 229, 117, 0.2)',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  7°04'N 73°07'W
                </div>
              </div>

              {/* Photo Frame Container with Inner HUD Frame */}
              <div
                className="hud-photo-container"
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  background: '#070a08',
                  border: '1px solid rgba(0, 229, 117, 0.25)',
                  boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.8)'
                }}
              >
                <img
                  src="img/cristian.png"
                  alt="Cristian Camilo Muñoz Rodríguez - Full Stack Developer"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.05) brightness(0.99)'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Corner crosshairs inside photo */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'rgba(0, 229, 117, 0.75)',
                    pointerEvents: 'none'
                  }}
                >
                  +
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'rgba(0, 229, 117, 0.75)',
                    pointerEvents: 'none'
                  }}
                >
                  +
                </div>

                {/* Subtle vignette layer */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    boxShadow: 'inset 0 0 35px rgba(0,0,0,0.6)',
                    pointerEvents: 'none'
                  }}
                />
              </div>

              {/* Technical Badge Overlay Bottom */}
              <div
                className="hud-bottom-badge"
                style={{
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  gap: '8px'
                }}
              >
                <div className="hud-badge-left" style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flexShrink: 0 }}>
                  <ShieldCheck size={16} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Backend & Docker
                  </span>
                </div>
                <span
                  className="hud-badge-status"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10.5px',
                    color: 'var(--accent-emerald)',
                    background: 'rgba(0, 229, 117, 0.1)',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontWeight: 600,
                    border: '1px solid rgba(0, 229, 117, 0.25)',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  STATUS: VERIFIED
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
