import { computeSizes, computeInlines } from './sizing';
import { optimizeRow, optimizeRows, optimizeCells } from './optimize';
import { Row } from '../../../types/editable';

export const setAllSizesAndOptimize = (rows: Array<Row> = []): Array<Row> =>
  optimizeRows(rows).map(
    (r: Row): Row => {
      const optimized = optimizeRow(r);
      if (optimized.cells) {
        optimized.cells = computeInlines(
          computeSizes(
            optimizeCells(
              optimized.cells.map((cell) => ({
                ...cell,
                rows: cell.rows ? setAllSizesAndOptimize(cell.rows) : undefined,
              }))
            )
          )
        );
      }
      return optimized;
    }
  );
