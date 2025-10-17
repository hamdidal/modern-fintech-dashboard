import { api } from './client'
import { API_ENDPOINTS } from '@constants'
import type {
  User,
  AuthResponse,
  RegisterInput,
  LoginInput,
  GoogleAuthInput,
  ApiResponse,
} from '@types'

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
    email,
    password,
  })
  return data
}

export const signUp = async (
  fullName: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, {
    fullName,
    email,
    password,
  })
  return data
}

export const me = async (): Promise<ApiResponse<User>> => {
  const { data } = await api.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.PROFILE)
  return data
}

export const logout = async (): Promise<void> => {
  await api.post(API_ENDPOINTS.AUTH.LOGOUT)
}

export const refreshToken = async (): Promise<{ accessToken: string }> => {
  const { data } = await api.post<{ accessToken: string }>(API_ENDPOINTS.AUTH.REFRESH_TOKEN)
  return data
}

export const signInWithGoogle = async (credential: string): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.GOOGLE_AUTH, { credential })
  return data
}

export type { User, AuthResponse, RegisterInput, LoginInput, GoogleAuthInput }