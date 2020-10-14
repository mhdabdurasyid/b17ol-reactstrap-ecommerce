import React, { Component } from 'react'
import { Container, Row, Col, ButtonGroup, Button, Form, FormGroup, Label, Input, Modal, ModalHeader } from 'reactstrap'
import { Link } from 'react-router-dom'
import qs from 'querystring'
import http from '../helpers/http'

// import icon
import logo from '../logo.svg'

class Register extends Component {
  constructor (props) {
    super(props)
    this.register = this.register.bind(this)
    this.state = {
      customerName: '',
      customerEmail: '',
      customerPassword: '',
      registerModal: false,
      message: '',
      isError: false
    }
  }

  onChangeText (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async register (e) {
    e.preventDefault()
    const data = {
      name: this.state.customerName,
      email: this.state.customerEmail,
      password: this.state.customerPassword
    }
    try {
      await http().post('public/costumer', qs.stringify(data))
      this.setState({
        registerModal: !this.state.registerModal,
        message: 'Register success. Please login first!',
        isError: false
      })
    } catch (error) {
      this.setState({
        registerModal: !this.state.registerModal,
        message: 'Something wrong or email already used!',
        isError: true
      })
    }
  }

  render () {
    return (
      <>
        <Container className='vh-100 text-center'>
          <Row className='vh-100'>
            <Col md='3' />
            <Col sm='auto' md='6' className='align-self-center'>
              <img src={logo} alt='Wakede Logo' className='mb-5' />
              <h5 className='font-weight-bold mb-5'>Please sign up with your account</h5>
              <ButtonGroup size='lg'>
                <Button color='success' style={{ width: '123px' }}>Costumer</Button>
                <Button outline color='success' style={{ width: '123px' }}>Seller</Button>
              </ButtonGroup>
              <Form onSubmit={(e) => { this.register(e) }}>
                <FormGroup className='mb-0'>
                  <Label for='customerName' />
                  <Input bsSize='lg' type='text' name='customerName' id='customerName' placeholder='Name' className='pl-4' onChange={(e) => { this.onChangeText(e) }} />
                </FormGroup>
                <FormGroup className='mb-0'>
                  <Label for='customerEmail' />
                  <Input bsSize='lg' type='email' name='customerEmail' id='customerEmail' placeholder='Email' className='pl-4' onChange={(e) => { this.onChangeText(e) }} />
                </FormGroup>
                <FormGroup className='mb-5'>
                  <Label for='customerPassword' />
                  <Input bsSize='lg' type='password' name='customerPassword' id='customerPassword' placeholder='Password' className='pl-4' onChange={(e) => { this.onChangeText(e) }} />
                </FormGroup>
                <Button color='success' className='rounded-pill mb-4' size='lg' block>Sign Up</Button>
              </Form>
              <span>Already have a Wakede account? <Link to='/login' className='text-success text-decoration-none'>Login</Link></span>
            </Col>
            <Col md='3' />
          </Row>
        </Container>
        <Modal isOpen={this.state.registerModal} toggle={() => !this.state.isError ? this.props.history.push('/login') : this.setState({ registerModal: !this.state.registerModal })}>
          <ModalHeader className='border-bottom-0' toggle={() => !this.state.isError ? this.props.history.push('/login') : this.setState({ registerModal: !this.state.registerModal })}>{this.state.message}</ModalHeader>
        </Modal>
      </>
    )
  }
}

export default Register
