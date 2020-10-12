import http from '../../helpers/http'

export default {
  getCustomerProfile: (token) => {
    return {
      type: 'GET_CUSTOMER_PROFILE',
      payload: http(token).get('/costumer')
    }
  }
}
