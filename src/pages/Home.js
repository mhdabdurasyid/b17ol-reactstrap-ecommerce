import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Card, CardText, CardBody, CardTitle, CardSubtitle, Row, Col, Spinner } from 'reactstrap'

// import component
import Navbar from '../components/NavbarCustomer'

// import icon
import Star from '../assets/img/icon/star.svg'
import InactiveStar from '../assets/img/icon/inactive-star.svg'

// import action
import newProductsAction from '../redux/actions/newProducts'
import popularProductsAction from '../redux/actions/popularProducts'

class Home extends Component {
  componentDidMount () {
    this.props.getNewProducts()
    this.props.getPopularProducts()
  }

  render () {
    const { newProductsData, newProductsIsLoading, newProductsIsError, newProductsAlertMsg } = this.props.newProducts
    const { popularProductsData, popularProductsIsLoading, popularProductsIsError, popularProductsAlertMsg } = this.props.popularProducts

    return (
      <>
        <Navbar />
        <Container className='mt-4'>
          <h2 className='font-weight-bold mb-1'>Category</h2>
          <p className='text-secondary mb-4'>What are you currently looking for</p>
        </Container>
        <Container>
          <h2 className='font-weight-bold mb-1'>New</h2>
          <p className='text-secondary mb-4'>You’ve never seen it before!</p>
          <Row xs='2' md='5'>
            {!newProductsIsLoading && !newProductsIsError && newProductsData.length !== 0 && newProductsData.map(product => {
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
                        <Link to={`/detail/${product.id}&${product.name}&${product.category_id}`} className='text-body text-decoration-none font-weight-bold'>
                          {product.name}
                        </Link>
                      </CardTitle>
                      <CardSubtitle className='text-success font-weight-bold'>Rp {product.price.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</CardSubtitle>
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
                          <small className='text-secondary ml-1'>({product.count_review})</small>
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                </Col>
              )
            })}
            {newProductsIsLoading && !newProductsIsError && (
              <Col>
                <Spinner type='grow' color='success' />
                <Spinner type='grow' color='warning' />
                <Spinner type='grow' color='secondary' />
              </Col>
            )}
            {newProductsIsError && newProductsAlertMsg !== '' && (
              <div>{newProductsAlertMsg}</div>
            )}
          </Row>
        </Container>
        <Container className='mt-3'>
          <h2 className='font-weight-bold mb-1'>Popular</h2>
          <p className='text-secondary mb-4'>Find products that are trending recently</p>
          <Row xs='2' md='5'>
            {!popularProductsIsLoading && !popularProductsIsError && popularProductsData.length !== 0 && popularProductsData.map(product => {
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
                        <Link to={`/detail/${product.id}&${product.name}&${product.category_id}`} className='text-body text-decoration-none font-weight-bold'>
                          {product.name}
                        </Link>
                      </CardTitle>
                      <CardSubtitle className='text-success font-weight-bold'>Rp {product.price.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</CardSubtitle>
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
                          <small className='text-secondary ml-1'>({product.count_review})</small>
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                </Col>
              )
            })}
            {popularProductsIsLoading && !popularProductsIsError && (
              <Col>
                <Spinner type='grow' color='success' />
                <Spinner type='grow' color='warning' />
                <Spinner type='grow' color='secondary' />
              </Col>
            )}
            {popularProductsIsError && popularProductsAlertMsg !== '' && (
              <div>{popularProductsAlertMsg}</div>
            )}
          </Row>
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  newProducts: state.newProducts,
  popularProducts: state.popularProducts
})

const mapDispatchToProps = {
  getNewProducts: newProductsAction.getNewProducts,
  getPopularProducts: popularProductsAction.getPopularProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
