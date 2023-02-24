import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'

import Currency from '../pages/currency/Currency'
import Error from '../pages/error/Error'
import Exchanger from '../pages/exchanger/Exchanger'
import NotFound from '../pages/notFound/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Exchanger />} errorElement={<Error />} />
      <Route path='/currency' element={<Currency />} errorElement={<Error />} />
      <Route path='*' element={<NotFound />} errorElement={<Error />} />
    </>
  )
)

export default router
