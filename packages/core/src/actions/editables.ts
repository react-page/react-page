import { Action } from 'redux';
import { EditableType, NewIds } from '../types/editable';
import { generateIds } from './helpers';

export const UPDATE_EDITABLE = 'UPDATE_EDITABLE';

export interface UpdateEditableAction extends Action {
  ts: Date;
  editable: EditableType;
  ids: NewIds;
}

export const updateEditable = (
  editable: EditableType
): UpdateEditableAction => ({
  type: UPDATE_EDITABLE,
  ts: new Date(),
  editable,
  ids: generateIds(),
});
