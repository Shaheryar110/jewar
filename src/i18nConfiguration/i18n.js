import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "../Locales/en/translation.json";
import translationAR from "../Locales/ar/translation.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
