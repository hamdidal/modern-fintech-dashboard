import { memo, useMemo } from 'react'
import WalletMinus from '@assets/svgs/WalletMinus'
import WalletPlus from '@assets/svgs/WalletPlus'
import { useCurrency } from '@hooks/useCurrency'
import type { ChangeMetric } from '@types'

type MetricType = 'balance' | 'expense' | 'savings'

interface MetricCardProps {
  type: MetricType
  label: string
  value: number
  currency: string
  change?: ChangeMetric
  isSelected?: boolean
  onClick?: () => void
}

const MetricCard = ({
  type,
  label,
  value,
  currency,
  isSelected = false,
  onClick,
}: MetricCardProps) => {
  const { convertAndFormat } = useCurrency()
  const cardVariant = isSelected ? 'primary' : 'secondary'
  const iconColor = isSelected ? '#C8EE44' : '#363A3F'

  const icon = useMemo(() => {
    switch (type) {
      case 'balance':
      case 'expense':
        return <WalletMinus color={iconColor} />
      case 'savings':
        return <WalletPlus color={iconColor} />
      default:
        return null
    }
  }, [type, iconColor])

  const formattedValue = useMemo(() => convertAndFormat(value, currency), [value, currency, convertAndFormat])

  return (
    <div
      className={`metric-card metric-card--${cardVariant} ${
        isSelected ? 'metric-card--selected' : ''
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-live="polite"
    >
      <div
        className={`metric-card__icon ${isSelected ? 'metric-card__icon--selected' : ''}`}
      >
        {icon}
      </div>
      <div className="metric-card__content">
        <div className="metric-card__label">{label}</div>
        <div className="metric-card__value">{formattedValue}</div>
      </div>
    </div>
  )
}

export default memo(MetricCard)
