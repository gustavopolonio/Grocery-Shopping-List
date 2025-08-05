import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./locales";

i18n.use(initReactI18next).init({
  resources: translations,
  defaultNS: "translations",
  lng: "en-US",
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
