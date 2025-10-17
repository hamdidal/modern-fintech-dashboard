export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://case.nodelabs.dev/api'

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/users/login',
    REGISTER: '/users/register',
    LOGOUT: '/users/logout',
    PROFILE: '/users/profile',
    REFRESH_TOKEN: '/users/refresh-token',
    GOOGLE_AUTH: '/users/auth/google',
  },
  FINANCIAL: {
    SUMMARY: '/financial/summary',
    WORKING_CAPITAL: '/financial/working-capital',
    WALLET: '/financial/wallet',
    TRANSACTIONS_RECENT: '/financial/transactions/recent',
    TRANSFERS_SCHEDULED: '/financial/transfers/scheduled',
  },
} as const

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const

export const REQUEST_TIMEOUT = 30000

