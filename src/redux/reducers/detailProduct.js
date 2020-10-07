const initialState = {
  detailProductData: [],
  detailProductIsLoading: false,
  detailProductIsError: false,
  detailProductAlertMsg: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NEW_PRODUCTS_PENDING' : {
      return {
        ...state,
        detailProductIsLoading: true
      }
    }
    case 'GET_NEW_PRODUCTS_REJECTED': {
      return {
        ...state,
        detailProductIsLoading: false,
        detailProductIsError: true,
        detailProductAlertMsg: 'Request timed out..'
      }
    }
    case 'GET_NEW_PRODUCTS_FULFILLED': {
      return {
        ...state,
        detailProductIsLoading: false,
        detailProductData: action.payload.data.data
      }
    }
    default : {
      return state
    }
  }
}
