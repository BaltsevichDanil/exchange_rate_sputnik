import {Heading, Link} from '@chakra-ui/react'
import {FC} from 'react'
import {Link as RLink} from 'react-router-dom'

import PageWrapper from '../../components/pageWrapper/PageWrapper'

const NotFound: FC = () => {
  return (
    <PageWrapper>
      <Heading as='h1' size='4xl'>
        404
      </Heading>
      <Heading as='h5' size='lg'>
        К сожалению, страница не найдена.
      </Heading>
      <Link as={RLink} to='/'>
        На главную
      </Link>
    </PageWrapper>
  )
}

export default NotFound
