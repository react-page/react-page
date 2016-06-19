export const CELL_HOVER_CELL = 'CELL_HOVER_CELL'
export const CELL_DROP = 'CELL_DROP'
export const CELL_CANCEL_DRAG = 'CELL_CANCEL_DRAG'
export const CELL_DRAG = 'CELL_DRAG'
export const CELL_REMOVE = 'CELL_REMOVE'

export const CELL_FOCUS = 'CELL_FOCUS'
export const CELL_UPDATE = 'CELL_UPDATE'
export const CELL_RESIZE = 'CELL_RESIZE'
export const CELL_BLUR = 'CELL_BLUR'

export const resizeCell = (id, size) =>({
  type: CELL_RESIZE,
  id,
  size
})

export const blurCell = (id) =>({
  type: CELL_BLUR,
  id
})

export const updateCell = (id, data) =>({
  type: CELL_UPDATE,
  id,
  data
})

export const focusCell = (id) =>({
  type: CELL_FOCUS,
  id
})

export const dragCell = (id) =>({
  type: CELL_DRAG,
  id
})

export const cancelCellDrag = (id) =>({
  type: CELL_CANCEL_DRAG,
  id
})

export const dropCell = ({ hover, item, level, position }) =>({
  type: CELL_DROP,
  hover,
  item,
  position,
  level
})

export const hoverCellOverCell = ({ item, hover, position, level }) =>({
  type: CELL_HOVER_CELL,
  item,
  hover,
  position,
  level
})

export const removeCell = (id) =>({
  type: CELL_REMOVE,
  id
})
