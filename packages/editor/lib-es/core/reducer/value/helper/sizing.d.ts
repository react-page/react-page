import type { Cell } from '../../../types/node';
/**
 * Sum up cell sizes: Σ(cell[size]).
 */
export declare const sumSizes: (cells?: Array<Cell>) => number;
/**
 * Computes sizes an inline element was found.
 */
export declare const computeInlines: (cells?: Array<Cell>) => Array<Cell>;
/**
 * Resize cells.
 */
export declare const resizeCells: (cells: Cell[] | undefined, { id, size }: Pick<Cell, 'id' | 'size'>) => Array<Cell>;
/**
 * Balance cell sizes.
 *
 * @param {[...cell]} cells
 * @return {[...cell]}
 */
export declare const computeSizes: (cells?: Array<Cell>) => Array<Cell>;
//# sourceMappingURL=sizing.d.ts.map