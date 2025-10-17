import { api } from './client'
import { API_ENDPOINTS } from '@constants'
import type {
  FinancialSummary,
  WorkingCapital,
  Wallet,
  RecentTransactions,
  ScheduledTransfers,
  ApiResponse,
} from '@types'

export const getFinancialSummary = async (): Promise<ApiResponse<FinancialSummary>> => {
  const { data } = await api.get<ApiResponse<FinancialSummary>>(API_ENDPOINTS.FINANCIAL.SUMMARY)
  return data
}

export const getWorkingCapital = async (period?: string): Promise<ApiResponse<WorkingCapital>> => {
  const { data } = await api.get<ApiResponse<WorkingCapital>>(
    API_ENDPOINTS.FINANCIAL.WORKING_CAPITAL,
    {
      params: period ? { period } : undefined,
    }
  )
  return data
}

export const getWallet = async (): Promise<ApiResponse<Wallet>> => {
  const { data } = await api.get<ApiResponse<Wallet>>(API_ENDPOINTS.FINANCIAL.WALLET)
  return data
}

export const getRecentTransactions = async (
  limit?: number
): Promise<ApiResponse<RecentTransactions>> => {
  const { data } = await api.get<ApiResponse<RecentTransactions>>(
    API_ENDPOINTS.FINANCIAL.TRANSACTIONS_RECENT,
    {
      params: limit ? { limit } : undefined,
    }
  )
  return data
}

export const getScheduledTransfers = async (): Promise<ApiResponse<ScheduledTransfers>> => {
  const { data } = await api.get<ApiResponse<ScheduledTransfers>>(
    API_ENDPOINTS.FINANCIAL.TRANSFERS_SCHEDULED
  )
  return data
}

export type {
  FinancialSummary,
  WorkingCapital,
  Wallet,
  RecentTransactions,
  ScheduledTransfers,
  Transaction,
  ScheduledTransfer,
} from '@types'