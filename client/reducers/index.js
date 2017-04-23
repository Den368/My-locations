
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import locations from './locations'
import category from './category'

export default combineReducers({
  routing,
  locations,
  category
})
