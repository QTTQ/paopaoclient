import { combineReducers } from 'redux'
import counter from './counter'
import homePage from './homePage'
import common from './common'



export default combineReducers({
  counter,homePage,common
})
