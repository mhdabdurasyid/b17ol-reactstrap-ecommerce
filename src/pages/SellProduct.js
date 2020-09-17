import React, { Component } from 'react'
import Navbar from '../components/NavbarSeller'
import { Container, Button, Form, FormGroup, Label, Input, Card, CardBody, CardHeader, CustomInput } from 'reactstrap'
import axios from 'axios'
import qs from 'querystring'

class SellProduct extends Component {
  constructor (props) {
    super(props)
    this.formSubmit = this.formSubmit.bind(this)

    this.state = {
      category: {},
      color: {},
      name: '',
      price: '',
      description: '',
      stock: '',
      categoryID: '',
      conditionID: '',
      colorID: '',
      sellerID: 1
    }
  }

  async componentDidMount () {
    try {
      const category = await axios.get('http://localhost:8080/category')
      const color = await axios.get('http://localhost:8080/color')
      this.setState({
        category: category.data.data,
        color: color.data.data
      })
    } catch (error) {
    }
  }

  async formSubmit (event) {
    event.preventDefault()

    try {
      const addProduct = await axios.post('http://localhost:8080/item', qs.stringify({
        name: this.state.name,
        price: Number(this.state.price),
        description: this.state.description,
        stock: Number(this.state.stock),
        categoryID: this.state.categoryID,
        conditionID: this.state.conditionID,
        colorID: this.state.colorID,
        sellerID: this.state.sellerID
      }))

      if (addProduct.status === 200) {
        alert('Success add product')
        this.props.history.push('/my-store')
      } else {
        alert('Something wrong')
      }
    } catch (error) {
    }
  }

  render () {
    const { category, color } = this.state

    return (
      <>
        <Navbar />
        <Container className='mt-5'>
          <Form onSubmit={this.formSubmit}>
            <Card>
              <CardHeader className='px-4 py-4'>
                <h5 className='font-weight-bold'>Inventory</h5>
              </CardHeader>
              <CardBody className='px-4 py-4'>
                <FormGroup>
                  <Label for='name' className='text-secondary'>Name of goods</Label>
                  <Input type='text' name='name' id='name' bsSize='lg' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for='category' className='text-secondary'>Category</Label>
                  <Input type='select' name='category' id='category' bsSize='lg' onChange={(e) => this.setState({ categoryID: e.target.value })}>
                    <option value=''>- Select one- </option>
                    {category.length && category.map(items => {
                      return (<option key={items.id} value={items.id}>{items.name}</option>)
                    })}
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
                  <Input type='text' name='price' id='price' bsSize='lg' value={this.state.price} onChange={(e) => this.setState({ price: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for='stock' className='text-secondary'>Stock</Label>
                  <Input type='text' name='stock' id='stock' bsSize='lg' value={this.state.stock} onChange={(e) => this.setState({ stock: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for='color' className='text-secondary'>Color</Label>
                  <Input type='select' name='color' id='color' bsSize='lg' onChange={(e) => this.setState({ colorID: e.target.value })}>
                    <option value=''>- Select one -</option>
                    {color.length && color.map(items => {
                      return (<option key={items.id} value={items.id}>{items.name}</option>)
                    })}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for='radio' className='text-secondary'>Condition</Label>
                  <div>
                    <CustomInput type='radio' id='new' value='1' label='New' name='condition' inline onChange={(e) => this.setState({ conditionID: e.target.value })} />
                    <CustomInput type='radio' id='used' value='2' label='Used' name='condition' inline onChange={(e) => this.setState({ conditionID: e.target.value })} />
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
                  <Input type='textarea' name='description' id='description' bsSize='lg' value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                </FormGroup>
              </CardBody>
            </Card>
            <Button type='submit' color='success' size='lg' className='mb-5 rounded-pill' block>Sell</Button>
          </Form>
        </Container>
      </>
    )
  }
}

export default SellProduct
