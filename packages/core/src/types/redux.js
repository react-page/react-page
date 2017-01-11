export type Action = { type: string }
export type Store = {
  dispatch(action: Action): Action
}
