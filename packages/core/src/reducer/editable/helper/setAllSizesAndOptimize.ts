import { computeSizes, computeInlines } from './sizing';
import {
  optimizeCell,
  optimizeRow,
  optimizeRows,
  optimizeCells,
} from './optimize';
import { Cell, Row } from '../../../types/editable';

export const setAllSizesAndOptimize = (cells: Array<Cell> = []): Array<Cell> =>
  computeInlines(computeSizes(optimizeCells(cells))).map(
    (cell: Cell): Cell => {
      if (cell.rows) {
        cell.rows = optimizeRows(cell.rows).map(
          (r: Row): Row => {
            const optimized = optimizeRow(r);
            if (optimized.cells) {
              optimized.cells = setAllSizesAndOptimize(optimized.cells);
            }
            return optimized;
          }
        );
      }

      return optimizeCell(cell);
    }
  );
