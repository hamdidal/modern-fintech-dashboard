import React, { memo, useMemo } from 'react'

interface SkeletonProps {
  height?: number | string
  width?: number | string
  borderRadius?: number | string
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  style?: React.CSSProperties
}

const SkeletonComponent = ({
  height = 16,
  width,
  borderRadius,
  className = '',
  variant = 'rounded',
  style,
}: SkeletonProps) => {
  const variantStyle = useMemo((): React.CSSProperties => {
    switch (variant) {
      case 'text':
        return { borderRadius: '4px' }
      case 'circular':
        return { borderRadius: '50%', width: height, height }
      case 'rectangular':
        return { borderRadius: '0' }
      case 'rounded':
      default:
        return { borderRadius: '10px' }
    }
  }, [variant, height])

  const combinedStyle = useMemo(
    () => ({
      height,
      width,
      borderRadius,
      ...variantStyle,
      ...style,
    }),
    [height, width, borderRadius, variantStyle, style]
  )

  return <div className={`skeleton ${className}`.trim()} style={combinedStyle} />
}

export const Skeleton = memo(SkeletonComponent)