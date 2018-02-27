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

/* eslint-env jest */
import * as hooks from './hooks'

import map from 'ramda/src/map'
import unexpected from 'unexpected'

const expect = unexpected.clone()

describe('hooks', () => {
  describe('merge', () => {
    it('does nothing if only one state is passed', () => {
      const expected = hooks.unserialize({
        importFromHtml:
          '<h1>European? British? These ‘Brexit’ Voters Identify as English</h1>'
      })
      const subject = hooks.merge([expected])

      expect(hooks.serialize(subject), 'to equal', hooks.serialize(expected))
    })

    it('merges the states if more than one state is passed', () => {
      const html = [
        '<h1>European? British? These ‘Brexit’ Voters Identify as English</h1>',
        '<p>Lorem ipsum dolor sit</p>'
      ]

      const subject = hooks.merge(
        map(importFromHtml => hooks.unserialize({ importFromHtml }), html)
      )

      const expected = hooks.unserialize({
        importFromHtml: html.join('')
      })

      expect(hooks.serialize(subject), 'to equal', hooks.serialize(expected))
    })
  })

  describe('split', () => {
    it('does nothing if the state contains only one block element', () => {
      const expected = hooks.unserialize({
        importFromHtml:
          '<h1>European? British? These ‘Brexit’ Voters Identify as English</h1>'
      })
      const subject = hooks.split(expected)

      expect(map(hooks.serialize, subject), 'to equal', [
        hooks.serialize(expected)
      ])
    })

    it('splits the state if it contains more than one block element', () => {
      const html = [
        '<h1>European? British? These ‘Brexit’ Voters Identify as English</h1>',
        '<p>Lorem ipsum dolor sit</p>'
      ]

      const editorState = hooks.unserialize({ importFromHtml: html.join('') })

      const [stateSplitA, stateSplitB] = hooks.split(editorState)

      expect(hooks.html.serialize(stateSplitA.editorState), 'to equal', html[0])

      expect(hooks.html.serialize(stateSplitB.editorState), 'to equal', html[1])
    })
  })
})
