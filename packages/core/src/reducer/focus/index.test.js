import unexpected from 'unexpected'
import { combineReducers, createStore } from 'redux'
import identity from 'ramda/src/identity'

import { blurCell, focusCell } from '../../actions/cell'
import { focus } from './index'

const expect = unexpected.clone()

describe('editor/reducer/focus', () => {
  ;[
    {
      s: '',
      a: blurCell('1234'),
      e: ''
    },
    {
      s: '12341',
      a: focusCell('1234'),
      e: '1234'
    },
    {
      s: '',
      a: focusCell('4321'),
      e: '4321'
    },
    {
      s: '4321',
      a: blurCell('1234'),
      e: '4321'
    }
  ].forEach((c, k) => {
    describe(`test case ${k}`, () => {
      it('should dispatch the action and return the expected result', () => {
        const reducer = combineReducers({ focus })
        const store = createStore(reducer, { focus: c.s }, identity)
        store.dispatch(c.a())
        expect(store.getState(), 'to equal', { focus: c.e })
      })
    })
  })
})
