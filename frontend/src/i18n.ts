import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import shared translations from root locales directory
import enTranslation from '../../locales/en.json';
import zhTranslation from '../../locales/zh.json';
import frTranslation from '../../locales/fr.json';

// Get default language from environment or config
const getDefaultLanguage = () => {
  // First check if we have runtime config with language setting
  if (window.__MCPHUB_CONFIG__?.defaultLanguage) {
    return window.__MCPHUB_CONFIG__.defaultLanguage;
  }
  // Fallback to Chinese
  return 'zh';
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
      fr: {
        translation: frTranslation,
      },
    },
    fallbackLng: getDefaultLanguage(),
    debug: process.env.NODE_ENV === 'development',

    // Common namespace used for all translations
    defaultNS: 'translation',

    interpolation: {
      escapeValue: false, // React already safe from XSS
    },

    detection: {
      // Order of detection; prioritize localStorage to respect user language choice
      order: ['localStorage', 'cookie', 'htmlTag', 'navigator'],
      // Cache the language in localStorage
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
