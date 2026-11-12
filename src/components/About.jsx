import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { Database, Cpu, Layout, Server, ShieldCheck, Globe } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();

  const iconMap = [
    <Server size={20} color="var(--accent-emerald)" />,
    <Database size={20} color="var(--accent-emerald)" />,
    <Layout size={20} color="var(--accent-emerald)" />,
    <Cpu size={20} color="var(--accent-emerald)" />
  ];

  return (
    <section
      id="sobre-mi"
      className="section about-section"
      style={{
        padding: '110px 24px',
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
          style={{ marginBottom: '48px' }}
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
            {t.about.tag}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-main)',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              marginBottom: '10px'
            }}
          >
            {t.about.title}
          </h2>
        </motion.div>

        {/* Content Layout: 2 Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
            gap: '48px',
            alignItems: 'start'
          }}
          className="about-grid"
        >
          {/* Left Column: Bio Narrative & Languages */}
          <motion.div
            className="about-bio-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}
          >
            <p
              style={{
                fontSize: '16.5px',
                lineHeight: 1.7,
                color: 'var(--text-primary)',
                margin: 0
              }}
            >
              {t.about.bio1}
            </p>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                margin: 0
              }}
            >
              {t.about.bio2}
            </p>

            {/* Languages Card from CV */}
            <div
              className="about-languages-card"
              style={{
                marginTop: '6px',
                padding: '20px 22px',
                borderRadius: '14px',
                background: 'rgba(14, 20, 16, 0.85)',
                border: '1px solid rgba(0, 229, 117, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe size={17} color="var(--accent-emerald)" />
                  <span
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--text-primary)'
                    }}
                  >
                    {t.about.languagesTitle}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10.5px',
                    color: 'var(--accent-emerald)',
                    background: 'rgba(0, 229, 117, 0.08)',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}
                >
                  CV VERIFIED
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                {t.about.languages.map((l, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{l.name}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-emerald)' }}>{l.level}</span>
                    </div>
                    {/* Micro Progress Bar */}
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: l.pct,
                          height: '100%',
                          background: 'var(--accent-emerald)',
                          borderRadius: '9999px'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Highlights Bar */}
            <div
              className="about-quality-bar"
              style={{
                padding: '18px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <ShieldCheck size={28} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}
                >
                  Compromiso de Calidad & Arquitectura Limpia
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    marginTop: '2px'
                  }}
                >
                  Servicios Docker reproducibles · Tipado estricto · Pruebas y validaciones
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Focus Matrix */}
          <motion.div
            className="about-focus-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '16px'
            }}
          >
            {t.about.focusItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '20px',
                  borderRadius: '14px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  transition: 'border-color 160ms ease, transform 160ms ease'
                }}
                className="focus-card"
              >
                <div
                  style={{
                    padding: '10px',
                    borderRadius: '10px',
                    background: 'rgba(0, 229, 117, 0.08)',
                    border: '1px solid rgba(0, 229, 117, 0.2)',
                    flexShrink: 0
                  }}
                >
                  {iconMap[idx % iconMap.length]}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '15.5px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '4px'
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '13.5px',
                      lineHeight: 1.55,
                      color: 'var(--text-secondary)',
                      margin: 0
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
