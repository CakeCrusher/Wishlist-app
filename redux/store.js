import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

import customer from './reducers/customer'
import wishlist from './reducers/wishlist'
import offers from './reducers/offers'
const combinedReducers = combineReducers({
  customer: customer,
  wishlist: wishlist,
  offers: offers,
})

const store = createStore(
  combinedReducers,
  applyMiddleware(thunk)
)

export { store }