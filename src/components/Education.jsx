import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { GraduationCap, Award, BookOpen, CheckCircle2 } from 'lucide-react';

export default function Education() {
  const { t } = useLanguage();

  const iconMap = [
    <GraduationCap size={20} color="var(--accent-emerald)" />,
    <Award size={20} color="var(--accent-emerald)" />,
    <BookOpen size={20} color="var(--accent-emerald)" />
  ];

  return (
    <section
      id="educacion"
      className="section education-section"
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
          style={{ marginBottom: '52px' }}
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
            {t.education.tag}
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
            {t.education.title}
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div
          className="timeline-track"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '36px',
            maxWidth: '1240px'
          }}
        >
          {/* Vertical Connecting Line with Emerald Gradient */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              bottom: '24px',
              left: '23px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--accent-emerald) 0%, rgba(0, 229, 117, 0.35) 60%, rgba(255, 255, 255, 0.08) 100%)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />

          {t.education.items.map((item, idx) => (
            <motion.div
              key={idx}
              className="timeline-item-row"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.23, 1, 0.32, 1] }}
              style={{
                position: 'relative',
                display: 'flex',
                gap: '28px',
                alignItems: 'flex-start'
              }}
            >
              {/* Timeline Dynamic Illuminated Node on Scroll */}
              <motion.div
                initial={{ scale: 0.8, borderColor: 'rgba(255, 255, 255, 0.15)', boxShadow: 'none' }}
                whileInView={{ 
                  scale: 1, 
                  borderColor: 'var(--accent-emerald)', 
                  boxShadow: '0 0 24px rgba(0, 229, 117, 0.5), inset 0 0 8px rgba(0, 229, 117, 0.2)' 
                }}
                viewport={{ once: false, margin: '-80px' }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#070a08',
                  border: '2px solid rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {/* Node Center Icon */}
                {iconMap[idx % iconMap.length]}

                {/* Subtle Ping Pulse Wave */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: [0, 0.7, 0], scale: [0.8, 1.45, 1.7] }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: idx * 0.15, repeat: Infinity, repeatDelay: 3 }}
                  style={{
                    position: 'absolute',
                    inset: '-2px',
                    borderRadius: '50%',
                    border: '1px solid var(--accent-emerald)',
                    pointerEvents: 'none'
                  }}
                />
              </motion.div>

              {/* Item Card */}
              <motion.div
                whileHover={{ borderColor: 'rgba(0, 229, 117, 0.35)', y: -2 }}
                transition={{ duration: 0.18 }}
                style={{
                  flexGrow: 1,
                  borderRadius: '16px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  padding: '24px 28px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  transition: 'border-color 160ms ease, box-shadow 160ms ease'
                }}
                className="timeline-card"
              >
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '10px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--accent-emerald)',
                      background: 'rgba(0, 229, 117, 0.08)',
                      border: '1px solid rgba(0, 229, 117, 0.22)',
                      padding: '4px 12px',
                      borderRadius: '4px'
                    }}
                  >
                    {item.period}
                  </span>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {item.institution}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '19px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '10px'
                  }}
                >
                  {item.role}
                </h3>

                <p
                  style={{
                    fontSize: '14.5px',
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                    marginBottom: '18px'
                  }}
                >
                  {item.desc}
                </p>

                {/* Skills tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--text-secondary)',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        padding: '3px 10px',
                        borderRadius: '4px'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
