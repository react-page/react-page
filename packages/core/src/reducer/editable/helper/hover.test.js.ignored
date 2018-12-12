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

import { isHoveringThis } from './hover'

const expect = unexpected.clone()

// FIXME: this should be done differently
describe('isHoveringThis', () => {
  ;[
    {
      in: {
        cells: [
          {
            rows: [
              {
                cells: [
                  {
                    h: true,
                    id: '1',
                    plugin: 'foo'
                  }
                ]
              }
            ]
          },
          {
            rows: [{ cells: [{ plugin: 'bar' }] }]
          }
        ]
      },
      action: {
        hover: '1'
      }
    },
    {
      in: {
        cells: [
          {
            rows: [
              {
                h: true,
                cells: [
                  {
                    id: '1',
                    plugin: 'foo'
                  }
                ]
              }
            ]
          },
          {
            rows: [{ cells: [{ plugin: 'bar' }] }]
          }
        ]
      },
      action: {
        hover: '1',
        level: 1
      }
    },

    {
      in: {
        rows: [
          {
            cells: [{ rows: [{ cells: [{ plugin: 'bar' }] }] }]
          },
          {
            h: true,
            cells: [
              {
                rows: [
                  {
                    cells: [
                      {
                        id: '1',
                        plugin: 'foo'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      action: {
        hover: '1',
        level: 3
      }
    }
  ].forEach((c, k) => {
    const runner = level => props =>
      describe('isHoveringThis', () => {
        it(`case ${k} should pass level ${level}`, () => {
          const { cells = [], rows = [], h = false } = props
          expect(isHoveringThis(props, c.action), 'to equal', h)
          rows.map(runner(level + 1))
          cells.map(runner(level + 1))
        })
      })
    runner(0)(c.in)
  })
})
