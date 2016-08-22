// @flow
import type { ComponentizedCell } from 'types/editable'

export const computeStepWidth = ({ rowWidth, steps = 12 }: { rowWidth: number, steps: number }): number => Math.round(rowWidth / steps)

export const widthToSize = ({ stepWidth, steps }: { stepWidth: number, steps: number }, { node: { inline } }: ComponentizedCell, result: { width: number }): number => {
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
