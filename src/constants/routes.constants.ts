export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  TRANSACTIONS: '/transactions',
  INVOICES: '/invoices',
  WALLETS: '/wallets',
  SETTINGS: '/settings',
  HELP: '/help',
  PROFILE: '/profile',
} as const

export const PUBLIC_ROUTES = [ROUTES.SIGN_IN, ROUTES.SIGN_UP] as const

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.TRANSACTIONS,
  ROUTES.INVOICES,
  ROUTES.WALLETS,
  ROUTES.SETTINGS,
  ROUTES.HELP,
  ROUTES.PROFILE,
] as const

