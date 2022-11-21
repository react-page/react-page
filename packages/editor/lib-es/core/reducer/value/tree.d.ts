import type { AnyAction } from 'redux';
import type { Cell, Row } from '../../types/node';
export declare const cells: (state: Cell[] | undefined, action: AnyAction, depth?: number) => Cell[];
export declare const rows: (s: Row[] | undefined, a: AnyAction, depth?: number) => Row[];
//# sourceMappingURL=tree.d.ts.map