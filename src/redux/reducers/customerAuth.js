const initialState = {
  isLogin: false,
  isError: false,
  token: '',
  alertMsg: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_CUSTOMER_PENDING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'AUTH_CUSTOMER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'Wrong email or password'
      }
    }
    case 'AUTH_CUSTOMER_FULFILLED': {
      return {
        ...state,
        token: action.payload.data.token,
        isLoading: false,
        isLogin: true,
        alertMsg: 'Successfully login'
      }
    }
    default : {
      return state
    }
  }
}
