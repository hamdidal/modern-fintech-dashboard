export type ApiResponse<T> = {
  success: boolean
  message?: string
  data: T
}

export type PaginationParams = {
  page?: number
  limit?: number
  sortBy?: string
  order?: 'asc' | 'desc'
}

export type PaginatedResponse<T> = {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export type ErrorResponse = {
  success: false
  message: string
  code?: string
  errors?: Record<string, string[]>
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export type ThemeMode = 'light' | 'dark'

export type Locale = 'en' | 'tr'

export type Currency = 'TRY' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR' | 'RUB' | 'CNY' | 'CHF' | 'CAD' | 'AUD'

