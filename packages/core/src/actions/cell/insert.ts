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

import * as uuid from 'uuid';
import { Cell } from '../../types/editable';
import { Action } from 'redux';

export const CELL_INSERT_ABOVE = 'CELL_INSERT_ABOVE';
export const CELL_INSERT_BELOW = 'CELL_INSERT_BELOW';
export const CELL_INSERT_LEFT_OF = 'CELL_INSERT_LEFT_OF';
export const CELL_INSERT_RIGHT_OF = 'CELL_INSERT_RIGHT_OF';
export const CELL_INSERT_INLINE_LEFT = 'CELL_INSERT_INLINE_LEFT';
export const CELL_INSERT_INLINE_RIGHT = 'CELL_INSERT_INLINE_RIGHT';

const gen = (c: number = 1) => {
  const ret = [];
  for (let i = 0; i <= c; i++) {
    ret.push(uuid.v4());
  }
  return ret;
};

export interface InsertAction extends Action {
  ts: Date;
  item: Partial<Cell>;
  hover: string;
  level: number;
  ids: string[];
}

const insert = (type: string) => (
  item: Partial<Cell>,
  { id: hover, inline, hasInlineNeighbour }: Partial<Cell>,
  level: number = 0,
  ids: Array<string> = []
): InsertAction => {
  let l = level;
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

  return {
    type,
    ts: new Date(),
    item,
    hover,
    level: l,
    ids: ids.length > 0 ? ids : gen(5),
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

export const insertActions = {
  insertCellRightInline,
  insertCellLeftInline,
  insertCellLeftOf,
  insertCellRightOf,
  insertCellAbove,
  insertCellBelow,
  insert,
};
