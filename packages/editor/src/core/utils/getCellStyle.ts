import type { CellPlugin } from '../types';

export const getCellStyle = (plugin: CellPlugin, data: unknown) =>
  plugin?.cellStyle
    ? typeof plugin?.cellStyle === 'function'
      ? plugin?.cellStyle(data)
      : plugin?.cellStyle
    : undefined;
