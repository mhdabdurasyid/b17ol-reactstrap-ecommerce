import React, { Component } from 'react'
import { Container, Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Button, Input } from 'reactstrap'
import { Link } from 'react-router-dom'

import Logo from '../assets/img/icon/logo.svg'
import Cart from '../assets/img/icon/cart.svg'
import Filter from '../assets/img/icon/filter.svg'

class NavbarCostumer extends Component {
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
                <NavLink href='/cart'>
                  <Button color='link'><img src={Cart} alt='notification' /></Button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to='/login' className='btn btn-success rounded-pill mr-3' style={{ width: '100px' }}>Login</Link><Link to='/register' className='btn btn-outline-success rounded-pill' style={{ width: '100px' }}>Sign Up</Link>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default NavbarCostumer
