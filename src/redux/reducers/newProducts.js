const initialState = {
  newProductsData: [],
  newProductsIsLoading: false,
  newProductsIsError: false,
  newProductsAlertMsg: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NEW_PRODUCTS_PENDING' : {
      return {
        ...state,
        newProductsIsLoading: true
      }
    }
    case 'GET_NEW_PRODUCTS_REJECTED': {
      return {
        ...state,
        newProductsIsLoading: false,
        newProductsIsError: true,
        newProductsAlertMsg: 'Request timed out..'
      }
    }
    case 'GET_NEW_PRODUCTS_FULFILLED': {
      return {
        ...state,
        newProductsIsLoading: false,
        newProductsData: action.payload.data.data
      }
    }
    default : {
      return state
    }
  }
}
