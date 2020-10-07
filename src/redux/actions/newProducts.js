import axios from 'axios'

export default {
  getNewProducts: () => ({
    type: 'GET_NEW_PRODUCTS',
    payload: axios.get(`${process.env.REACT_APP_BACKEND_URL}/public/item?sort=desc&limit=15`)
  })
}
