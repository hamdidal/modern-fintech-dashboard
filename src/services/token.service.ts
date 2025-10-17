import { useAuthStore } from '@store/auth.store'
import type { User } from '@types'

class TokenService {
  getToken(): string | undefined {
    return useAuthStore.getState().token
  }

  setAuth(token: string, user: User): void {
    useAuthStore.getState().setAuth({ token, user })
  }

  clearAuth(): void {
    useAuthStore.getState().clear()
  }

  isAuthenticated(): boolean {
    const token = this.getToken()
    return !!token
  }

  getCurrentUser(): User | undefined {
    return useAuthStore.getState().user
  }
}

export const tokenService = new TokenService()

