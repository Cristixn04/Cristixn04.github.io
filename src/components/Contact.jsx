import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { Mail, Phone, Copy, Check, MapPin, ArrowUpRight, MessageCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Contact() {
  const { t } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('7b.munoz.cristian@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+57 311 496 0776');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2400);
  };

  return (
    <section
      id="contacto"
      className="section contact-section"
      style={{
        padding: '120px 24px 80px',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div className="container" style={{ maxWidth: '1560px', margin: '0 auto', padding: '0 clamp(20px, 3.5vw, 48px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="contact-card-wrap"
          style={{
            borderRadius: '24px',
            background: 'linear-gradient(145deg, rgba(14, 20, 16, 0.95), rgba(7, 10, 8, 0.98))',
            border: '1px solid rgba(0, 229, 117, 0.22)',
            padding: 'clamp(32px, 5vw, 64px)',
            boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.9), 0 0 50px -10px rgba(0, 229, 117, 0.08)'
          }}
        >
          {/* Header */}
          <div style={{ maxWidth: '680px', marginBottom: '40px' }}>
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
              {t.contact.tag}
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(32px, 4.5vw, 54px)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.035em',
                lineHeight: 1.1,
                marginBottom: '16px'
              }}
            >
              {t.contact.title}
            </h2>
            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.6,
                color: 'var(--text-secondary)'
              }}
            >
              {t.contact.subtitle}
            </p>
          </div>

          {/* Primary Action Rows: Email & Phone Capsules */}
          <div
            className="contact-capsules-grid"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              marginBottom: '48px'
            }}
          >
            {/* Email Box */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                alignItems: 'center',
                padding: '16px 20px',
                borderRadius: '14px',
                background: 'rgba(0, 0, 0, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                flexGrow: 1
              }}
              className="email-action-capsule"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} color="var(--accent-emerald)" />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14.5px',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}
                >
                  {t.contact.emailVal}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="btn btn-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: copiedEmail ? 'rgba(0, 229, 117, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                    border: copiedEmail ? '1px solid var(--accent-emerald)' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: copiedEmail ? 'var(--accent-emerald)' : 'var(--text-primary)',
                    fontSize: '12px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer'
                  }}
                >
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedEmail ? t.contact.copiedEmailToast : t.contact.copyEmailBtn}</span>
                </button>

                <a
                  href={`mailto:${t.contact.emailVal}`}
                  className="btn btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    background: 'var(--accent-emerald)',
                    color: '#040605',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  <span>{t.contact.sendEmail}</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Phone / WhatsApp Box */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                alignItems: 'center',
                padding: '16px 20px',
                borderRadius: '14px',
                background: 'rgba(0, 0, 0, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                flexGrow: 1
              }}
              className="email-action-capsule"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} color="var(--accent-emerald)" />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14.5px',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}
                >
                  {t.contact.phoneVal}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="btn btn-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: copiedPhone ? 'rgba(0, 229, 117, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                    border: copiedPhone ? '1px solid var(--accent-emerald)' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: copiedPhone ? 'var(--accent-emerald)' : 'var(--text-primary)',
                    fontSize: '12px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer'
                  }}
                >
                  {copiedPhone ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedPhone ? t.contact.copiedPhoneToast : t.contact.copyPhoneBtn}</span>
                </button>

                <a
                  href={`https://wa.me/573114960776?text=Hola%20Cristian,%20vi%20tu%20portafolio`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    background: 'var(--accent-emerald)',
                    color: '#040605',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Channels Grid */}
          <div
            className="contact-channels-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '32px'
            }}
          >
            {/* GitHub */}
            <a
              href="https://github.com/Cristixn04"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                transition: 'border-color 160ms ease, background-color 160ms ease'
              }}
              className="channel-link-card"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <GithubIcon size={18} color="var(--accent-emerald)" />
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600 }}>{t.contact.githubLabel}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                    github.com/Cristixn04
                  </div>
                </div>
              </div>
              <ArrowUpRight size={15} color="var(--text-muted)" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/cristian-muñoz-159980409"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                transition: 'border-color 160ms ease, background-color 160ms ease'
              }}
              className="channel-link-card"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <LinkedinIcon size={18} color="var(--accent-emerald)" />
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600 }}>{t.contact.linkedinLabel}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                    cristian-muñoz-159980409
                  </div>
                </div>
              </div>
              <ArrowUpRight size={15} color="var(--text-muted)" />
            </a>

            {/* Location */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                color: 'var(--text-primary)'
              }}
            >
              <MapPin size={18} color="var(--accent-emerald)" />
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 600 }}>{t.contact.locationLabel}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {t.contact.locationVal}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
