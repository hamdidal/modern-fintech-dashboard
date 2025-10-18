import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import currency from 'currency.js'
import { getExchangeRates } from '@api/exchange'
import { useCurrencyStore } from '@store/currency.store'
import { QUERY_KEYS } from '@constants'
import type { Currency } from '@types'

const CURRENCY_SYMBOL_MAP: Record<string, Currency> = {
  $: 'USD',
  '₺': 'TRY',
  USD: 'USD',
  TRY: 'TRY',
}

const normalizeCurrency = (currencyInput: string): Currency => {
  const normalized = CURRENCY_SYMBOL_MAP[currencyInput]
  return normalized || 'USD'
}

export const useCurrency = () => {
  const { currency: selectedCurrency } = useCurrencyStore()

  const { data: exchangeRates, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.EXCHANGE_RATES],
    queryFn: getExchangeRates,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  })

  const convertAndFormat = useCallback((
    amount: number,
    fromCurrency: string = 'USD',
    options?: currency.Options
  ): string => {
    const normalizedFrom = normalizeCurrency(fromCurrency)
    const normalizedTo = selectedCurrency

    if (normalizedFrom === normalizedTo) {
      return currency(amount, {
        symbol: normalizedTo === 'TRY' ? '₺' : '$',
        precision: 2,
        ...options,
      }).format()
    }

    if (!exchangeRates) {
      return currency(amount, {
        symbol: normalizedTo === 'TRY' ? '₺' : '$',
        precision: 2,
        ...options,
      }).format()
    }

    let convertedAmount = amount

    if (normalizedFrom === 'USD' && normalizedTo === 'TRY') {
      convertedAmount = amount * exchangeRates.USDTRY
    } else if (normalizedFrom === 'TRY' && normalizedTo === 'USD') {
      convertedAmount = amount * exchangeRates.TRYUSD
    }

    return currency(convertedAmount, {
      symbol: normalizedTo === 'TRY' ? '₺' : '$',
      precision: 2,
      ...options,
    }).format()
  }, [selectedCurrency, exchangeRates])

  const convert = (amount: number, fromCurrency: string = 'USD'): number => {
    const normalizedFrom = normalizeCurrency(fromCurrency)
    const normalizedTo = selectedCurrency

    if (normalizedFrom === normalizedTo) {
      return amount
    }

    if (!exchangeRates) {
      return amount
    }

    if (normalizedFrom === 'USD' && normalizedTo === 'TRY') {
      return amount * exchangeRates.USDTRY
    } else if (normalizedFrom === 'TRY' && normalizedTo === 'USD') {
      return amount * exchangeRates.TRYUSD
    }

    return amount
  }
  
  const formatOnly = (amount: number, currencyCode?: Currency): string => {
    const targetCurrency = currencyCode || selectedCurrency
    return currency(amount, {
      symbol: targetCurrency === 'TRY' ? '₺' : '$',
      precision: 2,
    }).format()
  }

  return {
    selectedCurrency,
    exchangeRates,
    isLoading,
    convertAndFormat,
    convert,
    formatOnly,
    normalizeCurrency,
  }
}

