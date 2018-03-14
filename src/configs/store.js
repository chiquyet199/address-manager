import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import reducers from 'reducers'

const middleWares = [thunk]

if (process.env.NODE_ENV !== 'production') {
  middleWares.push(logger)
}

export default createStore(reducers, applyMiddleware(...middleWares))
