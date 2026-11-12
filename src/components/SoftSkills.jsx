import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  Users, 
  Clock, 
  Shuffle, 
  Zap, 
  MessageSquare, 
  BookOpen, 
  HeartHandshake, 
  Compass, 
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function SoftSkills() {
  const { t } = useLanguage();
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const iconMap = {
    teamwork: <Users size={22} color="var(--accent-emerald)" />,
    punctuality: <Clock size={22} color="var(--accent-emerald)" />,
    adaptability: <Shuffle size={22} color="var(--accent-emerald)" />,
    proactive: <Zap size={22} color="var(--accent-emerald)" />,
    social: <MessageSquare size={22} color="var(--accent-emerald)" />,
    learning: <BookOpen size={22} color="var(--accent-emerald)" />,
    empathy: <HeartHandshake size={22} color="var(--accent-emerald)" />,
    problem_solving: <Compass size={22} color="var(--accent-emerald)" />,
    stress_mgmt: <ShieldCheck size={22} color="var(--accent-emerald)" />
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] }
    }
  };

  return (
    <section
      id="blandas"
      className="section soft-skills-section"
      style={{
        padding: '110px 0',
        position: 'relative',
        zIndex: 1,
        background: 'rgba(8, 12, 10, 0.45)',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)'
      }}
    >
      <div className="container" style={{ maxWidth: '1560px', margin: '0 auto', padding: '0 clamp(20px, 3.5vw, 48px)' }}>
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          style={{ marginBottom: '44px' }}
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
            {t.softSkills.tag}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-main)',
              fontSize: 'clamp(30px, 4vw, 48px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              marginBottom: '12px'
            }}
          >
            {t.softSkills.title}
          </h2>
          <p
            style={{
              fontSize: '15.5px',
              color: 'var(--text-secondary)',
              maxWidth: '720px',
              lineHeight: 1.6
            }}
          >
            {t.softSkills.subtitle}
          </p>
        </motion.div>

        {/* 9 Soft Skills Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="soft-skills-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}
        >
          {t.softSkills.items.map((skill, idx) => {
            const isHovered = hoveredSkill === skill.id;
            const indexFormatted = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;

            return (
              <motion.div
                key={skill.id}
                variants={itemVariants}
                className="soft-skill-card"
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  position: 'relative',
                  padding: '24px',
                  borderRadius: '16px',
                  background: isHovered ? 'rgba(14, 20, 16, 0.95)' : 'var(--bg-elevated)',
                  border: isHovered 
                    ? '1px solid rgba(0, 229, 117, 0.35)' 
                    : '1px solid var(--border-subtle)',
                  boxShadow: isHovered 
                    ? '0 16px 36px -10px rgba(0, 0, 0, 0.7), 0 0 24px -8px rgba(0, 229, 117, 0.16)' 
                    : '0 4px 12px rgba(0, 0, 0, 0.2)',
                  transition: 'background 200ms ease, border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease',
                  transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  {/* Top Bar: Icon + Index + Tag */}
                  <div
                    className="soft-skill-top-bar"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '18px',
                      gap: '8px'
                    }}
                  >
                    <div
                      style={{
                        padding: '10px',
                        borderRadius: '10px',
                        background: 'rgba(0, 229, 117, 0.08)',
                        border: '1px solid rgba(0, 229, 117, 0.22)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isHovered ? '0 0 12px rgba(0, 229, 117, 0.25)' : 'none',
                        transition: 'box-shadow 200ms ease',
                        flexShrink: 0
                      }}
                    >
                      {iconMap[skill.id] || <Sparkles size={20} color="var(--accent-emerald)" />}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flexShrink: 0 }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10.5px',
                          color: 'var(--accent-emerald)',
                          background: 'rgba(0, 229, 117, 0.06)',
                          border: '1px solid rgba(0, 229, 117, 0.18)',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontWeight: 600,
                          letterSpacing: '0.04em',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {skill.tag}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          color: 'var(--text-muted)',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        [{indexFormatted}]
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: isHovered ? '#ffffff' : 'var(--text-primary)',
                      marginBottom: '10px',
                      letterSpacing: '-0.02em',
                      transition: 'color 160ms ease'
                    }}
                  >
                    {skill.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: 'var(--text-secondary)',
                      margin: 0
                    }}
                  >
                    {skill.desc}
                  </p>
                </div>

                {/* Subtle Bottom Accent Indicator */}
                <div
                  className="soft-skill-bottom-bar"
                  style={{
                    marginTop: '20px',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: isHovered ? 'var(--accent-emerald)' : 'var(--text-muted)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'color 160ms ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <CheckCircle2 size={12} color={isHovered ? 'var(--accent-emerald)' : 'var(--text-muted)'} style={{ flexShrink: 0 }} />
                    PERFIL VERIFICADO
                  </span>

                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: isHovered ? 'var(--accent-emerald)' : 'rgba(255, 255, 255, 0.15)',
                      boxShadow: isHovered ? '0 0 8px var(--accent-emerald)' : 'none',
                      transition: 'all 200ms ease',
                      flexShrink: 0
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Culture & Synergy Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="soft-skills-synergy-banner"
          style={{
            padding: '24px 28px',
            borderRadius: '16px',
            background: 'linear-gradient(90deg, rgba(14, 20, 16, 0.95), rgba(7, 10, 8, 0.98))',
            border: '1px solid rgba(0, 229, 117, 0.2)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(0, 229, 117, 0.1)',
                border: '1px solid rgba(0, 229, 117, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <ShieldCheck size={18} color="var(--accent-emerald)" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}
              >
                Sinergia Técnica + Calidad Humana
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  marginTop: '2px'
                }}
              >
                Código limpio y reproducible soportado por comunicación asertiva, empatía y adaptabilidad en Scrum.
              </div>
            </div>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--accent-emerald)',
              background: 'rgba(0, 229, 117, 0.08)',
              border: '1px solid rgba(0, 229, 117, 0.25)',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontWeight: 600
            }}
          >
            VALORES DE INGENIERÍA ÁGIL
          </div>
        </motion.div>
      </div>
    </section>
  );
}
