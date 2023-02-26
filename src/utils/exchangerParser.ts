import {rates} from '../constants/rates'
import {IExchangeParserResult, Rate} from '../interfaces'

const exchangerParser = (data: string): IExchangeParserResult => {
  const regex = new RegExp(/([0-9]*[.])?[0-9]+ [a-zA-Z]{3} in [a-zA-Z]{3}/g)
  if (regex.test(data)) {
    // eslint-disable-next-line no-unused-vars
    const [amount, from, _, to] = data.split(' ')

    const parsedAmount = parseFloat(amount)

    if (!isFinite(parsedAmount)) {
      throw new Error('Число не должно содержать лишних символов')
    }

    const upperCasedFrom = from.toUpperCase() as Rate
    const upperCasedTo = to.toUpperCase() as Rate

    if (upperCasedFrom === upperCasedTo) {
      throw new Error('Валюты обмена не могут быть одинаковыми')
    }

    if (!rates.includes(upperCasedFrom)) {
      throw new Error('Не найдена базовая валюта')
    }

    if (!rates.includes(upperCasedTo)) {
      throw new Error('Не найдена валюта для обмена')
    }

    return {
      amount: parsedAmount,
      from: upperCasedFrom,
      to: upperCasedTo
    }
  }
  throw new Error('Некоректное значение! Введите в формате: 15 rub in usd')
}

export default exchangerParser
