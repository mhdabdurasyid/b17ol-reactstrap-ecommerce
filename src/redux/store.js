import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from './reducers'
import logger from 'redux-logger'

const store = createStore(
  rootReducer,
  applyMiddleware(promiseMiddleware, logger)
)

export default store
