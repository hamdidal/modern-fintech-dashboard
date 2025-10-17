// @ts-nocheck - Jest mocks cause TypeScript issues
jest.mock('@constants', () => ({
  API_BASE_URL: 'https://case.nodelabs.dev/api',
  API_ENDPOINTS: {
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
  },
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  },
  REQUEST_TIMEOUT: 30000,
  APP_NAME: 'Maglo',
  APP_VERSION: '1.0.0',
  ROUTES: {
    HOME: '/',
    SIGNIN: '/signin',
    SIGNUP: '/signup',
    DASHBOARD: '/',
  },
}))

import { ApiError, getErrorMessage, handleError } from '@utils/error'
import { HTTP_STATUS } from '@constants'

describe('ApiError', () => {
  describe('constructor', () => {
    it('should create ApiError with required parameters', () => {
      const error = new ApiError(404, 'Not found')
      
      expect(error.statusCode).toBe(404)
      expect(error.message).toBe('Not found')
      expect(error.code).toBeUndefined()
      expect(error.errors).toBeUndefined()
      expect(error.name).toBe('ApiError')
    })

    it('should create ApiError with all parameters', () => {
      const errors = { email: ['Invalid email'] }
      const error = new ApiError(400, 'Validation failed', 'VALIDATION_ERROR', errors)
      
      expect(error.statusCode).toBe(400)
      expect(error.message).toBe('Validation failed')
      expect(error.code).toBe('VALIDATION_ERROR')
      expect(error.errors).toEqual(errors)
    })

    it('should inherit from Error', () => {
      const error = new ApiError(500, 'Server error')
      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(ApiError)
    })
  })

  describe('isApiError', () => {
    it('should return true for ApiError instances', () => {
      const error = new ApiError(404, 'Not found')
      expect(ApiError.isApiError(error)).toBe(true)
    })

    it('should return false for regular Error', () => {
      const error = new Error('Regular error')
      expect(ApiError.isApiError(error)).toBe(false)
    })

    it('should return false for non-error values', () => {
      expect(ApiError.isApiError('string')).toBe(false)
      expect(ApiError.isApiError(123)).toBe(false)
      expect(ApiError.isApiError(null)).toBe(false)
      expect(ApiError.isApiError(undefined)).toBe(false)
      expect(ApiError.isApiError({})).toBe(false)
    })
  })

  describe('isNetworkError', () => {
    it('should return true for status code 0', () => {
      const error = new ApiError(0, 'Network error')
      expect(error.isNetworkError()).toBe(true)
    })

    it('should return false for other status codes', () => {
      const error = new ApiError(404, 'Not found')
      expect(error.isNetworkError()).toBe(false)
    })
  })

  describe('isAuthError', () => {
    it('should return true for 401 status', () => {
      const error = new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      expect(error.isAuthError()).toBe(true)
    })

    it('should return false for other status codes', () => {
      const error403 = new ApiError(HTTP_STATUS.FORBIDDEN, 'Forbidden')
      expect(error403.isAuthError()).toBe(false)

      const error404 = new ApiError(HTTP_STATUS.NOT_FOUND, 'Not found')
      expect(error404.isAuthError()).toBe(false)
    })
  })

  describe('isForbiddenError', () => {
    it('should return true for 403 status', () => {
      const error = new ApiError(HTTP_STATUS.FORBIDDEN, 'Forbidden')
      expect(error.isForbiddenError()).toBe(true)
    })

    it('should return false for other status codes', () => {
      const error = new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      expect(error.isForbiddenError()).toBe(false)
    })
  })

  describe('isNotFoundError', () => {
    it('should return true for 404 status', () => {
      const error = new ApiError(HTTP_STATUS.NOT_FOUND, 'Not found')
      expect(error.isNotFoundError()).toBe(true)
    })

    it('should return false for other status codes', () => {
      const error = new ApiError(HTTP_STATUS.BAD_REQUEST, 'Bad request')
      expect(error.isNotFoundError()).toBe(false)
    })
  })

  describe('isServerError', () => {
    it('should return true for 500 status', () => {
      const error = new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Server error')
      expect(error.isServerError()).toBe(true)
    })

    it('should return true for 503 status', () => {
      const error = new ApiError(HTTP_STATUS.SERVICE_UNAVAILABLE, 'Service unavailable')
      expect(error.isServerError()).toBe(true)
    })

    it('should return true for any 5xx status', () => {
      const error502 = new ApiError(502, 'Bad gateway')
      expect(error502.isServerError()).toBe(true)

      const error504 = new ApiError(504, 'Gateway timeout')
      expect(error504.isServerError()).toBe(true)
    })

    it('should return false for 4xx status codes', () => {
      const error = new ApiError(HTTP_STATUS.BAD_REQUEST, 'Bad request')
      expect(error.isServerError()).toBe(false)
    })
  })
})

describe('getErrorMessage', () => {
  it('should return message from ApiError', () => {
    const error = new ApiError(404, 'Resource not found')
    expect(getErrorMessage(error)).toBe('Resource not found')
  })

  it('should return message from Error', () => {
    const error = new Error('Something went wrong')
    expect(getErrorMessage(error)).toBe('Something went wrong')
  })

  it('should return string if error is string', () => {
    expect(getErrorMessage('Error string')).toBe('Error string')
  })

  it('should return default message for unknown errors', () => {
    expect(getErrorMessage(null)).toBe('An unexpected error occurred')
    expect(getErrorMessage(undefined)).toBe('An unexpected error occurred')
    expect(getErrorMessage({})).toBe('An unexpected error occurred')
    expect(getErrorMessage(123)).toBe('An unexpected error occurred')
  })

  it('should handle ApiError with code', () => {
    const error = new ApiError(400, 'Validation failed', 'VALIDATION_ERROR')
    expect(getErrorMessage(error)).toBe('Validation failed')
  })

  it('should handle ApiError with errors object', () => {
    const errors = { email: ['Invalid email'], password: ['Too short'] }
    const error = new ApiError(400, 'Validation failed', 'VALIDATION_ERROR', errors)
    expect(getErrorMessage(error)).toBe('Validation failed')
  })
})

describe('handleError', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should log error to console', () => {
    const error = new Error('Test error')
    handleError(error)
    expect(console.error).toHaveBeenCalledWith('[Error]', error)
  })

  it('should return error message', () => {
    const error = new Error('Test error')
    const result = handleError(error)
    expect(result).toBe('Test error')
  })

  it('should handle ApiError', () => {
    const error = new ApiError(404, 'Not found')
    const result = handleError(error)
    expect(result).toBe('Not found')
  })

  it('should handle string error', () => {
    const result = handleError('String error')
    expect(result).toBe('String error')
  })

  it('should handle unknown error', () => {
    const result = handleError({ unknown: 'error' })
    expect(result).toBe('An unexpected error occurred')
  })
})

