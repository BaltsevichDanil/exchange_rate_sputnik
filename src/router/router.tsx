import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'

import App from '../App'
import NotFound from '../pages/notFound/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />} />
      <Route path='*' element={<NotFound />} />
    </>
  )
)

export default router
