import {Center, Heading, Link, VStack} from '@chakra-ui/react'
import {FC} from 'react'
import {Link as RLink} from 'react-router-dom'

const NotFound: FC = () => {
  return (
    <Center h='100vh'>
      <VStack spacing='4'>
        <Heading as='h1' size='4xl'>
          404
        </Heading>
        <Heading as='h5' size='lg'>
          К сожалению, страница не найдена.
        </Heading>
        <Link as={RLink} to='/'>
          На главную
        </Link>
      </VStack>
    </Center>
  )
}

export default NotFound
