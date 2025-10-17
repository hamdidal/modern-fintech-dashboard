import type { AxiosInstance, AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { tokenService } from '@services'
import { ApiError } from '@utils/error'
import { HTTP_STATUS, ROUTES } from '@constants'

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}


const onResponseError = async (error: AxiosError): Promise<never> => {
  if (!error.response) {
    const networkError = new ApiError(
      0,
      'Network error. Please check your internet connection.',
      'NETWORK_ERROR'
    )
    toast.error(networkError.message)
    return Promise.reject(networkError)
  }

  const { status, data } = error.response as {
    status: number
    data: { message?: string; code?: string; errors?: Record<string, string[]> }
  }

  switch (status) {
    case HTTP_STATUS.UNAUTHORIZED:
      await tokenService.clearAuth()
      window.location.href = ROUTES.SIGN_IN
      toast.error('Your session has expired. Please sign in again.')
      break

    case HTTP_STATUS.FORBIDDEN:
      toast.error('You do not have permission to perform this action.')
      break

    case HTTP_STATUS.NOT_FOUND:
      toast.error('The requested resource was not found.')
      break

    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      toast.error('Server error. Please try again later.')
      break

    case HTTP_STATUS.SERVICE_UNAVAILABLE:
      toast.error('Service temporarily unavailable. Please try again later.')
      break

    default:
      if (data?.message) {
        toast.error(data.message)
      }
      break
  }

  const apiError = new ApiError(
    status,
    data?.message || error.message || 'Request failed',
    data?.code,
    data?.errors
  )

  return Promise.reject(apiError)
}

export const setupErrorInterceptor = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
}

