export type ExchangeRateResponse = {
  TRYUSD: number
  USDTRY: number
  _meta: {
    base: string
    source: string
    generated_at: string
    updated_at: string
  }
  [key: string]: number | { [key: string]: string }
}

export type ExchangeRates = {
  TRYUSD: number
  USDTRY: number
  updatedAt: string
}

export type ConversionParams = {
  amount: number
  fromCurrency: string
  toCurrency: string
}

