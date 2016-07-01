export const isHoveringThis = (state, action) => {
  const { level = 0, hover = {} } = action
  const children = state.rows || state.cells || []
  if (level > 0) {
    return Boolean(children.find((child) => isHoveringThis(child, {...action, level: level - 1})))
  }

  return hover.id === state.id
}
