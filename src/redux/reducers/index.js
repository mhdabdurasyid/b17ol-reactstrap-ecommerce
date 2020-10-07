import { combineReducers } from 'redux'

import newProducts from './newProducts'
import popularProducts from './popularProducts'

export default combineReducers({
  newProducts,
  popularProducts
})
