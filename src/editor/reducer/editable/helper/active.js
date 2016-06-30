const isActive = ({ action, e = {}, level = 0 }) => {
  const children = e.rows || e.cells || []
  if (level > 0) {
    return Boolean(children.find((child) => isActive({
      action,
      e: child,
      level: level - 1
    })))
  }
  return action.hover.id === e.id
}

const isCellActive = ({ action, cell = {}, level = 0 }) => {
  if (level > 0) {
    return cell.rows.filter((r) => r.cells.filter((c) => isCellActive({
      action,
      cell: c,
      level: level - 2
    })).length > 0).length > 0
  }
  return action.hover.id === cell.id
}
