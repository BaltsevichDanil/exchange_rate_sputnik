import {Center, VStack} from '@chakra-ui/react'
import {FC, ReactNode} from 'react'

interface IProps {
  children: ReactNode
}

const PageWrapper: FC<IProps> = ({children}) => {
  return (
    <Center h='100vh'>
      <VStack spacing='4' w='container.sm'>
        {children}
      </VStack>
    </Center>
  )
}

export default PageWrapper
