import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Container, Card, CardText, CardBody, CardTitle, CardSubtitle, Row, Col, Spinner, FormGroup, Label, Input, Button } from 'reactstrap'

// import component
import Navbar from '../components/NavbarCustomer'

// import icon
import Star from '../assets/img/icon/star.svg'
import InactiveStar from '../assets/img/icon/inactive-star.svg'

// import action
import searchAction from '../redux/actions/search'

export default function SearchResult () {
  const dispatch = useDispatch()
  const location = useLocation()
  const { searchProductsData, searchProductsIsLoading, searchProductsIsError, searchProductsPageInfo } = useSelector((state) => state.search)
  const [sort, setSort] = useState('1')
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (sort === '1') {
      dispatch(searchAction.searchProducts(new URLSearchParams(location.search).get('q'), 'rating', 'desc', page))
    } else if (sort === '2') {
      dispatch(searchAction.searchProducts(new URLSearchParams(location.search).get('q'), 'created_at', 'desc', page))
    } else if (sort === '3') {
      dispatch(searchAction.searchProducts(new URLSearchParams(location.search).get('q'), 'price', 'asc', page))
    } else if (sort === '4') {
      dispatch(searchAction.searchProducts(new URLSearchParams(location.search).get('q'), 'price', 'desc', page))
    }
  }, [dispatch, location, sort, page])

  return (
    <>
      <Navbar />
      <Container className='mt-4 mb-5'>
          <h2 className='font-weight-bold mb-4'>Search result</h2>
          <FormGroup row>
            <Col sm={9} />
            <Label for="sort" sm={1}>Sort by</Label>
            <Col sm={2}>
              <Input type="select" name="select" id="sort" onChange={(e) => setSort(e.target.value)}>
                <option value={1}>Popular</option>
                <option value={2}>Newest</option>
                <option value={3}>Price: lowest to high</option>
                <option value={4}>Price: high to lowest</option>
              </Input>
            </Col>
          </FormGroup>
          <Row xs='2' md='5'>
            {!searchProductsIsLoading && !searchProductsIsError && searchProductsData.length !== 0 && searchProductsData.map(product => {
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
            {searchProductsIsLoading && !searchProductsIsError && (
              <Col>
                <Spinner type='grow' color='success' />
                <Spinner type='grow' color='warning' />
                <Spinner type='grow' color='secondary' />
              </Col>
            )}
          </Row>
          <Row>
            <Col sm={1}>
              <Button color="success" disabled={!searchProductsPageInfo.prevLink && true} onClick={() => setPage(page - 1)}>Prev</Button>
            </Col>
            <Col sm={10} />
            <Col sm={1}>
              <Button color="success" disabled={!searchProductsPageInfo.nextLink && true} onClick={() => setPage(page + 1)}>Next</Button>
            </Col>
          </Row>
        </Container>
    </>
  )
}
