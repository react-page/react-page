import { Action } from 'redux';
import { Value, NewIds } from '../types/editable';
import { generateIds } from './helpers';

export const UPDATE_EDITABLE = 'UPDATE_EDITABLE';

export interface UpdateEditableAction extends Action {
  ts: Date;
  editable: Value;
  ids: NewIds;
}

export const updateEditable = (editable: Value): UpdateEditableAction => ({
  type: UPDATE_EDITABLE,
  ts: new Date(),
  editable,
  ids: generateIds(),
});
