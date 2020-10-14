import React, { Component } from 'react'
import { Container, Row, Col, ButtonGroup, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// import icon
import logo from '../logo.svg'

// import action
import customerAuth from '../redux/actions/customerAuth'
import customerProfile from '../redux/actions/customerProfile'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      customerEmail: '',
      customerPassword: ''
    }
  }

  onChangeText (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  login (e) {
    e.preventDefault()
    const data = {
      email: this.state.customerEmail,
      password: this.state.customerPassword
    }
    this.props.customerLogin(data)
  }

  componentDidUpdate () {
    if (this.props.customerAuth.isLogin) {
      this.props.getCustomerProfile(this.props.customerAuth.token)
      this.props.history.push('/')
    }
  }

  render () {
    const { isError, alertMsg } = this.props.customerAuth

    return (
      <Container className='vh-100 text-center'>
        <Row className='vh-100'>
          <Col md='3' />
          <Col sm='auto' md='6' className='align-self-center'>
            <img src={logo} alt='Wakede Logo' className='mb-5' />
            <h5 className='font-weight-bold mb-5'>Please login with your account</h5>
            <Alert color='danger' isOpen={isError || alertMsg !== ''}>{alertMsg}</Alert>
            <ButtonGroup size='lg'>
              <Button color='success' style={{ width: '123px' }}>Costumer</Button>
              <Button outline color='success' style={{ width: '123px' }}>Seller</Button>
            </ButtonGroup>
            <Form onSubmit={(e) => { this.login(e) }}>
              <FormGroup className='mb-0'>
                <Label for='customerEmail' />
                <Input required bsSize='lg' type='email' name='customerEmail' id='customerEmail' placeholder='Email' className='pl-4' onChange={(e) => { this.onChangeText(e) }} />
              </FormGroup>
              <FormGroup className='mb-4'>
                <Label for='customerPassword' />
                <Input required bsSize='lg' type='password' name='customerPassword' id='customerPassword' placeholder='Password' className='pl-4' onChange={(e) => { this.onChangeText(e) }} />
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

const mapStateToProps = state => ({ customerAuth: state.customerAuth })

const mapDispatchToProps = {
  customerLogin: customerAuth.login,
  getCustomerProfile: customerProfile.getCustomerProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
