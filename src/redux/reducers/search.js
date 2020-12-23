const initialState = {
  searchProductsData: [],
  searchProductsIsLoading: false,
  searchProductsIsError: false,
  searchProductsAlertMsg: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_PENDING' : {
      return {
        ...state,
        searchProductsIsLoading: true
      }
    }
    case 'SEARCH_REJECTED': {
      return {
        ...state,
        searchProductsIsLoading: false,
        searchProductsIsError: true,
        searchProductsAlertMsg: 'Request timed out..'
      }
    }
    case 'SEARCH_FULFILLED': {
      return {
        ...state,
        searchProductsIsLoading: false,
        searchProductsData: action.payload.data.data
      }
    }
    default : {
      return state
    }
  }
}
