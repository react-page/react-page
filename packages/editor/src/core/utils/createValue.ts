import type { PluginsAndLang } from '../actions/cell/insert';
import { createRow } from '../actions/cell/insert';
import { CURRENT_EDITABLE_VERSION } from '../migrations/EDITABLE_MIGRATIONS';
import type { Value, PartialRow } from '../types/node';
import { createId } from './createId';

type PartialValue = {
  id?: string;
  rows?: PartialRow[];
};
export const createValue = (
  partial: PartialValue,
  options: PluginsAndLang
): Value => {
  return {
    id: partial.id || createId(),
    rows: partial.rows?.map((c) => createRow(c, options)) ?? [],
    version: CURRENT_EDITABLE_VERSION,
  };
};
