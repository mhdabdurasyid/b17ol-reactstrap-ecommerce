import React, { Component } from 'react'
import { Row, Col, Card, CardTitle, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// import component
import Navbar from '../components/NavbarCustomer'

// import icon
import Edit from '../assets/img/icon/edit.svg'
import User from '../assets/img/icon/user.svg'
import Address from '../assets/img/icon/address.svg'
import Order from '../assets/img/icon/order.svg'
import Avatar from '../assets/img/profile/profile.png'

// import action
import shippingAddress from '../redux/actions/shippingAddress'

class ShippingAddress extends Component {
  constructor (props) {
    super(props)

    this.state = {
      addModal: false
    }
  }

  componentDidMount () {
    this.props.getShippingAddress(this.props.customerAuth.token)
  }

  render () {
    const { shippingAddressData } = this.props.shippingAddress
    const { customerProfileData } = this.props.customerProfile

    return (
      <>
        <Navbar />
        <Row className='mx-0'>
          <Col md='3' className='mt-5 pl-5'>
            <div className='pl-5'>
              {customerProfileData.length !== 0 && customerProfileData.map(profile => {
                return (
                  <div className='d-flex flex-row align-items-center' key={profile.id}>
                    <div
                      style={{
                        backgroundImage: `url(${profile.photo_profile !== '' ? `${process.env.REACT_APP_BACKEND_URL}${profile.photo_profile}` : Avatar})`,
                        width: '60px',
                        height: '60px',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                      className='border rounded-circle mr-3'
                    />
                    <div>
                      <h6 className='font-weight-bold'>{profile.name}</h6>
                      <div>
                        <Link to='/customer' className='text-secondary text-decoration-none'><img src={Edit} alt='...' className='mr-1' />Edit Profile</Link>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div className='mt-5'>
                <div className='mb-3'>
                  <Link to='/customer' className='text-secondary text-decoration-none'>
                    <Button style={{ backgroundColor: '#456BF3', width: '32px', height: '32px', border: 'none' }} className='rounded-circle mr-3 p-0'>
                      <img src={User} alt='...' />
                    </Button>
                    My Account
                  </Link>
                </div>
                <div className='mb-3'>
                  <Link to='/shipping_address' className='text-secondary text-decoration-none'>
                    <Button style={{ backgroundColor: '#F36F45', width: '32px', height: '32px', border: 'none' }} className='rounded-circle mr-3 p-0'>
                      <img src={Address} alt='...' />
                    </Button>
                    Shipping Address
                  </Link>
                </div>
                <div className='mb-3'>
                  <Link to='/order' className='text-secondary text-decoration-none'>
                    <Button style={{ backgroundColor: '#F3456F', width: '32px', height: '32px', border: 'none' }} className='rounded-circle mr-3 p-0'>
                      <img src={Order} alt='...' />
                    </Button>
                    My Order
                  </Link>
                </div>
              </div>
            </div>
          </Col>
          <Col md='9' className='vh-100 px-0' style={{ backgroundColor: '#F5F5F5' }}>
            <div className='mr-5 pr-5'>
              <Card body outline color='secondary' className='mx-5 mt-5'>
                <CardTitle>
                  <h4 className='font-weight-bold'>Choose Another Address</h4>
                  <p className='text-secondary m-0'>Manage your shipping address</p>
                  <hr className='mb-3' />
                </CardTitle>
                <Card className='p-3 mx-5 mb-4'>
                  <CardTitle className='m-0'>
                    <div className='text-center'>
                      <Link to='#add' className='font-weight-bold text-secondary text-decoration-none' style={{ fontSize: '18px' }} onClick={() => this.setState({ addModal: !this.state.addModal })}>Add new address</Link>
                    </div>
                  </CardTitle>
                </Card>
                {shippingAddressData.length !== 0 && shippingAddressData.map(address => {
                  return (
                    <Card className='p-3 mx-5 mb-4' outline color='success' key={address.id}>
                      <CardTitle>
                        <h6 className='m-0 font-weight-bold'>{address.recipient_name} | {address.recipient_phone}</h6>
                      </CardTitle>
                      <CardText>{address.full_address}</CardText>
                      <Link to='#update' className='font-weight-bold text-success text-decoration-none'>Change address</Link>
                    </Card>
                  )
                })}
              </Card>
            </div>
          </Col>
        </Row>
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
      </>
    )
  }
}

const mapStateToProps = state => ({
  shippingAddress: state.shippingAddress,
  customerAuth: state.customerAuth,
  customerProfile: state.customerProfile
})

const mapDispatchToProps = {
  getShippingAddress: shippingAddress.getShippingAddress
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress)
