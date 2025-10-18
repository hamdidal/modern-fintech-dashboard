export const FORM_MODES = {
  SIGN_IN: 'signin',
  SIGN_UP: 'signup',
} as const

export type FormMode = typeof FORM_MODES[keyof typeof FORM_MODES]

export const METRIC_TYPES = {
  BALANCE: 'balance',
  EXPENSE: 'expense',
  SAVINGS: 'savings',
} as const

export type MetricType = typeof METRIC_TYPES[keyof typeof METRIC_TYPES]

