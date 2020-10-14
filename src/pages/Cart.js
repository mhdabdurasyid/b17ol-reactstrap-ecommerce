import React, { Component } from 'react'
import { Container, Row, Col, Card, CardTitle, FormGroup, Label, CustomInput, Button, Spinner } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import qs from 'querystring'
import http from '../helpers/http'

// import component
import Navbar from '../components/NavbarCustomer'

// import icon
import Plus from '../assets/img/icon/plus.svg'
import Minus from '../assets/img/icon/minus.svg'

// import action
import cartAction from '../redux/actions/cart'
import checkoutAction from '../redux/actions/checkout'
import primaryAddressAction from '../redux/actions/primaryAddress'

class Cart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedProduct: 0,
      summary: 0,
      product: []
    }
  }

  componentDidMount () {
    this.props.getCustomerCart(this.props.customerAuth.token)
    this.props.getPrimaryAddress(this.props.customerAuth.token)
  }

  onChangeCheckbox (e, product) {
    if (e.target.checked) {
      const data = this.state.product
      data.push(product)
      this.setState({
        product: data,
        summary: this.state.summary + product.price * product.quantity,
        selectedProduct: this.state.selectedProduct + 1
      })
    } else {
      const data = this.state.product
      data.pop(product)
      this.setState({
        product: data,
        summary: this.state.summary - product.price * product.quantity,
        selectedProduct: this.state.selectedProduct - 1
      })
    }
  }

  updateQuantity (id, num) {
    http(this.props.customerAuth.token).patch(`/cart/${id}`, qs.stringify({ quantity: num }))
    this.props.getCustomerCart(this.props.customerAuth.token)
    this.setState({
      selectedProduct: 0,
      summary: 0,
      product: []
    })
  }

  deleteProduct () {
    if (this.state.product.length) {
      this.state.product.forEach(product => {
        http(this.props.customerAuth.token).delete(`/cart/${product.item_id}`)
      })
      this.props.getCustomerCart(this.props.customerAuth.token)
      this.setState({
        selectedProduct: 0,
        summary: 0,
        product: []
      })
    }
  }

  checkout () {
    if (this.state.selectedProduct !== 0) {
      this.props.setCheckout(this.state.product, this.state.summary)
      this.props.history.push('/checkout')
    }
  }

  render () {
    const { cartData, cartIsLoading, cartIsError, cartAlertMsg } = this.props.cart

    return (
      <>
        <Navbar />
        <Container className='my-5'>
          <h2 className='font-weight-bold mb-4'>My Bag</h2>
          <Row>
            <Col md='8'>
              <Card className='px-4 shadow mb-4'>
                <div className='d-flex flex-row justify-content-between align-items-center'>
                  <FormGroup className='mb-4'>
                    <Label for='selectAll' />
                    <div>
                      <CustomInput type='checkbox' name='selectAll' id='selectAll' label={`Select all items (${this.state.selectedProduct} items selected)`} />
                    </div>
                  </FormGroup>
                  <div>
                    <Link to='#delete' onClick={() => { this.deleteProduct() }} className='text-decoration-none text-success'>Delete</Link>
                  </div>
                </div>
              </Card>
              {!cartIsLoading && !cartIsError && cartData && cartData.map(product => {
                return (
                  <Card className='px-4 shadow mb-2' key={product.item_id}>
                    <Row>
                      <Col md='6'>
                        <FormGroup>
                          <Label />
                          <div>
                            <CustomInput type='checkbox' name={product.item_id.toString()} id={product.item_id.toString()} value={product} onChange={e => { this.onChangeCheckbox(e, product) }}>
                              <Label for={product.item_id.toString()}>
                                <div className='d-flex flex-row align-items-center'>
                                  <div
                                    style={{
                                      backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}${product.img_thumbnail}')`,
                                      width: '70px',
                                      height: '70px',
                                      backgroundSize: 'cover'
                                    }}
                                    className='ml-2 mr-3 rounded'
                                  />
                                  <div>
                                    <h6 className='font-weight-bold m-0'>{product.name}</h6>
                                    <small className='text-secondary'>{product.store_name}</small>
                                  </div>
                                </div>
                              </Label>
                            </CustomInput>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md='6' className='align-self-center'>
                        <div className='d-flex flex-row justify-content-end align-items-center'>
                          <div className='d-flex flex-row align-items-center mr-4'>
                            <Button disabled={product.quantity === 1 && true} onClick={() => { this.updateQuantity(product.item_id, product.quantity - 1) }} color='secondary' className='rounded-circle shadow-sm p-0' style={{ height: '36px', width: '36px' }}><img src={Minus} alt='subtract quantity' /></Button>
                            <div className='text-center' style={{ width: '40px' }}>
                              <span>{product.quantity}</span>
                            </div>
                            <Button onClick={() => { this.updateQuantity(product.item_id, product.quantity + 1) }} outline color='secondary' className='rounded-circle shadow-sm p-0' style={{ height: '36px', width: '36px' }}><img src={Plus} alt='add quantity' /></Button>
                          </div>
                          <div className='ml-5'>
                            <h6 className='font-weight-bold m-0'>Rp {product.price.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</h6>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                )
              })}
            </Col>
            <Col md='4'>
              <Card body className='shadow'>
                <CardTitle className='font-weight-bold mb-3'>Shopping summary</CardTitle>
                <div className='d-flex flex-row justify-content-between align-items-center'>
                  <div>
                    <p className='font-weight-bold text-secondary mb-4'>Total price</p>
                  </div>
                  <div>
                    <p className='font-weight-bold mb-4'>Rp {this.state.summary.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</p>
                  </div>
                </div>
                <Button onClick={() => { this.checkout() }} color='success' className='rounded-pill'>Buy</Button>
              </Card>
            </Col>
          </Row>
          {cartIsLoading && !cartIsError && (
            <div>
              <Spinner type='grow' color='success' />
              <Spinner type='grow' color='warning' />
              <Spinner type='grow' color='secondary' />
            </div>
          )}
          {cartIsError && cartAlertMsg !== '' && (
            <div>{cartAlertMsg}</div>
          )}
        </Container>
      </>
    )
  }
}

const mapStateToProps = state => ({
  customerAuth: state.customerAuth,
  cart: state.cart,
  checkout: state.checkout
})

const mapDispatchToProps = {
  getCustomerCart: cartAction.getCustomerCart,
  setCheckout: checkoutAction.setCheckout,
  getPrimaryAddress: primaryAddressAction.getPrimaryAddress
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
