// @flow
import type { Action } from '../types/redux'
import { ActionTypes } from 'redux-undo'

export const undo = (): Action => ({
  type: ActionTypes.UNDO
})

export const redo = (): Action => ({
  type: ActionTypes.REDO
})
