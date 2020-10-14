const initialState = {
  summary: 0,
  product: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHECKOUT': {
      return {
        ...state,
        summary: action.payload.summary,
        product: action.payload.product
      }
    }
    default : {
      return state
    }
  }
}
