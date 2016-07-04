import { computeAndDispatchHover, computeAndDispatchInsert } from './input'

export const target = {
  hover: (props, monitor, component) => {
    const item = monitor.getItem()

    if (item.id === props.id) {
      // If hovering over itself, do nothing
      return
    } else if (!monitor.isOver({ shallow: true })) {
      // If hovering over ancestor cell, do nothing (we are going to propagate later in the tree anyways)
      return
    } else if (!props.id) {
      // If hovering over something that isn't a cell or hasn't an id, do nothing. Should be an edge case
      console.warn('Canceled cell.drop.target.hover: no id given.', props, item)
      return
    }

    computeAndDispatchInsert(props, item, monitor, component)
  },

  drop(props, monitor, component) {
    const item = monitor.getItem()

    // If the item being dropped on itself do nothing
    if (item.id === props.id) {
      props.cancelCellDrag(item.id)
      return
    }

    computeAndDispatchHover(props, item, monitor, component)
  }
}

export const source = {
  beginDrag(props) {
    // Beginn draging the cell
    props.dragCell(props)
    return props
  },

  endDrag({ cancelCellDrag, id }, monitor) {
    if (monitor.didDrop()) {
      // If the item drop occurred deeper down the tree, don't do anything
      return
    }

    // If drag ended but drop did not occur, cancel dragging
    cancelCellDrag(id)
  }
}

export const connect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true })
})

export const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})
