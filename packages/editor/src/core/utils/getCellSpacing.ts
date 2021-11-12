import type { CellPlugin, CellSpacing, DataTType } from '../types';

export const getPluginCellSpacing = <DataT extends DataTType>(
  plugin: CellPlugin<DataT> | null,
  data: DataT
): number | CellSpacing | null =>
  plugin?.cellSpacing
    ? typeof plugin?.cellSpacing === 'function'
      ? plugin?.cellSpacing(data)
      : plugin?.cellSpacing
    : null;

export const normalizeCellSpacing = (
  cellSpacing: null | number | CellSpacing = 0
): CellSpacing => {
  if (!cellSpacing) {
    return { x: 0, y: 0 };
  }
  if (['number', 'string'].indexOf(typeof cellSpacing) !== -1) {
    return { x: +cellSpacing || 0, y: +cellSpacing || 0 };
  } else {
    return {
      x: +(cellSpacing as CellSpacing).x || 0,
      y: +(cellSpacing as CellSpacing).y || 0,
    };
  }
};
