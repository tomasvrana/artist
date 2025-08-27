import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import překladů
import translationEN from './locales/en/common.json';
import translationCS from './locales/cs/common.json';

const resources = {
  en: {
    common: translationEN,
  },
  cs: {
    common: translationCS,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'common',
    fallbackLng: 'en',
    supportedLngs: ['en', 'cs'],
    
    interpolation: {
      escapeValue: false, // React už escapuje
    },
    
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
