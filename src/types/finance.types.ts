export type TrendType = 'up' | 'down' | 'stable'

export type ChangeMetric = {
  percentage: number
  trend: TrendType
}

export type MetricWithChange = {
  amount: number
  currency: string
  change: ChangeMetric
}

export type FinancialSummary = {
  totalBalance: MetricWithChange
  totalExpense: MetricWithChange
  totalSavings: MetricWithChange
  lastUpdated: string
}

export type MonthlyData = {
  month: string
  income: number
  expense: number
  net: number
}

export type WorkingCapital = {
  period: string
  currency: string
  data: MonthlyData[]
  summary: {
    totalIncome: number
    totalExpense: number
    netBalance: number
  }
}

export type CardNetwork = 'Visa' | 'Mastercard' | 'American Express'
export type CardType = 'credit' | 'debit'

export type Card = {
  id: string
  name: string
  type: CardType
  cardNumber: string
  bank: string
  network: CardNetwork
  expiryMonth: number
  expiryYear: number
  color: string
  isDefault: boolean
}

export type Wallet = {
  cards: Card[]
}

export type TransactionStatus = 'completed' | 'pending' | 'failed'

export type Transaction = {
  id: string
  name: string
  business: string
  image: string
  type: string
  amount: number
  currency: string
  date: string
  status: TransactionStatus
}

export type RecentTransactions = {
  transactions: Transaction[]
  summary: {
    totalIncome: number
    totalExpense: number
    count: number
  }
}

export type TransferStatus = 'scheduled' | 'processing' | 'completed' | 'cancelled'

export type ScheduledTransfer = {
  id: string
  name: string
  image: string
  date: string
  amount: number
  currency: string
  status: TransferStatus
}

export type ScheduledTransfers = {
  transfers: ScheduledTransfer[]
  summary: {
    totalScheduledAmount: number
    count: number
  }
}

