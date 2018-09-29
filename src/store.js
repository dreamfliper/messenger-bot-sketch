import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import duckModule from './duckModule.js'

const rootReducer = combineReducers({
  duckModule
})

const initialState = {}
const enhancers = []
const middleware = []

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store
