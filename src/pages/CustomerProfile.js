import React, { Component } from 'react'
import { Row, Col, Card, CardTitle, Form, FormGroup, Label, Input, CustomInput, Button, Spinner, Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import FormData from 'form-data'
import dayjs from 'dayjs'
import http from '../helpers/http'

// import component
import Navbar from '../components/NavbarCustomer'

// import icon
import Edit from '../assets/img/icon/edit.svg'
import User from '../assets/img/icon/user.svg'
import Address from '../assets/img/icon/address.svg'
import Order from '../assets/img/icon/order.svg'
import Avatar from '../assets/img/profile/profile.png'

// import action
import customerProfile from '../redux/actions/customerProfile'

class CustomerProfile extends Component {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    const { customerProfileData } = this.props.customerProfile
    this.state = {
      name: customerProfileData[0].name,
      email: customerProfileData[0].email,
      phone: customerProfileData[0].phone,
      gender: customerProfileData[0].gender === 'Man' ? 1 : 2,
      birthdate: dayjs(customerProfileData[0].birthday).format('YYYY-MM-DD'),
      profile: ''
    }
  }

  onChangeText (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async update (e) {
    e.preventDefault()
    const form = new FormData()
    form.append('name', this.state.name)
    form.append('email', this.state.email)
    form.append('phone', this.state.phone)
    form.append('birthday', this.state.birthdate)
    form.append('gender_id', this.state.gender)
    if (this.state.profile !== '') {
      form.append('image', this.state.profile)
    }
    await http(this.props.customerAuth.token).patch('/costumer', form)
    this.props.getCustomerProfile(this.props.customerAuth.token)
  }

  render () {
    const { customerProfileData, customerProfileIsLoading, customerProfileIsError, customerProfileAlertMsg } = this.props.customerProfile

    return (
      <>
        <Navbar />
        {!customerProfileIsLoading && !customerProfileIsError && customerProfileData.length !== 0 && customerProfileData.map(profile => {
          return (
            <Row className='mx-0' key={profile.id}>
              <Col md='3' className='mt-5 pl-5'>
                <div className='pl-5'>
                  <div className='d-flex flex-row align-items-center'>
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
                      <h4 className='font-weight-bold'>My Profile</h4>
                      <p className='text-secondary m-0'>Manage your profile information</p>
                      <hr className='mb-3' />
                    </CardTitle>
                    <Form onSubmit={(e) => { this.update(e) }}>
                      <Row>
                        <Col md='9'>
                          <FormGroup row className='align-items-center'>
                            <Label for='name' md='3' className='text-right text-secondary'>Name</Label>
                            <Col md='8'>
                              <Input type='text' name='name' id='name' bsSize='lg' value={this.state.name} onChange={(e) => { this.onChangeText(e) }} />
                            </Col>
                          </FormGroup>
                          <FormGroup row className='align-items-center'>
                            <Label for='email' md='3' className='text-right text-secondary'>Email</Label>
                            <Col md='8'>
                              <Input type='email' name='email' id='email' bsSize='lg' value={this.state.email} onChange={(e) => { this.onChangeText(e) }} />
                            </Col>
                          </FormGroup>
                          <FormGroup row className='align-items-center'>
                            <Label for='phone' md='3' className='text-right text-secondary'>Phone number</Label>
                            <Col md='8'>
                              <Input type='text' name='phone' id='phone' bsSize='lg' value={this.state.phone} onChange={(e) => { this.onChangeText(e) }} />
                            </Col>
                          </FormGroup>
                          <FormGroup row className='align-items-center'>
                            <Label for='gender' md='3' className='text-right text-secondary'>Gender</Label>
                            <Col md='8'>
                              <div className='d-flex'>
                                {this.state.gender === 1 ? (
                                  <div className='d-flex'>
                                    <CustomInput type='radio' checked value={1} id='man' name='gender' label='Man' className='text-secondary mr-4' onChange={(e) => { this.onChangeText(e) }} />
                                    <CustomInput type='radio' value={2} id='woman' name='gender' label='Woman' className='text-secondary' onChange={(e) => { this.onChangeText(e) }} />
                                  </div>
                                ) : (
                                  <div className='d-flex'>
                                    <CustomInput type='radio' value={1} id='man' name='gender' label='Man' className='text-secondary mr-4' onChange={(e) => { this.onChangeText(e) }} />
                                    <CustomInput type='radio' checked value={2} id='woman' name='gender' label='Woman' className='text-secondary' onChange={(e) => { this.onChangeText(e) }} />
                                  </div>
                                )}
                              </div>
                            </Col>
                          </FormGroup>
                          <FormGroup row className='align-items-center'>
                            <Label for='birthdate' md='3' className='text-right text-secondary'>Date of birth</Label>
                            <Col md='8'>
                              <Input type='date' name='birthdate' id='birthdate' bsSize='lg' value={this.state.birthdate} onChange={(e) => { this.onChangeText(e) }} />
                            </Col>
                          </FormGroup>
                          <Row className='mt-4 mb-3'>
                            <Col md='3' />
                            <Col md='8'>
                              <Button color='success' className='rounded-pill' block>Save</Button>
                            </Col>
                          </Row>
                        </Col>
                        <Col md='3' className='pl-0 pr-5'>
                          <div className='d-flex flex-column justify-content-center align-items-center'>
                            <div
                              style={{
                                backgroundImage: `url(${profile.photo_profile !== '' ? `${process.env.REACT_APP_BACKEND_URL}${profile.photo_profile}` : Avatar})`,
                                width: '110px',
                                height: '110px',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                              className='border rounded-circle mb-2'
                            />
                            <FormGroup>
                              <Label for='profile' className='btn btn-outline-secondary rounded-pill px-3'>
                                <span>Select image</span>
                                <Input type='file' name='profile' id='profile' accept='.png, .jpg, .jpeg' onChange={(e) => this.setState({ profile: e.target.files[0] })} style={{ display: 'none' }} />
                              </Label>
                            </FormGroup>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </Card>
                </div>
              </Col>
            </Row>
          )
        })}
        {customerProfileIsLoading && !customerProfileIsError && (
          <Container>
            <Spinner type='grow' color='success' />
            <Spinner type='grow' color='warning' />
            <Spinner type='grow' color='secondary' />
          </Container>
        )}
        {customerProfileIsError && customerProfileAlertMsg !== '' && (
          <Container>{customerProfileAlertMsg}</Container>
        )}
      </>
    )
  }
}

const mapStateToProps = state => ({
  customerProfile: state.customerProfile,
  customerAuth: state.customerAuth
})

const mapDispatchToProps = {
  getCustomerProfile: customerProfile.getCustomerProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfile)
