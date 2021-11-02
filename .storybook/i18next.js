import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const ns = ['translation'];
const supportedLngs = ['en'];

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug:
      process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

supportedLngs.forEach(lang => {
  ns.forEach(n =>
    i18n.addResources(lang, n, require(`../src/locales/${lang}/${n}.json`)),
  );
});

export { i18n };
