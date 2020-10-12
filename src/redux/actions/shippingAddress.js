import http from '../../helpers/http'

export default {
  getShippingAddress: (token) => {
    return {
      type: 'GET_SHIPPING_ADDRESS',
      payload: http(token).get('/shipping_address')
    }
  }
}
