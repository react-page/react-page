export const CELL_HOVER_CELL = 'CELL_HOVER_CELL'
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

export const hoverCellOverCell = (id, hover) =>({
  type: CELL_HOVER_CELL,
  id,
  hover
})

export const removeCell = (id) =>({
  type: CELL_REMOVE,
  id
})
