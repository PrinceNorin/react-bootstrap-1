import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { default as en } from './en.json';
import { default as km } from './km.json';

export const initI18n = () => {
  const resources = {
    en: {
      translation: en
    },
    km: {
      translation: km
    }
  };

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      interpolation: {
        escapeValue: false
      }
    });

  return i18n;
}
