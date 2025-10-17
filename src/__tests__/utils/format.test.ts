// @ts-nocheck - Jest tests with path aliases
import { formatDate } from '@utils/format'

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15')
    const result = formatDate(date, 'en-US')
    expect(result).toContain('Jan')
    expect(result).toContain('15')
    expect(result).toContain('2024')
  })

  it('should handle string input', () => {
    const result = formatDate('2024-01-15', 'en-US')
    expect(result).toContain('Jan')
  })

  it('should handle timestamp input', () => {
    const timestamp = new Date('2024-01-15').getTime()
    const result = formatDate(timestamp, 'en-US')
    expect(result).toContain('Jan')
  })

  it('should handle invalid date', () => {
    const result = formatDate('invalid date')
    expect(result).toBe('invalid date')
  })

  it('should handle Turkish locale', () => {
    const date = new Date('2024-01-15')
    const result = formatDate(date, 'tr-TR')
    expect(result).toBeTruthy()
  })
})
