import type { Cell, CellPlugin, Row, Value } from '../types';
import { getChildCellPlugins } from './getAvailablePlugins';
import { getCellData } from './getCellData';

type Options = {
  lang: string;
  cellPlugins: CellPlugin[];
};
const getTextContentsFromCell = (cell: Cell, options: Options) => {
  const data = getCellData(cell, options.lang);
  const childOptions = {
    ...options,
    cellPlugins: getChildCellPlugins(options.cellPlugins, {
      pluginId: cell.plugin?.id,
      data,
    }),
  };
  const currentPlugin = cell.plugin
    ? options.cellPlugins?.find((c) => c.id === cell.plugin?.id)
    : null;

  return [
    ...(cell.rows?.reduce(
      (arr, row) => [...arr, ...getTextContentsFromRow(row, childOptions)],
      []
    ) ?? []),
    ...(currentPlugin?.getTextContents?.(data) ?? []),
  ];
};
const getTextContentsFromRow = (row: Row, options: Options) => {
  return row.cells.reduce(
    (arr, cell) => [...arr, ...getTextContentsFromCell(cell, options)],
    []
  );
};

export const getTextContents = (value: Value, options: Options) => {
  return value.rows.reduce(
    (arr, row) => [...arr, ...getTextContentsFromRow(row, options)],
    []
  );
};
