const initialState = {
  shippingAddressData: [],
  shippingAddressIsLoading: false,
  shippingAddressIsError: false,
  shippingAddressAlertMsg: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SHIPPING_ADDRESS_PENDING' : {
      return {
        ...state,
        shippingAddressIsLoading: true
      }
    }
    case 'GET_SHIPPING_ADDRESS_REJECTED': {
      return {
        ...state,
        shippingAddressIsLoading: false,
        shippingAddressIsError: true,
        shippingAddressAlertMsg: 'Request timed out..'
      }
    }
    case 'GET_SHIPPING_ADDRESS_FULFILLED': {
      return {
        ...state,
        shippingAddressIsLoading: false,
        shippingAddressData: action.payload.data.data
      }
    }
    default : {
      return state
    }
  }
}
