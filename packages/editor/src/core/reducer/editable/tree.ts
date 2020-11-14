/* eslint-disable @typescript-eslint/ban-types */

import { v4 } from 'uuid';
import {
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
  CELL_INSERT_AS_NEW_ROW,
} from '../../actions/cell';
import { Cell, Row } from '../../types/editable';
import { removeUndefinedProps } from '../../utils/removeUndefinedProps';

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
        return removeUndefinedProps({
          ...state,
          rows: rows(state.rows, action, depth + 1),
        });
      };

      switch (action.type) {
        case CELL_UPDATE_IS_DRAFT:
          if (action.id === state.id) {
            const reduced = reduce();
            if (action.lang) {
              return {
                ...reduced,
                isDraftI18n: {
                  ...(reduced.isDraftI18n ?? {}),
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
                ...(!emptyValue
                  ? { [action.lang]: action.data as { [key: string]: unknown } }
                  : {}),
              },
            };
          }
          return reduce();

        case CELL_INSERT_ABOVE:
          if (action.hoverId === state.id) {
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
          if (action.hoverId === state.id) {
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
        case CELL_INSERT_AS_NEW_ROW: {
          if (action.hoverId === state.id) {
            return {
              ...state,
              rows: [
                ...(state.rows ?? []),
                {
                  id: action.ids.others[1],
                  cells: [
                    { ...action.item, id: action.ids.item, inline: null },
                  ],
                },
              ],
            };
          }
          return reduce();
        }
        default:
          return reduce();
      }
    })(s, a)
  );

const createEmptyCell = (): Cell => ({
  id: v4(),
  rows: [
    {
      id: v4(),
      cells: [],
    },
  ],
});
export const cells = (state: Cell[] = [], action, depth = 0): Cell[] => {
  let newCells =
    depth === 0 && state.length === 0 ? [createEmptyCell()] : state;

  switch (action.type) {
    case CELL_RESIZE:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newCells = resizeCells(newCells, action);
      break;
    case CELL_INSERT_AT_END:
    case CELL_INSERT_AS_NEW_ROW:
    case CELL_INSERT_BELOW:
    case CELL_INSERT_ABOVE:
      newCells = newCells.filter((c: Cell) => c.id !== action.item.id); // this removes the cell if it already exists
      break;

    case CELL_INSERT_LEFT_OF:
      newCells = newCells
        .filter((c: Cell) => c.id !== action.item.id) // this removes the cell if it already exists
        .map((c: Cell) =>
          action.hoverId === c.id
            ? [
                { ...action.item, id: action.ids.item, inline: null },
                { ...c, id: action.ids.others[0] },
              ]
            : [c]
        )
        .reduce(flatten, []);
      break;

    case CELL_INSERT_RIGHT_OF:
      newCells = newCells
        .filter((c: Cell) => c.id !== action.item.id) // this removes the cell if it already exists
        .map((c: Cell) =>
          action.hoverId === c.id
            ? [
                { ...c, id: action.ids.others[0] },
                { ...action.item, id: action.ids.item, inline: null },
              ]
            : [c]
        )
        .reduce(flatten, []);
      break;

    case CELL_INSERT_INLINE_RIGHT:
    case CELL_INSERT_INLINE_LEFT:
      newCells = newCells
        .filter((c: Cell) => c.id !== action.item.id) // this removes the cell if it already exists
        .map((c: Cell) => {
          if (action.hoverId === c.id) {
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
        .reduce(flatten, []);
      break;

    case CELL_REMOVE:
      newCells = newCells.filter(({ id }: Cell) => id !== action.id);
      break;
  }

  const reducedCells = newCells.map((c) => cell(c, action, depth));
  return optimizeCells(reducedCells);
};

const row = (s: Row, a, depth: number): Row =>
  optimizeRow(
    ((state: Row, action): Row => {
      const reduce = () => ({
        ...state,
        cells: cells(state.cells, action, depth + 1),
      });

      switch (action.type) {
        case CELL_INSERT_LEFT_OF:
          if (action.hoverId !== state.id) {
            return reduce();
          }
          return {
            ...state,
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
          if (action.hoverId !== state.id) {
            return reduce();
          }
          return {
            ...state,
            cells: cells(
              [
                ...state.cells,
                { ...action.item, id: action.ids.item, inline: null },
              ],
              { ...action, hoverId: null },
              depth + 1
            ),
          };

        /*case CELL_DRAG_HOVER:
          if (action.hoverId === state.id) {
            return { ...reduce(), hoverPosition: action.position };
          }
          return reduce();
          */

        default:
          return reduce();
      }
    })(s, a)
  );

export const rows = (s: Row[] = [], a, depth = 0): Row[] =>
  optimizeRows(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    ((state: Row[], action): Row[] => {
      const reduce = () => state.map((r) => row(r, action, depth));
      switch (action.type) {
        case CELL_INSERT_ABOVE:
          return state
            .map((r: Row) =>
              action.hoverId === r.id
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
              action.hoverId === r.id
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
          const newRows =
            depth !== 0
              ? state
              : [
                  ...state,
                  {
                    cells: [
                      { ...action.item, id: action.ids.item, inline: null },
                    ],
                    id: action.ids.others[1],
                  },
                ];
          return newRows.map((r) => row(r, action, depth));
        }

        default:
          return reduce();
      }
    })(s, a)
  );
