import type { CellPluginList } from '../types/plugins';
import type { Value, Row } from '../types/node';
export declare const serialzeValue: ({ rows, ...rest }: Value, plugins: CellPluginList) => {
    rows: Row[];
    id: string;
    version: number;
};
//# sourceMappingURL=serialzeValue.d.ts.map