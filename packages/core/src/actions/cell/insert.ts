import { Action } from 'redux';
import { v4 } from 'uuid';
import {
  Cell,
  NewIds,
  Options,
  PartialCell,
  PartialRow,
  Row,
} from '../../types/editable';
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
export const CELL_INSERT_AS_NEW_ROW = 'CELL_INSERT_AS_NEW_ROW';

type InsertType =
  | typeof CELL_INSERT_ABOVE
  | typeof CELL_INSERT_BELOW
  | typeof CELL_INSERT_LEFT_OF
  | typeof CELL_INSERT_RIGHT_OF
  | typeof CELL_INSERT_INLINE_LEFT
  | typeof CELL_INSERT_INLINE_RIGHT
  | typeof CELL_INSERT_AT_END
  | typeof CELL_INSERT_AS_NEW_ROW;
export interface InsertAction extends Action {
  ts: Date;
  item: Cell;
  hoverId: string;
  level: number;
  ids: NewIds;
  type: InsertType;
}

export type PluginsAndLang = {
  lang: string;
} & Pick<Options, 'plugins'>;

export const createRow = (
  partialRow: PartialRow,
  options: PluginsAndLang
): Row => {
  if (Array.isArray(partialRow)) {
    return {
      id: v4(),
      cells: partialRow.map((c) => createCell(c, options)),
    };
  }
  return {
    id: v4(),
    ...partialRow,
    cells: partialRow.cells?.map((c) => createCell(c, options)),
  };
};

export const createCell = (
  partialCell: PartialCell,
  options: PluginsAndLang
): Cell => {
  const { plugins, lang } = options;
  const fallbackPlugin = plugins[0];
  const pluginId =
    partialCell.plugin &&
    (typeof partialCell.plugin == 'string'
      ? partialCell.plugin
      : partialCell.plugin.id);
  const plugin =
    (pluginId && plugins.find((p) => p.id === pluginId)) ?? fallbackPlugin;

  const partialRows =
    partialCell.rows?.length > 0
      ? partialCell.rows
      : plugin?.createInitialChildren?.() ?? [];

  return {
    id: partialCell.id ?? v4(),
    isDraft: partialCell.isDraft ?? undefined,
    isDraftI18n: partialCell.isDraftI18n ?? {},
    inline: partialCell.inline,
    hoverPosition: partialCell.hoverPosition,
    size: partialCell.size || 12,
    resizable: partialCell.resizable ?? false,
    hasInlineNeighbour: partialCell.hasInlineNeighbour ?? null,
    plugin: plugin
      ? {
          id: plugin.id,
          version: plugin.version,
        }
      : undefined,
    rows: partialRows.map((r) => createRow(r, options)),
    dataI18n: {
      [lang]:
        partialCell?.data ??
        plugin?.createInitialData?.(partialCell) ??
        plugin?.createInitialState?.(partialCell) ??
        null,
      ...(partialCell.dataI18n ?? {}),
    },
  };
};

const insert = <T extends InsertType>(type: T) => (options: PluginsAndLang) => (
  partialCell: PartialCell,
  { id: hoverId, inline, hasInlineNeighbour }: PartialCell,
  level = 0,
  ids: NewIds = null
) => {
  let l = level;

  const cell = createCell(partialCell, options);
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
    item: cell,
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

    const isNew = !partialCell.id;

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

export const insertCellNewAsNewRow = insert(CELL_INSERT_AS_NEW_ROW);

// set new ids recursivly
const newIds = ({ id, ...item }: Cell): Cell => {
  return {
    ...item,
    dataI18n: JSON.parse(JSON.stringify(item.dataI18n)),
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
export const duplicateCell = (options: PluginsAndLang) => (item: Cell) =>
  insertCellBelow(options)(newIds(item), item);

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
