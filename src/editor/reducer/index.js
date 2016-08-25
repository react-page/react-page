// @flow
import { combineReducers } from 'redux'
import { editables } from './editables'
import { display } from './display'

export default combineReducers({
  editables,
  display
})
