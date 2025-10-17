import { useAuthStore } from '@store/auth.store'
import { tokenService } from '@services'
import type { User } from '@types'

export const useAuth = () => {
  const { token, user, setAuth, clear } = useAuthStore()

  const login = (token: string, user: User) => {
    tokenService.setAuth(token, user)
  }

  const logout = () => {
    tokenService.clearAuth()
  }

  const isAuthenticated = !!token

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    setAuth,
    clear,
  }
}

