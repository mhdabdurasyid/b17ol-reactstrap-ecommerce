import React, { Component } from 'react'
import { Row, Col, Card, CardTitle, CardText, Button } from 'reactstrap'
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

class ShippingAddress extends Component {
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
                  <h4 className='font-weight-bold'>Choose Another Address</h4>
                  <p className='text-secondary m-0'>Manage your shipping address</p>
                  <hr className='mb-3' />
                </CardTitle>
                <Card className='p-3 mx-5 mb-4'>
                  <CardTitle className='m-0'>
                    <div className='text-center'>
                      <Link to='#add' className='font-weight-bold text-secondary text-decoration-none' style={{ fontSize: '18px' }}>Add new address</Link>
                    </div>
                  </CardTitle>
                </Card>
                <Card className='p-3 mx-5 mb-4' outline color='success'>
                  <CardTitle>
                    <h6 className='m-0 font-weight-bold'>Andreas Jane</h6>
                  </CardTitle>
                  <CardText>Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181</CardText>
                  <Link to='#update' className='font-weight-bold text-success text-decoration-none'>Change address</Link>
                </Card>
              </Card>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

export default ShippingAddress
