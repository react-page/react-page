import { computeAndDispatchHover, computeAndDispatchInsert } from 'src/editor/service/hover/input'
import throttle from 'lodash.throttle'
import { isProduction } from 'src/editor/const'

export const target = {
  hover: throttle((props, monitor, component) => {
    const item = monitor.getItem()

    console.log(component, props, item)
    if (!item) {
      return
    } else if (!monitor.isOver({ shallow: true })) {
      return
    } else if (props.ancestors.indexOf(item.id) > -1) {
      // If hovering over a child of itself
      return
    } else if (!component) {
      return
    } else if (!props.id) {
      // If hovering over something that isn't a cell or hasn't an id, do nothing. Should be an edge case
      console.warn('Canceled cell.drop.target.hover: no id given.', props, item)
      return
    }

    computeAndDispatchHover(props, monitor, component)
  }, isProduction ? 80 : 300, { leading: false }),

  canDrop: ({ id, ancestors, isOverCurrent }, monitor) => {
    const item = monitor.getItem()
    return !(item.id === id || ancestors.indexOf(item.id) !== -1)
  },

  drop(props, monitor, component) {
    const item = monitor.getItem()

    console.log(component)

    if (monitor.didDrop()) {
      // If the item drop occurred deeper down the tree, don't do anything
      return
    } else if (!component) {
      return
    } else if (props.ancestors.indexOf(item.id) > -1) {
      // If hovering over a child of itself
      props.cancelCellDrag(item.id)
      return
    }

    computeAndDispatchInsert(props, monitor, component)
  }
}

export const connect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({ shallow: true })
})
