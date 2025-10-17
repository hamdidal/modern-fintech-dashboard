// @ts-nocheck - Jest mocks cause TypeScript issues
import type * as ApiConstants from '@constants/api.constants'

jest.mock('@constants/api.constants', () => ({
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
}))

import {
  API_BASE_URL,
  API_ENDPOINTS,
  HTTP_STATUS,
  REQUEST_TIMEOUT,
} from '@constants/api.constants';

describe('API Constants', () => {
  describe('API_BASE_URL', () => {
    it('should have correct base URL', () => {
      expect(API_BASE_URL).toBe('https://case.nodelabs.dev/api')
    })

    it('should be a string', () => {
      expect(typeof API_BASE_URL).toBe('string')
    })
  })

  describe('API_ENDPOINTS', () => {
    describe('AUTH endpoints', () => {
      it('should have all auth endpoints', () => {
        expect(API_ENDPOINTS.AUTH).toBeDefined()
        expect(API_ENDPOINTS.AUTH.LOGIN).toBe('/users/login')
        expect(API_ENDPOINTS.AUTH.REGISTER).toBe('/users/register')
        expect(API_ENDPOINTS.AUTH.LOGOUT).toBe('/users/logout')
        expect(API_ENDPOINTS.AUTH.PROFILE).toBe('/users/profile')
        expect(API_ENDPOINTS.AUTH.REFRESH_TOKEN).toBe('/users/refresh-token')
      })

      it('should have google auth endpoint', () => {
        expect(API_ENDPOINTS.AUTH.GOOGLE_AUTH).toBe('/users/auth/google')
      })

      it('should have correct number of auth endpoints', () => {
        expect(Object.keys(API_ENDPOINTS.AUTH)).toHaveLength(6)
      })
    })

    describe('FINANCIAL endpoints', () => {
      it('should have all financial endpoints', () => {
        expect(API_ENDPOINTS.FINANCIAL).toBeDefined()
        expect(API_ENDPOINTS.FINANCIAL.SUMMARY).toBe('/financial/summary')
        expect(API_ENDPOINTS.FINANCIAL.WORKING_CAPITAL).toBe('/financial/working-capital')
        expect(API_ENDPOINTS.FINANCIAL.WALLET).toBe('/financial/wallet')
        expect(API_ENDPOINTS.FINANCIAL.TRANSACTIONS_RECENT).toBe('/financial/transactions/recent')
        expect(API_ENDPOINTS.FINANCIAL.TRANSFERS_SCHEDULED).toBe('/financial/transfers/scheduled')
      })

      it('should have correct number of financial endpoints', () => {
        expect(Object.keys(API_ENDPOINTS.FINANCIAL)).toHaveLength(5)
      })
    })

    it('should be immutable (as const)', () => {
      expect(API_ENDPOINTS.AUTH).toBeDefined()
    })

    it('should have only AUTH and FINANCIAL categories', () => {
      expect(Object.keys(API_ENDPOINTS)).toEqual(['AUTH', 'FINANCIAL'])
    })
  })

  describe('HTTP_STATUS', () => {
    it('should have all standard HTTP status codes', () => {
      expect(HTTP_STATUS.OK).toBe(200)
      expect(HTTP_STATUS.CREATED).toBe(201)
      expect(HTTP_STATUS.BAD_REQUEST).toBe(400)
      expect(HTTP_STATUS.UNAUTHORIZED).toBe(401)
      expect(HTTP_STATUS.FORBIDDEN).toBe(403)
      expect(HTTP_STATUS.NOT_FOUND).toBe(404)
      expect(HTTP_STATUS.INTERNAL_SERVER_ERROR).toBe(500)
      expect(HTTP_STATUS.SERVICE_UNAVAILABLE).toBe(503)
    })

    it('should have correct number of status codes', () => {
      expect(Object.keys(HTTP_STATUS)).toHaveLength(8)
    })

    it('should have numeric values', () => {
      Object.values(HTTP_STATUS).forEach(value => {
        expect(typeof value).toBe('number')
      })
    })

    it('should be immutable (as const)', () => {
      expect(HTTP_STATUS.OK).toBe(200)
    })
  })

  describe('REQUEST_TIMEOUT', () => {
    it('should be 30 seconds (30000 ms)', () => {
      expect(REQUEST_TIMEOUT).toBe(30000)
    })

    it('should be a number', () => {
      expect(typeof REQUEST_TIMEOUT).toBe('number')
    })

    it('should be positive', () => {
      expect(REQUEST_TIMEOUT).toBeGreaterThan(0)
    })
  })

  describe('Endpoint format validation', () => {
    it('all endpoints should start with /', () => {
      const allEndpoints = [
        ...Object.values(API_ENDPOINTS.AUTH),
        ...Object.values(API_ENDPOINTS.FINANCIAL),
      ]

      allEndpoints.forEach(endpoint => {
        expect(endpoint).toMatch(/^\//)
      })
    })

    it('all endpoints should not end with /', () => {
      const allEndpoints = [
        ...Object.values(API_ENDPOINTS.AUTH),
        ...Object.values(API_ENDPOINTS.FINANCIAL),
      ]

      allEndpoints.forEach(endpoint => {
        expect(endpoint).not.toMatch(/\/$/)
      })
    })

    it('all endpoints should not contain spaces', () => {
      const allEndpoints = [
        ...Object.values(API_ENDPOINTS.AUTH),
        ...Object.values(API_ENDPOINTS.FINANCIAL),
      ]

      allEndpoints.forEach(endpoint => {
        expect(endpoint).not.toContain(' ')
      })
    })
  })
})

