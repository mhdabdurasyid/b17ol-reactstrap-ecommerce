import http from '../../helpers/http'

export default {
  getCustomerCart: (token) => {
    return {
      type: 'GET_CART',
      payload: http(token).get('/cart')
    }
  }
}
