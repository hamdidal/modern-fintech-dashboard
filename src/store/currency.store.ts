import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@constants'
import type { Currency } from '@types'

interface CurrencyState {
  currency: Currency
  setCurrency: (currency: Currency) => void
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: 'TRY',
      setCurrency: (currency) => set({ currency }),
    }),
    { name: STORAGE_KEYS.CURRENCY }
  )
)

