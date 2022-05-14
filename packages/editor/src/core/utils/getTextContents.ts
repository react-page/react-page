import type { Cell, CellPluginList, Row, Value } from '../types';
import { getChildCellPlugins } from './getAvailablePlugins';
import { getCellData } from './getCellData';

type Options = {
  lang: string;
  cellPlugins: CellPluginList;
};
const getTextContentsFromCell = (cell: Cell, options: Options): string[] => {
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
      [] as string[]
    ) ?? []),
    ...(currentPlugin?.getTextContents?.(data) ?? []),
  ];
};
const getTextContentsFromRow = (row: Row, options: Options): string[] => {
  return row.cells.reduce(
    (arr, cell) => [...arr, ...getTextContentsFromCell(cell, options)],
    [] as string[]
  );
};

export const getTextContents = (value: Value, options: Options): string[] => {
  return value.rows.reduce<string[]>(
    (arr, row) => [...arr, ...getTextContentsFromRow(row, options)],
    []
  );
};
