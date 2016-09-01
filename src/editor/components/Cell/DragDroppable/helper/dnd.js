// @flow
import { computeAndDispatchHover, computeAndDispatchInsert } from 'src/editor/service/hover/input'
import throttle from 'lodash.throttle'
import { isProduction } from 'src/editor/const'
import type { ComponentizedCell } from 'types/editable'

let last: {hover: string, drag: string} = { hover: '', drag: '' }

const clear = (hover: ComponentizedCell, drag: string) => {
  if (hover.id === last.hover && drag === last.drag) {
    return
  }
  last = { hover: hover.id, drag }
  hover.clearHover()
}

export const target = {
  hover: throttle((hover: ComponentizedCell, monitor: Object, component: Object) => {
    const drag: ComponentizedCell = monitor.getItem()

    if (!drag) {
      // item undefined, happens when throttle triggers after drop
      return
    } else if (drag.id === hover.id) {
      // If hovering over itself, do nothing
      clear(hover, drag.id)
      return
    } else if (!monitor.isOver({ shallow: true })) {
      // If hovering over ancestor cell, do nothing (we are going to propagate later in the tree anyways)
      return
    } else if (hover.ancestors.indexOf(drag.id) > -1) {
      // If hovering over a child of itself
      clear(hover, drag.id)
      return
    } else if (!hover.id) {
      // If hovering over something that isn't a cell or hasn't an id, do nothing. Should be an edge case
      console.warn('Canceled cell drop, no id given.', hover, drag)
      return
    }

    last = { hover: hover.id, drag: drag.id }
    computeAndDispatchHover(hover, monitor, component)
  }, isProduction ? 30 : 40, { leading: false }),

  canDrop: ({ id, ancestors }: ComponentizedCell, monitor: Object) => {
    const item = monitor.getItem()
    return item.id !== id && ancestors.indexOf(item.id) === -1
  },

  drop(hover: ComponentizedCell, monitor: Object, component: Object) {
    const drag = monitor.getItem()

    if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
      // If the item drop occurred deeper down the tree, don't do anything
      return
    } else if (drag.id === hover.id) {
      // If the item being dropped on itself do nothing
      hover.cancelCellDrag(drag.id)
      return
    } else if (hover.ancestors.indexOf(drag.id) > -1) {
      // If hovering over a child of itself, don't propagate further
      hover.cancelCellDrag(drag.id)
      return
    }

    last = { hover: hover.id, drag: drag.id }
    computeAndDispatchInsert(hover, monitor, component)
  }
}

export const source = {
  beginDrag(props: ComponentizedCell) {
    // Beginn dragging the cell
    props.dragCell(props.id)
    return {
      ...props,
      // we do not want to pass down the react children or we will risk circular dependencies.
      children: null,
      node: {
        ...props.node,
        rows: props.rawNode().rows
      }
    }
  },

  endDrag({ cancelCellDrag, id }: ComponentizedCell, monitor: Object) {
    if (monitor.didDrop()) {
      // If the item drop occurred deeper down the tree, don't do anything
      return
    }

    // If drag ended but drop did not occur, cancel dragging
    cancelCellDrag(id)
  }
}

export const connect = (connect: Object, monitor: Object) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true })
})

export const collect = (connect: Object, monitor: Object) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})
