import type { CellPlugin } from '../types';
export const getChildCellPlugins = (
  currentCellPlugins: CellPlugin[],
  cell: {
    pluginId: string;
    data: unknown;
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
  }, [] as CellPlugin[]);
};

export const getAvailablePlugins = (
  rootCellPlugins: CellPlugin[],
  ancestors: {
    pluginId: string;
    data: unknown;
  }[]
) => {
  let currentPlugins = rootCellPlugins;
  for (const ancestor of ancestors) {
    currentPlugins = getChildCellPlugins(currentPlugins, ancestor);
  }
  return currentPlugins;
};
