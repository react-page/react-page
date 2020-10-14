import { Cell, EditableType, PluginBase, Row } from '..';

const serializeRow = (r: Row, plugins: PluginBase[]): Row => {
  return {
    ...r,
    cells: r.cells.map((c) => serializeCell(c, plugins)),
  };
};
const serializeCell = (c: Cell, plugins: PluginBase[]): Cell => {
  const pluginDef = c.plugin;
  const pluginFound = pluginDef
    ? plugins.find((p) => p.id === pluginDef.id)
    : null;

  const transformData = (dataIn: unknown) => {
    return pluginFound?.serialize ? pluginFound.serialize(dataIn) : dataIn;
  };
  const dataI18n = Object.keys(c.dataI18n).reduce(
    (acc, lang) => ({
      ...acc,
      [lang]: transformData(c.dataI18n?.[lang]),
    }),
    {}
  );
  return {
    ...c,
    rows: c.rows?.map((r) => serializeRow(r, plugins)) ?? [],
    dataI18n,
  };
};

export const serializePluginData = (
  { cells, ...rest }: EditableType,
  plugins: PluginBase[]
) => {
  return {
    ...rest,
    cells: cells.map((c) => serializeCell(c, plugins)),
  };
};
