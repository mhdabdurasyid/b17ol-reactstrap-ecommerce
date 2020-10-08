const initialState = {
  getProductByCategoryData: [],
  getProductByCategoryIsLoading: false,
  getProductByCategoryIsError: false,
  getProductByCategoryAlertMsg: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCT_BY_CATEGORY_PENDING' : {
      return {
        ...state,
        getProductByCategoryIsLoading: true
      }
    }
    case 'GET_PRODUCT_BY_CATEGORY_REJECTED': {
      return {
        ...state,
        getProductByCategoryIsLoading: false,
        getProductByCategoryIsError: true,
        getProductByCategoryAlertMsg: 'Request timed out..'
      }
    }
    case 'GET_PRODUCT_BY_CATEGORY_FULFILLED': {
      return {
        ...state,
        getProductByCategoryIsLoading: false,
        getProductByCategoryData: action.payload.data.data.items
      }
    }
    default : {
      return state
    }
  }
}
