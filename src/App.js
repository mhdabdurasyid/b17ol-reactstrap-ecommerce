import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

// import pages
import Product from './pages/Products'
import SellProduct from './pages/SellProduct'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Register from './pages/Register'
import Login from './pages/Login'

// import store
import store from './redux/store'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/' render={() => <Home />} exact />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/detail/:id' render={(props) => <Detail {...props} />} />
            <Route path='/my-store' component={Product} exact />
            <Route path='/my-store/sell' component={SellProduct} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
