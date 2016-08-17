export const computeStepWidth = ({ rowWidth, steps = 12 }) => Math.round(rowWidth / steps)

export const widthToSize = ({ stepWidth, steps }, { node: { inline } }, result) => {
  let size = Math.round(result.width / stepWidth)
  if (inline === 'right') {
    size = steps - size
  }

  if (size > steps) {
    size = steps
  } else if (size < 1) {
    size = 1
  }

  return size
}
