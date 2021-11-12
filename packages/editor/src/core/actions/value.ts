import type { Action } from 'redux';
import type { Value, NewIds } from '../types/node';
import { generateIds } from './helpers';

export const UPDATE_VALUE = 'UPDATE_VALUE';

export interface UpdateEditableAction extends Action {
  ts: Date;
  value: Value | null;
  ids: NewIds;
}

export const updateValue = (value: Value | null): UpdateEditableAction => ({
  type: UPDATE_VALUE,
  ts: new Date(),
  value,
  ids: generateIds(),
});
