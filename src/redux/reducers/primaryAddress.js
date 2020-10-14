const initialState = {
  primaryAddressData: [],
  primaryAddressIsLoading: false,
  primaryAddressIsError: false,
  primaryAddressAlertMsg: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRIMARY_ADDRESS_PENDING' : {
      return {
        ...state,
        primaryAddressIsLoading: true
      }
    }
    case 'GET_PRIMARY_ADDRESS_REJECTED': {
      return {
        ...state,
        primaryAddressIsLoading: false,
        primaryAddressIsError: true,
        primaryAddressAlertMsg: 'Request timed out..'
      }
    }
    case 'GET_PRIMARY_ADDRESS_FULFILLED': {
      return {
        ...state,
        primaryAddressIsLoading: false,
        primaryAddressData: action.payload.data.data
      }
    }
    default : {
      return state
    }
  }
}
