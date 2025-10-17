import { createAxiosInstance } from '@config'
import { setupAuthInterceptor, setupErrorInterceptor } from './interceptors'

const createApiClient = () => {
  const instance = createAxiosInstance()

  setupAuthInterceptor(instance)
  setupErrorInterceptor(instance)

  return instance
}

export const api = createApiClient()
