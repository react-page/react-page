// @flow
import type { Row } from '../../../types/editable'

export const computeRow = ({ cells = [], ...other }: Row): Row => ({
  ...other,
  cells,
  hasInlineChildren: Boolean(cells.length === 2 && Boolean(cells[0].inline))
})
