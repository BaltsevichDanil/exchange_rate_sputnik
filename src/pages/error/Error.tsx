import {Center, Heading, Link, VStack} from '@chakra-ui/react'
import {FC} from 'react'
import {Link as RLink, useRouteError} from 'react-router-dom'

const Error: FC = () => {
  const error = useRouteError() as Error
  return (
    <Center height='100vh'>
      <VStack spacing='4'>
        <Heading as='h1' size='4xl'>
          Ошибка!
        </Heading>
        <Heading as='h5' color='red.500'>
          {error.message}
        </Heading>
        <Link as={RLink} to='/'>
          На главную
        </Link>
      </VStack>
    </Center>
  )
}

export default Error
