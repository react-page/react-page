// @flow
import type { Action } from '../types/redux'
import type { Editable } from '../types/editable'

export const UPDATE_EDITABLE = 'UPDATE_EDITABLE'

export const updateEditable = (editable: Editable): Action => ({
  type: UPDATE_EDITABLE,
  ts: new Date(),
  editable
})
