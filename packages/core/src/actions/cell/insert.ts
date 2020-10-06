import { Action } from 'redux';
import { v4 } from 'uuid';
import { Cell, CellWithAncestors, NewIds } from '../../types/editable';
import { editMode } from '../display';
import { generateIds } from '../helpers';
import { focusCell } from './core';

export const CELL_INSERT_ABOVE = 'CELL_INSERT_ABOVE';
export const CELL_INSERT_BELOW = 'CELL_INSERT_BELOW';
export const CELL_INSERT_LEFT_OF = 'CELL_INSERT_LEFT_OF';
export const CELL_INSERT_RIGHT_OF = 'CELL_INSERT_RIGHT_OF';
export const CELL_INSERT_INLINE_LEFT = 'CELL_INSERT_INLINE_LEFT';
export const CELL_INSERT_INLINE_RIGHT = 'CELL_INSERT_INLINE_RIGHT';

export const CELL_INSERT_AT_END = 'CELL_INSERT_AT_END';

type InsertType =
  | typeof CELL_INSERT_ABOVE
  | typeof CELL_INSERT_BELOW
  | typeof CELL_INSERT_LEFT_OF
  | typeof CELL_INSERT_RIGHT_OF
  | typeof CELL_INSERT_INLINE_LEFT
  | typeof CELL_INSERT_INLINE_RIGHT
  | typeof CELL_INSERT_AT_END;
export interface InsertAction extends Action {
  ts: Date;
  item: Partial<Cell>;
  hoverId: string;
  level: number;
  ids: NewIds;
  type: InsertType;
}

const insert = <T extends InsertType>(type: T) => (
  item: Partial<Cell>,
  { id: hoverId, inline, hasInlineNeighbour }: Partial<Cell>,
  level = 0,
  ids: NewIds = null
) => {
  let l = level;
  delete (item as CellWithAncestors).ancestors;
  switch (type) {
    case CELL_INSERT_ABOVE:
    case CELL_INSERT_BELOW: {
      if ((inline || hasInlineNeighbour) && level < 1) {
        l = 1;
      }
      break;
    }

    case CELL_INSERT_LEFT_OF:
    case CELL_INSERT_RIGHT_OF: {
      if ((inline || hasInlineNeighbour) && level < 1) {
        l = 1;
      }
      break;
    }
    default:
  }

  const insertAction = {
    type,
    ts: new Date(),
    item,
    hoverId,
    level: l,
    // FIXME: item handling is a bit confusing,
    // we now give some of them a name like "cell" or "item",
    // but the purpose of the others is unclear
    ids: ids ? ids : generateIds(),
  };

  return (dispatch) => {
    dispatch(insertAction);
    // FIXME: checking if an item is new or just moved around is a bit awkward
    const isNew = !item.id || (item.rows && !item.levels);

    if (isNew) {
      dispatch(editMode());
    }
    setTimeout(() => {
      dispatch(focusCell(insertAction.ids.item, true));
    }, 300);
  };
};

/**
 * Insert a cell below of the hovering cell.
 */
export const insertCellBelow = insert(CELL_INSERT_BELOW);

/**
 * Insert a cell above of the hovering cell.
 */
export const insertCellAbove = insert(CELL_INSERT_ABOVE);

/**
 * Insert a cell right of the hovering cell.
 */
export const insertCellRightOf = insert(CELL_INSERT_RIGHT_OF);

/**
 * Insert a cell left of the hovering cell.
 */
export const insertCellLeftOf = insert(CELL_INSERT_LEFT_OF);

/**
 * Insert a cell inside the hovering cell, on the left.
 */
export const insertCellLeftInline = insert(CELL_INSERT_INLINE_LEFT);

/**
 * Insert a cell inside the hovering cell, on the right.
 */
export const insertCellRightInline = insert(CELL_INSERT_INLINE_RIGHT);

export const insertCellAtTheEnd = insert(CELL_INSERT_AT_END);

// set new ids recursivly
const newIds = ({ id, ...item }: Partial<Cell>) => {
  return {
    ...item,
    content: item.content && {
      plugin: item.content.plugin,
      state: JSON.parse(JSON.stringify(item.content.state)),
    },
    layout: item.layout && {
      plugin: item.layout.plugin,
      state: JSON.parse(JSON.stringify(item.layout.state)),
    },
    id: v4(),
    rows: item.rows
      ? item.rows.map((row) => ({
          ...row,
          id: v4(),
          cells: row.cells ? row.cells.map(newIds) : undefined,
        }))
      : undefined,
  };
};
export const duplicateCell = (item) => insertCellBelow(newIds(item), item);

export const insertActions = {
  insertCellRightInline,
  insertCellLeftInline,
  insertCellLeftOf,
  insertCellRightOf,
  insertCellAbove,
  insertCellBelow,
  duplicateCell,
  insertCellAtTheEnd,
  insert,
};
