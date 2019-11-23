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

import pathOr from 'ramda/src/pathOr';
import { AnyAction } from 'redux';
import {
  CELL_BLUR,
  CELL_BLUR_ALL,
  CELL_DRAG_HOVER,
  CELL_FOCUS,
  CELL_INSERT_ABOVE,
  CELL_INSERT_BELOW,
  CELL_INSERT_INLINE_LEFT,
  CELL_INSERT_INLINE_RIGHT,
  CELL_INSERT_LEFT_OF,
  CELL_INSERT_RIGHT_OF,
  CELL_REMOVE,
  CELL_RESIZE,
  CELL_UPDATE_CONTENT,
  CELL_UPDATE_IS_DRAFT,
  CELL_UPDATE_LAYOUT
} from '../../actions/cell';
import { Cell, createCell, createRow, Row } from '../../types/editable';
import { CellHoverAction } from './../../actions/cell/drag';
import { isHoveringThis } from './helper/hover';
import { computeRow } from './helper/inline';
import { mergeDecorator } from './helper/merge';
import {
  flatten,
  optimizeCell,
  optimizeCells,
  optimizeRow,
  optimizeRows
} from './helper/optimize';
import { resizeCells } from './helper/sizing';

const inner = (cb: Function, action: Object) => (state: Object) =>
  cb(state, action);
const identity = (state: Cell) => state;

export const cell = (s: Cell, a: AnyAction): Cell =>
  optimizeCell(
    ((state: Cell, action: AnyAction): Cell => {
      const reduce = () => {
        const content = pathOr(
          identity,
          ['content', 'plugin', 'reducer'],
          state
        );
        const layout = pathOr(identity, ['layout', 'plugin', 'reducer'], state);

        return content(
          layout(
            {
              ...state,
              hover: null,
              rows: rows(state.rows, action),
            },
            action
          ),
          action
        );
      };

      switch (action.type) {
        case CELL_UPDATE_IS_DRAFT:
          if (action.id === state.id) {
            // If this cell is being focused, set the data
            return { ...reduce(), isDraft: action.isDraft };
          }
          return { ...reduce(), focused: false, focusSource: null };
        case CELL_UPDATE_CONTENT:
          if (action.id === state.id) {
            // If this cell is being updated, set the data
            const reduced = reduce();
            return {
              ...reduced,
              content: {
                ...(state.content || {}),
                state: {
                  ...pathOr({}, ['content', 'state'], reduced),
                  ...action.state,
                },
              },
            };
          }
          return reduce();

        case CELL_UPDATE_LAYOUT:
          if (action.id === state.id) {
            // If this cell is being updated, set the data
            const reduced = reduce();
            return {
              ...reduced,
              layout: {
                ...(state.layout || {}),
                state: {
                  ...pathOr({}, ['layout', 'state'], reduced),
                  ...action.state,
                },
              },
            };
          }
          return reduce();

        case CELL_FOCUS:
          if (action.id === state.id) {
            // If this cell is being focused, set the data
            return { ...reduce(), focused: true, focusSource: action.source };
          }
          return { ...reduce(), focused: false, focusSource: null };

        case CELL_BLUR:
          if (action.id === state.id) {
            // If this cell is being blurred, set the data
            return { ...reduce(), focused: false, focusSource: null };
          }
          return reduce();

        case CELL_BLUR_ALL:
          return { ...reduce(), focused: false };

        case CELL_DRAG_HOVER:
          if (isHoveringThis(state, action as CellHoverAction)) {
            // if this is the cell we're hovering, set the hover attribute
            return { ...reduce(), hover: action.position };
          }
          // or remove it if not
          return reduce();

        case CELL_INSERT_ABOVE:
          if (isHoveringThis(state, action as CellHoverAction)) {
            return {
              ...createCell(),
              id: action.ids.cell,
              hover: null,
              rows: rows(
                [
                  {
                    ...createRow(),
                    id: action.ids.others[0],
                    cells: [
                      { ...action.item, id: action.ids.item, inline: null },
                    ],
                  },
                  {
                    ...createRow(),
                    id: action.ids.others[1],
                    cells: [{ ...reduce(), id: action.ids.others[2] }],
                  },
                ],
                { ...action, hover: null }
              ),
            };
          }
          return reduce();

        case CELL_INSERT_BELOW:
          if (isHoveringThis(state, action as CellHoverAction)) {
            return {
              ...createCell(),
              id: action.ids.cell,
              hover: null,
              rows: rows(
                [
                  {
                    ...createRow(),
                    id: action.ids.others[0],
                    cells: [{ ...reduce(), id: action.ids.others[1] }],
                  },
                  {
                    ...createRow(),
                    id: action.ids.others[2],
                    cells: [
                      { ...action.item, id: action.ids.item, inline: null },
                    ],
                  },
                ],
                { ...action, hover: null }
              ),
            };
          }
          return reduce();

        default:
          return reduce();
      }
    })(s, a)
  );

export const cells = (s: Cell[] = [], a: AnyAction): Cell[] =>
  optimizeCells(
    ((state: Cell[], action: AnyAction): Cell[] => {
      switch (action.type) {
        case CELL_RESIZE:
          // tslint:disable-next-line:no-any
          return resizeCells(state.map(inner(cell, action)), action as any);

        case CELL_INSERT_BELOW:
        case CELL_INSERT_ABOVE:
          return state
            .filter((c: Cell) => c.id !== action.item.id)
            .map(inner(cell, action));

        case CELL_INSERT_LEFT_OF:
          return state
            .filter((c: Cell) => c.id !== action.item.id)
            .map((c: Cell) =>
              isHoveringThis(c, action as CellHoverAction)
                ? [
                    { ...action.item, id: action.ids.item, inline: null },
                    { ...c, id: action.ids.others[0] },
                  ]
                : [c]
            )
            .reduce(flatten, [])
            .map(inner(cell, action));

        case CELL_INSERT_RIGHT_OF:
          return state
            .filter((c: Cell) => c.id !== action.item.id)
            .map((c: Cell) =>
              isHoveringThis(c, action as CellHoverAction)
                ? [
                    { ...c, id: action.ids.others[0] },
                    { ...action.item, id: action.ids.item, inline: null },
                  ]
                : [c]
            )
            .reduce(flatten, [])
            .map(inner(cell, action));

        case CELL_INSERT_INLINE_RIGHT:
        case CELL_INSERT_INLINE_LEFT:
          return state
            .filter((c: Cell) => c.id !== action.item.id)
            .map((c: Cell) => {
              if (isHoveringThis(c, action as CellHoverAction)) {
                return [
                  {
                    ...createCell(),
                    id: action.ids.cell,
                    rows: [
                      {
                        ...createRow(),
                        id: action.ids.others[0],
                        cells: [
                          {
                            ...action.item,
                            inline:
                              action.type === CELL_INSERT_INLINE_RIGHT
                                ? 'right'
                                : 'left',
                            id: action.ids.item,
                            size: 0,
                          },
                          {
                            ...c,
                            id: action.ids.others[1],
                            inline: null,
                            hasInlineNeighbour: action.ids.item,
                            size: 0,
                          },
                        ],
                      },
                    ],
                  },
                ] as Cell[];
              }
              return [c];
            })
            .reduce(flatten, [])
            .map(inner(cell, action));

        case CELL_REMOVE:
          return state
            .filter(({ id }: Cell) => id !== action.id)
            .map(inner(cell, action));

        default:
          return state.map(inner(cell, action));
      }
    })(s, a)
  );

export const row = (s: Row, a: AnyAction): Row =>
  computeRow(
    optimizeRow(
      ((state: Row, action: AnyAction): Row => {
        const reduce = () => ({
          ...state,
          hover: null,
          cells: cells(state.cells, action),
        });

        switch (action.type) {
          case CELL_INSERT_LEFT_OF:
            if (!isHoveringThis(state, action as CellHoverAction)) {
              return reduce();
            }
            return {
              ...state,
              hover: null,
              cells: cells(
                [
                  { ...action.item, id: action.ids.item, inline: null },
                  ...state.cells,
                ],
                { ...action, hover: null }
              ),
            };

          case CELL_INSERT_RIGHT_OF:
            if (!isHoveringThis(state, action as CellHoverAction)) {
              return reduce();
            }
            return {
              ...state,
              hover: null,
              cells: cells(
                [
                  ...state.cells,
                  { ...action.item, id: action.ids.item, inline: null },
                ],
                { ...action, hover: null }
              ),
            };

          case CELL_DRAG_HOVER:
            if (isHoveringThis(state, action as CellHoverAction)) {
              return { ...reduce(), hover: action.position };
            }
            return reduce();

          default:
            return reduce();
        }
      })(s, a)
    )
  );

export const rows = (s: Row[] = [], a: AnyAction): Row[] =>
  optimizeRows(
    // tslint:disable-next-line:no-any
    mergeDecorator(a as any)(
      ((state: Row[], action: AnyAction): Row[] => {
        const reduce = () => state.map(inner(row, action));
        switch (action.type) {
          case CELL_INSERT_ABOVE:
            return state
              .map((r: Row) =>
                isHoveringThis(r, action as CellHoverAction)
                  ? [
                      {
                        ...createRow(),
                        cells: [
                          { ...action.item, id: action.ids.item, inline: null },
                        ],
                        id: action.ids.others[0],
                      },
                      {
                        ...r,
                        id: action.ids.others[1],
                      },
                    ]
                  : [r]
              )
              .reduce(flatten, [])
              .map(inner(row, action));
          case CELL_INSERT_BELOW:
            return state
              .map((r: Row) =>
                isHoveringThis(r, action as CellHoverAction)
                  ? [
                      {
                        ...r,
                        id: action.ids.others[0],
                      },
                      {
                        ...createRow(),
                        cells: [
                          { ...action.item, id: action.ids.item, inline: null },
                        ],
                        id: action.ids.others[1],
                      },
                    ]
                  : [r]
              )
              .reduce(flatten, [])
              .map(inner(row, action));

          default:
            return reduce();
        }
      })(s, a)
    )
  );
