import {expect, it, test} from '@jest/globals'
import exchangerParser from '../utils/exchangerParser'

describe('Test exchanger parser', () => {
  it('Should return exchange result', () => {
    expect(exchangerParser('15 rub in usd')).toStrictEqual({
      amount: 15,
      from: 'rub',
      to: 'usd'
    })
  })

  it('Should throw parsing error', () => {
    try {
      exchangerParser('fifteen rub in usd')
      expect(true).toBe(false)
    } catch (e) {
      const error = e as Error
      expect(error.message).toBe('Parsing error')
    }
  })

  it('Should throw parsing error', () => {
    try {
      exchangerParser('fifteen rub usd')
      expect(true).toBe(false)
    } catch (e) {
      const error = e as Error
      expect(error.message).toBe('Parsing error')
    }
  })

  it("Should throw from rates can't be equal to rates", () => {
    try {
      exchangerParser('15 rub in rub')
      expect(true).toBe(false)
    } catch (e) {
      const error = e as Error
      expect(error.message).toBe("From rates can't be equal to rates")
    }
  })

  it('Should throw from rates is not includes in rates', () => {
    try {
      exchangerParser('15 fjk in rub')
      expect(true).toBe(false)
    } catch (e) {
      const error = e as Error
      expect(error.message).toBe('From rates is incorrect')
    }
  })

  it('Should throw to rates is incorrect', () => {
    try {
      exchangerParser('15 rub in sdf')
      expect(true).toBe(false)
    } catch (e) {
      const error = e as Error
      expect(error.message).toBe('To rates is incorrect')
    }
  })
})
