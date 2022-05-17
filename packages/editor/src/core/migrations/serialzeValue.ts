import type { CellPluginList } from '../types/plugins';
import type { Cell, Value, Row } from '../types/node';

const serializeRow = (r: Row, cellPlugins: CellPluginList): Row => {
  return {
    ...r,
    cells: r.cells.map((c) => serializeCell(c, cellPlugins)),
  };
};
const serializeCell = (c: Cell, cellPlugins: CellPluginList): Cell => {
  const pluginDef = c.plugin;
  const pluginFound = pluginDef
    ? cellPlugins.find((p) => p.id === pluginDef.id)
    : null;

  const transformData = (dataIn: unknown) => {
    return pluginFound?.serialize ? pluginFound.serialize(dataIn) : dataIn;
  };
  const dataI18n = c.dataI18n
    ? Object.keys(c.dataI18n).reduce(
        (acc, lang) => ({
          ...acc,
          [lang]: transformData(c.dataI18n?.[lang]),
        }),
        {}
      )
    : null;

  return {
    ...c,
    rows: c.rows?.map((r) => serializeRow(r, cellPlugins)),
    dataI18n: dataI18n ?? {},
  };
};

export const serialzeValue = (
  { rows, ...rest }: Value,
  plugins: CellPluginList
) => {
  return {
    ...rest,
    rows: rows.map((c) => serializeRow(c, plugins)),
  };
};
