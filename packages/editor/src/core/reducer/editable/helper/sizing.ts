import { Cell } from '../../../types/editable';
import deepEquals from '../../../utils/deepEquals';

const MAX_CELLS_PER_ROW = 12;

/**
 * Sum up cell sizes: Σ(cell[size]).
 */
export const sumSizes = (cells: Array<Cell> = []): number =>
  cells.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ size: p = 99, inline: a }: any, { size: c = 99, inline: b }: any) => ({
      size: (a ? 0 : 1) * p + (b ? 0 : 1) * c,
    }),
    { size: 0 }
  ).size;

/**
 * Computes sizes an inline element was found.
 */
export const computeInlines = (cells: Array<Cell> = []): Array<Cell> => {
  const doit = () => {
    if (cells.length !== 2 || !cells[0].inline) {
      return cells.map(({ hasInlineNeighbour, ...c }: Cell) => ({
        ...c,
        inline: null,
      }));
    }

    return [
      {
        ...cells[0],

        size: cells[0].size || Math.round(MAX_CELLS_PER_ROW / 2),
      },
      {
        ...cells[1],
        size: 12,
        hasInlineNeighbour: cells[0].id,
      },
    ];
  };
  const result = doit();
  // FIXME: this function is run on every action but is a noop in most casses
  // however this will create new cells all the time, breaking memoization
  // workaround is to do not return new instances if nothing's changed
  if (deepEquals(cells, result)) {
    return cells;
  }
  return result;
};

/**
 * Resize cells.
 */
export const resizeCells = (
  cells: Array<Cell> = [],
  { id, size }: Cell
): Array<Cell> => {
  let prev = 0;
  return cells.map((c: Cell) => {
    if (prev > 0) {
      const ret = { ...c, size: c.size + prev - size };
      prev = 0;
      return ret;
    } else if (id === c.id) {
      if (!c.inline) {
        prev = c.size;
      }
      return { ...c, size };
    }
    return c;
  });
};

/**
 * Balance cell sizes.
 *
 * @param {[...cell]} cells
 * @return {[...cell]}
 */
export const computeSizes = (cells: Array<Cell> = []): Array<Cell> => {
  const total = sumSizes(cells);
  if (total === MAX_CELLS_PER_ROW) {
    return cells;
  }

  const count = cells.length;
  const sizePerCell = Math.floor(MAX_CELLS_PER_ROW / count);
  const spaceLeft = MAX_CELLS_PER_ROW - sizePerCell * (count - 1);
  return cells.map((c: Cell, k: number) => ({
    ...c,
    size: k === count - 1 ? spaceLeft : sizePerCell,
  }));
};
