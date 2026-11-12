import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        background: '#040605',
        padding: '36px 24px',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1560px',
          padding: '0 clamp(20px, 3.5vw, 48px)',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ color: 'var(--accent-emerald)' }}>&lt;</span>
            CCM
            <span style={{ color: 'var(--accent-emerald)' }}>/&gt;</span>
            <span style={{ color: 'var(--text-muted)' }}>—</span>
            <span>{t.footer.brand}</span>
          </div>
          <div
            style={{
              fontSize: '12px',
              color: 'var(--text-muted)',
              marginTop: '4px',
              fontFamily: 'var(--font-main)'
            }}
          >
            {t.footer.rights}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          aria-label={t.footer.backToTop}
          className="btn btn-secondary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: 'var(--text-secondary)',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          <span>{t.footer.backToTop}</span>
          <ArrowUp size={13} color="var(--accent-emerald)" />
        </button>
      </div>
    </footer>
  );
}
