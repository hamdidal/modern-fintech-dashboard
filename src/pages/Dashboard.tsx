import { useState, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import {
  useFinancialSummary,
  useWorkingCapital,
  useWallet,
  useRecentTransactions,
  useScheduledTransfers,
} from '@hooks/useFinance'
import { Skeleton } from '@components/Skeleton'
import MetricCard from '@components/MetricCard'
import MoneyChart from '@components/MoneyChart'
import WalletCard from '@components/WalletCard'
import ScheduledTransfers from '@components/ScheduledTransfers'
import RecentTransaction from '@components/RecentTransaction'
import { DEFAULT_CURRENCY } from '@constants'
import type { RecentTransactions, Wallet } from '@types'
import { ErrorBoundaryTest } from '@/components/ErrorBoundaryTest'

export default function Dashboard() {
  const { t } = useTranslation()
  const [selectedCard, setSelectedCard] = useState<'balance' | 'expense' | 'savings'>('balance')
  const [timePeriod, setTimePeriod] = useState('7days')

  const {
    data: summaryResponse,
    isLoading: summaryLoading,
    error: summaryError,
  } = useFinancialSummary()

  const {
    data: workingCapitalResponse,
    isLoading: workingCapitalLoading,
    error: workingCapitalError,
  } = useWorkingCapital(timePeriod)

  const {
    data: recentTransactionsResponse,
    isLoading: recentTransactionsLoading,
    error: recentTransactionsError,
  } = useRecentTransactions()

  const { data: walletResponse, isLoading: walletLoading, error: walletError } = useWallet()

  const {
    data: scheduledTransfersResponse,
    isLoading: scheduledTransfersLoading,
    error: scheduledTransfersError,
  } = useScheduledTransfers()

  const summary = useMemo(() => summaryResponse?.data, [summaryResponse])
  const workingCapital = useMemo(() => workingCapitalResponse?.data, [workingCapitalResponse])
  const recentTransactions = useMemo(
    () => recentTransactionsResponse?.data,
    [recentTransactionsResponse]
  )
  const wallet = useMemo(() => walletResponse?.data, [walletResponse])
  const scheduledTransfers = useMemo(
    () => scheduledTransfersResponse?.data,
    [scheduledTransfersResponse]
  )

  const currency = useMemo(
    () => summary?.totalBalance?.currency || DEFAULT_CURRENCY,
    [summary]
  )

  const handleCardSelect = useCallback((card: 'balance' | 'expense' | 'savings') => {
    setSelectedCard(card)
  }, [])

  const handleTimePeriodChange = useCallback((period: string) => {
    setTimePeriod(period)
  }, [])

  if (summaryError && !summaryLoading) {
    toast.error(summaryError.message)
  }
  if (workingCapitalError && !workingCapitalLoading) {
    toast.error(workingCapitalError.message)
  }
  if (recentTransactionsError && !recentTransactionsLoading) {
    toast.error(recentTransactionsError.message)
  }
  if (walletError && !walletLoading) {
    toast.error(walletError.message)
  }
  if (scheduledTransfersError && !scheduledTransfersLoading) {
    toast.error(scheduledTransfersError.message)
  }  

  return (
    <div className="dashboard">
      <div className="dashboard__left">
        <div className="dashboard__summary">
          {summaryLoading ? (
            <>
              <Skeleton height={100} />
              <Skeleton height={100} />
              <Skeleton height={100} />
            </>
          ) : summary ? (
            <>
              <MetricCard
                type="balance"
                label={t('app.balance')}
                value={summary.totalBalance.amount}
                currency={currency}
                change={summary.totalBalance.change}
                isSelected={selectedCard === 'balance'}
                onClick={() => handleCardSelect('balance')}
              />
              <MetricCard
                type="expense"
                label={t('app.totalSpending')}
                value={summary.totalExpense.amount}
                currency={currency}
                change={summary.totalExpense.change}
                isSelected={selectedCard === 'expense'}
                onClick={() => handleCardSelect('expense')}
              />
              <MetricCard
                type="savings"
                label={t('app.totalSaved')}
                value={summary.totalSavings.amount}
                currency={currency}
                change={summary.totalSavings.change}
                isSelected={selectedCard === 'savings'}
                onClick={() => handleCardSelect('savings')}
              />
            </>
          ) : (
            <>
              <Skeleton height={100} />
              <Skeleton height={100} />
              <Skeleton height={100} />
            </>
          )}
        </div>

        <div className="dashboard__chart">
          {workingCapitalLoading ? (
            <Skeleton height={400} />
          ) : workingCapital ? (
            <MoneyChart
              data={workingCapital.data}
              currency={currency}
              timePeriod={timePeriod}
              onTimePeriodChange={handleTimePeriodChange}
            />
          ) : (
            <Skeleton height={400} />
          )}
        </div>

        {recentTransactionsLoading ? (
          <Skeleton height={300} />
        ) : recentTransactions ? (
          <RecentTransaction
            recentTransactions={recentTransactions as RecentTransactions}
          />
        ) : (
          <Skeleton height={300} />
        )}
      </div>

      <div className="dashboard__right">
        {walletLoading ? (
          <Skeleton height={400} />
        ) : wallet ? (
          <WalletCard wallet={wallet as Wallet} />
        ) : (
          <Skeleton height={400} />
        )}
        {scheduledTransfersLoading ? (
          <Skeleton height={424} />
        ) : scheduledTransfers ? (
          <ScheduledTransfers scheduledTransfers={scheduledTransfers} />
        ) : (
          <Skeleton height={424} />
        )}
      </div>

      {import.meta.env.DEV && <ErrorBoundaryTest />}
    </div>
  );
}
