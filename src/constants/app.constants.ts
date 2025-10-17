export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Maglo'
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0'

export const DEFAULT_LOCALE = (import.meta.env.VITE_DEFAULT_LOCALE || 'en') as 'en' | 'tr'
export const DEFAULT_CURRENCY = import.meta.env.VITE_DEFAULT_CURRENCY || 'USD'

export const SUPPORTED_LOCALES = ['en', 'tr'] as const
export const SUPPORTED_CURRENCIES = [
  'USD',
  'EUR',
  'GBP',
  'TRY',
  'JPY',
  'CNY',
  'INR',
  'RUB',
] as const

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'maglo-auth',
  THEME: 'maglo-theme',
  LOCALE: 'maglo-locale',
} as const

export const QUERY_KEYS = {
  FINANCIAL_SUMMARY: 'financialSummary',
  WORKING_CAPITAL: 'workingCapital',
  WALLET: 'wallet',
  RECENT_TRANSACTIONS: 'recentTransactions',
  SCHEDULED_TRANSFERS: 'scheduledTransfers',
  USER_PROFILE: 'userProfile',
} as const

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  smallLaptop: 1280,
  laptop: 1440,
  desktop: 1920,
} as const

export const TOAST_CONFIG = {
  position: 'top-right' as const,
  autoClose: 2200,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}

