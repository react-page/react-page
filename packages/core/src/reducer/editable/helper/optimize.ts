import { isEmpty } from './empty';
import { Row, Cell } from '../../../types/editable';
import { removeUndefinedProps } from '../../../utils/removeUndefinedProps';

export const flatten = function <T>(c: Array<T>, n: Array<T>): Array<T> {
  return [...c, ...n];
};

export const optimizeCells = (cells: Array<Cell> = []): Array<Cell> =>
  cells.filter((c) => !isEmpty(c));

export const optimizeRows = (rows: Array<Row> = []): Array<Row> =>
  rows.filter((c) => !isEmpty(c));

export const optimizeCell = (cell: Cell): Cell => {
  const { rows, ...rest } = cell;
  const optimized = {
    ...rest,
    rows: rows
      ?.map(
        (r: Row): Array<Row> => {
          const { cells = [] } = r;
          if (cells.length !== 1) {
            return [r];
          }

          const { rows: cellRows, plugin }: Cell = cells[0];
          if (cellRows?.length > 0 && !plugin) {
            return cellRows;
          }
          return [r];
        }
      )
      .reduce(flatten, []),
  };

  return removeUndefinedProps(optimized);
};

export const optimizeRow = ({ cells, ...other }: Row): Row =>
  removeUndefinedProps({
    ...other,
    cells: cells
      ?.map((c: Cell) => {
        const { rows = [], size } = c;
        if (rows.length !== 1 || c.plugin) {
          return [c];
        }

        const { cells: rowCells = [] }: Row = rows[0];
        if (rowCells.length === 1) {
          return rowCells.map((r) => ({ ...r, size }));
        }

        return [c];
      })
      .reduce(flatten, []),
  });
