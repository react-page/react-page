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

import { combineReducers, createStore } from 'redux'
import { rawEditableReducer } from './index'
import * as actions from '../../actions/cell'
import { decorate } from './helper/tree'
import { cellOrder } from './helper/order'

const walker = ({ cells = [], rows = [], hover = null, ...other }) => {
  if (cells.length) {
    other.cells = cells.map(walker)
  }
  if (rows.length) {
    other.rows = rows.map(walker)
  }
  return {
    ...other,
    hover
  }
}

const cells = state => decorate(state).map(walker)

const simulateDispatch = (currentState, action) => {
  const reducer = combineReducers({ editable: rawEditableReducer })
  const store = createStore(reducer, currentState)
  store.dispatch(action)

  return store.getState()
}

const runCase = (currentState, action, expectedState) => {
  const actualState = simulateDispatch(currentState, action)

  expect(actualState).toEqual({
    editable: {
      ...expectedState.editable,
      cellOrder: cellOrder(expectedState.editable.cells)
    }
  })
}

export const createEditable = (id, cells) => {
  const editable = {}

  if (id) {
    editable.id = id
  }

  if (cells) {
    editable.cells = cells
  }

  return { editable }
}

export const createCell = (id, rows, additional) => {
  const cell = {}

  if (id) {
    cell.id = id
  }

  if (rows) {
    cell.rows = rows
  }

  return {
    ...cell,
    ...additional
  }
}

export const createLayoutCell = (id, name, state, rows, additional) => {
  const cell = createCell(id, null, additional)
  const layout = {}

  if (name) {
    layout.plugin = {}
    layout.plugin.name = name
  }

  if (state) {
    layout.state = state
  }

  if (rows) {
    cell.rows = rows
  }

  return {
    ...cell,
    layout
  }
}

export const createContentCell = (id, name, state, additional) => {
  const cell = createCell(id, null, additional)
  const content = {}

  if (name) {
    content.plugin = {}
    content.plugin.name = name
  }

  if (state) {
    content.state = state
  }

  return {
    ...cell,
    content
  }
}

export const createRow = (id, cells, additional = {}) => {
  const row = {}

  if (id) {
    row.id = id
  }

  if (cells) {
    row.cells = cells
  }

  return {
    hasInlineChildren: false,
    ...row,
    ...additional
  }
}

test('basic', () => {
  const currentState = createEditable('editable')
  const action = { type: 'foo' }
  const expectedState = createEditable('editable', [])

  runCase(currentState, action, expectedState)
})

test('cleanup does not remove layout nodes when having one child, nested', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createCell('000', [
          createRow('0000', [
            createLayoutCell('layout', 'layout', null, [
              createRow('00000', [createContentCell('000000', 'foo')])
            ])
          ])
        ])
      ])
    ])
  ])

  const action = { type: 'foo' }

  const expectedState = createEditable(
    'editable',
    cells([
      createCell('0', [
        createRow('00', [
          createLayoutCell('layout', 'layout', null, [
            createRow('00000', [createContentCell('000000', 'foo')])
          ])
        ])
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cleanup does not remove layout nodes when having multiple cells in one row, nested', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createCell('000', [
          createRow('0000', [
            createLayoutCell('layout', 'layout', null, [
              createRow('00000', [createContentCell('000000', 'foo', null)]),
              createRow('00001', [createContentCell('000010', 'bar', null)])
            ])
          ])
        ])
      ])
    ])
  ])

  const action = { type: 'foo' }

  const expectedState = createEditable(
    'editable',
    cells([
      createCell('0', [
        createRow('00', [
          createLayoutCell('layout', 'layout', null, [
            createRow('00000', [createContentCell('000000', 'foo', null)]),
            createRow('00001', [createContentCell('000010', 'bar', null)])
          ])
        ])
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cell update content', () => {
  const currentState = createEditable('editable', [
    createContentCell('0', 'foo', { foo: 1 })
  ])

  const action = actions.updateCellContent('0')({ bar: 1 })

  const expectedState = createEditable(
    'editable',
    cells([createContentCell('0', 'foo', { bar: 1, foo: 1 })])
  )

  runCase(currentState, action, expectedState)
})

test('cell update layout', () => {
  const currentState = createEditable('editable', [
    createLayoutCell('0', 'foo', { foo: 1 }, [
      createRow('2', [createContentCell('1', 'bar')])
    ])
  ])

  const action = actions.updateCellLayout('0')({ bar: 1 })

  const expectedState = createEditable(
    'editable',
    cells([
      createLayoutCell('0', 'foo', { foo: 1, bar: 1 }, [
        createRow('2', [createContentCell('1', 'bar')])
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cell remove', () => {
  const currentState = createEditable('editable', [
    createContentCell('0', 'foo'),
    createContentCell('1', 'bar')
  ])

  const action = actions.removeCell('0')

  const expectedState = createEditable(
    'editable',
    cells([createContentCell('1', 'bar')])
  )

  runCase(currentState, action, expectedState)
})

test('last cell remove', () => {
  const currentState = createEditable('editable', [
    createContentCell('0', 'foo')
  ])

  const action = actions.removeCell('0', ['1'])

  const actualState = simulateDispatch(currentState, action)

  expect(actualState.editable.cells.length).toEqual(0)
})

test('cell cancel drag', () => {
  const currentState = createEditable('editable', [
    createContentCell('0', 'foo', null, { hover: true })
  ])

  const action = actions.cancelCellDrag('0')

  const expectedState = createEditable(
    'editable',
    cells([createContentCell('0', 'foo')])
  )

  runCase(currentState, action, expectedState)
})

test('cell resize', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createContentCell('000', 'foo', null, { size: 6 }),
        createContentCell('001', 'bar', null, { size: 6 })
      ])
    ])
  ])

  const action = actions.resizeCell('000')(4)

  const expectedState = createEditable(
    'editable',
    cells([
      createCell('0', [
        createRow('00', [
          createContentCell('000', 'foo', null, { size: 4 }),
          createContentCell('001', 'bar', null, { size: 8 })
        ])
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cell resize inline cell (1)', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createContentCell('000', 'foo', null, { inline: 'left' }),
        createContentCell('001', 'bar', null)
      ])
    ])
  ])

  const action = actions.resizeCell('000')(4)

  const expectedState = createEditable(
    'editable',
    cells([
      createCell('0', [
        createRow(
          '00',
          [
            createContentCell('000', 'foo', null, { inline: 'left', size: 4 }),
            createContentCell('001', 'bar', null, { size: 12 })
          ],
          { hasInlineChildren: true }
        )
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cell hover real row', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')])
    ])
  ])

  const action = actions.cellHoverLeftOf({ id: 'foo' }, { id: '00' }, 0)

  const expectedState = createEditable(
    'editable',
    cells([
      createCell('0', [
        createRow('00', [createContentCell('000', 'foo')], {
          hover: 'left-of'
        }),
        createRow('01', [createContentCell('010', 'bar')])
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cell hover row', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')])
    ])
  ])

  const action = actions.cellHoverLeftOf({ id: 'foo' }, { id: '000' }, 1)

  const expectedState = createEditable(
    'editable',
    cells([
      createCell('0', [
        createRow('00', [createContentCell('000', 'foo')], {
          hover: 'left-of'
        }),
        createRow('01', [createContentCell('010', 'bar')])
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cell hover ancestor cell', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')])
    ])
  ])

  const action = actions.cellHoverRightOf({ id: 'foo' }, { id: '000' }, 2)

  const expectedState = createEditable(
    'editable',
    cells([
      createCell(
        '0',
        [
          createRow('00', [createContentCell('000', 'foo')]),
          createRow('01', [createContentCell('010', 'bar')])
        ],
        { hover: 'right-of' }
      )
    ])
  )

  runCase(currentState, action, expectedState)
})

test('insert cell right of, clean up tree afterwards', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createCell('000', [
          createRow('0000', [
            createCell('00000', [
              createRow('000000', [
                createCell('000000', [
                  createRow('0000000', [createContentCell('00000000', 'foo')]),
                  createRow('0000001', [createContentCell('00000010', 'bar')])
                ])
              ])
            ])
          ])
        ])
      ])
    ])
  ])

  const action = actions.insertCellRightOf(
    createContentCell('i', 'insert'),
    { id: '00000000' },
    0,
    ['i0', 'i00', 'i000', 'i0000', 'i00000']
  )

  const expectedState = createEditable(
    'editable',
    cells([
      createCell('0', [
        createRow('0000000', [
          createContentCell('i0', 'foo'),
          createContentCell('i00', 'insert')
        ]),
        createRow('0000001', [createContentCell('00000010', 'bar')])
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('anti-recursion test: cell insert below of two level', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createCell('000', [
          createRow('0000', [
            createCell('00000', [
              createRow('000000', [
                createCell('000000', [
                  createRow('0000000', [createContentCell('00000000', 'foo')]),
                  createRow('0000001', [createContentCell('00000010', 'bar')])
                ])
              ])
            ])
          ])
        ])
      ])
    ])
  ])

  const action = actions.insertCellBelow(
    createContentCell('i', 'insert'),
    { id: '00000000' },
    2,
    ['i0', 'i00', 'i000', 'i0000', 'i00000']
  )

  const expectedState = createEditable(
    'editable',
    cells([
      createCell(
        'i0',
        [
          createRow('0000000', [createContentCell('00000000', 'foo')]),
          createRow('0000001', [createContentCell('00000010', 'bar')]),
          createRow('i0000', [createContentCell('i00000', 'insert')], {
            hasInlineChildren: false
          })
        ],
        {
          focusSource: '',
          focused: false
        }
      )
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cell insert right of cell', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')])
    ])
  ])

  const action = actions.insertCellRightOf(
    createContentCell('i', 'insert'),
    { id: '000' },
    0,
    ['i0', 'i00', 'i000', 'i0000', 'i00000']
  )

  const expectedState = createEditable(
    'editable',
    cells([
      createCell('0', [
        createRow('00', [
          createContentCell('i0', 'foo'),
          createContentCell('i00', 'insert')
        ]),
        createRow('01', [createContentCell('010', 'bar')])
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cell insert below of cell - one level deep (row)', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')])
    ])
  ])

  const action = actions.insertCellBelow(
    createContentCell('i', 'insert'),
    { id: '000' },
    1,
    ['i0', 'i00', 'i000', 'i0000', 'i00000']
  )

  const expectedState = createEditable(
    'editable',
    cells([
      createCell('0', [
        createRow('i0', [createContentCell('000', 'foo')]),
        createRow('i00', [createContentCell('i000', 'insert')], {
          hasInlineChildren: false
        }),
        createRow('01', [createContentCell('010', 'bar')])
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cell insert left of cell - one level deep (row)', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')])
    ])
  ])

  const action = actions.insertCellLeftOf(
    createContentCell('i', 'insert'),
    { id: '000' },
    1,
    ['i0', 'i00', 'i000', 'i0000', 'i00000']
  )

  const expectedState = createEditable(
    'editable',
    cells([
      createCell('0', [
        createRow('00', [
          createContentCell('i0', 'insert'),
          createContentCell('000', 'foo')
        ]),
        createRow('01', [createContentCell('010', 'bar')])
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cell insert left of cell', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')])
    ])
  ])

  const action = actions.insertCellLeftOf(
    createContentCell('i', 'insert'),
    { id: '000' },
    0,
    ['i0', 'i00', 'i000', 'i0000', 'i00000']
  )

  const expectedState = createEditable(
    'editable',
    cells([
      createCell('0', [
        createRow('00', [
          createContentCell('i0', 'insert'),
          createContentCell('i00', 'foo')
        ]),
        createRow('01', [createContentCell('010', 'bar')])
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cell insert above cell', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')])
    ])
  ])

  const action = actions.insertCellAbove(
    createContentCell('i', 'insert'),
    { id: '000' },
    0,
    ['i0', 'i00', 'i000', 'i0000', 'i00000']
  )

  const expectedState = createEditable(
    'editable',
    cells([
      createCell('0', [
        createRow('i00', [createContentCell('i000', 'insert')], {
          hasInlineChildren: false
        }),
        createRow('i0000', [createContentCell('i00000', 'foo')], {
          hasInlineChildren: false
        }),
        createRow('01', [createContentCell('010', 'bar')])
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cell insert below cell', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')])
    ])
  ])

  const action = actions.insertCellBelow(
    createContentCell('i', 'insert'),
    { id: '000' },
    0,
    ['i0', 'i00', 'i000', 'i0000', 'i00000']
  )

  const expectedState = createEditable(
    'editable',
    cells([
      createCell('0', [
        createRow('i00', [createContentCell('i000', 'foo')], {
          hasInlineChildren: false
        }),
        createRow('i0000', [createContentCell('i00000', 'insert')], {
          hasInlineChildren: false
        }),
        createRow('01', [createContentCell('010', 'bar')])
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cell move below another cell', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [createContentCell('000', 'foo')]),
      createRow('01', [createContentCell('010', 'bar')])
    ])
  ])

  const action = actions.insertCellBelow(
    createContentCell('000', 'foo'),
    { id: '010' },
    0,
    ['i0', 'i00', 'i000', 'i0000', 'i00000']
  )

  const expectedState = createEditable(
    'editable',
    cells([
      createCell('0', [
        createRow('i00', [createContentCell('i000', 'bar')], {
          hasInlineChildren: false
        }),
        createRow('i0000', [createContentCell('i00000', 'foo')], {
          hasInlineChildren: false
        })
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cell insert inline cell left of', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createContentCell('000', 'foo'),
        createContentCell('001', 'bar')
      ])
    ])
  ])

  const action = actions.insertCellLeftInline(
    createContentCell('i', 'insert'),
    { id: '000' },
    0,
    ['i0', 'i00', 'i000', 'i0000', 'i00000']
  )

  const expectedState = createEditable(
    'editable',
    cells([
      createCell('0', [
        createRow('00', [
          createCell(
            'i0',
            [
              createRow(
                'i00',
                [
                  createContentCell('i000', 'insert', null, { inline: 'left' }),
                  createContentCell('i0000', 'foo', null, { inline: null })
                  // FIXME: the row with id i00 has inline children!
                ],
                { hasInlineChildren: true }
              )
            ],
            {
              focusSource: '',
              focused: false
            }
          ),
          createContentCell('001', 'bar')
        ])
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('move inline cell from left to right', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createContentCell('000', 'foo', null, { inline: 'left' }),
        createContentCell('001', 'bar', null)
      ])
    ])
  ])

  const action = actions.insertCellRightInline(
    createContentCell('000', 'foo', null, { inline: 'left' }),
    { id: '001' },
    0,
    ['i0', 'i00', 'i000', 'i0000', 'i00000']
  )

  const expectedState = createEditable(
    'editable',
    cells([
      createCell('0', [
        createRow(
          'i00',
          [
            createContentCell('i000', 'foo', null, { inline: 'right' }),
            createContentCell('i0000', 'bar', null, { inline: null })
          ],
          { hasInlineChildren: true }
        )
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cell insert cell left of inline row', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createContentCell('000', 'foo', null, { inline: 'left' }),
        createContentCell('001', 'bar', null)
      ])
    ])
  ])

  const action = actions.insertCellLeftOf(
    createContentCell('i', 'insert'),
    { id: '000' },
    2,
    ['i0', 'i00', 'i000', 'i0000', 'i00000']
  )

  const expectedState = createEditable(
    'editable',
    cells([
      createContentCell('i0', 'insert', null, { size: 6 }),
      createCell('i00', [
        createRow(
          '00',
          [
            createContentCell('000', 'foo', null, { inline: 'left' }),
            createContentCell('001', 'bar', null)
          ],
          { hasInlineChildren: true }
        )
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cell insert below inline row', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createContentCell('000', 'foo', null, { inline: 'left' }),
        createContentCell('001', 'bar', null)
      ])
    ])
  ])

  const action = actions.insertCellBelow(
    createContentCell('i', 'insert'),
    { id: '000' },
    1,
    ['i0', 'i00', 'i000', 'i0000', 'i00000']
  )

  const expectedState = createEditable(
    'editable',
    cells([
      createCell('0', [
        createRow(
          'i0',
          [
            createContentCell('000', 'foo', null, { inline: 'left' }),
            createContentCell('001', 'bar', null)
          ],
          { hasInlineChildren: true }
        ),
        createRow('i00', [
          createContentCell('i000', 'insert', null, { size: 6 })
        ])
      ])
    ])
  )

  runCase(currentState, action, expectedState)
})

test('cell insert below inline row - 2 level', () => {
  const currentState = createEditable('editable', [
    createCell('0', [
      createRow('00', [
        createContentCell('000', 'foo', null, { inline: 'left' }),
        createContentCell('001', 'bar', null)
      ])
    ])
  ])

  const action = actions.insertCellBelow(
    createContentCell('i', 'insert'),
    { id: '000' },
    2,
    ['i0', 'i00', 'i000', 'i0000', 'i00000']
  )

  const expectedState = createEditable(
    'editable',
    cells([
      createCell(
        'i0',
        [
          createRow(
            '00',
            [
              createContentCell('000', 'foo', null, { inline: 'left' }),
              createContentCell('001', 'bar', null)
            ],
            { hasInlineChildren: true }
          ),
          createRow('i0000', [
            createContentCell('i00000', 'insert', null, { size: 6 })
          ])
        ],
        {
          focusSource: '',
          focused: false
        }
      )
    ])
  )

  runCase(currentState, action, expectedState)
})
