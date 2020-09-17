import React, { Component } from 'react'
import Navbar from '../components/NavbarSeller'
import { Container, Button, Form, FormGroup, Label, Input, Card, CardBody, CardHeader, CustomInput, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import qs from 'querystring'

class Products extends Component {
  constructor (props) {
    super(props)
    this.updateProduct = this.updateProduct.bind(this)

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
      condition_id: ''
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
      const seller = await axios.get('http://localhost:8080/seller/1?sort=desc')
      this.setState({
        products: seller.data.data.items
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
    this.setState({ modalDelete: !this.state.modalDelete })
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

  render () {
    const { products, category, color, condition } = this.state

    return (
      <>
        <Navbar />
        <Container className='mt-5'>
          <Card>
            <CardHeader className='px-4 py-4'>
              <h5 className='font-weight-bold'>My product</h5>
            </CardHeader>
            <CardBody className='px-4 py-4'>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Product name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {products.length && products.map(product => {
                    return (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td><Button color='success' size='sm' className='mb-1' onClick={() => this.openModalUpdate(product)}>Update</Button> <Button color='danger' size='sm' className='mb-1' onClick={() => this.openModalDelete(product.id)}>Delete</Button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </CardBody>
            <div className='mb-4 ml-4'>
              <Link to='/sell' className='btn btn-success btn-lg rounded-pill'>Sell product</Link>
            </div>
          </Card>
        </Container>
        <Modal className='modal-dialog-centered modal-dialog-scrollable' isOpen={this.state.modalUpdate} toggle={() => this.setState({ modalUpdate: !this.state.modalUpdate })}>
          <ModalHeader toggle={() => this.setState({ modalUpdate: !this.state.modalUpdate })}>Update product</ModalHeader>
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
                <Input type='textarea' name='description' id='description' bsSize='lg' value={this.state.description} onChange={(e) => this.setState({ [e.target.name]: e.target.value })} />
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
            <Button color='danger'>Yes</Button>{' '}
            <Button color='success' onClick={() => this.setState({ modalDelete: !this.state.modalDelete })}>No</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default Products
