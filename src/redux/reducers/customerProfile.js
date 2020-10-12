const initialState = {
  customerProfileData: [],
  customerProfileIsLoading: false,
  customerProfileIsError: false,
  customerProfileAlertMsg: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CUSTOMER_PROFILE_PENDING' : {
      return {
        ...state,
        customerProfileIsLoading: true
      }
    }
    case 'GET_CUSTOMER_PROFILE_REJECTED': {
      return {
        ...state,
        customerProfileIsLoading: false,
        customerProfileIsError: true,
        customerProfileAlertMsg: 'Request timed out..'
      }
    }
    case 'GET_CUSTOMER_PROFILE_FULFILLED': {
      return {
        ...state,
        customerProfileIsLoading: false,
        customerProfileData: action.payload.data.data
      }
    }
    default : {
      return state
    }
  }
}
