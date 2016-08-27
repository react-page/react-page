// @flow
import type { Action } from 'types/redux'

export const undo = (id: string): Action => ({
  type: `UNDO/${id}`
})

export const redo = (id: string): Action => ({
  type: `REDO/${id}`
})
