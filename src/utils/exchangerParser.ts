import rates from '../constants/rates'

interface IResult {
  amount: number
  from: string
  to: string
}

const exchangerParser = (data: string): IResult => {
  const regex = new RegExp(/([0-9]*[.])?[0-9]+ [a-zA-Z]{3} in [a-zA-Z]{3}/g)
  if (regex.test(data)) {
    // eslint-disable-next-line no-unused-vars
    const [amount, from, _, to] = data.split(' ')

    const parsedAmount = parseFloat(amount)

    if (!isFinite(parsedAmount)) {
      throw new Error('Amount is not finite')
    }

    if (from.toUpperCase() === to.toUpperCase()) {
      throw new Error("From rates can't be equal to rates")
    }

    if (!rates.includes(from.toUpperCase())) {
      throw new Error('From rates is incorrect')
    }

    if (!rates.includes(to.toUpperCase())) {
      throw new Error('To rates is incorrect')
    }

    return {
      amount: parsedAmount,
      from,
      to
    }
  }
  throw new Error('Parsing error')
}

export default exchangerParser
