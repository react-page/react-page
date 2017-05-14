// @flow

/**
 * Check if this item is currently being hovered.
 */
export const isHoveringThis = (state: Object = {}, action: Object): boolean => {
  const { level = 0, hover = null } = action
  const children = state.rows || state.cells || []
  if (level > 0) {
    return Boolean(
      children.find((child: any) =>
        isHoveringThis(child, { ...action, level: level - 1 })
      )
    )
  }

  return hover === state.id
}
