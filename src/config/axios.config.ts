import axios, { type AxiosInstance } from 'axios'
import { API_BASE_URL, REQUEST_TIMEOUT } from '@constants'

export const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return instance
}

