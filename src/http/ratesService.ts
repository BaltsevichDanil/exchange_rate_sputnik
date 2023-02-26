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

// RatesService with methods that get information about rates
export default class RatesService {
  // exchangeRates send to api base rate and wanted rate
  // Get exchange rates result
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

  // getLatestRates send to api base rate.
  // Get the latest rates by base.
  static async getLatestRates(base: Rate): Promise<ILatestRatesResponse> {
    const response = await axios<ILatestRatesResponse>(`/latest?&base=${base}`)
    return response.data
  }
}
