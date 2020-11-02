import { v4 } from 'uuid';
import { createRow, PluginsAndLang } from '../actions/cell/insert';
import { CURRENT_EDITABLE_VERSION } from '../migrations/EDITABLE_MIGRATIONS';
import { EditableType, PartialRow } from '../types/editable';

type PartialEditable = {
  id?: string;
  rows?: PartialRow[];
};
export const createEditable = (
  partial: PartialEditable,
  options: PluginsAndLang
): EditableType => {
  return {
    id: partial.id || v4(),
    rows: partial.rows?.map((c) => createRow(c, options)) ?? [],
    version: CURRENT_EDITABLE_VERSION,
  };
};
