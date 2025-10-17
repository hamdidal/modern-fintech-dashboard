// @ts-nocheck - Jest mocks cause TypeScript issues
import type { User } from '@types'

jest.mock('@store/auth.store', () => ({
  useAuthStore: {
    getState: jest.fn(),
  },
}))

import { tokenService } from '@services/token.service'
import { useAuthStore } from '@store/auth.store'

describe('tokenService', () => {
  const mockUser: User = {
    id: '123',
    fullName: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    isActive: true,
    lastLoginAt: '2024-01-01',
    lastLoginIP: '127.0.0.1',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  }

  const mockToken = 'mock-jwt-token'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getToken', () => {
    it('should return token when available', () => {
      ;(useAuthStore.getState as jest.Mock).mockReturnValue({
        token: mockToken,
      })

      const result = tokenService.getToken()
      expect(result).toBe(mockToken)
    })

    it('should return undefined when token not available', () => {
      ;(useAuthStore.getState as jest.Mock).mockReturnValue({
        token: undefined,
      })

      const result = tokenService.getToken()
      expect(result).toBeUndefined()
    })
  })

  describe('setAuth', () => {
    it('should call setAuth with token and user', () => {
      const mockSetAuth = jest.fn()
      ;(useAuthStore.getState as jest.Mock).mockReturnValue({
        setAuth: mockSetAuth,
      })

      tokenService.setAuth(mockToken, mockUser)

      expect(mockSetAuth).toHaveBeenCalledWith({
        token: mockToken,
        user: mockUser,
      })
    })
  })

  describe('clearAuth', () => {
    it('should call clear method', () => {
      const mockClear = jest.fn()
      ;(useAuthStore.getState as jest.Mock).mockReturnValue({
        clear: mockClear,
      })

      tokenService.clearAuth()

      expect(mockClear).toHaveBeenCalled()
    })
  })

  describe('isAuthenticated', () => {
    it('should return true when token exists', () => {
      ;(useAuthStore.getState as jest.Mock).mockReturnValue({
        token: mockToken,
      })

      const result = tokenService.isAuthenticated()
      expect(result).toBe(true)
    })

    it('should return false when token does not exist', () => {
      ;(useAuthStore.getState as jest.Mock).mockReturnValue({
        token: undefined,
      })

      const result = tokenService.isAuthenticated()
      expect(result).toBe(false)
    })

    it('should return false when token is empty string', () => {
      ;(useAuthStore.getState as jest.Mock).mockReturnValue({
        token: '',
      })

      const result = tokenService.isAuthenticated()
      expect(result).toBe(false)
    })
  })

  describe('getCurrentUser', () => {
    it('should return user when available', () => {
      ;(useAuthStore.getState as jest.Mock).mockReturnValue({
        user: mockUser,
      })

      const result = tokenService.getCurrentUser()
      expect(result).toEqual(mockUser)
    })

    it('should return undefined when user not available', () => {
      ;(useAuthStore.getState as jest.Mock).mockReturnValue({
        user: undefined,
      })

      const result = tokenService.getCurrentUser()
      expect(result).toBeUndefined()
    })
  })
})

