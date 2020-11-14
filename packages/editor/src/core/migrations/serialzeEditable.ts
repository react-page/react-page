import { CellPlugin } from '../types/plugins';
import { Cell, EditableType, Row } from '../types/editable';

const serializeRow = (r: Row, plugins: CellPlugin[]): Row => {
  return {
    ...r,
    cells: r.cells.map((c) => serializeCell(c, plugins)),
  };
};
const serializeCell = (c: Cell, plugins: CellPlugin[]): Cell => {
  const pluginDef = c.plugin;
  const pluginFound = pluginDef
    ? plugins.find((p) => p.id === pluginDef.id)
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
    rows: c.rows?.map((r) => serializeRow(r, plugins)),
    dataI18n,
  };
};

export const serialzeEditable = (
  { rows, ...rest }: EditableType,
  plugins: CellPlugin[]
) => {
  return {
    ...rest,
    rows: rows.map((c) => serializeRow(c, plugins)),
  };
};
