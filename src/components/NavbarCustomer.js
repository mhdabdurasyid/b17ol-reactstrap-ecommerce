import React, { Component } from 'react'
import { Container, Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Button, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// import icon
import Logo from '../assets/img/icon/logo.svg'
import Cart from '../assets/img/icon/cart.svg'
import Filter from '../assets/img/icon/filter.svg'
import Message from '../assets/img/icon/message.svg'
import Notification from '../assets/img/icon/notification.svg'

// import dummy img profile
import Profile from '../assets/img/profile/profile.png'

class NavbarCostumer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      navbarOpen: false
    }
  }

  customerProfile (e) {
    e.preventDefault()
    this.props.history.push('/customer')
  }

  render () {
    const { isLogin } = this.props.customerAuth

    return (
      <Navbar color='light' light className='shadow' expand='md'>
        <Container>
          <Link to='/' className='navbar-brand'>
            <img src={Logo} alt='Wakede Logo' />
          </Link>
          <NavbarToggler onClick={() => this.setState({ navbarOpen: !this.state.navbarOpen })} />
          <Collapse navbar isOpen={this.state.navbarOpen}>
            <Nav className='ml-auto' navbar>
              <NavItem className=''>
                <NavLink>
                  <Input type='text' name='searh' id='searh' placeholder='Search' className='rounded-pill pl-3' style={{ width: '300px' }} />
                </NavLink>
              </NavItem>
              <NavItem className='mr-5'>
                <NavLink href='#filter'>
                  <Button outline color='secondary'><img src={Filter} alt='filter' /></Button>
                </NavLink>
              </NavItem>
              <NavItem className='ml-5 mr-4'>
                <Link className='nav-link' to='/cart'><img src={Cart} alt='cart' className='mt-2' /></Link>
              </NavItem>
              {!isLogin ? (
                <>
                  <NavItem>
                    <NavLink>
                      <Link to='/login' className='btn btn-success rounded-pill mr-3' style={{ width: '100px' }}>Login</Link><Link to='/register' className='btn btn-outline-success rounded-pill' style={{ width: '100px' }}>Sign Up</Link>
                    </NavLink>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem className='mr-2'>
                    <NavLink href='#notification'>
                      <Button color='link'><img src={Notification} alt='notification' /></Button>
                    </NavLink>
                  </NavItem>
                  <NavItem className='mr-2'>
                    <NavLink href='#message'>
                      <Button color='link'><img src={Message} alt='message' /></Button>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <Link className='nav-link' to='/customer'><img src={Profile} alt='profile' className='rounded-circle mt-1' style={{ width: '32px' }} /></Link>
                  </NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

const mapStateToProps = state => ({ customerAuth: state.customerAuth })

export default connect(mapStateToProps)(NavbarCostumer)
