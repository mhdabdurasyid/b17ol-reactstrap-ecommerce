import React, { Component } from 'react'
import logo from '../logo.svg'
import { Container, Row, Col, ButtonGroup, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor (props) {
    super(props)
    this.login = this.login.bind(this)
  }

  login (event) {
    event.preventDefault()
    this.props.history.push('/')
  }

  render () {
    return (
      <Container className='vh-100 text-center'>
        <Row className='vh-100'>
          <Col md='3' />
          <Col sm='auto' md='6' className='align-self-center'>
            <img src={logo} alt='Wakede Logo' className='mb-5' />
            <h5 className='font-weight-bold mb-5'>Please login with your account</h5>
            <ButtonGroup size='lg'>
              <Button color='success' style={{ width: '123px' }}>Costumer</Button>
              <Button outline color='success' style={{ width: '123px' }}>Seller</Button>
            </ButtonGroup>
            <Form onSubmit={this.login}>
              <FormGroup className='mb-0'>
                <Label for='email' />
                <Input bsSize='lg' type='email' name='email' id='email' placeholder='Email' className='pl-4' />
              </FormGroup>
              <FormGroup className='mb-4'>
                <Label for='password' />
                <Input bsSize='lg' type='password' name='password' id='password' placeholder='Password' className='pl-4' />
              </FormGroup>
              <div className='text-right'><Link to='/forgot' className='text-success text-decoration-none'>Forgot password?</Link></div>
              <Button color='success' className='rounded-pill mt-4 mb-4' size='lg' block>Login</Button>
            </Form>
            <span>Don't have a Wakede account? <Link to='/register' className='text-success text-decoration-none'>Register</Link></span>
          </Col>
          <Col md='3' />
        </Row>
      </Container>
    )
  }
}

export default Login
