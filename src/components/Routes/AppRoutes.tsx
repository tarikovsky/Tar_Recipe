import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import { ROUTES } from '../../utils/route'
import Meals from '../Meals/Meals'
import Meal from '../Meal/Meal'

const AppRoutes = () => (
  <Routes>
      <Route index element={<Home />} />
      <Route path={ROUTES.CATEGORY} element={<Meals />} />
      <Route path={ROUTES.MEAL} element={<Meal />} />
  </Routes>
)

export default AppRoutes