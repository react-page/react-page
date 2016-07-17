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
      return
    } else if (item.id === props.id) {
      clear(props, item)
      return
    } else if (!monitor.isOver({ shallow: true })) {
      return
    } else if (props.ancestors.indexOf(item.id) > -1) {
      // If hovering over a child of itself
      clear(props, item)
      return
    } else if (!props.id) {
      // If hovering over something that isn't a cell or hasn't an id, do nothing. Should be an edge case
      console.warn('Canceled cell.drop.target.hover: no id given.', props, item)
      return
    }

    computeAndDispatchHover(props, monitor, component, '10x10-no-inline')
  }, isProduction ? 5 : 10, { leading: false }),

  canDrop: ({ id, ancestors, isOverCurrent }, monitor) => {
    const item = monitor.getItem()
    return item.id !== id || ancestors.indexOf(item.id) === -1
  },

  drop(props, monitor, component) {
    const item = monitor.getItem()

    if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
      // If the item drop occurred deeper down the tree, don't do anything
      return
    } else if (props.ancestors.indexOf(item.id) > -1) {
      // If hovering over a child of itself
      props.cancelCellDrag(item.id)
      return
    } else if (item.id === props.id) {
      props.cancelCellDrag(item.id)
      return
    }

    computeAndDispatchInsert(props, monitor, component, '10x10-no-inline')
  }
}

export const connect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({ shallow: true })
})
