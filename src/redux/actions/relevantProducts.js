import axios from 'axios'

export default {
  getRelevantProducts: (id) => ({
    type: 'GET_RELEVANT_PRODUCTS',
    payload: axios.get(`${process.env.REACT_APP_BACKEND_URL}/public/item?limit=10&search[category_id]=${id}&sort[rating]=desc`)
  })
}
