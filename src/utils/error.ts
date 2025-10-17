import { HTTP_STATUS } from '@constants'

export class ApiError extends Error {
  statusCode: number
  code?: string
  errors?: Record<string, string[]>

  constructor(
    statusCode: number,
    message: string,
    code?: string,
    errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.code = code
    this.errors = errors
    Object.setPrototypeOf(this, ApiError.prototype)
  }

  static isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError
  }

  isNetworkError(): boolean {
    return this.statusCode === 0
  }

  isAuthError(): boolean {
    return this.statusCode === HTTP_STATUS.UNAUTHORIZED
  }

  isForbiddenError(): boolean {
    return this.statusCode === HTTP_STATUS.FORBIDDEN
  }

  isNotFoundError(): boolean {
    return this.statusCode === HTTP_STATUS.NOT_FOUND
  }

  isServerError(): boolean {
    return this.statusCode >= 500
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (ApiError.isApiError(error)) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return 'An unexpected error occurred'
}

export const handleError = (error: unknown): string => {
  console.error('[Error]', error)
  return getErrorMessage(error)
}

