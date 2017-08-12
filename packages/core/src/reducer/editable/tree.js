// @flow
/* eslint-disable no-use-before-define */
/* eslint no-duplicate-imports: "off" */
import pathOr from 'ramda/src/pathOr'

import {
  optimizeCell,
  optimizeRow,
  optimizeRows,
  optimizeCells,
  flatten
} from './helper/optimize'
import { mergeDecorator } from './helper/merge'
import { isHoveringThis } from './helper/hover'
import { resizeCells } from './helper/sizing'
import { computeRow } from './helper/inline'
import { createCell, createRow } from '../../types/editable'
import {
  CELL_REMOVE,
  CELL_UPDATE_LAYOUT,
  CELL_UPDATE_CONTENT,
  CELL_INSERT_LEFT_OF,
  CELL_INSERT_RIGHT_OF,
  CELL_INSERT_ABOVE,
  CELL_INSERT_BELOW,
  CELL_INSERT_INLINE_LEFT,
  CELL_INSERT_INLINE_RIGHT,
  CELL_DRAG_HOVER,
  CELL_RESIZE,
  CELL_FOCUS,
  CELL_BLUR,
  CELL_BLUR_ALL
} from '../../actions/cell'

import type { Cell, Row } from '../../types/editable'

const inner = (cb: Function, action: Object) => (state: Object) =>
  cb(state, action)
const identity = (state: Cell) => state

export const cell = (state: Cell, action: Object): Cell =>
  optimizeCell(
    ((state: Cell, action: Object): Cell => {
      const reduce = () => {
        const content = pathOr(
          identity,
          ['content', 'plugin', 'reducer'],
          state
        )
        const layout = pathOr(identity, ['content', 'layout', 'reducer'], state)

        return content(
          layout(
            {
              ...state,
              hover: null,
              rows: rows(state.rows, action)
            },
            action
          ),
          action
        )
      }

      switch (action.type) {
        case CELL_UPDATE_CONTENT:
          if (action.id === state.id) {
            // If this cell is being updated, set the data
            const reduced = reduce()
            return {
              ...reduced,
              content: {
                ...(state.content || {}),
                state: {
                  ...pathOr({}, ['content', 'state'], reduced),
                  ...action.state
                }
              }
            }
          }
          return reduce()

        case CELL_UPDATE_LAYOUT:
          if (action.id === state.id) {
            // If this cell is being updated, set the data
            const reduced = reduce()
            return {
              ...reduced,
              layout: {
                ...(state.layout || {}),
                state: {
                  ...pathOr({}, ['layout', 'state'], reduced),
                  ...action.state
                }
              }
            }
          }
          return reduce()

        case CELL_FOCUS:
          if (action.id === state.id) {
            // If this cell is being focused, set the data
            return { ...reduce(), focused: true, focusSource: action.source }
          }
          return { ...reduce(), focused: false, focusSource: null }

        case CELL_BLUR:
          if (action.id === state.id) {
            // If this cell is being blurred, set the data
            return { ...reduce(), focused: false, focusSource: null }
          }
          return reduce()

        case CELL_BLUR_ALL:
          return { ...reduce(), focused: false }

        case CELL_DRAG_HOVER:
          if (isHoveringThis(state, action)) {
            // if this is the cell we're hovering, set the hover attribute
            return { ...reduce(), hover: action.position }
          }
          // or remove it if not
          return reduce()

        case CELL_INSERT_ABOVE:
          if (isHoveringThis(state, action)) {
            return {
              ...createCell(),
              id: action.ids[0],
              hover: null,
              rows: rows(
                [
                  {
                    ...createRow(),
                    id: action.ids[1],
                    cells: [{ ...action.item, id: action.ids[2], inline: null }]
                  },
                  {
                    ...createRow(),
                    id: action.ids[3],
                    cells: [{ ...reduce(), id: action.ids[4] }]
                  }
                ],
                { ...action, hover: null }
              )
            }
          }
          return reduce()

        case CELL_INSERT_BELOW:
          if (isHoveringThis(state, action)) {
            return {
              ...createCell(),
              id: action.ids[0],
              hover: null,
              rows: rows(
                [
                  {
                    ...createRow(),
                    id: action.ids[1],
                    cells: [{ ...reduce(), id: action.ids[2] }]
                  },
                  {
                    ...createRow(),
                    id: action.ids[3],
                    cells: [{ ...action.item, id: action.ids[4], inline: null }]
                  }
                ],
                { ...action, hover: null }
              )
            }
          }
          return reduce()

        default:
          return reduce()
      }
    })(state, action)
  )

export const cells = (state: Cell[] = [], action: Object): Cell[] =>
  optimizeCells(
    ((state: Cell[], action: Object): Cell[] => {
      switch (action.type) {
        case CELL_RESIZE:
          return resizeCells(state.map(inner(cell, action)), action)

        case CELL_INSERT_BELOW:
        case CELL_INSERT_ABOVE:
          return state
            .filter((c: Cell) => c.id !== action.item.id)
            .map(inner(cell, action))

        case CELL_INSERT_LEFT_OF:
          return state
            .filter((c: Cell) => c.id !== action.item.id)
            .map(
              (c: Cell) =>
                isHoveringThis(c, action)
                  ? [
                      { ...action.item, id: action.ids[0], inline: null },
                      { ...c, id: action.ids[1] }
                    ]
                  : [c]
            )
            .reduce(flatten, [])
            .map(inner(cell, action))

        case CELL_INSERT_RIGHT_OF:
          return state
            .filter((c: Cell) => c.id !== action.item.id)
            .map(
              (c: Cell) =>
                isHoveringThis(c, action)
                  ? [
                      { ...c, id: action.ids[0] },
                      { ...action.item, id: action.ids[1], inline: null }
                    ]
                  : [c]
            )
            .reduce(flatten, [])
            .map(inner(cell, action))

        case CELL_INSERT_INLINE_RIGHT:
        case CELL_INSERT_INLINE_LEFT:
          return state
            .filter((c: Cell) => c.id !== action.item.id)
            .map((c: Cell) => {
              if (isHoveringThis(c, action)) {
                return [
                  {
                    ...createCell(),
                    id: action.ids[0],
                    rows: [
                      {
                        ...createRow(),
                        id: action.ids[1],
                        cells: [
                          {
                            ...action.item,
                            inline:
                              action.type === CELL_INSERT_INLINE_RIGHT
                                ? 'right'
                                : 'left',
                            id: action.ids[2],
                            size: 0
                          },
                          {
                            ...c,
                            id: action.ids[3],
                            inline: null,
                            hasInlineNeighbour: action.ids[2],
                            size: 0
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
              return [c]
            })
            .reduce(flatten, [])
            .map(inner(cell, action))

        case CELL_REMOVE:
          return state
            .filter(({ id }: Cell) => id !== action.id)
            .map(inner(cell, action))

        default:
          return state.map(inner(cell, action))
      }
    })(state, action)
  )

export const row = (state: Row, action: Object): Row =>
  computeRow(
    optimizeRow(
      ((state: Row, action: Object): Row => {
        const reduce = () => ({
          ...state,
          hover: null,
          cells: cells(state.cells, action)
        })

        switch (action.type) {
          case CELL_INSERT_LEFT_OF:
            if (!isHoveringThis(state, action)) {
              return reduce()
            }
            return {
              ...state,
              hover: null,
              cells: cells(
                [
                  { ...action.item, id: action.ids[0], inline: null },
                  ...state.cells
                ],
                { ...action, hover: null }
              )
            }

          case CELL_INSERT_RIGHT_OF:
            if (!isHoveringThis(state, action)) {
              return reduce()
            }
            return {
              ...state,
              hover: null,
              cells: cells(
                [
                  ...state.cells,
                  { ...action.item, id: action.ids[0], inline: null }
                ],
                { ...action, hover: null }
              )
            }

          case CELL_DRAG_HOVER:
            if (isHoveringThis(state, action)) {
              return { ...reduce(), hover: action.position }
            }
            return reduce()

          default:
            return reduce()
        }
      })(state, action)
    )
  )

export const rows = (state: Row[] = [], action: Object): Row[] =>
  optimizeRows(
    mergeDecorator(action)(
      ((state: Row[], action: Object): Row[] => {
        const reduce = () => state.map(inner(row, action))
        switch (action.type) {
          case CELL_INSERT_ABOVE:
            return state
              .map(
                (r: Row) =>
                  isHoveringThis(r, action)
                    ? [
                        {
                          ...createRow(),
                          cells: [
                            { ...action.item, id: action.ids[1], inline: null }
                          ],
                          id: action.ids[0]
                        },
                        {
                          ...r,
                          id: action.ids[2]
                        }
                      ]
                    : [r]
              )
              .reduce(flatten, [])
              .map(inner(row, action))
          case CELL_INSERT_BELOW:
            return state
              .map(
                (r: Row) =>
                  isHoveringThis(r, action)
                    ? [
                        {
                          ...r,
                          id: action.ids[0]
                        },
                        {
                          ...createRow(),
                          cells: [
                            { ...action.item, id: action.ids[2], inline: null }
                          ],
                          id: action.ids[1]
                        }
                      ]
                    : [r]
              )
              .reduce(flatten, [])
              .map(inner(row, action))

          default:
            return reduce()
        }
      })(state, action)
    )
  )
