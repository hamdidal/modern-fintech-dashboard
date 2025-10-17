import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { tokenService } from '@services'

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = tokenService.getToken()

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

const onRequestError = (error: unknown): Promise<never> => {
  return Promise.reject(error)
}

export const setupAuthInterceptor = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
}

