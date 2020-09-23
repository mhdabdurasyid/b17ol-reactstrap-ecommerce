import React, { Component } from 'react'
import Navbar from '../components/NavbarCustomer'
import { Container, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import Star from '../assets/img/icon/star.svg'
import axios from 'axios'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      newProduct: {},
      popularProduct: {}
    }
  }

  async componentDidMount () {
    try {
      const newProduct = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/item?sort[created_at]=desc&limit=15`)
      const popularProduct = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/item?sort[price]=&limit=15`)
      this.setState({
        newProduct: newProduct.data.data,
        popularProduct: popularProduct.data.data
      })
    } catch (error) {
    }
  }

  render () {
    const { newProduct, popularProduct } = this.state

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
            {newProduct.length && newProduct.map(product => {
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
            })}
          </Row>
        </Container>
        <Container className='mt-3'>
          <h2 className='font-weight-bold mb-1'>Popular</h2>
          <p className='text-secondary mb-4'>Find clothes that are trending recently</p>
          <Row xs='2' md='5'>
            {popularProduct.length && popularProduct.map(product => {
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
            })}
          </Row>
        </Container>
      </>
    )
  }
}

export default Home
