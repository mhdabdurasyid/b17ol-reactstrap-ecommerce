import React, { Component } from 'react'
import { Container, Row, Col, Spinner, Card, CardBody, CardText, CardSubtitle, CardTitle } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// import component
import Navbar from '../components/NavbarCustomer'

// import icon
import Star from '../assets/img/icon/star.svg'
import InactiveStar from '../assets/img/icon/inactive-star.svg'

// import action
import productByCategoryAction from '../redux/actions/getProductByCategory'

class Category extends Component {
  componentDidMount () {
    let { id } = this.props.match.params
    id = id.split('&')
    this.props.getProductByCategory(id[0])
  }

  render () {
    const { getProductByCategoryData, getProductByCategoryIsLoading, getProductByCategoryIsError, getProductByCategoryAlertMsg } = this.props.productByCategory

    return (
      <>
        <Navbar />
        <Container className='mt-5 mb-4'>
          <span className='text-secondary'><Link to='/' className='text-secondary text-decoration-none'>Home</Link> {'>'} <Link to='#category' className='text-secondary text-decoration-none'>Category</Link> {'>'} <Link to='#' className='text-secondary text-decoration-none'>{this.props.match.params.id.split('&')[1]}</Link></span>
          <h2 className='mt-4 font-weight-bold'>{this.props.match.params.id.split('&')[1]}</h2>
        </Container>
        <Container>
          <Row xs='2' md='5'>
            {!getProductByCategoryIsLoading && !getProductByCategoryIsError && getProductByCategoryData.length !== 0 && getProductByCategoryData.map(product => {
              return (
                <>
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
                            <small className='text-secondary'>({product.count_review})</small>
                          </li>
                        </ul>
                      </CardBody>
                    </Card>
                  </Col>
                </>
              )
            })}
          </Row>
        </Container>
        {getProductByCategoryIsLoading && !getProductByCategoryIsError && (
          <Container>
            <div className='mt-5 mb-5'>
              <Spinner type='grow' color='success' />
              <Spinner type='grow' color='warning' />
              <Spinner type='grow' color='secondary' />
            </div>
          </Container>
        )}
        {getProductByCategoryIsError && getProductByCategoryAlertMsg !== '' && (
          <div>{getProductByCategoryAlertMsg}</div>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  productByCategory: state.getProductByCategory
})

const mapDispatchToProps = {
  getProductByCategory: productByCategoryAction.getProductByCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
