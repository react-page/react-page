import { Cell, Row, Levels } from '../../../types/editable';

const computeRowLevels = (a: Row, b?: Levels): Row => {
  const { cells = [], ...props } = a;
  const { left = 0, right = 0, above = 0, below = 0 } = b || {};
  let newCells: Cell[] = [];
  if (cells.length) {
    newCells = cells.map((c: Cell, k: number) =>
      computeCellLevels(c, {
        left: k === 0 ? left + 1 : 0,
        right: k === cells.length - 1 ? right + 1 : 0,
        above: above + 1,
        below: below + 1,
      })
    );
  }

  delete props.levels;
  return {
    levels: { left, right, above, below },
    ...props,
    ...{ cells: newCells },
  };
};

const computeCellLevels = (a: Cell, b?: Levels): Cell => {
  const { rows = [], ...props } = a;
  const { left = 0, right = 0, above = 0, below = 0 } = b || {};
  let newRows: Row[];
  if (rows.length) {
    newRows = rows.map((r: Row, k: number) =>
      computeRowLevels(r, {
        left: left + 1,
        right: right + 1,
        above: k === 0 ? above + 1 : 0,
        below: k === rows.length - 1 ? below + 1 : 0,
      })
    );
  }

  delete props.levels; // eslint-disable-line prefer-reflect
  return {
    levels: { left, right, above, below },
    ...props,
    ...{ rows: newRows },
  };
};

export const computeDropLevels = (c: Cell): Cell => computeCellLevels(c);
