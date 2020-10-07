const initialState = {
  popularProductsData: [],
  popularProductsIsLoading: false,
  popularProductsIsError: false,
  popularProductsAlertMsg: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POPULAR_PRODUCTS_PENDING' : {
      return {
        ...state,
        popularProductsIsLoading: true
      }
    }
    case 'GET_POPULAR_PRODUCTS_REJECTED': {
      return {
        ...state,
        popularProductsIsLoading: false,
        popularProductsIsError: true,
        popularProductsAlertMsg: 'Request timed out..'
      }
    }
    case 'GET_POPULAR_PRODUCTS_FULFILLED': {
      return {
        ...state,
        popularProductsIsLoading: false,
        popularProductsData: action.payload.data.data
      }
    }
    default : {
      return state
    }
  }
}
