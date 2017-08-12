// @flow
import { editable, editables } from './editable'

export const selectors = (store: any) => ({
  editable: (id: string) => editable(store.getState(), { id }),
  editables: (id: string) => editables(store.getState())
})
