import axios from 'axios'

export default {
  getProductByCategory: (id) => ({
    type: 'GET_PRODUCT_BY_CATEGORY',
    payload: axios.get(`${process.env.REACT_APP_BACKEND_URL}/public/category/${id}`)
  })
}
