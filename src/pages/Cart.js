import React, { Component } from 'react'
import { Container, Row, Col, Card, CardTitle, FormGroup, Label, CustomInput, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

// import component
import Navbar from '../components/NavbarCustomer'

// import icon
import Plus from '../assets/img/icon/plus.svg'
import Minus from '../assets/img/icon/minus.svg'

class Cart extends Component {
  render () {
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
                      <CustomInput type='checkbox' name='selectAll' id='selectAll' label='Select all items (2 items selected)' />
                    </div>
                  </FormGroup>
                  <div>
                    <Link to='#delete' className='text-decoration-none text-success'>Delete</Link>
                  </div>
                </div>
              </Card>
              {Array(3).fill(
                <Card className='px-4 shadow mb-2'>
                  <Row>
                    <Col md='6'>
                      <FormGroup>
                        <Label />
                        <div>
                          <CustomInput type='checkbox' name='item1' id='item1'>
                            <Label for='item1'>
                              <div className='d-flex flex-row align-items-center'>
                                <div
                                  style={{
                                    backgroundImage: 'url(data:image/jpeg;base64,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)',
                                    width: '70px',
                                    height: '70px',
                                    backgroundSize: 'cover'
                                  }}
                                  className='ml-2 mr-3 rounded'
                                />
                                <div>
                                  <h6 className='font-weight-bold m-0'>Men's Formal Suit - Black</h6>
                                  <small className='text-secondary'>Zalora Cloth</small>
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
                          <Button color='secondary' className='rounded-circle shadow-sm p-0' style={{ height: '36px', width: '36px' }}><img src={Minus} alt='subtract quantity' /></Button>
                          <div className='text-center' style={{ width: '40px' }}>
                            <span>1</span>
                          </div>
                          <Button outline color='secondary' className='rounded-circle shadow-sm p-0' style={{ height: '36px', width: '36px' }}><img src={Plus} alt='add quantity' /></Button>
                        </div>
                        <div className='ml-5'>
                          <h6 className='font-weight-bold m-0'>Rp. 250.000</h6>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              )}
            </Col>
            <Col md='4'>
              <Card body className='shadow'>
                <CardTitle className='font-weight-bold mb-3'>Shopping summary</CardTitle>
                <div className='d-flex flex-row justify-content-between align-items-center'>
                  <div>
                    <p className='font-weight-bold text-secondary mb-4'>Total price</p>
                  </div>
                  <div>
                    <p className='font-weight-bold mb-4'>Rp. 499.000</p>
                  </div>
                </div>
                <Link to='/checkout' className='btn btn-success rounded-pill'>Buy</Link>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Cart