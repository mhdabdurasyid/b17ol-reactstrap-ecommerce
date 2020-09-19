import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Product from './pages/Products'
import SellProduct from './pages/SellProduct'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Register from './pages/Register'
// import Login from './pages/Login'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/register' component={Register} />
          {/* <Route path='/login' component={Login} /> */}
          <Route path='/detail' component={Detail} />
          <Route path='/my-store' component={Product} exact />
          <Route path='/my-store/sell' component={SellProduct} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
