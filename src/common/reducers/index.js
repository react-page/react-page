import {rows} from './rows'
import {mode} from './mode'
import {combineReducers} from 'redux'

export default combineReducers({
    rows,
    mode,
    id: (state = '') => state
})