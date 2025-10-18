import { useAuthStore } from '@store/auth.store'
import { logout as logoutApi } from '@api/auth'

export const useAuth = () => {
  const token = useAuthStore((s) => s.token)
  const clear = useAuthStore((s) => s.clear)

  const logout = async () => {
    try {
      await logoutApi()
    } catch (error) {
      console.error('Logout API error:', error)
    } finally {
      clear()
    }
  }

  return {
    isAuthenticated: !!token,
    logout,
  }
}

