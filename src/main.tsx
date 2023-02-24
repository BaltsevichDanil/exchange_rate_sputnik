import {ChakraProvider} from '@chakra-ui/react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'

import router from './router/router'
import theme from './theme/theme'

createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
)
