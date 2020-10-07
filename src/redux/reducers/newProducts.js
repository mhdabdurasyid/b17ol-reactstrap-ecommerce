const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  alertMsg: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NEW_PRODUCTS_PENDING' : {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'GET_NEW_PRODUCTS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'Request timed out..'
      }
    }
    case 'GET_NEW_PRODUCTS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data
      }
    }
    default : {
      return state
    }
  }
}
