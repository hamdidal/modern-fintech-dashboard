// @ts-nocheck - Jest tests with path aliases
import {
  formatCurrency,
  formatDate,
  formatDateShort,
  formatDateLong,
  formatDateTime,
  formatRelativeDate,
  generateSecurePassword,
} from '@utils/format'

describe('formatCurrency', () => {
  it('should format USD correctly', () => {
    const result = formatCurrency(1234.56, 'USD', 'en-US')
    expect(result).toBe('$1,234.56')
  })

  it('should format TRY correctly', () => {
    const result = formatCurrency(1234.56, 'TRY', 'tr-TR')
    expect(result).toContain('1')
    expect(result).toContain('234')
  })

  it('should format EUR correctly', () => {
    const result = formatCurrency(1234.56, 'EUR', 'en-US')
    expect(result).toContain('1,234.56')
  })

  it('should handle zero values', () => {
    const result = formatCurrency(0, 'USD', 'en-US')
    expect(result).toBe('$0.00')
  })

  it('should handle negative values', () => {
    const result = formatCurrency(-1234.56, 'USD', 'en-US')
    expect(result).toContain('-')
    expect(result).toContain('1,234.56')
  })

  it('should handle large numbers', () => {
    const result = formatCurrency(1000000, 'USD', 'en-US')
    expect(result).toContain('1,000,000')
  })

  it('should fallback for invalid currency', () => {
    const result = formatCurrency(100, 'INVALID', 'en-US')
    expect(result).toContain('100')
  })

  it('should handle currency symbols', () => {
    const result = formatCurrency(100, '₺', 'tr-TR')
    expect(result).toContain('100')
  })
})

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

describe('formatDateShort', () => {
  it('should format short date correctly', () => {
    const date = new Date('2024-01-15')
    const result = formatDateShort(date, 'en-US')
    expect(result).toContain('Jan')
    expect(result).toContain('15')
    expect(result).not.toContain('2024')
  })

  it('should handle invalid date', () => {
    const result = formatDateShort('invalid')
    expect(result).toBe('invalid')
  })
})

describe('formatDateLong', () => {
  it('should format long date correctly', () => {
    const date = new Date('2024-01-15')
    const result = formatDateLong(date, 'en-US')
    expect(result).toContain('January')
    expect(result).toContain('15')
    expect(result).toContain('2024')
  })

  it('should handle invalid date', () => {
    const result = formatDateLong('invalid')
    expect(result).toBe('invalid')
  })
})

describe('formatDateTime', () => {
  it('should format date and time correctly', () => {
    const date = new Date('2024-01-15T14:30:00')
    const result = formatDateTime(date, 'en-US')
    expect(result).toContain('Jan')
    expect(result).toContain('15')
  })

  it('should handle invalid date', () => {
    const result = formatDateTime('invalid')
    expect(result).toBe('invalid')
  })
})

describe('formatRelativeDate', () => {
  it('should return "today" for current date', () => {
    const today = new Date()
    const result = formatRelativeDate(today)
    expect(result.toLowerCase()).toContain('today')
  })

  it('should return "yesterday" for yesterday', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const result = formatRelativeDate(yesterday)
    expect(result.toLowerCase()).toContain('yesterday')
  })

  it('should return days ago for recent dates', () => {
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
    const result = formatRelativeDate(threeDaysAgo)
    expect(result).toContain('3')
    expect(result.toLowerCase()).toContain('day')
  })

  it('should return weeks ago for dates within a month', () => {
    const twoWeeksAgo = new Date()
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
    const result = formatRelativeDate(twoWeeksAgo)
    expect(result).toContain('2')
    expect(result.toLowerCase()).toContain('week')
  })

  it('should return months ago for dates within a year', () => {
    const twoMonthsAgo = new Date()
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2)
    const result = formatRelativeDate(twoMonthsAgo)
    expect(result).toContain('2')
    expect(result.toLowerCase()).toContain('month')
  })

  it('should return years ago for old dates', () => {
    const twoYearsAgo = new Date()
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2)
    const result = formatRelativeDate(twoYearsAgo)
    expect(result).toContain('2')
    expect(result.toLowerCase()).toContain('year')
  })

  it('should handle invalid date', () => {
    const result = formatRelativeDate('invalid')
    expect(result).toBe('invalid')
  })
})

describe('generateSecurePassword', () => {
  it('should generate password with default length', () => {
    const password = generateSecurePassword()
    expect(password).toHaveLength(16)
  })

  it('should generate password with custom length', () => {
    const password = generateSecurePassword(20)
    expect(password).toHaveLength(20)
  })

  it('should include uppercase letters', () => {
    const password = generateSecurePassword()
    expect(password).toMatch(/[A-Z]/)
  })

  it('should include lowercase letters', () => {
    const password = generateSecurePassword()
    expect(password).toMatch(/[a-z]/)
  })

  it('should include numbers', () => {
    const password = generateSecurePassword()
    expect(password).toMatch(/[0-9]/)
  })

  it('should include special characters', () => {
    const password = generateSecurePassword()
    expect(password).toMatch(/[!@#$%^&*(),.?":{}|<>]/)
  })

  it('should generate different passwords each time', () => {
    const password1 = generateSecurePassword()
    const password2 = generateSecurePassword()
    expect(password1).not.toBe(password2)
  })

  it('should handle minimum length', () => {
    const password = generateSecurePassword(8)
    expect(password).toHaveLength(8)
  })

  it('should handle large length', () => {
    const password = generateSecurePassword(50)
    expect(password).toHaveLength(50)
  })
})
