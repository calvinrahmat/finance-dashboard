import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ExchangeRateWidget } from './ExchangeRateWidget'

describe('ExchangeRateWidget', () => {
  it('renders a row for every supported currency', () => {
    render(<ExchangeRateWidget />)
    expect(screen.getByText('AUD')).toBeInTheDocument()
    expect(screen.getByText('SGD')).toBeInTheDocument()
    expect(screen.getByText('GBP')).toBeInTheDocument()
  })

  it('converts USD to GBP using the current rate', () => {
    render(<ExchangeRateWidget />)
    const amountInput = screen.getByPlaceholderText('1000')
    fireEvent.change(amountInput, { target: { value: '1000' } })
    expect(screen.getByText('£790.00')).toBeInTheDocument()
    expect(screen.getByText('1 USD = 0.7900 GBP')).toBeInTheDocument()
  })

  it('converts GBP back to USD when the direction is reversed', () => {
    render(<ExchangeRateWidget />)
    fireEvent.click(screen.getByRole('button', { name: /Foreign.*USD/ }))
    const amountInput = screen.getByPlaceholderText('1000')
    fireEvent.change(amountInput, { target: { value: '1000' } })
    expect(screen.getByText('1 GBP = 1.27 USD')).toBeInTheDocument()
  })
})
