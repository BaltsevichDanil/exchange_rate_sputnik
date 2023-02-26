import {
  VStack,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text
} from '@chakra-ui/react'
import {ChangeEvent, FC, ReactNode, useEffect, useState} from 'react'

import NavButton from '../../components/navButton/NavButton'
import {Rate, rates} from '../../constants/rates'
import RatesService, {RatesData} from '../../http/ratesService'

const Currency: FC = () => {
  const [selectedRate, setSelectedRate] = useState<Rate>('RUB')
  const [ratesData, setRatesData] = useState<RatesData>()
  const [errorText, setErrorText] = useState<string>('')

  const onSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedRate(e.target.value as Rate)
  }

  useEffect(() => {
    RatesService.getLatestRates(selectedRate)
      .then(result => setRatesData(result.rates))
      .catch(err => setErrorText(err.message))
  }, [selectedRate])

  const showRatesData = (): ReactNode => {
    if (ratesData) {
      const tableElements: ReactNode[] = []
      for (const rate in ratesData) {
        if (ratesData.hasOwnProperty(rate)) {
          tableElements.push(
            <Tr key={rate}>
              <Td>1 {selectedRate}</Td>
              <Td>{rate}</Td>
              <Td isNumeric>{ratesData[rate as Rate]}</Td>
            </Tr>
          )
        }
      }
      return <Tbody>{tableElements}</Tbody>
    }
    return <Tbody></Tbody>
  }

  return (
    <VStack maxW='container.md' mx='auto' spacing={4} mt={10}>
      <NavButton link='/' text='Обменник' dir='prev' />
      <Select variant='filled' defaultValue={selectedRate} onChange={onSelect}>
        {rates.map(rate => (
          <option key={rate} value={rate}>
            {rate}
          </option>
        ))}
      </Select>
      <Text color='red.400' fontSize='sm'>
        {errorText}
      </Text>
      <TableContainer w='full'>
        <Table>
          <TableCaption>Курсы валют</TableCaption>
          <Thead>
            <Tr>
              <Th>Базовая валюта</Th>
              <Th>Валюта</Th>
              <Th isNumeric>Курс</Th>
            </Tr>
          </Thead>
          {showRatesData()}
        </Table>
      </TableContainer>
    </VStack>
  )
}

export default Currency
