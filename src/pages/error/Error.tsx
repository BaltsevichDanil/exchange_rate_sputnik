import {Heading, Link} from '@chakra-ui/react'
import {FC} from 'react'
import {Link as RLink, useRouteError} from 'react-router-dom'

import PageWrapper from '../../components/pageWrapper/PageWrapper'

const Error: FC = () => {
  const error = useRouteError() as Error
  return (
    <PageWrapper>
      <Heading as='h1' size='4xl'>
        Ошибка!
      </Heading>
      <Heading as='h5' color='red.500'>
        {error.message}
      </Heading>
      <Link as={RLink} to='/'>
        На главную
      </Link>
    </PageWrapper>
  )
}

export default Error
