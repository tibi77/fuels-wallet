import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import * as translations from './translations';

export const defaultNS = 'translation';
export const resources = {
  en: {
    translation: translations.en,
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
