import axios from 'axios'

export default {
  getDetailProduct: (id) => ({
    type: 'GET_NEW_PRODUCTS',
    payload: axios.get(`${process.env.REACT_APP_BACKEND_URL}/public/item/${id}`)
  })
}
