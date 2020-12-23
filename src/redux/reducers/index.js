import { combineReducers } from 'redux'

import newProducts from './newProducts'
import popularProducts from './popularProducts'
import detailProduct from './detailProduct'
import relevantProducts from './relevantProducts'
import getProductByCategory from './getProductByCategory'
import customerAuth from './customerAuth'
import customerProfile from './customerProfile'
import shippingAddress from './shippingAddress'
import quantity from './quantity'
import cart from './cart'
import checkout from './checkout'
import primaryAddress from './primaryAddress'
import search from './search'

export default combineReducers({
  newProducts,
  popularProducts,
  detailProduct,
  relevantProducts,
  getProductByCategory,
  customerAuth,
  customerProfile,
  shippingAddress,
  quantity,
  cart,
  checkout,
  primaryAddress,
  search
})
