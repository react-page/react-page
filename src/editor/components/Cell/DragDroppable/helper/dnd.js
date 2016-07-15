import { computeAndDispatchHover, computeAndDispatchInsert } from 'src/editor/service/hover/input'
import throttle from 'lodash.throttle'
import { isProduction } from 'src/editor/const'

let last = {
  props: {},
  item: {}
}

const clear = (props = {}, item = {}) => {
  if (props.id === last.props.id && item.id === last.item.id) {
    return
  }
  last = { props, item }
  props.clearHover(item)
}

export const target = {
  hover: throttle((props, monitor, component) => {
    const item = monitor.getItem()

    if (!item) {
      // item undefined, happens when throttle triggers after drop
      return
    } else if (item.id === props.id) {
      // If hovering over itself, do nothing
      clear(props, item)
      return
    } else if (!monitor.isOver({ shallow: true })) {
      // If hovering over ancestor cell, do nothing (we are going to propagate later in the tree anyways)
      return
    } else if (props.ancestors.indexOf(item.id) > -1) {
      // If hovering over a child of itself
      clear(props, item)
      return
    } else if (!props.id) {
      // If hovering over something that isn't a cell or hasn't an id, do nothing. Should be an edge case
      console.warn('Canceled cell drop, no id given.', props, item)
      return
    }

    computeAndDispatchHover(props, monitor, component)
  }, isProduction ? 30 : 300, { leading: false }),

  canDrop: ({ id, ancestors }, monitor) => {
    const item = monitor.getItem()
    return item.id !== id && ancestors.indexOf(item.id) === -1
  },

  drop(props, monitor, component) {
    const item = monitor.getItem()

    if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
      // If the item drop occurred deeper down the tree, don't do anything
      return
    } else if (item.id === props.id) {
      // If the item being dropped on itself do nothing
      props.cancelCellDrag(item.id)
      return
    } else if (props.ancestors.indexOf(item.id) > -1) {
      // If hovering over a child of itself, don't propagate further
      props.cancelCellDrag(item.id)
      return
    }

    computeAndDispatchInsert(props, monitor, component)
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
