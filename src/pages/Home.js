import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Card, CardText, CardBody, CardTitle, CardSubtitle, Row, Col } from 'reactstrap'
import Navbar from '../components/NavbarCustomer'
import Star from '../assets/img/icon/star.svg'
import InactiveStar from '../assets/img/icon/inactive-star.svg'
import newProductsAction from '../redux/actions/newProducts'

class Home extends Component {
  componentDidMount () {
    this.props.getNewProducts()
  }

  render () {
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
            {!this.props.newProducts.isLoading && !this.props.newProducts.isError && this.props.newProducts.data.length !== 0 && this.props.newProducts.data.map(product => {
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
                        <Link to='/detail' className='text-body text-decoration-none font-weight-bold'>
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
            {this.props.newProducts.isLoading && !this.props.newProducts.isError && (
              <div>Loading</div>
            )}
            {this.props.newProducts.isError && this.props.newProducts.alertMsg !== '' && (
              <div>{this.props.newProducts.alertMsg}</div>
            )}
          </Row>
        </Container>
        <Container className='mt-3'>
          <h2 className='font-weight-bold mb-1'>Popular</h2>
          <p className='text-secondary mb-4'>Find clothes that are trending recently</p>
          <Row xs='2' md='5'>
            {/* {popularProduct.length && popularProduct.map(product => {
              return (
                <Col className='mb-4' key={product.id}>
                  <Card className='shadow-sm h-100'>
                    <CardImg top width='100%' src={require('../assets/img/products/item.png')} alt='new product' />
                    <CardBody className='px-3 py-3'>
                      <CardTitle className='mb-2'>
                        <Link to='/detail' className='text-body text-decoration-none font-weight-bold'>
                          {product.name}
                        </Link>
                      </CardTitle>
                      <CardSubtitle className='text-success font-weight-bold'>Rp {product.price}</CardSubtitle>
                      <CardText className='mb-0'>
                        <small className='text-secondary'>{product.category}</small>
                      </CardText>
                      <ul className='list-inline m-0'>
                        <li className='list-inline-item m-0'><img src={Star} alt='...' /></li>
                        <li className='list-inline-item m-0'><img src={Star} alt='...' /></li>
                        <li className='list-inline-item m-0'><img src={Star} alt='...' /></li>
                        <li className='list-inline-item m-0'><img src={Star} alt='...' /></li>
                        <li className='list-inline-item m-0'><img src={Star} alt='...' /></li>
                        <li className='list-inline-item m-0'>
                          <small className='text-secondary'>({Math.ceil(90 + (10 * Math.random()))})</small>
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                </Col>
              )
            })} */}
          </Row>
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  newProducts: state.newProducts
})

const mapDispatchToProps = {
  getNewProducts: newProductsAction.getNewProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
