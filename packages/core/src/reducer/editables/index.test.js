/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

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
