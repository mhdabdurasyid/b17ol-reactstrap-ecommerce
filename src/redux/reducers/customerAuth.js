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
      localStorage.setItem('token', action.payload.data.token)
      return {
        ...state,
        token: action.payload.data.token,
        isLoading: false,
        isLogin: true,
        alertMsg: 'Successfully login'
      }
    }
    case 'SET_TOKEN': {
      return {
        ...state,
        token: action.payload.token,
        isLoading: false,
        isLogin: true,
        alertMsg: 'Successfully login'
      }
    }
    case 'LOGOUT_CUSTOMER': {
      localStorage.removeItem('token')
      return {
        isLogin: false,
        token: '',
        isError: false,
        alertMsg: ''
      }
    }
    default : {
      return state
    }
  }
}
