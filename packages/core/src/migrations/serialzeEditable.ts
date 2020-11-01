import { CellPlugin } from '../service/plugin/classes';
import { Cell, EditableType, Row } from '../types/editable';

const serializeRow = (
  { hoverPosition, ...r }: Row,
  plugins: CellPlugin[]
): Row => {
  return {
    ...r,
    cells: r.cells.map((c) => serializeCell(c, plugins)),
  };
};
const serializeCell = (
  { hoverPosition, ...c }: Cell, // FIXME: remove hoverPosition from cell state
  plugins: CellPlugin[]
): Cell => {
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
  { cells, ...rest }: EditableType,
  plugins: CellPlugin[]
) => {
  return {
    ...rest,
    cells: cells.map((c) => serializeCell(c, plugins)),
  };
};
