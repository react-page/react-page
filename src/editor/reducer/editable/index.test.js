/* eslint-env mocha */
import { editable } from './index'
import unexpected from 'unexpected'
import { combineReducers } from 'redux'
import { createStore } from 'redux'
import { identity } from 'ramda'
import * as actions from 'src/editor/actions/cell'

const expect = unexpected.clone()

const defaultState = {
  editable: {
    rows: [
      {
        id: '2',
        cells: [
          { id: '1', plugin: 'foo', ancestors: ['2'] }
        ]
      }
    ]
  }
}

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
      s: defaultState,
      a: () => actions.updateCell({ id: '1' }, 'foo'),
      e: {
        editable: {
          rows: [
            {
              id: '2',
              ancestors: [],
              cells: [
                { id: '1', plugin: 'foo', data: 'foo', rows: [], ancestors: ['2'] }
              ]
            }
          ]
        }
      }
    },
    {
      d: 'cell remove',
      s: defaultState,
      a: () => actions.removeCell({ id: '1' }),
      e: {
        editable: {
          rows: []
        }
      }
    }
  ].forEach((c) => {
    describe(`test case ${c.d}`, () => {
      it('should dispatch the action and return the expected result', () => {
        const reducer = combineReducers({ editable })
        const store = createStore(reducer, c.s, identity)
        store.dispatch(c.a())
        expect(store.getState(), 'to equal', c.e)
      })
    })
  })
})
