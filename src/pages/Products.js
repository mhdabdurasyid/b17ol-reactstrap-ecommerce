import React, { Component } from 'react'
import Navbar from '../components/NavbarSeller'
import { Container, Button, Form, FormGroup, Label, Input, Card, CardBody, CardHeader, CustomInput, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Link } from 'react-router-dom'

class Products extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalUpdate: false,
      modalDelete: false
    }
  }

  render () {
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
                  <tr>
                    <td>Zalora Muslim Cloth Man</td>
                    <td>199000</td>
                    <td>23</td>
                    <td><Button color='success' size='sm' className='mb-1' onClick={() => this.setState({ modalUpdate: !this.state.modalUpdate })}>Update</Button> <Button color='danger' size='sm' className='mb-1' onClick={() => this.setState({ modalDelete: !this.state.modalDelete })}>Delete</Button></td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
            <div className='mb-4 ml-4'>
              <Link to='/sell' className='btn btn-success btn-lg rounded-pill'>Sell product</Link>
            </div>
          </Card>
        </Container>
        <Modal isOpen={this.state.modalUpdate} toggle={() => this.setState({ modalUpdate: !this.state.modalUpdate })}>
          <ModalHeader toggle={() => this.setState({ modalUpdate: !this.state.modalUpdate })}>Update product</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for='name' className='text-secondary'>Name of goods</Label>
                <Input type='text' name='name' id='name' size='lg' />
              </FormGroup>
              <FormGroup>
                <Label for='category' className='text-secondary'>Category</Label>
                <Input type='select' name='category' id='category' size='lg'>
                  <option>T-Shirt</option>
                  <option>Shorts</option>
                  <option>Pants</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for='price' className='text-secondary'>Unit price</Label>
                <Input type='text' name='price' id='price' size='lg' />
              </FormGroup>
              <FormGroup>
                <Label for='stock' className='text-secondary'>Stock</Label>
                <Input type='text' name='stock' id='stock' size='lg' />
              </FormGroup>
              <FormGroup>
                <Label for='color' className='text-secondary'>Color</Label>
                <Input type='select' name='color' id='color' size='lg'>
                  <option>Black</option>
                  <option>Red</option>
                  <option>Green</option>
                  <option>Blue</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for='radio' className='text-secondary'>Condition</Label>
                <div>
                  <CustomInput type='radio' id='new' label='New' name='condition' checked inline />
                  <CustomInput type='radio' id='used' label='Used' name='condition' inline />
                </div>
              </FormGroup>
              <FormGroup>
                <Label for='description' className='text-secondary'>Description</Label>
                <Input type='textarea' name='description' id='description' />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='success'>Update</Button>{' '}
            <Button color='danger' onClick={() => this.setState({ modalUpdate: !this.state.modalUpdate })}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalDelete} toggle={() => this.setState({ modalDelete: !this.state.modalDelete })}>
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
