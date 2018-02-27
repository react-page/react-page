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
