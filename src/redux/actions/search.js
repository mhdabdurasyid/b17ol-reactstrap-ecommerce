import axios from 'axios'

export default {
  searchProducts: (keyword, sortColumn = 'rating', sortOption = 'desc', page = 1) => ({
    type: 'SEARCH',
    payload: axios.get(`${process.env.REACT_APP_BACKEND_URL}/public/item?limit=10&search=${keyword}&page=${page}&sort[${sortColumn}]=${sortOption}`)
  })
}
