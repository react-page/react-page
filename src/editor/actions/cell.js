export const CELL_UPDATE = 'CELL_UPDATE'
export const CELL_REMOVE = 'CELL_REMOVE'

export const CELL_DRAG_HOVER = 'CELL_DRAG_HOVER'
export const CELL_DRAG = 'CELL_DRAG'
export const CELL_DRAG_CANCEL = 'CELL_DRAG_CANCEL'

export const CELL_INSERT_ABOVE = 'CELL_INSERT_ABOVE'
export const CELL_INSERT_BELOW = 'CELL_INSERT_BELOW'
export const CELL_INSERT_LEFT_OF = 'CELL_INSERT_LEFT_OF'
export const CELL_INSERT_RIGHT_OF = 'CELL_INSERT_RIGHT_OF'
export const CELL_INSERT_INLINE_LEFT = 'CELL_INSERT_INLINE_LEFT'
export const CELL_INSERT_INLINE_RIGHT = 'CELL_INSERT_INLINE_RIGHT'

export const updateCell = ({ id } = {}, data) => ({
  type: CELL_UPDATE,
  id,
  data
})

export const removeCell = ({ id } = {}) => ({
  type: CELL_REMOVE,
  id
})

export const dragCell = ({ id } = {}) => ({
  type: CELL_DRAG,
  id
})

export const cancelCellDrag = ({ id } = {}) => ({
  type: CELL_DRAG_CANCEL,
  id
})

export const draggingCellHover = ({ id: drag } = {}, { id: hover } = {}, level = 0) => ({
  type: CELL_DRAG_HOVER,
  drag,
  hover,
  level
})

