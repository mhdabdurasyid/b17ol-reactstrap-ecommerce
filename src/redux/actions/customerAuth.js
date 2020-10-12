import http from '../../helpers/http'
import qs from 'querystring'

export default {
  login: (data) => ({
    type: 'AUTH_CUSTOMER',
    payload: http().post('/auth/customer/login', qs.stringify(data))
  }),
  logout: () => ({
    type: 'LOGOUT_CUSTOMER'
  })
}
