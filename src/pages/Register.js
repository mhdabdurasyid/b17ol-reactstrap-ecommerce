import React, { Component } from 'react'
import logo from '../logo.svg'
import { Container, Row, Col, ButtonGroup, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom'

class Register extends Component {
  constructor (props) {
    super(props)
    this.register = this.register.bind(this)
  }

  register (event) {
    event.preventDefault()
    this.props.history.push('/login')
  }

  render () {
    return (
      <Container className='vh-100 text-center'>
        <Row className='vh-100'>
          <Col md='3' />
          <Col sm='auto' md='6' className='align-self-center'>
            <img src={logo} alt='Wakede Logo' className='mb-5' />
            <h5 className='font-weight-bold mb-5'>Please sign up with your account</h5>
            <ButtonGroup size='lg'>
              <Button color='success'>Costumer</Button>
              <Button outline color='success'>Seller</Button>
            </ButtonGroup>
            <Form onSubmit={this.register}>
              <FormGroup className='mb-0'>
                <Label for='name' />
                <Input bsSize='lg' type='text' name='name' id='name' placeholder='Name' className='pl-4' />
              </FormGroup>
              <FormGroup className='mb-0'>
                <Label for='email' />
                <Input bsSize='lg' type='email' name='email' id='email' placeholder='Email' className='pl-4' />
              </FormGroup>
              <FormGroup className='mb-5'>
                <Label for='password' />
                <Input bsSize='lg' type='password' name='password' id='password' placeholder='Password' className='pl-4' />
              </FormGroup>
              <Button color='success' className='rounded-pill mb-4' size='lg' block>Sign Up</Button>
            </Form>
            <span className='align-middle'>Already have a Wakede account? <Link to='/login' className='text-success text-decoration-none'>Login</Link></span>
          </Col>
          <Col md='3' />
        </Row>
      </Container>
    )
  }
}

export default Register
