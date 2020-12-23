import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

// import components
import CustomerPrivateRoute from './components/CustomerPrivateRoute'

// import pages
import Product from './pages/Products'
import SellProduct from './pages/SellProduct'
import Home from './pages/Home'
import SearchResult from './pages/SearchResult'
import Detail from './pages/Detail'
import Register from './pages/Register'
import Login from './pages/Login'
import Category from './pages/Category'
import Customer from './pages/CustomerProfile'
import ShippingAddress from './pages/ShippingAddress'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

// import action
import customerAuth from './redux/actions/customerAuth'
import customerProfile from './redux/actions/customerProfile'

class App extends Component {
  componentDidMount () {
    if (localStorage.getItem('token')) {
      this.props.setToken(localStorage.getItem('token'))
      this.props.getCustomerProfile(localStorage.getItem('token'))
    }
  }

  render () {
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route path='/' render={() => <Home />} exact /> */}
          <Route path='/' render={(props) => <Home {...props} />} exact />
          <Route path='/search' component={SearchResult} />
          <Route path='/register' component={Register} />
          {/* <Route path='/login' component={Login} /> */}
          <Route path='/login' render={(props) => <Login {...props} />} />
          <CustomerPrivateRoute path='/customer'>
            <Customer />
          </CustomerPrivateRoute>
          <CustomerPrivateRoute path='/shipping_address'>
            <ShippingAddress />
          </CustomerPrivateRoute>
          <CustomerPrivateRoute path='/cart'>
            <Cart />
          </CustomerPrivateRoute>
          <CustomerPrivateRoute path='/checkout'>
            <Checkout />
          </CustomerPrivateRoute>
          <Route path='/detail/:id' render={(props) => <Detail {...props} />} />
          <Route path='/category/:id' render={(props) => <Category {...props} />} />
          <Route path='/my-store' component={Product} exact />
          <Route path='/my-store/sell' component={SellProduct} />
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapDispatchToProps = {
  setToken: customerAuth.setToken,
  getCustomerProfile: customerProfile.getCustomerProfile
}

export default connect(null, mapDispatchToProps)(App)
