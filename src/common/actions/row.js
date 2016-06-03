export const CELL_HOVER_ROW = 'CELL_HOVER_ROW'
export const ROW_DROP = 'CELL_DROP'
export const ROW_CANCEL_DRAG = 'CELL_CANCEL_DRAG'
export const ROW_DRAG = 'CELL_DRAG'
export const ROW_REMOVE = 'CELL_REMOVE'

export const hoverCellOverRow = (id, hover) =>({
  type: CELL_HOVER_ROW,
  id,
  hover
})