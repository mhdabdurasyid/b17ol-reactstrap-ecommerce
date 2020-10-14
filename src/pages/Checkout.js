import React, { Component } from 'react'
import { Container, Row, Col, Card, CardTitle, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import qs from 'querystring'
// import http from '../helpers/http'

// import component
import Navbar from '../components/NavbarCustomer'

// import icon
import Logo from '../assets/img/icon/logo.svg'

// import action
import shippingAddressAction from '../redux/actions/shippingAddress'

class Checkout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectAddressModal: false,
      addModal: false,
      paymentModal: false,
      selectedAddress: [],
      delivery: 0,
      summary: this.props.checkout.summary
    }
  }

  componentDidMount () {
    const { primaryAddressData } = this.props.primaryAddress
    let data = []
    this.props.checkout.product.forEach(el => {
      data.push({
        store: el.store_name,
        city: el.city_id
      })
    })
    data = data.map(e => e.store).map((e, i, final) => final.indexOf(e) === i && i).filter((e) => data[e]).map(e => data[e])
    // data.forEach(origin => {
    //   const delivery = http().post('https://api.rajaongkir.com/starter/cost', qs.stringify({
    //     origin: origin.city,
    //     destination: primaryAddressData[0].city_id,
    //     weight: 1000,
    //     courier: 'jne'
    //   }))
    //   console.log(delivery)
    // })

    this.setState({
      selectedAddress: primaryAddressData,
      delivery: 20000 * data.length,
      summary: this.state.summary + 20000 * data.length
    })
  }

  chooseAddress () {
    this.setState({ selectAddressModal: !this.state.selectAddressModal })
    this.props.getShippingAddress(localStorage.getItem('token'))
  }

  render () {
    const { summary, product } = this.props.checkout
    const { shippingAddressData } = this.props.shippingAddress

    return (
      <>
        <Navbar />
        <Container className='my-5'>
          <h2 className='font-weight-bold mb-4'>Checkout</h2>
          <Row>
            <Col md='8'>
              <h6 className='font-weight-bold mb-2'>Shipping Address</h6>
              {this.state.selectedAddress ? this.state.selectedAddress.map(address => {
                return (
                  <Card className='p-4 mb-3 shadow' key={address.id}>
                    <CardTitle>
                      <h6 className='m-0 font-weight-bold'>{address.recipient_name} | {address.recipient_phone}</h6>
                    </CardTitle>
                    <CardText>{address.full_address}</CardText>
                    <Button outline color='success' className='rounded-pill' onClick={() => { this.chooseAddress() }}>Choose another address</Button>
                  </Card>
                )
              }) : (
                <Card className='p-4 mb-3 shadow'>
                  <Button outline color='success' className='rounded-pill' onClick={() => this.setState({ addModal: !this.state.addModal })}>Add shipping address</Button>
                </Card>
              )}
              {product.map(product => {
                return (
                  <Card key={product.item_id} className='p-4 shadow mb-2'>
                    <Row>
                      <Col md='6'>
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
                      </Col>
                      <Col md='6' className='align-self-center'>
                        <h6 className='font-weight-bold text-right m-0'>Rp {(product.price * product.quantity).toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</h6>
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
                    <p className='font-weight-bold text-secondary m-0'>Order</p>
                  </div>
                  <div>
                    <p className='font-weight-bold m-0'>Rp {summary.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</p>
                  </div>
                </div>
                <div className='d-flex flex-row justify-content-between align-items-center'>
                  <div>
                    <p className='font-weight-bold text-secondary m-0'>Delivery</p>
                  </div>
                  <div>
                    <p className='font-weight-bold m-0'>Rp {this.state.delivery.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</p>
                  </div>
                </div>
                <hr className='my-2' />
                <div className='d-flex flex-row justify-content-between align-items-center'>
                  <div>
                    <p className='font-weight-bold mb-4'>Shopping Summary</p>
                  </div>
                  <div>
                    <p className='font-weight-bold text-success mb-4'>Rp {this.state.summary.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</p>
                  </div>
                </div>
                <Link to='#payment' className='btn btn-success rounded-pill' onClick={() => this.setState({ paymentModal: !this.state.paymentModal })}>Select Payment</Link>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal className='modal-dialog-centered modal-dialog-scrollable modal-lg' isOpen={this.state.selectAddressModal} toggle={() => this.setState({ selectAddressModal: !this.state.selectAddressModal })}>
          <ModalHeader className='border-bottom-0' toggle={() => this.setState({ selectAddressModal: !this.state.selectAddressModal })} />
          <ModalBody className='pt-0 px-2 mb-5'>
            <h4 className='text-center font-weight-bold mb-4'>Choose another address</h4>
            <Card className='p-3 mx-5 mb-4'>
              <CardTitle className='m-0'>
                <div className='text-center'>
                  <Link to='#add' className='font-weight-bold text-secondary text-decoration-none' style={{ fontSize: '18px' }} onClick={() => this.setState({ addModal: !this.state.addModal })}>Add new address</Link>
                </div>
              </CardTitle>
            </Card>
            {shippingAddressData && shippingAddressData.map(address => {
              return (
                <Card key={address.id} className='p-3 mx-5 mb-4' outline color='success'>
                  <CardTitle onClick={() => { this.setState({ selectedAddress: [address] }) }}>
                    <h6 className='m-0 font-weight-bold'>{address.recipient_name} | {address.recipient_phone}</h6>
                  </CardTitle>
                  <CardText>{address.full_address}</CardText>
                  <Link to='#update' className='font-weight-bold text-success text-decoration-none'>Change address</Link>
                </Card>
              )
            })}
          </ModalBody>
        </Modal>
        <Modal className='modal-dialog-centered modal-dialog-scrollable modal-lg' isOpen={this.state.addModal} toggle={() => this.setState({ addModal: !this.state.addModal })}>
          <ModalHeader className='border-bottom-0' toggle={() => this.setState({ addModal: !this.state.addModal })} />
          <Form>
            <ModalBody className='pt-0 px-5'>
              <h4 className='text-center font-weight-bold mb-4'>Add new address</h4>
              <FormGroup>
                <Label for='name' className='text-secondary'>Save address as (ex: home address, office address)</Label>
                <Input type='text' name='name' id='name' bsSize='lg' />
              </FormGroup>
              <Row form>
                <Col md='6'>
                  <FormGroup>
                    <Label for='recipientName' className='text-secondary'>Recipient's name</Label>
                    <Input type='text' name='recipientName' id='recipientName' bsSize='lg' />
                  </FormGroup>
                </Col>
                <Col md='6'>
                  <FormGroup>
                    <Label for='recipientPhone' className='text-secondary'>Recipient's telephone number</Label>
                    <Input type='text' name='recipientPhone' id='recipientPhone' bsSize='lg' />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md='6'>
                  <FormGroup>
                    <Label for='address' className='text-secondary'>Address</Label>
                    <Input type='text' name='address' id='address' bsSize='lg' />
                  </FormGroup>
                </Col>
                <Col md='6'>
                  <FormGroup>
                    <Label for='postalCode' className='text-secondary'>Postal code</Label>
                    <Input type='text' name='postalCode' id='postalCode' bsSize='lg' />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md='6'>
                  <FormGroup>
                    <Label for='province' className='text-secondary'>Province</Label>
                    <Input type='select' name='province' id='province' bsSize='lg'>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md='6'>
                  <FormGroup>
                    <Label for='city' className='text-secondary'>City or subsdistrict</Label>
                    <Input type='select' name='city' id='city' bsSize='lg'>
                      <option>Medan</option>
                      <option>Jakarta</option>
                      <option>Surabaya</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for='primaryAddress' />
                <div>
                  <CustomInput type='checkbox' name='primaryAddress' id='primaryAddress' label='Make it the primary address' className='text-secondary' />
                </div>
              </FormGroup>
            </ModalBody>
            <ModalFooter className='border-top-0 px-5 mb-4'>
              <Button className='rounded-pill' outline color='secondary' style={{ width: '160px' }} onClick={() => this.setState({ addModal: !this.state.addModal })}>Cancel</Button>{' '}
              <Button className='rounded-pill' color='success' style={{ width: '160px' }}>Save</Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Modal className='modal-dialog-centered modal-dialog-scrollable' isOpen={this.state.paymentModal} toggle={() => this.setState({ paymentModal: !this.state.paymentModal })}>
          <ModalHeader className='shadow-sm' toggle={() => this.setState({ paymentModal: !this.state.paymentModal })}>Payment</ModalHeader>
          <div className='p-4 border-bottom shadow-sm'>
            <p className='font-weight-bold'>Payment method</p>
            <Row>
              <Col xs='3' className='pr-0'>
                <img src={Logo} width='100%' alt='Wakede Logo' />
              </Col>
              <Col xs='7'>
                <Label for='wakkedePayment' className='font-weight-bold'>Wakede Payment</Label>
              </Col>
              <Col xs='2'>
                <CustomInput checked type='checkbox' name='wakkedePayment' id='wakkedePayment' />
              </Col>
            </Row>
          </div>
          <div className='p-4'>
            <p className='font-weight-bold'>Shopping Summary</p>
            <Row>
              <Col xs='6'>
                <p className='text-secondary m-0'>Order</p>
              </Col>
              <Col xs='6'>
                <p className='font-weight-bold text-right m-0'>Rp {summary.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</p>
              </Col>
              <Col xs='6'>
                <p className='text-secondary'>Delivery</p>
              </Col>
              <Col xs='6'>
                <p className='font-weight-bold text-right'>Rp {this.state.delivery.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</p>
              </Col>
            </Row>
          </div>
          <div className='p-4 border-top'>
            <div className='d-flex flex-row align-items-center justify-content-between'>
              <div>
                <p className='font-weight-bold m-0'>Shopping Summary</p>
                <h5 className='font-weight-bold text-success m-0'>Rp {this.state.summary.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</h5>
              </div>
              <Button className='rounded-pill' color='success' style={{ width: '160px' }}>Buy</Button>
            </div>
          </div>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = state => ({
  checkout: state.checkout,
  primaryAddress: state.primaryAddress,
  shippingAddress: state.shippingAddress
})

const mapDispatchToProps = {
  getShippingAddress: shippingAddressAction.getShippingAddress
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
