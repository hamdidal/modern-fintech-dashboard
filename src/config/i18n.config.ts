import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LOCALE } from '@constants'
import en from '@i18n/locales/en.json'
import tr from '@i18n/locales/tr.json'

export const initializeI18n = (): typeof i18n => {
  void i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
    },
    lng: DEFAULT_LOCALE,
    fallbackLng: DEFAULT_LOCALE,
    interpolation: {
      escapeValue: false,
    },
  })

  return i18n
}

