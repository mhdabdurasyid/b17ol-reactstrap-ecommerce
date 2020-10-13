const initialState = {
  cartData: [],
  cartIsLoading: false,
  cartIsError: false,
  cartAlertMsg: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CART_PENDING' : {
      return {
        ...state,
        cartIsLoading: true
      }
    }
    case 'GET_CART_REJECTED': {
      return {
        ...state,
        cartIsLoading: false,
        cartIsError: true,
        cartAlertMsg: 'Request timed out..'
      }
    }
    case 'GET_CART_FULFILLED': {
      return {
        ...state,
        cartIsLoading: false,
        cartData: action.payload.data.data
      }
    }
    default : {
      return state
    }
  }
}
