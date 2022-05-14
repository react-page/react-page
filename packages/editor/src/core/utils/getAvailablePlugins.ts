import type { CellPluginList, DataTType } from '../types';
export const getChildCellPlugins = (
  currentCellPlugins: CellPluginList,
  cell: {
    pluginId?: string | null;
    data: DataTType | null;
  }
) => {
  if (!cell?.pluginId) {
    return currentCellPlugins;
  }
  const plugin = cell.pluginId
    ? currentCellPlugins.find((p) => p.id === cell.pluginId)
    : null;
  if (!plugin?.cellPlugins) {
    return currentCellPlugins;
  }
  const childPlugins = Array.isArray(plugin.cellPlugins)
    ? plugin.cellPlugins
    : plugin.cellPlugins(currentCellPlugins, cell.data);

  return childPlugins.reduceRight((filtered, p) => {
    //omit if already seen
    if (filtered.some((o) => o.id === p.id)) {
      return filtered;
    }
    return [p, ...filtered];
  }, [] as CellPluginList);
};

export const getAvailablePlugins = (
  rootCellPlugins: CellPluginList,
  ancestors: {
    pluginId?: string | null;
    data: DataTType | null;
  }[]
) => {
  let currentPlugins = rootCellPlugins;
  for (const ancestor of ancestors) {
    currentPlugins = getChildCellPlugins(currentPlugins, ancestor);
  }
  return currentPlugins;
};
