import React, { Component } from 'react'
import Navbar from '../components/NavbarSeller'
import { Container, Button, Form, FormGroup, Label, Input, Card, CardBody, CardHeader, CustomInput, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Products extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalUpdate: false,
      modalDelete: false,
      products: {},
      updateProduct: {}
    }
  }

  async componentDidMount () {
    try {
      const seller = await axios.get('http://localhost:8080/seller/1?sort=desc')
      this.setState({
        products: seller.data.data.items
      })
    } catch (error) {
    }
  }

  openModalUpdate (data) {
    this.setState({
      modalUpdate: !this.state.modalUpdate,
      updateProduct: data
    })
  }

  openModalDelete (id) {
    this.setState({ modalDelete: !this.state.modalDelete })
    console.log(id)
  }

  render () {
    const { products, updateProduct } = this.state

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
            <Form>
              <FormGroup>
                <Label for='name' className='text-secondary'>Name of goods</Label>
                <Input type='text' name='name' id='name' bsSize='lg' />
              </FormGroup>
              <FormGroup>
                <Label for='category' className='text-secondary'>Category</Label>
                <Input type='select' name='category' id='category' bsSize='lg'>
                  <option>T-Shirt</option>
                  <option>Shorts</option>
                  <option>Pants</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for='price' className='text-secondary'>Unit price</Label>
                <Input type='text' name='price' id='price' bsSize='lg' />
              </FormGroup>
              <FormGroup>
                <Label for='stock' className='text-secondary'>Stock</Label>
                <Input type='text' name='stock' id='stock' bsSize='lg' />
              </FormGroup>
              <FormGroup>
                <Label for='color' className='text-secondary'>Color</Label>
                <Input type='select' name='color' id='color' bsSize='lg'>
                  <option>Black</option>
                  <option>Red</option>
                  <option>Green</option>
                  <option>Blue</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for='radio' className='text-secondary'>Condition</Label>
                <div>
                  <CustomInput type='radio' id='new' label='New' name='condition' inline />
                  <CustomInput type='radio' id='used' label='Used' name='condition' inline />
                </div>
              </FormGroup>
              <FormGroup>
                <Label for='description' className='text-secondary'>Description</Label>
                <Input type='textarea' name='description' id='description' bsSize='lg' />
              </FormGroup>
            </Form>
            <Button color='success' block>Update</Button>{' '}
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
