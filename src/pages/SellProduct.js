import React, { Component } from 'react'
import Navbar from '../components/NavbarSeller'
import { Container, Button, Form, FormGroup, Label, Input, Card, CardBody, CardHeader, CustomInput } from 'reactstrap'

class SellProduct extends Component {
  render () {
    return (
      <>
        <Navbar />
        <Container className='mt-5'>
          <Form>
            <Card>
              <CardHeader className='px-4 py-4'>
                <h5 className='font-weight-bold'>Inventory</h5>
              </CardHeader>
              <CardBody className='px-4 py-4'>
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
              </CardBody>
            </Card>
            <Card className='mt-4'>
              <CardHeader className='px-4 py-4'>
                <h5 className='font-weight-bold'>Item details</h5>
              </CardHeader>
              <CardBody className='px-4 py-4'>
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
              </CardBody>
            </Card>
            <Card className='my-4'>
              <CardHeader className='px-4 py-4'>
                <h5 className='font-weight-bold'>Description</h5>
              </CardHeader>
              <CardBody className='px-4 py-4'>
                <FormGroup>
                  <Label for='description'> </Label>
                  <Input type='textarea' name='description' id='description' />
                </FormGroup>
              </CardBody>
            </Card>
            <Button color='success' size='lg' className='mb-5 rounded-pill' block>Sell</Button>
          </Form>
        </Container>
      </>
    )
  }
}

export default SellProduct
