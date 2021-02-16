import { createRow, PluginsAndLang } from '../actions/cell/insert';
import { CURRENT_EDITABLE_VERSION } from '../migrations/EDITABLE_MIGRATIONS';
import { Value, PartialRow } from '../types/node';
import { createId } from './createId';

type PartialEditable = {
  id?: string;
  rows?: PartialRow[];
};
export const createEditable = (
  partial: PartialEditable,
  options: PluginsAndLang
): Value => {
  return {
    id: partial.id || createId(),
    rows: partial.rows?.map((c) => createRow(c, options)) ?? [],
    version: CURRENT_EDITABLE_VERSION,
  };
};
