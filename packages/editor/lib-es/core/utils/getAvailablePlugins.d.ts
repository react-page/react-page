import type { CellPluginList, DataTType } from '../types';
export declare const getChildCellPlugins: (currentCellPlugins: CellPluginList, cell: {
    pluginId?: string | null;
    data: DataTType | null;
}) => CellPluginList;
export declare const getAvailablePlugins: (rootCellPlugins: CellPluginList, ancestors: {
    pluginId?: string | null;
    data: DataTType | null;
}[]) => CellPluginList;
//# sourceMappingURL=getAvailablePlugins.d.ts.map