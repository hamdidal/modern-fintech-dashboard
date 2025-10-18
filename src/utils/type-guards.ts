import type { RecentTransactions, Wallet, ScheduledTransfers } from '@types'

export const isRecentTransactions = (data: unknown): data is RecentTransactions => {
  return (
    data !== null &&
    typeof data === 'object' &&
    'transactions' in data &&
    Array.isArray((data as RecentTransactions).transactions)
  )
}

export const isWallet = (data: unknown): data is Wallet => {
  return (
    data !== null &&
    typeof data === 'object' &&
    'cards' in data &&
    Array.isArray((data as Wallet).cards)
  )
}

export const isScheduledTransfers = (data: unknown): data is ScheduledTransfers => {
  return (
    data !== null &&
    typeof data === 'object' &&
    'transfers' in data &&
    Array.isArray((data as ScheduledTransfers).transfers)
  )
}

