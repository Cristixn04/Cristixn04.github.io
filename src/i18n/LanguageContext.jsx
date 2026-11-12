import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('ccm_lang');
      if (saved === 'es' || saved === 'en') return saved;
      return navigator.language?.startsWith('es') ? 'es' : 'en';
    } catch {
      return 'es';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ccm_lang', lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  }, [lang]);

  const t = translations[lang] || translations.es;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
