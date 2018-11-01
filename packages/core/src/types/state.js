import { Editables } from './editable'
import { Display } from './display'

export type RootState = {
  ory: {
    editables: Editables,
    display: Display,
    focus: string,
    settings: { [string]: any }
  }
}
