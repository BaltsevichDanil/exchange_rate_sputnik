import {
  IExchangeInfo,
  IExchangeParserResult,
  Rate,
  RatesData
} from '../interfaces'

import axios from './axios'

interface IExchangeResponse {
  result: number
}

interface ILatestRatesResponse {
  rates: RatesData
}

export default class RatesService {
  static async exchangeRates(
    data: IExchangeParserResult
  ): Promise<IExchangeInfo> {
    const response = await axios<IExchangeResponse>(
      `/convert?to=${data.to}&from=${data.from}&amount=${data.amount}`
    )
    const fixedDigits = 2
    return {
      from: data.from,
      to: data.to,
      fromAmount: parseFloat(data.amount.toFixed(fixedDigits)),
      toAmount: parseFloat(response.data.result.toFixed(fixedDigits))
    }
  }

  static async getLatestRates(base: Rate): Promise<ILatestRatesResponse> {
    const response = await axios<ILatestRatesResponse>(`/latest?&base=${base}`)
    return response.data
  }
}
