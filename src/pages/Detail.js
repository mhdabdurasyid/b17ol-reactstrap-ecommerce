import React, { Component } from 'react'
import { Container, Row, Col, Button, Progress } from 'reactstrap'
import { Link } from 'react-router-dom'

// import component
import Navbar from '../components/NavbarCustomer'

// import icon
import Star from '../assets/img/icon/star.svg'
import Plus from '../assets/img/icon/plus.svg'
import Minus from '../assets/img/icon/minus.svg'

class Detail extends Component {
  render () {
    return (
      <>
        <Navbar />
        <Container className='my-5'>
          <span className='text-secondary'><Link to='/' className='text-secondary text-decoration-none'>Home</Link> {'>'} <Link to='#category' className='text-secondary text-decoration-none'>Category</Link> {'>'} <Link to='#laptop' className='text-secondary text-decoration-none'>Laptop</Link></span>
        </Container>
        <Container>
          <Row>
            <Col md='4'>
              <div>
                <img src={require('../assets/img/products/item1.png')} alt='product' className='img-fluid rounded' />
              </div>
              <Row xs='5' className='mb-2'>
                <Col className='mt-3 px-2'>
                  <img src={require('../assets/img/products/item1.png')} alt='product' className='img-fluid rounded' />
                </Col>
                <Col className='mt-3 px-2'>
                  <img src={require('../assets/img/products/item2.png')} alt='product' className='img-fluid rounded' />
                </Col>
                <Col className='mt-3 px-2'>
                  <img src={require('../assets/img/products/item3.png')} alt='product' className='img-fluid rounded' />
                </Col>
                <Col className='mt-3 px-2'>
                  <img src={require('../assets/img/products/item4.png')} alt='product' className='img-fluid rounded' />
                </Col>
                <Col className='mt-3 px-2'>
                  <img src={require('../assets/img/products/item5.png')} alt='product' className='img-fluid rounded' />
                </Col>
              </Row>
            </Col>
            <Col md='8'>
              <h3 className='font-weight-bold'>Baju Muslim Pria</h3>
              <h6 className='text-secondary font-weight-bold'>Zalora Cloth</h6>
              <ul className='list-inline m-0'>
                <li className='list-inline-item m-0'><img src={Star} alt='...' style={{ width: '18px' }} /></li>
                <li className='list-inline-item m-0'><img src={Star} alt='...' style={{ width: '18px' }} /></li>
                <li className='list-inline-item m-0'><img src={Star} alt='...' style={{ width: '18px' }} /></li>
                <li className='list-inline-item m-0'><img src={Star} alt='...' style={{ width: '18px' }} /></li>
                <li className='list-inline-item m-0'><img src={Star} alt='...' style={{ width: '18px' }} /></li>
                <li className='list-inline-item m-0'>
                  <small className='text-secondary'>({Math.ceil(90 + (10 * Math.random()))})</small>
                </li>
              </ul>
              <h6 className='text-secondary font-weight-bold mt-4 mb-0'>Price</h6>
              <p className='font-weight-bold' style={{ fontSize: '32px' }}>Rp 499000</p>
              <h6 className='font-weight-bold mt-4'>Color</h6>
              <Row className='mt-4'>
                <Col xs='6' md='3'>
                  <h6 className='font-weight-bold'>Size</h6>
                  <div className='d-flex flex-row align-items-center'>
                    <Button color='secondary' className='rounded-circle shadow-sm p-0' style={{ height: '36px', width: '36px' }}><img src={Minus} alt='down size' /></Button>
                    <div className='text-center' style={{ width: '40px' }}>
                      <span>30</span>
                    </div>
                    <Button outline color='secondary' className='rounded-circle shadow-sm p-0' style={{ height: '36px', width: '36px' }}><img src={Plus} alt='up size' /></Button>
                  </div>
                </Col>
                <Col xs='6' md='3'>
                  <h6 className='font-weight-bold'>Quantity</h6>
                  <div className='d-flex flex-row align-items-center'>
                    <Button color='secondary' className='rounded-circle shadow-sm p-0' style={{ height: '36px', width: '36px' }}><img src={Minus} alt='subtract quantity' /></Button>
                    <div className='text-center' style={{ width: '40px' }}>
                      <span>1</span>
                    </div>
                    <Button outline color='secondary' className='rounded-circle shadow-sm p-0' style={{ height: '36px', width: '36px' }}><img src={Plus} alt='add quantity' /></Button>
                  </div>
                </Col>
              </Row>
              <Row className='mt-5'>
                <Col xs='6' md='3' className='pr-0 mb-2'>
                  <Button outline block color='secondary' size='lg' className='rounded-pill'>Chat</Button>
                </Col>
                <Col xs='6' md='3' className='pr-0'>
                  <Button outline block color='secondary' size='lg' className='rounded-pill'>Add Bag</Button>
                </Col>
                <Col xs='12' md='6'>
                  <Button block color='success' size='lg' className='rounded-pill'>Buy Now</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Container>
          <h3 className='mt-5 font-weight-bold'>Informasi Produk</h3>
          <h5 className='font-weight-bold mt-4'>Condition</h5>
          <h5 className='font-weight-bold text-success'>New</h5>
          <h5 className='font-weight-bold mt-4'>Description</h5>
          <p className='text-secondary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                    non magna rutrum,
                    pellentesque augue eu, sagittis velit. Phasellus quis laoreet dolor. Fusce nec pharetra quam.
                    Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent sed enim vel turpis blandit
                    imperdiet ac ac felis. Etiam tincidunt tristique placerat. Pellentesque a consequat mauris, vel
                    suscipit ipsum. Donec ac mauris vitae diam commodo vehicula. Donec quam elit, sollicitudin eu nisl
                    at, ornare suscipit magna. Donec non magna rutrum, pellentesque augue eu, sagittis velit. Phasellus
                    quis laoreet dolor. Fusce nec pharetra quam. Interdum et malesuada fames ac ante ipsum primis in
                    faucibus. Praesent sed enim vel turpis blandit imperdiet ac ac felis. In ultricies rutrum tempus.
                    Mauris vel molestie orci.
          </p>
        </Container>
        <Container className='mb-4'>
          <h3 className='mt-4 mb-4 font-weight-bold'>Product Review</h3>
          <div className='d-flex'>
            <div className='mr-5'>
              <div className='d-flex align-items-end'>
                <h1 className='font-weight-bold m-0' style={{ fontSize: '60px' }}>5.0</h1>
                <h5 className='text-muted'>/10</h5>
              </div>
              <div>
                <ul className='list-inline'>
                  {Array(5).fill(<li className='list-inline-item m-0'><img src={Star} alt='...' style={{ width: '24px' }} /></li>)}
                </ul>
              </div>
            </div>
            <div>
              <div className='d-flex flex-row align-items-center'>
                <div>
                  <img src={Star} alt='...' style={{ width: '18px' }} />
                </div>
                <div className='ml-2'>
                  <p className='m-0'>5</p>
                </div>
                <div className='ml-4 mr-4' style={{ width: '100px' }}>
                  <Progress color='success' value='7' max='13' />
                </div>
                <div>
                  <p className='m-0'>4</p>
                </div>
              </div>
              <div className='d-flex flex-row align-items-center'>
                <div>
                  <img src={Star} alt='...' style={{ width: '18px' }} />
                </div>
                <div className='ml-2'>
                  <p className='m-0'>4</p>
                </div>
                <div className='ml-4 mr-4' style={{ width: '100px' }}>
                  <Progress color='success' value='7' max='13' />
                </div>
                <div>
                  <p className='m-0'>4</p>
                </div>
              </div>
              <div className='d-flex flex-row align-items-center'>
                <div>
                  <img src={Star} alt='...' style={{ width: '18px' }} />
                </div>
                <div className='ml-2'>
                  <p className='m-0'>3</p>
                </div>
                <div className='ml-4 mr-4' style={{ width: '100px' }}>
                  <Progress color='success' value='7' max='13' />
                </div>
                <div>
                  <p className='m-0'>4</p>
                </div>
              </div>
              <div className='d-flex flex-row align-items-center'>
                <div>
                  <img src={Star} alt='...' style={{ width: '18px' }} />
                </div>
                <div className='ml-2'>
                  <p className='m-0'>2</p>
                </div>
                <div className='ml-4 mr-4' style={{ width: '100px' }}>
                  <Progress color='success' value='7' max='13' />
                </div>
                <div>
                  <p className='m-0'>4</p>
                </div>
              </div>
              <div className='d-flex flex-row align-items-center'>
                <div>
                  <img src={Star} alt='...' style={{ width: '18px' }} />
                </div>
                <div className='ml-2'>
                  <p className='m-0'>1</p>
                </div>
                <div className='ml-4 mr-4' style={{ width: '100px' }}>
                  <Progress color='success' value='7' max='13' />
                </div>
                <div>
                  <p className='m-0'>4</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Container>
          <hr />
          <h2 className='font-weight-bold mb-1'>You can also like this</h2>
          <p className='text-secondary mb-4'>You’ve never seen it before!</p>
        </Container>
      </>
    )
  }
}

export default Detail
