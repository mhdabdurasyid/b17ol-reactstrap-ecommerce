import React, { Component } from 'react'
import Navbar from '../components/NavbarSeller'
import { Container, Button, Form, FormGroup, Label, Input, Card, CardBody, CardHeader, CustomInput, Table, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, InputGroupText, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import qs from 'querystring'
import Search from '../assets/img/icon/search.svg'

class Products extends Component {
  constructor (props) {
    super(props)
    this.updateProduct = this.updateProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
    this.sortBy = this.sortBy.bind(this)
    this.numberOfProduct = this.numberOfProduct.bind(this)
    this.search = this.search.bind(this)

    this.state = {
      modalUpdate: false,
      modalDelete: false,
      products: {},
      category: {},
      color: {},
      condition: {},
      id: '',
      name: '',
      price: '',
      description: '',
      stock: '',
      category_id: '',
      color_id: '',
      condition_id: '',
      pageInfo: {},
      page: 1,
      sort: 'sort=desc',
      number: 5,
      query: ''
    }
  }

  async componentDidMount () {
    try {
      await this.getSellerProduct()
    } catch (error) {
    }
  }

  async getSellerProduct () {
    try {
      const seller = await axios.get(`http://localhost:8080/seller/1?search=${this.state.query}&page=${this.state.page}&limit=${this.state.number}&${this.state.sort}`)
      this.setState({
        products: seller.data.data.items,
        pageInfo: seller.data.pageInfo
      })
    } catch (error) {
    }
  }

  async openModalUpdate (data) {
    try {
      const category = await axios.get('http://localhost:8080/category')
      const color = await axios.get('http://localhost:8080/color')
      const condition = await axios.get('http://localhost:8080/condition')
      this.setState({
        modalUpdate: !this.state.modalUpdate,
        category: category.data.data,
        color: color.data.data,
        condition: condition.data.data,
        ...data
      })
    } catch (error) {
    }
  }

  openModalDelete (id) {
    this.setState({
      modalDelete: !this.state.modalDelete,
      id: id
    })
  }

  async updateProduct (event) {
    event.preventDefault()
    try {
      const updateProduct = await axios.patch(`http://localhost:8080/item/${this.state.id}`, qs.stringify({
        name: this.state.name,
        price: Number(this.state.price),
        description: this.state.description,
        stock: Number(this.state.stock),
        category_id: this.state.category_id,
        condition_id: this.state.condition_id,
        color_id: this.state.color_id
      }))

      if (updateProduct.status === 200) {
        this.setState({ modalUpdate: !this.state.modalUpdate }, async () => {
          try {
            await this.getSellerProduct()
          } catch (error) {
          }
        })
      }
    } catch (error) {
    }
  }

  async deleteProduct () {
    try {
      const deleteProduct = await axios.delete(`http://localhost:8080/item/${this.state.id}`)

      if (deleteProduct.status === 200) {
        this.setState({ modalDelete: !this.state.modalDelete }, async () => {
          try {
            await this.getSellerProduct()
          } catch (error) {
          }
        })
      }
    } catch (error) {
    }
  }

  sortBy (event) {
    this.setState({ sort: event.target.value }, async () => {
      try {
        await this.getSellerProduct()
      } catch (error) {
      }
    })
  }

  numberOfProduct (event) {
    this.setState({ number: event.target.value }, async () => {
      try {
        await this.getSellerProduct()
      } catch (error) {
      }
    })
  }

  async search (event) {
    event.preventDefault()
    try {
      await this.getSellerProduct()
    } catch (error) {
    }
  }

  render () {
    const { products, category, color, condition } = this.state

    return (
      <>
        <Navbar />
        <Container className='mt-5'>
          <Card className='mb-5'>
            <CardHeader className='px-4 py-4'>
              <h5 className='font-weight-bold'>My product</h5>
            </CardHeader>
            <CardBody className='px-4 py-4'>
              <Row className='mb-4'>
                <Col xs='auto' md='4'>
                  <Form onSubmit={this.search}>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <img src={Search} alt='...' />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type='text' placeholder='Search' name='search' value={this.state.query} onChange={(e) => this.setState({ query: e.target.value })} />
                      </InputGroup>
                    </FormGroup>
                  </Form>
                </Col>
                <Col xs='auto' md='4' />
                <Col xs='auto' md='4'>
                  <Form inline>
                    <FormGroup>
                      <Label for='sort' className='mr-2'>Sort by</Label>
                      <CustomInput type='select' id='sort' name='sort' defaultValue={this.state.sort} onChange={this.sortBy}>
                        <option value='sort=desc'>New</option>
                        <option value='sort=asc'>Old</option>
                        <option value='sort[name]=asc'>Name asc</option>
                        <option value='sort[name]=desc'>Name desc</option>
                        <option value='sort[price]=asc'>Price asc</option>
                        <option value='sort[price]=desc'>Price desc</option>
                        <option value='sort[stock]=asc'>Stock asc</option>
                        <option value='sort[stock]=desc'>Stock desc</option>
                      </CustomInput>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Product name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>{' '}</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length && products.map(product => {
                    return (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td><Button color='success' size='sm' className='mb-1' onClick={() => this.openModalUpdate(product)}>Detail</Button> <Button color='danger' size='sm' className='mb-1' onClick={() => this.openModalDelete(product.id)}>Delete</Button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              <Row>
                <Col xs='auto' md='4'>
                  <Button outline size='sm' color='success'>Prev</Button>{' '}
                  <Button outline size='sm' color='success'>Next</Button>
                </Col>
                <Col xs='auto' md='4' />
                <Col xs='auto' md='4'>
                  <Form inline>
                    <FormGroup>
                      <Label for='number' className='mr-2'>Number of products</Label>
                      <CustomInput type='select' id='number' name='number' defaultValue={this.state.number} onChange={this.numberOfProduct}>
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                      </CustomInput>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
            </CardBody>
            <div className='mb-4 mx-5'>
              <Link to='/my-store/sell' className='btn btn-success btn-sm btn-block rounded-pill'>Sell product</Link>
            </div>
          </Card>
        </Container>
        <Modal className='modal-dialog-centered modal-dialog-scrollable' isOpen={this.state.modalUpdate} toggle={() => this.setState({ modalUpdate: !this.state.modalUpdate })}>
          <ModalHeader toggle={() => this.setState({ modalUpdate: !this.state.modalUpdate })}>You can update this product</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.updateProduct}>
              <FormGroup>
                <Label for='name' className='text-secondary'>Name of goods</Label>
                <Input type='text' name='name' id='name' bsSize='lg' value={this.state.name} onChange={(e) => this.setState({ [e.target.name]: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for='category' className='text-secondary'>Category</Label>
                <Input type='select' name='category' id='category' bsSize='lg' value={this.state.category_id} onChange={(e) => this.setState({ category_id: e.target.value })}>
                  {category.length && category.map(category => (<option key={category.id} value={category.id}>{category.name}</option>))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for='price' className='text-secondary'>Unit price</Label>
                <Input type='text' name='price' id='price' bsSize='lg' value={this.state.price} onChange={(e) => this.setState({ [e.target.name]: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for='stock' className='text-secondary'>Stock</Label>
                <Input type='text' name='stock' id='stock' bsSize='lg' value={this.state.stock} onChange={(e) => this.setState({ [e.target.name]: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for='color' className='text-secondary'>Color</Label>
                <Input type='select' name='color' id='color' bsSize='lg' value={this.state.color_id} onChange={(e) => this.setState({ color_id: e.target.value })}>
                  {color.length && color.map(color => (<option key={color.id} value={color.id}>{color.name}</option>))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for='radio' className='text-secondary'>Condition</Label>
                <div>
                  {condition.length && condition.map(condition => {
                    if (this.state.condition_id === condition.id) {
                      return (
                        <CustomInput key={condition.id} type='radio' id={condition.name} value={condition.id} label={condition.name} name='condition' checked inline onChange={(e) => this.setState({ condition_id: e.target.value })} />
                      )
                    } else {
                      return (
                        <CustomInput key={condition.id} type='radio' id={condition.name} value={condition.id} label={condition.name} name='condition' inline onChange={(e) => this.setState({ condition_id: e.target.value })} />
                      )
                    }
                  })}
                </div>
              </FormGroup>
              <FormGroup>
                <Label for='description' className='text-secondary'>Description</Label>
                <Input type='textarea' name='description' id='description' bsSize='lg' style={{ height: '10rem' }} value={this.state.description} onChange={(e) => this.setState({ [e.target.name]: e.target.value })} />
              </FormGroup>
              <Button color='success' block>Update</Button>
            </Form>
          </ModalBody>
        </Modal>
        <Modal className='modal-dialog-centered' isOpen={this.state.modalDelete} toggle={() => this.setState({ modalDelete: !this.state.modalDelete })}>
          <ModalHeader toggle={() => this.setState({ modalDelete: !this.state.modalDelete })}>Are you sure to delete this product?</ModalHeader>
          <ModalBody>
          After click Yes, you can't see this product on your store anymore..
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={this.deleteProduct}>Yes</Button>{' '}
            <Button color='success' onClick={() => this.setState({ modalDelete: !this.state.modalDelete })}>No</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default Products
