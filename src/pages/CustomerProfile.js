import React, { Component } from 'react'
import { Row, Col, Card, CardTitle, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

// import component
import Navbar from '../components/NavbarCustomer'

// import icon
import Edit from '../assets/img/icon/edit.svg'
import User from '../assets/img/icon/user.svg'
import Address from '../assets/img/icon/address.svg'
import Order from '../assets/img/icon/order.svg'

// import dummy img profile
import Profile from '../assets/img/profile/profile.png'

class CustomerProfile extends Component {
  render () {
    return (
      <>
        <Navbar />
        <Row className='mx-0'>
          <Col md='3' className='mt-5 pl-5'>
            <div className='pl-5'>
              <div className='d-flex flex-row align-items-center'>
                <div className='mr-3'>
                  <img src={Profile} alt='...' className='rounded-circle' style={{ width: '60px' }} />
                </div>
                <div>
                  <h6 className='font-weight-bold'>Andreas Jane</h6>
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
                <Form>
                  <Row>
                    <Col md='9'>
                      <FormGroup row className='align-items-center'>
                        <Label for='name' md='3' className='text-right text-secondary'>Name</Label>
                        <Col md='8'>
                          <Input type='text' name='name' id='name' bsSize='lg' />
                        </Col>
                      </FormGroup>
                      <FormGroup row className='align-items-center'>
                        <Label for='email' md='3' className='text-right text-secondary'>Email</Label>
                        <Col md='8'>
                          <Input type='email' name='email' id='email' bsSize='lg' />
                        </Col>
                      </FormGroup>
                      <FormGroup row className='align-items-center'>
                        <Label for='phone' md='3' className='text-right text-secondary'>Phone number</Label>
                        <Col md='8'>
                          <Input type='text' name='phone' id='phone' bsSize='lg' />
                        </Col>
                      </FormGroup>
                      <FormGroup row className='align-items-center'>
                        <Label for='gender' md='3' className='text-right text-secondary'>Gender</Label>
                        <Col md='8'>
                          <div className='d-flex'>
                            <CustomInput type='radio' id='man' name='gender' label='Man' className='text-secondary mr-4' />
                            <CustomInput type='radio' id='woman' name='gender' label='Woman' className='text-secondary' />
                          </div>
                        </Col>
                      </FormGroup>
                      <FormGroup row className='align-items-center'>
                        <Label for='birthdate' md='3' className='text-right text-secondary'>Date of birth</Label>
                        <Col md='8'>
                          <Input type='date' name='birthdate' id='birthdate' bsSize='lg' />
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
                      <div className='d-flex flex-column align-items-center'>
                        <div>
                          <img src={Profile} alt='...' className='rounded-circle' style={{ width: '110px' }} />
                        </div>
                        <FormGroup>
                          <Label for='profile' />
                          <Input type='file' name='profile' id='profile' />
                        </FormGroup>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

export default CustomerProfile