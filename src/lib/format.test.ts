import { describe, expect, it } from 'vitest'
import { formatCompactCurrency, formatCurrency, formatPercent } from './format'

describe('formatCurrency', () => {
  it('formats a positive value', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50')
  })

  it('formats a negative value with a leading minus', () => {
    expect(formatCurrency(-1234.5)).toBe('-$1,234.50')
  })

  it('adds an explicit + sign when signDisplay is set', () => {
    expect(formatCurrency(1234.5, { signDisplay: true })).toBe('+$1,234.50')
    expect(formatCurrency(-1234.5, { signDisplay: true })).toBe('-$1,234.50')
  })
})

describe('formatCompactCurrency', () => {
  it('formats large values compactly', () => {
    expect(formatCompactCurrency(1500)).toBe('$1.5K')
    expect(formatCompactCurrency(2500000)).toBe('$2.5M')
  })
})

describe('formatPercent', () => {
  it('adds a + sign for positive values', () => {
    expect(formatPercent(4.567)).toBe('+4.6%')
  })

  it('does not add a + sign for negative or zero values', () => {
    expect(formatPercent(-4.567)).toBe('-4.6%')
    expect(formatPercent(0)).toBe('0.0%')
  })
})
