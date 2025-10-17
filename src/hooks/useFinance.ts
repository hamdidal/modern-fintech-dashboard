import { useQuery } from '@tanstack/react-query'
import {
  getFinancialSummary,
  getWorkingCapital,
  getWallet,
  getRecentTransactions,
  getScheduledTransfers,
} from '@api/finance'
import { QUERY_KEYS } from '@constants'


export const useFinancialSummary = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FINANCIAL_SUMMARY],
    queryFn: getFinancialSummary,
  })
}

export const useWorkingCapital = (period?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.WORKING_CAPITAL, period],
    queryFn: () => getWorkingCapital(period),
  })
}

export const useWallet = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.WALLET],
    queryFn: getWallet,
  })
}

export const useRecentTransactions = (limit?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RECENT_TRANSACTIONS, limit],
    queryFn: () => getRecentTransactions(limit),
  })
}

export const useScheduledTransfers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.SCHEDULED_TRANSFERS],
    queryFn: getScheduledTransfers,
  })
}

