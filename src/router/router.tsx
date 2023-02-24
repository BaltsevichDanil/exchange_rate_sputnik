import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'

import App from '../App'
import Error from '../pages/error/Error'
import NotFound from '../pages/notFound/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />} errorElement={<Error />} />
      <Route path='*' element={<NotFound />} errorElement={<Error />} />
    </>
  )
)

export default router
