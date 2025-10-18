import type { AxiosInstance, AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import i18n from 'i18next'
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
      i18n.t('errors.networkError'),
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
      toast.error(i18n.t('errors.sessionExpired'))
      break

    case HTTP_STATUS.FORBIDDEN:
      toast.error(i18n.t('errors.forbidden'))
      break

    case HTTP_STATUS.NOT_FOUND:
      toast.error(i18n.t('errors.notFound'))
      break

    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      toast.error(i18n.t('errors.serverError'))
      break

    case HTTP_STATUS.SERVICE_UNAVAILABLE:
      toast.error(i18n.t('errors.serviceUnavailable'))
      break

    default:
      if (data?.message) {
        toast.error(data.message)
      }
      break
  }

  const apiError = new ApiError(
    status,
    data?.message || error.message || i18n.t('errors.requestFailed'),
    data?.code,
    data?.errors
  )

  return Promise.reject(apiError)
}

export const setupErrorInterceptor = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
}

