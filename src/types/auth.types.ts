export type User = {
  id: string
  fullName: string
  email: string
  role: 'user' | 'admin'
  isActive: boolean
  lastLoginAt: string
  lastLoginIP: string
  createdAt: string
  updatedAt: string
}

export type AuthResponse = {
  success: boolean
  message: string
  data: {
    accessToken: string
    user: User
  }
}

export type RegisterInput = {
  fullName: string
  email: string
  password: string
}

export type LoginInput = {
  email: string
  password: string
}

export type GoogleAuthInput = {
  credential: string
}

export type AuthState = {
  token?: string
  user?: User
  setAuth: (payload: { token: string; user: User }) => void
  clear: () => void
}

