import http from '../../helpers/http'

export default {
  getPrimaryAddress: (token) => {
    return {
      type: 'GET_PRIMARY_ADDRESS',
      payload: http(token).get('/shipping_address/primary')
    }
  }
}
