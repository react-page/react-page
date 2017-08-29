import unexpected from 'unexpected'
import { combineReducers, createStore } from 'redux'
import identity from 'ramda/src/identity'
import {
  createEditable,
  createCell,
  createRow,
  createContentCell
} from '../editable/index.test.js'

import { updateEditable } from '../../actions/editables'
import { editables } from './index'

const expect = unexpected.clone()

const someState = createEditable('editable', [
  createCell('0', [createRow('00', [createContentCell('000000', 'foo', null)])])
]).editable

describe('editor/reducer/editables', () => {
  ;[
    {
      i: {
        past: [],
        present: [],
        future: []
      },
      a: updateEditable(someState),
      e: { pa: 0, pr: 1 }
    },
    {
      i: {
        past: [[{ id: 'editable' }]],
        present: [],
        future: []
      },
      a: updateEditable(someState),
      e: { pa: 1, pr: 1 }
    },
    {
      i: {
        past: [[{ id: 'editable' }]],
        present: [{ id: 'editable' }],
        future: []
      },
      a: updateEditable(someState),
      e: { pa: 1, pr: 1 }
    }
  ].forEach((c, k) => {
    describe(`test case ${k}`, () => {
      it('should update an existing editable', () => {
        const reducer = combineReducers({ editables })
        const store = createStore(reducer, { editables: c.i }, identity)
        store.dispatch(c.a)
        expect(store.getState().editables.past.length, 'to equal', c.e.pa)
        expect(store.getState().editables.present.length, 'to equal', c.e.pr)
      })
    })
  })
})
