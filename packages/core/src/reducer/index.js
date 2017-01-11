// @flow
import { combineReducers } from 'redux'

import { editables } from './editables'
import { display } from './display'
import { focus } from './focus'
import { settings } from './settings'

export default combineReducers({
  editables,
  display,
  focus,
  settings
})
