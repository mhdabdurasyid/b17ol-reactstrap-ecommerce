const initialState = {
  quantity: 1
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_QUANTITY': {
      return {
        quantity: state.quantity + 1
      }
    }
    case 'DECREASE_QUANTITY': {
      return {
        quantity: state.quantity - 1
      }
    }
    default : {
      return state
    }
  }
}
