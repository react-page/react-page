import type { CellPlugin, CellSpacing, DataTType } from '../types';
export declare const getPluginCellSpacing: <DataT extends DataTType>(plugin: CellPlugin<DataT, DataT> | null, data: DataT) => number | CellSpacing | null;
export declare const normalizeCellSpacing: (cellSpacing?: null | number | CellSpacing) => CellSpacing;
//# sourceMappingURL=getCellSpacing.d.ts.map