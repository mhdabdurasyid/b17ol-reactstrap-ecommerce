const initialState = {
  relevantProductsData: [],
  relevantProductsIsLoading: false,
  relevantProductsIsError: false,
  relevantProductsAlertMsg: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RELEVANT_PRODUCTS_PENDING' : {
      return {
        ...state,
        relevantProductsIsLoading: true
      }
    }
    case 'GET_RELEVANT_PRODUCTS_REJECTED': {
      return {
        ...state,
        relevantProductsIsLoading: false,
        relevantProductsIsError: true,
        relevantProductsAlertMsg: 'Request timed out..'
      }
    }
    case 'GET_RELEVANT_PRODUCTS_FULFILLED': {
      return {
        ...state,
        relevantProductsIsLoading: false,
        relevantProductsData: action.payload.data.data
      }
    }
    default : {
      return state
    }
  }
}
