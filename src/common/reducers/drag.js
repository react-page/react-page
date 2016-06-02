export const rows = (
  state = {
    item
  },
  action
) => {
  switch (action.type) {
    default:
      return state.map((item) => row(item, action))
  }
}
