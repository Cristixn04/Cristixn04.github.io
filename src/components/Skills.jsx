import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { Database, Layout, Cpu, Terminal, CheckCircle2, Shield, GitBranch, Layers, Award } from 'lucide-react';

export default function Skills() {
  const { t } = useLanguage();

  const officialCvSkills = [
    { name: "Python", category: "Backend / Scripts" },
    { name: "Java", category: "Backend OOP" },
    { name: "JavaScript", category: "Full Stack" },
    { name: "TypeScript", category: "Strict Typing" },
    { name: "Docker", category: "Containers" },
    { name: "PostgreSQL", category: "Relational DB" },
    { name: "MySQL", category: "Relational DB" },
    { name: "n8n", category: "AI Workflows" },
    { name: "Git", category: "Version Control" },
    { name: "HTML", category: "Markup" },
    { name: "CSS", category: "Styling" }
  ];

  const skillCategories = [
    {
      title: t.skills.catBackend,
      icon: <Database size={18} color="var(--accent-emerald)" />,
      badge: "ESPECIALIDAD",
      items: [
        { name: "Java", level: "OOP · Spring Boot · Robust Services" },
        { name: "Python", level: "FastAPI · Automation · Data Handling" },
        { name: "PostgreSQL", level: "Triggers · DDL · Foreign Keys · 4FN" },
        { name: "MySQL", level: "Relational Schemas · Views · Indexes" },
        { name: "REST APIs", level: "Strict Data Validation · Pydantic" }
      ]
    },
    {
      title: t.skills.catAiDevOps,
      icon: <Cpu size={18} color="var(--accent-emerald)" />,
      badge: "AUTOMATIZACIÓN",
      items: [
        { name: "Docker", level: "Containerization · Reproducible Deployments" },
        { name: "n8n", level: "Workflow Automation · AI Agents" },
        { name: "Git & GitHub", level: "Version Control · Collaboration" },
        { name: "Scrum", level: "Agile Sprints · Continuous Delivery" },
        { name: "Linux & Bash", level: "CLI · Server Management · Shell Scripts" }
      ]
    },
    {
      title: t.skills.catFrontend,
      icon: <Layout size={18} color="var(--accent-emerald)" />,
      badge: "FULL STACK",
      items: [
        { name: "JavaScript (ES6+)", level: "Async/Await · DOM · Web APIs" },
        { name: "TypeScript", level: "Strict Contracts · Type Safety" },
        { name: "HTML & CSS", level: "Modern Layouts · Flex · Grid · Responsive" },
        { name: "React 19", level: "Component State · Context · Modern UI" },
        { name: "Motion & Three.js", level: "Fluid Motion · 3D WebGL Interactions" }
      ]
    }
  ];

  return (
    <section
      id="habilidades"
      className="section skills-section"
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
            {t.skills.tag}
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
            {t.skills.title}
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              lineHeight: 1.6
            }}
          >
            {t.skills.subtitle}
          </p>
        </motion.div>

        {/* 11 Official CV Technologies Capsule Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          style={{
            marginBottom: '40px',
            padding: '20px 24px',
            borderRadius: '16px',
            background: 'rgba(14, 20, 16, 0.85)',
            border: '1px solid rgba(0, 229, 117, 0.22)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={16} color="var(--accent-emerald)" />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  letterSpacing: '0.04em'
                }}
              >
                // {t.skills.catCore}
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent-emerald)'
              }}
            >
              11 TECNOLOGÍAS DOMINADAS
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {officialCvSkills.map((tech, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, borderColor: 'var(--accent-emerald)' }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'rgba(0, 229, 117, 0.05)',
                  border: '1px solid rgba(0, 229, 117, 0.2)',
                  cursor: 'default'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: '#ffffff'
                  }}
                >
                  {tech.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10.5px',
                    color: 'var(--accent-emerald)'
                  }}
                >
                  · {tech.category}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Bento Grid: 3 Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}
          className="skills-bento-grid"
        >
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="skill-pillar-card"
              style={{
                borderRadius: '16px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 180ms ease, box-shadow 180ms ease'
              }}
            >
              <div>
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '18px'
                  }}
                >
                  <div
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      background: 'rgba(0, 229, 117, 0.08)',
                      border: '1px solid rgba(0, 229, 117, 0.2)'
                    }}
                  >
                    {cat.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      color: 'var(--accent-emerald)',
                      letterSpacing: '0.06em',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(0, 229, 117, 0.06)',
                      border: '1px solid rgba(0, 229, 117, 0.18)'
                    }}
                  >
                    {cat.badge}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '16.5px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '16px'
                  }}
                >
                  {cat.title}
                </h3>

                {/* Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {cat.items.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.04)'
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-main)',
                          fontSize: '13.5px',
                          fontWeight: 600,
                          color: 'var(--text-primary)'
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--accent-emerald)',
                          marginTop: '2px'
                        }}
                      >
                        {item.level}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Engineering Principles Row with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          className="skills-principles-card"
          style={{
            padding: '28px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--accent-emerald)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}
          >
            // {t.skills.principlesTitle}
          </div>

          <div
            className="skills-principles-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}
          >
            {t.skills.principles.map((p, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="var(--accent-emerald)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '14.5px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '4px'
                    }}
                  >
                    {p.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      margin: 0
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
