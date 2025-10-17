import React, { memo } from 'react'
import '../styles/spinner.scss'

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
}

const SpinnerComponent: React.FC<SpinnerProps> = ({ size = 'medium', color = '#0066FF' }) => {
  return (
    <div className={`spinner spinner--${size}`}>
      <div className="spinner__circle" style={{ borderTopColor: color }} />
    </div>
  )
}

export const Spinner = memo(SpinnerComponent)
export default Spinner

