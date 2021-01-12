import { CellPlugin } from '../types/plugins';
import { Cell, Value, Row } from '../types/node';

const serializeRow = (r: Row, cellPlugins: CellPlugin[]): Row => {
  return {
    ...r,
    cells: r.cells.map((c) => serializeCell(c, cellPlugins)),
  };
};
const serializeCell = (c: Cell, cellPlugins: CellPlugin[]): Cell => {
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
    dataI18n,
  };
};

export const serialzeValue = (
  { rows, ...rest }: Value,
  plugins: CellPlugin[]
) => {
  return {
    ...rest,
    rows: rows.map((c) => serializeRow(c, plugins)),
  };
};
