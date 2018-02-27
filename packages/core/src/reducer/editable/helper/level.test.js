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

import { computeDropLevels } from './level'

const expect = unexpected.clone()

describe('computeDropLevels', () => {
  ;[
    {
      in: {
        cells: [
          {
            rows: [
              {
                cells: [{}, {}]
              }
            ]
          }
        ]
      },
      e: {
        cells: [
          {
            levels: { left: 0, right: 0, above: 0, below: 0 },
            rows: [
              {
                levels: { left: 1, right: 1, above: 1, below: 1 },
                cells: [
                  {
                    levels: { left: 2, right: 0, above: 2, below: 2 }
                  },
                  {
                    levels: { left: 0, right: 2, above: 2, below: 2 }
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      in: {
        cells: [
          {
            rows: [
              {
                cells: [
                  {
                    rows: [
                      {
                        cells: [{}, {}]
                      }
                    ]
                  },
                  {
                    rows: [
                      {
                        cells: [{}, {}]
                      }
                    ]
                  },
                  {
                    rows: [
                      {
                        cells: [{}, {}]
                      }
                    ]
                  }
                ]
              },
              {
                cells: [
                  {},
                  {
                    rows: [
                      {
                        cells: [{}, {}]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      e: {
        cells: [
          {
            levels: { left: 0, right: 0, above: 0, below: 0 },

            rows: [
              {
                levels: { left: 1, right: 1, above: 1, below: 0 },
                cells: [
                  {
                    levels: { left: 2, right: 0, above: 2, below: 1 },
                    rows: [
                      {
                        levels: { left: 3, right: 1, above: 3, below: 2 },
                        cells: [
                          {
                            levels: { left: 4, right: 0, above: 4, below: 3 }
                          },
                          {
                            levels: { left: 0, right: 2, above: 4, below: 3 }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    levels: { left: 0, right: 0, above: 2, below: 1 },
                    rows: [
                      {
                        levels: { left: 1, right: 1, above: 3, below: 2 },
                        cells: [
                          {
                            levels: { left: 2, right: 0, above: 4, below: 3 }
                          },
                          {
                            levels: { left: 0, right: 2, above: 4, below: 3 }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    levels: { left: 0, right: 2, above: 2, below: 1 },
                    rows: [
                      {
                        levels: { left: 1, right: 3, above: 3, below: 2 },
                        cells: [
                          {
                            levels: { left: 2, right: 0, above: 4, below: 3 }
                          },
                          {
                            levels: { left: 0, right: 4, above: 4, below: 3 }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                levels: { left: 1, right: 1, above: 0, below: 1 },
                cells: [
                  {
                    levels: { left: 2, right: 0, above: 1, below: 2 }
                  },
                  {
                    levels: { left: 0, right: 2, above: 1, below: 2 },
                    rows: [
                      {
                        levels: { left: 1, right: 3, above: 2, below: 3 },
                        cells: [
                          {
                            levels: { left: 2, right: 0, above: 3, below: 4 }
                          },
                          {
                            levels: { left: 0, right: 4, above: 3, below: 4 }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ].forEach((c, k) => {
    it(`should pass test case ${k}`, () => {
      const out = c.in.cells.map(c => computeDropLevels(c))
      expect(out, 'to equal', c.e.cells)
    })
  })
})
