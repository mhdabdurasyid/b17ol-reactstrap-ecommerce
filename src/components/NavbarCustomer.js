import React, { useState } from 'react'
import { Container, Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Button, Input, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Form } from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// import icon
import Logo from '../assets/img/icon/logo.svg'
import Cart from '../assets/img/icon/cart.svg'
import Filter from '../assets/img/icon/filter.svg'
import Message from '../assets/img/icon/message.svg'
import Notification from '../assets/img/icon/notification.svg'
import Avatar from '../assets/img/profile/profile.png'

// import action
import customerAuth from '../redux/actions/customerAuth'

export default function NavbarCostumer () {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const { isLogin } = useSelector((state) => state.customerAuth)
  const { customerProfileData } = useSelector((state) => state.customerProfile)

  function logout () {
    dispatch(customerAuth.logout())
  }

  function search (e) {
    e.preventDefault()
    history.push(`/search/?q=${keyword}`)
  }

  return (
      <Navbar color='light' light className='shadow' expand='md'>
        <Container>
          <Link to='/' className='navbar-brand'>
            <img src={Logo} alt='Wakede Logo' />
          </Link>
          <NavbarToggler onClick={() => setNavbarOpen(!navbarOpen)} />
          <Collapse navbar isOpen={navbarOpen}>
            <Nav className='ml-auto' navbar>
              <NavItem className=''>
                <NavLink>
                  <Form onSubmit={(e) => search(e)}>
                    <Input type='text' name='keyword' id='keyword' placeholder='Search' className='rounded-pill pl-3' style={{ width: '300px' }} onChange={(e) => setKeyword(e.target.value)} />
                  </Form>
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
              {!isLogin
                ? (
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
                  <UncontrolledDropdown nav inNavbar>
                    {customerProfileData.length !== 0 && customerProfileData.map(profile => {
                      return (
                        <DropdownToggle
                          key={1}
                          nav
                          className='border rounded-circle'
                          style={{
                            backgroundImage: `url(${profile.photo_profile !== '' ? `${process.env.REACT_APP_BACKEND_URL}${profile.photo_profile}` : Avatar})`,
                            width: '32px',
                            height: '32px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            margin: '12px'
                          }}
                        />
                      )
                    })}
                    <DropdownMenu right>
                      <DropdownItem>
                        <Link to='/customer' className='text-decoration-none text-body'>My Profile</Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to='/' onClick={logout} className='text-decoration-none text-body'>Logout</Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </>
                  )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
  )
}
