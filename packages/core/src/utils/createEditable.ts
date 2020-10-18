import { v4 } from 'uuid';
import { createCell, PluginsAndLang } from '../actions/cell/insert';
import { EditableType, PartialCell, PartialRow } from '../types/editable';

type PartialEditable = {
  id?: string;
  cells?: PartialCell[];
};
export const createEditable = (
  partial: PartialEditable,
  options: PluginsAndLang
): EditableType => {
  return {
    id: partial.id || v4(),
    cells: partial.cells?.map((c) => createCell(c, options)) ?? [],
    version: '1.0.0',
  };
};
