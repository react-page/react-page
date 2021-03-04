import { CellPlugin } from '../types';

export const getPluginCellSpacing = <DataT>(
  plugin: CellPlugin<DataT>,
  data: DataT
) =>
  plugin?.cellSpacing
    ? typeof plugin?.cellSpacing === 'function'
      ? plugin?.cellSpacing(data)
      : plugin?.cellSpacing
    : undefined;

export const normalizeCellSpacing = (
  cellSpacing: number | [number, number]
): [number, number] => {
  if (!Array.isArray(cellSpacing)) {
    return [+cellSpacing || 0, +cellSpacing || 0];
  } else {
    return [+cellSpacing[0] || 0, +cellSpacing[1] || 0];
  }
};
