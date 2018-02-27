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

import { cellOrder } from './order'

const expect = unexpected.clone()

describe('computeResizeable', () => {
  ;[
    {
      cells: [
        {
          id: '1',
          rows: [
            {
              id: '2',
              cells: [
                { id: '3', content: { plugin: { name: 'foo' } } },
                { id: '4' },
                { id: '5' }
              ]
            },
            {
              id: '6'
            },
            {
              id: '7'
            }
          ]
        },
        { id: '8' }
      ],
      e: [
        { id: '1', isLeaf: false },
        { id: '2', isLeaf: false },
        { id: '3', isLeaf: true },
        { id: '4', isLeaf: false },
        { id: '5', isLeaf: false },
        { id: '6', isLeaf: false },
        { id: '7', isLeaf: false },
        { id: '8', isLeaf: false }
      ]
    }
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      expect(cellOrder(c.cells), 'to equal', c.e)
    })
  })
})
