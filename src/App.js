import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Product from './pages/Products'
import SellProduct from './pages/SellProduct'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/my-store' component={Product} exact />
          <Route path='/my-store/sell' component={SellProduct} exact />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
