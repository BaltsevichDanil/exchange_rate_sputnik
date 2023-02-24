import {
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import {FC} from 'react'

import NavButton from '../../components/navButton/NavButton'
import PageWrapper from '../../components/pageWrapper/PageWrapper'

const Currency: FC = () => {
  return (
    <PageWrapper>
      <Select variant='filled'>
        <option value='option1' defaultChecked>
          rub
        </option>
        <option value='option2'>usd</option>
        <option value='option3'>euro</option>
      </Select>
      <TableContainer w='full'>
        <Table>
          <TableCaption>Курсы валют</TableCaption>
          <Thead>
            <Tr>
              <Th>Валюта</Th>
              <Th>Базовая валюта</Th>
              <Th isNumeric>Курс</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>usd</Td>
              <Td>rub</Td>
              <Td isNumeric>30</Td>
            </Tr>
            <Tr>
              <Td>euro</Td>
              <Td>rub</Td>
              <Td isNumeric>31</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <NavButton link='/' text='Обменник' dir='prev' />
    </PageWrapper>
  )
}

export default Currency
