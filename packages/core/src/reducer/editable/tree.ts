/* eslint-disable @typescript-eslint/ban-types */

import {
  CELL_DRAG_HOVER,
  CELL_INSERT_ABOVE,
  CELL_INSERT_BELOW,
  CELL_INSERT_INLINE_LEFT,
  CELL_INSERT_INLINE_RIGHT,
  CELL_INSERT_LEFT_OF,
  CELL_INSERT_RIGHT_OF,
  CELL_REMOVE,
  CELL_RESIZE,
  CELL_UPDATE_DATA,
  CELL_UPDATE_IS_DRAFT,
  CELL_INSERT_AT_END,
  CellAction,
} from '../../actions/cell';
import { Cell, Row } from '../../types/editable';

import { isHoveringThis } from './helper/hover';

import {
  flatten,
  optimizeCell,
  optimizeCells,
  optimizeRow,
  optimizeRows,
} from './helper/optimize';
import { resizeCells } from './helper/sizing';

const cell = (s: Cell, a: CellAction, depth: number): Cell =>
  optimizeCell(
    ((state: Cell, action): Cell => {
      const reduce = (): Cell => {
        return {
          ...state,
          rows: rows(state.rows, action, depth + 1),
        };
      };

      switch (action.type) {
        case CELL_UPDATE_IS_DRAFT:
          if (action.id === state.id) {
            const reduced = reduce();
            if (action.lang) {
              return {
                ...reduced,
                isDraftI18n: {
                  ...reduced.isDraftI18n,
                  [action.lang]: action.isDraft,
                },
              };
            } else {
              return {
                ...reduced,
                isDraft: action.isDraft,
              };
            }
          }
          return reduce();
        case CELL_UPDATE_DATA:
          if (action.id === state.id) {
            // If this cell is being updated, set the data
            const reduced = reduce();
            const emptyValue = action.data === null;
            if (action.lang && emptyValue) {
              delete reduced.dataI18n?.[action.lang];
            }
            return {
              ...reduced,
              dataI18n: {
                ...(reduced.dataI18n ?? {}),
                ...(!emptyValue ? { [action.lang]: action.data } : {}),
              },
            };
          }
          return reduce();

        case CELL_DRAG_HOVER:
          if (isHoveringThis(state, action)) {
            // if this is the cell we're hovering, set the hover attribute
            return { ...reduce(), hoverPosition: action.position };
          }
          // or remove it if not
          return reduce();

        case CELL_INSERT_ABOVE:
          if (isHoveringThis(state, action)) {
            return {
              id: action.ids.cell,
              rows: rows(
                [
                  {
                    id: action.ids.others[0],
                    cells: [
                      { ...action.item, id: action.ids.item, inline: null },
                    ],
                  },
                  {
                    id: action.ids.others[1],
                    cells: [{ ...reduce(), id: action.ids.others[2] }],
                  },
                ],
                { ...action, hoverId: null },
                depth + 1
              ),
            };
          }
          return reduce();

        case CELL_INSERT_BELOW:
          if (isHoveringThis(state, action)) {
            return {
              id: action.ids.cell,

              rows: rows(
                [
                  {
                    id: action.ids.others[0],
                    cells: [{ ...reduce(), id: action.ids.others[1] }],
                  },
                  {
                    id: action.ids.others[2],
                    cells: [
                      { ...action.item, id: action.ids.item, inline: null },
                    ],
                  },
                ],
                { ...action, hoverId: null },
                depth + 1
              ),
            };
          }
          return reduce();

        default:
          return reduce();
      }
    })(s, a)
  );

export const cells = (s: Cell[] = [], a, depth = 0): Cell[] => {
  return optimizeCells(
    ((state: Cell[], action): Cell[] => {
      switch (action.type) {
        case CELL_RESIZE:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return resizeCells(
            state.map((c) => cell(c, action, depth)),
            action
          );
        case CELL_INSERT_AT_END:
        case CELL_INSERT_BELOW:
        case CELL_INSERT_ABOVE:
          return state
            .filter((c: Cell) => c.id !== action.item.id)
            .map((c) => cell(c, action, depth));

        case CELL_INSERT_LEFT_OF:
          return state
            .filter((c: Cell) => c.id !== action.item.id)
            .map((c: Cell) =>
              isHoveringThis(c, action)
                ? [
                    { ...action.item, id: action.ids.item, inline: null },
                    { ...c, id: action.ids.others[0] },
                  ]
                : [c]
            )
            .reduce(flatten, [])
            .map((c) => cell(c, action, depth));

        case CELL_INSERT_RIGHT_OF:
          return state
            .filter((c: Cell) => c.id !== action.item.id)
            .map((c: Cell) =>
              isHoveringThis(c, action)
                ? [
                    { ...c, id: action.ids.others[0] },
                    { ...action.item, id: action.ids.item, inline: null },
                  ]
                : [c]
            )
            .reduce(flatten, [])
            .map((c) => cell(c, action, depth));

        case CELL_INSERT_INLINE_RIGHT:
        case CELL_INSERT_INLINE_LEFT:
          return state
            .filter((c: Cell) => c.id !== action.item.id)
            .map((c: Cell) => {
              if (isHoveringThis(c, action)) {
                return [
                  {
                    id: action.ids.cell,
                    rows: [
                      {
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
            .map((c) => cell(c, action, depth));

        case CELL_REMOVE:
          return state
            .filter(({ id }: Cell) => id !== action.id)
            .map((c) => cell(c, action, depth));

        default:
          return state.map((c) => cell(c, action, depth));
      }
    })(s, a)
  );
};

const row = (s: Row, a, depth: number): Row =>
  optimizeRow(
    ((state: Row, action): Row => {
      const reduce = () => ({
        ...state,
        hoverPosition: null,
        cells: cells(state.cells, action, depth + 1),
      });

      switch (action.type) {
        case CELL_INSERT_LEFT_OF:
          if (!isHoveringThis(state, action)) {
            return reduce();
          }
          return {
            ...state,
            hoverPosition: null,
            cells: cells(
              [
                { ...action.item, id: action.ids.item, inline: null },
                ...state.cells,
              ],
              { ...action, hoverId: null },
              depth + 1
            ),
          };

        case CELL_INSERT_RIGHT_OF:
          if (!isHoveringThis(state, action)) {
            return reduce();
          }
          return {
            ...state,
            hoverPosition: null,
            cells: cells(
              [
                ...state.cells,
                { ...action.item, id: action.ids.item, inline: null },
              ],
              { ...action, hoverId: null },
              depth + 1
            ),
          };

        case CELL_DRAG_HOVER:
          if (isHoveringThis(state, action)) {
            return { ...reduce(), hoverPosition: action.position };
          }
          return reduce();

        default:
          return reduce();
      }
    })(s, a)
  );

const rows = (s: Row[] = [], a, depth: number): Row[] =>
  optimizeRows(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    ((state: Row[], action): Row[] => {
      const reduce = () => state.map((r) => row(r, action, depth));
      switch (action.type) {
        case CELL_INSERT_ABOVE:
          return state
            .map((r: Row) =>
              isHoveringThis(r, action)
                ? [
                    {
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
            .map((r) => row(r, action, depth));
        case CELL_INSERT_BELOW:
          return state
            .map((r: Row) =>
              isHoveringThis(r, action)
                ? [
                    {
                      ...r,
                      id: action.ids.others[0],
                    },
                    {
                      cells: [
                        { ...action.item, id: action.ids.item, inline: null },
                      ],
                      id: action.ids.others[1],
                    },
                  ]
                : [r]
            )
            .reduce(flatten, [])
            .map((r) => row(r, action, depth));
        case CELL_INSERT_AT_END: {
          return state
            .map((r: Row, index) =>
              index === state.length - 1 && depth === 1 // last row?
                ? [
                    {
                      ...r,
                      id: action.ids.others[0],
                    },
                    {
                      cells: [
                        { ...action.item, id: action.ids.item, inline: null },
                      ],
                      id: action.ids.others[1],
                    },
                  ]
                : [r]
            )
            .reduce(flatten, [])
            .map((r) => row(r, action, depth));
        }

        default:
          return reduce();
      }
    })(s, a)
  );
