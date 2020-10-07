import { combineReducers } from 'redux'

import newProducts from './newProducts'
import popularProducts from './popularProducts'
import detailProduct from './detailProduct'

export default combineReducers({
  newProducts,
  popularProducts,
  detailProduct
})
