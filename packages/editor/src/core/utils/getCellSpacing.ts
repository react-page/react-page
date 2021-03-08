import { CellPlugin, CellSpacing } from '../types';

export const getPluginCellSpacing = <DataT>(
  plugin: CellPlugin<DataT>,
  data: DataT
): number | CellSpacing | undefined =>
  plugin?.cellSpacing
    ? typeof plugin?.cellSpacing === 'function'
      ? plugin?.cellSpacing(data)
      : plugin?.cellSpacing
    : undefined;

export const normalizeCellSpacing = (
  cellSpacing?: number | CellSpacing
): CellSpacing => {
  if (!cellSpacing || ['number', 'string'].indexOf(typeof cellSpacing) !== -1) {
    return { x: +cellSpacing || 0, y: +cellSpacing || 0 };
  } else {
    return {
      x: +(cellSpacing as CellSpacing).x || 0,
      y: +(cellSpacing as CellSpacing).y || 0,
    };
  }
};
