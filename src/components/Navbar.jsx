import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { id: 'sobre-mi', label: t.nav.about },
    { id: 'proyectos', label: t.nav.projects },
    { id: 'blandas', label: t.nav.softSkills },
    { id: 'habilidades', label: t.nav.skills },
    { id: 'educacion', label: t.nav.education },
    { id: 'contacto', label: t.nav.contact }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'sobre-mi', 'proyectos', 'blandas', 'habilidades', 'educacion', 'contacto'];
      const scrollPos = window.scrollY + 180;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`nav-header ${scrolled ? 'nav-scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          padding: '16px 20px',
          pointerEvents: 'none'
        }}
      >
        <div
          className="nav-capsule"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            maxWidth: '1480px',
            width: '100%',
            height: '52px',
            padding: '0 24px',
            borderRadius: '9999px',
            background: 'rgba(10, 14, 12, 0.78)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 12px 32px -8px rgba(0, 0, 0, 0.65)',
            transition: 'border-color 200ms ease, box-shadow 200ms ease'
          }}
        >
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => scrollTo('hero')}
            className="nav-logo"
            aria-label="Cristian Muñoz Portfolio Home"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: 'var(--text-primary)'
            }}
          >
            <span style={{ color: 'var(--accent-emerald)' }}>&lt;</span>
            CCM
            <span style={{ color: 'var(--accent-emerald)' }}>/&gt;</span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="nav-desktop-links" aria-label="Main Navigation">
            <ul
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                listStyle: 'none',
                margin: 0,
                padding: 0
              }}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id} style={{ position: 'relative' }}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.id)}
                      className={`nav-link-btn ${isActive ? 'active' : ''}`}
                      style={{
                        position: 'relative',
                        zIndex: 1,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '6px 14px',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: isActive ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                        transition: 'color 160ms var(--ease-out)',
                        fontFamily: 'var(--font-main)'
                      }}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '9999px',
                            background: 'rgba(0, 229, 117, 0.08)',
                            border: '1px solid rgba(0, 229, 117, 0.22)',
                            zIndex: -1
                          }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions: Language Toggle + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Language Switch */}
            <div
              className="lang-switcher"
              role="group"
              aria-label="Language"
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '2px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px'
              }}
            >
              <button
                type="button"
                onClick={() => setLang('es')}
                aria-pressed={lang === 'es'}
                style={{
                  background: lang === 'es' ? 'var(--accent-emerald)' : 'transparent',
                  color: lang === 'es' ? '#040605' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '3px 8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 150ms ease, color 150ms ease'
                }}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                style={{
                  background: lang === 'en' ? 'var(--accent-emerald)' : 'transparent',
                  color: lang === 'en' ? '#040605' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '3px 8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 150ms ease, color 150ms ease'
                }}
              >
                EN
              </button>
            </div>

            {/* Resume button */}
            <a
              href="docs/CV_Cristian_Munoz.pdf"
              download="CV_Cristian_Munoz.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cv-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-emerald)',
                background: 'rgba(0, 229, 117, 0.08)',
                border: '1px solid rgba(0, 229, 117, 0.25)',
                padding: '5px 12px',
                borderRadius: '9999px',
                textDecoration: 'none',
                transition: 'transform 140ms var(--ease-out), background-color 160ms var(--ease-out)'
              }}
            >
              <span>{t.nav.resume}</span>
              <ArrowUpRight size={13} />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '6px'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(6, 8, 7, 0.94)',
              display: 'flex',
              flexDirection: 'column',
              padding: '90px 24px 32px',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--accent-emerald)',
                  letterSpacing: '0.12em',
                  marginBottom: '16px'
                }}
              >
                // NAVEGACIÓN
              </div>

              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.2 }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    padding: '14px 0',
                    fontSize: '20px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-main)',
                    color: activeSection === link.id ? 'var(--accent-emerald)' : 'var(--text-primary)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={16} color="var(--text-muted)" />
                </motion.button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a
                href="docs/CV_Cristian_Munoz.pdf"
                download="CV_Cristian_Munoz.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'var(--accent-emerald)',
                  color: '#050706',
                  fontWeight: 600,
                  fontSize: '15px',
                  textDecoration: 'none'
                }}
              >
                <span>{t.hero.downloadCv}</span>
                <ArrowUpRight size={16} />
              </a>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  textAlign: 'center'
                }}
              >
                STATUS: DISPONIBLE · FLORIDABLANCA, COLOMBIA
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
