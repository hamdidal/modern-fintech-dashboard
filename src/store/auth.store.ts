import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@constants'
import type { AuthState } from '@types'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: undefined,
      user: undefined,
      setAuth: ({ token, user }) => set({ token, user }),
      clear: () => set({ token: undefined, user: undefined }),
    }),
    { name: STORAGE_KEYS.AUTH_TOKEN }
  )
)