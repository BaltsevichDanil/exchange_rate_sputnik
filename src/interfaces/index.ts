import {rates} from '../constants/rates'

export type Rate = (typeof rates)[number]

export interface IExchangeParserResult {
  amount: number
  from: Rate
  to: Rate
}

export interface IExchangeInfo {
  from: Rate
  fromAmount: number
  to: Rate
  toAmount: number
}

export type RatesData = {
  [rate in (typeof rates)[number]]: number
}
