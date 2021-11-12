import type { Cell } from '../types';

export const getCellData = (
  cell: null | Pick<Cell, 'dataI18n'>,
  lang: string
) => {
  const dataI18n = cell?.dataI18n;

  return (
    dataI18n?.[lang] ??
    // find first non-empty
    dataI18n?.[Object.keys(dataI18n).find((l) => dataI18n[l]) ?? 'default'] ??
    {}
  );
};
