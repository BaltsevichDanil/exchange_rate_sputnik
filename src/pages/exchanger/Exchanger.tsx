import {ArrowForwardIcon} from '@chakra-ui/icons'
import {
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Text
} from '@chakra-ui/react'
import {ChangeEvent, FC, FormEvent, useState} from 'react'

import ExchangeResult, {
  IExchangeInfo
} from '../../components/exchangeResult/exchangeResult'
import Form from '../../components/form/Form'
import NavButton from '../../components/navButton/NavButton'
import PageWrapper from '../../components/pageWrapper/PageWrapper'
import exchangerParser from '../../utils/exchangerParser'

const Exchanger: FC = () => {
  const [isOpen, setIsOpen] = useState<'open' | 'closed'>('closed')
  const [loading, setLoading] = useState<boolean>(true)
  const [exchangeQuery, setExchangeQuery] = useState<string>('')
  const [exchangeError, setExchangeError] = useState<string>('')
  const [exchangeInfo, setExchangeInfo] = useState<IExchangeInfo>({
    from: 'RUB',
    to: 'USD',
    fromAmount: 15,
    toAmount: 30
  })

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setExchangeError('')
    setLoading(true)
    try {
      const parsedData = exchangerParser(exchangeQuery)
      setExchangeInfo({
        from: parsedData.from,
        to: parsedData.to,
        toAmount: parsedData.amount,
        fromAmount: parsedData.amount
      })
      if (isOpen === 'closed') {
        setIsOpen('open')
      }
    } catch (err) {
      const error = err as Error
      setExchangeError(error.message)
      setIsOpen('closed')
    }
    setLoading(false)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setExchangeQuery(e.target.value)

  return (
    <PageWrapper>
      <Form onSubmit={onSubmit}>
        <FormControl>
          <FormLabel>Обменник:</FormLabel>
          <HStack spacing={2}>
            <Input
              placeholder='15 rub in usd'
              variant='filled'
              value={exchangeQuery}
              onChange={onChange}
            />
            <IconButton
              aria-label='Exchange'
              icon={<ArrowForwardIcon />}
              type='submit'
              colorScheme='teal'
            />
          </HStack>
          <Text color='red.400' fontSize='sm'>
            {exchangeError}
          </Text>
        </FormControl>
      </Form>
      <ExchangeResult
        isOpen={isOpen}
        exchangeInfo={exchangeInfo}
        loading={loading}
      />
      <NavButton link='/currency' text='Курсы валют' dir='next' />
    </PageWrapper>
  )
}

export default Exchanger
