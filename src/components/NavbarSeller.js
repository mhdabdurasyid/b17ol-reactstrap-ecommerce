import React, { Component } from 'react'
import { Container, Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'

import Logo from '../assets/img/icon/logo.svg'
import Notification from '../assets/img/icon/notification.svg'
import Message from '../assets/img/icon/message.svg'
import Profile from '../assets/img/profile/profile.png'

class NavbarSeller extends Component {
  constructor (props) {
    super(props)
    this.state = {
      navbarOpen: false
    }
  }

  render () {
    return (
      <Navbar color='light' light className='shadow' expand='md'>
        <Container>
          <Link to='/' className='navbar-brand'>
            <img src={Logo} alt='Wakede Logo' />
          </Link>
          <NavbarToggler onClick={() => this.setState({ navbarOpen: !this.state.navbarOpen })} />
          <Collapse navbar isOpen={this.state.navbarOpen}>
            <Nav className='ml-auto' navbar>
              <NavItem className='mr-4'>
                <NavLink href='#notification'>
                  <img src={Notification} alt='notification' />
                </NavLink>
              </NavItem>
              <NavItem className='mr-4'>
                <NavLink href='#message'>
                  <img src={Message} alt='message' />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='#my-profile'>
                  <img src={Profile} alt='my profile' className='rounded-circle' />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default NavbarSeller
