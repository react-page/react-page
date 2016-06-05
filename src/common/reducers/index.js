import {rows} from './rows'
import { combineReducers } from 'redux'

export default combineReducers({
  rows,
  id: (state = '') => state
})