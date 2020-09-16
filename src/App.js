import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Product from './pages/Products'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Product} exact />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
