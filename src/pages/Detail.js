import React, { Component } from 'react'
import { Container, Row, Col, Button, Progress, Spinner, Card, CardBody, CardText, CardSubtitle, CardTitle } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// import component
import Navbar from '../components/NavbarCustomer'

// import icon
import Star from '../assets/img/icon/star.svg'
import InactiveStar from '../assets/img/icon/inactive-star.svg'
import Plus from '../assets/img/icon/plus.svg'
import Minus from '../assets/img/icon/minus.svg'

// import action
import detailProductAction from '../redux/actions/detailProduct'
import relevantProductsAction from '../redux/actions/relevantProducts'

class Detail extends Component {
  constructor (props) {
    super(props)
    this.reRender = this.reRender.bind(this)
  }

  componentDidMount () {
    let { id } = this.props.match.params
    id = id.split('&')
    this.props.getDetailProduct(id[0])
    this.props.getRelevantProducts(id[id.length - 1])
  }

  reRender (product) {
    this.props.history.push(`/detail/${product.id}&${product.name}&${product.category_id}`)
    this.props.getDetailProduct(product.id)
    this.props.getRelevantProducts(product.category_id)
  }

  render () {
    const { detailProductData, detailProductIsLoading, detailProductIsError, detailProductAlertMsg } = this.props.detailProduct
    const { relevantProductsData, relevantProductsIsLoading, relevantProductsIsError, relevantProductsAlertMsg } = this.props.relevantProducts

    return (
      <>
        <Navbar />
        {!detailProductIsLoading && !detailProductIsError && detailProductData.length !== 0 && detailProductData.map(product => {
          return (
            <>
              <Container className='my-5'>
                <span className='text-secondary'><Link to='/' className='text-secondary text-decoration-none'>Home</Link> {'>'} <Link to='#category' className='text-secondary text-decoration-none'>Category</Link> {'>'} <Link to='#' className='text-secondary text-decoration-none'>{product.category}</Link></span>
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
                    <h3 className='font-weight-bold'>{product.name}</h3>
                    <h6 className='text-secondary font-weight-bold'>{product.store_name}</h6>
                    <ul className='list-inline m-0'>
                      {product.rating === 0 && Array(5).fill(<li className='list-inline-item m-0'><img src={InactiveStar} alt='...' style={{ width: '18px' }} /></li>)}

                      {product.rating > 0 && product.rating < 2 && Array(1).fill(<li className='list-inline-item m-0'><img src={Star} alt='...' style={{ width: '18px' }} /></li>)}
                      {product.rating > 0 && product.rating < 2 && Array(4).fill(<li className='list-inline-item m-0'><img src={InactiveStar} alt='...' style={{ width: '18px' }} /></li>)}

                      {product.rating >= 2 && product.rating < 3 && Array(2).fill(<li className='list-inline-item m-0'><img src={Star} alt='...' style={{ width: '18px' }} /></li>)}
                      {product.rating >= 2 && product.rating < 3 && Array(3).fill(<li className='list-inline-item m-0'><img src={InactiveStar} alt='...' style={{ width: '18px' }} /></li>)}

                      {product.rating >= 3 && product.rating < 4 && Array(3).fill(<li className='list-inline-item m-0'><img src={Star} alt='...' style={{ width: '18px' }} /></li>)}
                      {product.rating >= 3 && product.rating < 4 && Array(2).fill(<li className='list-inline-item m-0'><img src={InactiveStar} alt='...' style={{ width: '18px' }} /></li>)}

                      {product.rating >= 4 && product.rating < 5 && Array(4).fill(<li className='list-inline-item m-0'><img src={Star} alt='...' style={{ width: '18px' }} /></li>)}
                      {product.rating >= 4 && product.rating < 5 && Array(1).fill(<li className='list-inline-item m-0'><img src={InactiveStar} alt='...' style={{ width: '18px' }} /></li>)}

                      {product.rating === 5 && Array(5).fill(<li className='list-inline-item m-0'><img src={Star} alt='...' style={{ width: '18px' }} /></li>)}
                      <li className='list-inline-item m-0 ml-1'>
                        <small className='text-secondary'>({product.count_review})</small>
                      </li>
                    </ul>
                    <h6 className='text-secondary font-weight-bold mt-4 mb-0'>Price</h6>
                    <p className='font-weight-bold' style={{ fontSize: '32px' }}>{product.price}</p>
                    <h6 className='font-weight-bold mt-4'>Color</h6>
                    <p>{product.color}</p>
                    <Row className='mt-4'>
                      {/* <Col xs='6' md='3'>
                        <h6 className='font-weight-bold'>Size</h6>
                        <div className='d-flex flex-row align-items-center'>
                          <Button color='secondary' className='rounded-circle shadow-sm p-0' style={{ height: '36px', width: '36px' }}><img src={Minus} alt='down size' /></Button>
                          <div className='text-center' style={{ width: '40px' }}>
                            <span>30</span>
                          </div>
                          <Button outline color='secondary' className='rounded-circle shadow-sm p-0' style={{ height: '36px', width: '36px' }}><img src={Plus} alt='up size' /></Button>
                        </div>
                      </Col> */}
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
                <h3 className='mt-4 font-weight-bold'>Informasi Produk</h3>
                <h5 className='font-weight-bold mt-4'>Condition</h5>
                <h5 className='font-weight-bold text-success'>{product.conditions}</h5>
                <h5 className='font-weight-bold mt-4'>Description</h5>
                <p className='text-secondary'>{product.description}</p>
              </Container>
              <Container className='mb-4'>
                <h3 className='mt-4 mb-4 font-weight-bold'>Product Review</h3>
                <div className='d-flex'>
                  <div className='mr-5'>
                    <div className='d-flex align-items-end justify-content-center'>
                      <h1 className='font-weight-bold m-0' style={{ fontSize: '60px' }}>{product.rating.toFixed(1)}</h1>
                      <h5 className='text-muted'>/{product.count_review}</h5>
                    </div>
                    <div>
                      <ul className='list-inline'>
                        {product.rating === 0 && Array(5).fill(<li className='list-inline-item m-0'><img src={InactiveStar} alt='...' style={{ width: '24px' }} /></li>)}

                        {product.rating > 0 && product.rating < 2 && Array(1).fill(<li className='list-inline-item m-0'><img src={Star} alt='...' style={{ width: '24px' }} /></li>)}
                        {product.rating > 0 && product.rating < 2 && Array(4).fill(<li className='list-inline-item m-0'><img src={InactiveStar} alt='...' style={{ width: '24px' }} /></li>)}

                        {product.rating >= 2 && product.rating < 3 && Array(2).fill(<li className='list-inline-item m-0'><img src={Star} alt='...' style={{ width: '24px' }} /></li>)}
                        {product.rating >= 2 && product.rating < 3 && Array(3).fill(<li className='list-inline-item m-0'><img src={InactiveStar} alt='...' style={{ width: '24px' }} /></li>)}

                        {product.rating >= 3 && product.rating < 4 && Array(3).fill(<li className='list-inline-item m-0'><img src={Star} alt='...' style={{ width: '24px' }} /></li>)}
                        {product.rating >= 3 && product.rating < 4 && Array(2).fill(<li className='list-inline-item m-0'><img src={InactiveStar} alt='...' style={{ width: '24px' }} /></li>)}

                        {product.rating >= 4 && product.rating < 5 && Array(4).fill(<li className='list-inline-item m-0'><img src={Star} alt='...' style={{ width: '24px' }} /></li>)}
                        {product.rating >= 4 && product.rating < 5 && Array(1).fill(<li className='list-inline-item m-0'><img src={InactiveStar} alt='...' style={{ width: '24px' }} /></li>)}

                        {product.rating === 5 && Array(5).fill(<li className='list-inline-item m-0'><img src={Star} alt='...' style={{ width: '24px' }} /></li>)}
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
                        <Progress color='success' value={product.count_5_star} max={product.count_review} />
                      </div>
                      <div>
                        <p className='m-0'>{product.count_5_star}</p>
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
                        <Progress color='success' value={product.count_4_star} max={product.count_review} />
                      </div>
                      <div>
                        <p className='m-0'>{product.count_4_star}</p>
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
                        <Progress color='success' value={product.count_3_star} max={product.count_review} />
                      </div>
                      <div>
                        <p className='m-0'>{product.count_3_star}</p>
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
                        <Progress color='success' value={product.count_2_star} max={product.count_review} />
                      </div>
                      <div>
                        <p className='m-0'>{product.count_2_star}</p>
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
                        <Progress color='success' value={product.count_1_star} max={product.count_review} />
                      </div>
                      <div>
                        <p className='m-0'>{product.count_1_star}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </>
          )
        })}
        {detailProductIsLoading && !detailProductIsError && (
          <Container>
            <div className='mt-5 mb-5'>
              <Spinner type='grow' color='success' />
              <Spinner type='grow' color='warning' />
              <Spinner type='grow' color='secondary' />
            </div>
          </Container>
        )}
        {detailProductIsError && detailProductAlertMsg !== '' && (
          <div>{detailProductAlertMsg}</div>
        )}
        <Container>
          <hr />
          <h2 className='font-weight-bold mb-1'>You can also like this</h2>
          <p className='text-secondary mb-4'>You’ve never seen it before!</p>
          <Row xs='2' md='5'>
            {!relevantProductsIsLoading && !relevantProductsIsError && relevantProductsData.length !== 0 && relevantProductsData.map(product => {
              return (
                <Col className='mb-4' key={product.id}>
                  <Card className='shadow-sm h-100'>
                    <div style={{
                      backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}${product.img_thumbnail}')`,
                      width: '100%',
                      height: '135px',
                      backgroundSize: 'cover'
                    }}
                    />
                    <CardBody className='px-3 py-3'>
                      <CardTitle className='mb-2'>
                        <Link to={`/detail/${product.id}&${product.name}&${product.category_id}`} onClick={() => this.reRender(product)} className='text-body text-decoration-none font-weight-bold'>
                          {product.name}
                        </Link>
                      </CardTitle>
                      <CardSubtitle className='text-success font-weight-bold'>Rp {product.price}</CardSubtitle>
                      <CardText className='mb-0'>
                        <small className='text-secondary'>{product.store_name}</small>
                      </CardText>
                      <ul className='list-inline m-0'>
                        {product.rating === 0 && Array(5).fill(<li className='list-inline-item m-0'><img src={InactiveStar} alt='...' /></li>)}

                        {product.rating > 0 && product.rating < 2 && Array(1).fill(<li className='list-inline-item m-0'><img src={Star} alt='...' /></li>)}
                        {product.rating > 0 && product.rating < 2 && Array(4).fill(<li className='list-inline-item m-0'><img src={InactiveStar} alt='...' /></li>)}

                        {product.rating >= 2 && product.rating < 3 && Array(2).fill(<li className='list-inline-item m-0'><img src={Star} alt='...' /></li>)}
                        {product.rating >= 2 && product.rating < 3 && Array(3).fill(<li className='list-inline-item m-0'><img src={InactiveStar} alt='...' /></li>)}

                        {product.rating >= 3 && product.rating < 4 && Array(3).fill(<li className='list-inline-item m-0'><img src={Star} alt='...' /></li>)}
                        {product.rating >= 3 && product.rating < 4 && Array(2).fill(<li className='list-inline-item m-0'><img src={InactiveStar} alt='...' /></li>)}

                        {product.rating >= 4 && product.rating < 5 && Array(4).fill(<li className='list-inline-item m-0'><img src={Star} alt='...' /></li>)}
                        {product.rating >= 4 && product.rating < 5 && Array(1).fill(<li className='list-inline-item m-0'><img src={InactiveStar} alt='...' /></li>)}

                        {product.rating === 5 && Array(5).fill(<li className='list-inline-item m-0'><img src={Star} alt='...' /></li>)}
                        <li className='list-inline-item m-0'>
                          <small className='text-secondary'>({product.count_review})</small>
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                </Col>
              )
            })}
            {relevantProductsIsLoading && !relevantProductsIsError && (
              <Col>
                <Spinner type='grow' color='success' />
                <Spinner type='grow' color='warning' />
                <Spinner type='grow' color='secondary' />
              </Col>
            )}
            {relevantProductsIsError && relevantProductsAlertMsg !== '' && (
              <div>{relevantProductsAlertMsg}</div>
            )}
          </Row>
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  detailProduct: state.detailProduct,
  relevantProducts: state.relevantProducts
})

const mapDispatchToProps = {
  getDetailProduct: detailProductAction.getDetailProduct,
  getRelevantProducts: relevantProductsAction.getRelevantProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
