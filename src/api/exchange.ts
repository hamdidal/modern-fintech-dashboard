import axios from 'axios'
import type { ExchangeRateResponse, ExchangeRates } from '@types'

const EXCHANGE_API_URL = 'https://doviz.dev/v1/usd.json'

const exchangeClient = axios.create({
  timeout: 10000,
})

export const getExchangeRates = async (): Promise<ExchangeRates> => {
  const response = await exchangeClient.get<ExchangeRateResponse>(EXCHANGE_API_URL)
  
  return {
    TRYUSD: response.data.TRYUSD,
    USDTRY: response.data.USDTRY,
    updatedAt: response.data._meta.updated_at,
  }
}

