import { CellPlugin } from '../types';

export const getCellStyle = (plugin: CellPlugin) =>
  plugin?.cellStyle
    ? typeof plugin?.cellStyle === 'function'
      ? plugin?.cellStyle()
      : plugin?.cellStyle
    : {};
