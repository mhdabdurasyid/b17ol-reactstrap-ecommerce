import axios from 'axios'

export default {
  getPopularProducts: () => ({
    type: 'GET_POPULAR_PRODUCTS',
    payload: axios.get(`${process.env.REACT_APP_BACKEND_URL}/public/item?sort[rating]=desc&limit=15`)
  })
}
