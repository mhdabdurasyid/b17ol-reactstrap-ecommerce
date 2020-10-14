export default {
  setCheckout: (product, summary) => ({
    type: 'CHECKOUT',
    payload: { product, summary }
  })
}
