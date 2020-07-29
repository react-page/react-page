import {
  computeSizes,
  computeInlines,
  computeBounds,
  computeResizeable,
} from './sizing';
import {
  optimizeCell,
  optimizeRow,
  optimizeRows,
  optimizeCells,
} from './optimize';
import { computeDropLevels } from './level';
import { Cell, Row } from '../../../types/editable';

export const setAllSizesAndOptimize = (cells: Array<Cell> = []): Array<Cell> =>
  computeInlines(
    computeResizeable(computeBounds(computeSizes(optimizeCells(cells))))
  ).map(
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

      return computeDropLevels(optimizeCell(cell));
    }
  );
