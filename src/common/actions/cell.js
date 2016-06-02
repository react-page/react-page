export const CELL_HOVER = 'CELL_HOVER'
export const CELL_DROP = 'CELL_DROP'
export const CELL_CANCEL_DRAG = 'CELL_CANCEL_DRAG'
export const CELL_DRAG = 'CELL_DRAG'
export const CELL_REMOVE = 'CELL_REMOVE'

export const dragCell = (id) =>({
  type: CELL_DRAG,
    id
})

export const cancelCellDrag = (id) =>({
  type: CELL_CANCEL_DRAG,
  id
})

export const dropCell = (id) =>({
  type: CELL_DROP,
  id
})

export const hoverCellOver = (id, over) =>({
  type: CELL_HOVER,
  id,
  over
})

export const removeCell = (id) =>({
  type: CELL_REMOVE,
  id
})
