/* eslint-env mocha */
import { editable } from './index'
import unexpected from 'unexpected'
import { combineReducers } from 'redux'
import { createStore } from 'redux'
import { identity } from 'ramda'
import * as actions from 'src/editor/actions/cell'

const expect = unexpected.clone()

describe('editor/reducer/editable', () => {
  [
    {
      d: 'basic',
      s: { editable: {} },
      a: () => ({ type: 'foo' }),
      e: { editable: { rows: [] } }
    },
    {
      d: 'cell update',
      s: {
        editable: {
          rows: [
            {
              cells: [
                { id: '1', plugin: 'foo' }
              ]
            }
          ]
        }
      },
      a: () => actions.updateCell({ id: '1' }, 'foo'),
      e: {
        editable: {
          rows: [
            {
              cells: [
                { id: '1', plugin: 'foo', data: 'foo' }
              ]
            }
          ]
        }
      }
    }
  ].forEach((c) => {
    describe(`test case ${c.d}`, () => {
      it('should dispatch the action and return the expected result', () => {
        const reducer = combineReducers({ editable })
        console.log(c.s, c.d)
        const store = createStore(reducer, c.s, identity)
        console.log(store.getState(), c.s, c.d)
        store.dispatch(c.a())
        expect(store.getState(), 'to equal', c.e)
      })
    })
  })
})
