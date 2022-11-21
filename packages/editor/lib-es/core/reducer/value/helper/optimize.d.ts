import type { Row, Cell } from '../../../types/node';
export declare const flatten: <T>(c: T[], n: T[]) => T[];
export declare const optimizeCells: (cells?: Array<Cell>) => Array<Cell>;
export declare const optimizeRows: (rows?: Array<Row>) => Array<Row>;
export declare const optimizeCell: (cell: Cell) => Cell;
export declare const optimizeRow: ({ cells, ...other }: Row) => Row;
//# sourceMappingURL=optimize.d.ts.map