const computeDropArea = (props, monitor, component) => {
  const treshold = 0.40
  const mousePosition = monitor.getClientOffset()
  const componentPosition = findDOMNode(component).getBoundingClientRect()
  const componentHeight = (componentPosition.bottom - componentPosition.top)
  const componentWidth = (componentPosition.right - componentPosition.left)
  const relVer = (mousePosition.y - componentPosition.top) / componentHeight
  const relHor = (mousePosition.x - componentPosition.left) / componentWidth

  let position = 'center'
  let level = 0
  if (relVer <= treshold || relVer >= 1 - treshold) {
    if (componentPosition.bottom - mousePosition.y > componentHeight / 2) {
      level = (mousePosition.y - componentPosition.top) / (componentHeight * treshold / props.parents.length)
      position = 'top'
    } else {
      level = (componentPosition.bottom - mousePosition.y) / (componentHeight * treshold / props.parents.length)
      position = 'bottom'
    }
    level = props.parents.length - Math.round(level)
  } else if (relHor <= treshold || relHor >= 1 - treshold) {
    if (componentPosition.right - mousePosition.x > componentWidth / 2) {
      level = (mousePosition.x - componentPosition.left) / (componentWidth * treshold / props.parents.length)
      position = 'left'
    } else {
      level = (componentPosition.right - mousePosition.x) / (componentWidth * treshold / props.parents.length)
      position = 'right'
    }
    level = props.parents.length - Math.round(level)
  }
  return { level, position }
}
