// @flow
import throttle from 'lodash.throttle'

import { computeAndDispatchHover, computeAndDispatchInsert } from '../../../service/hover/input'
import type { Monitor, Connector } from '../../../types/react-dnd'
import type { ComponentizedRow } from '../../../types/editable'
import { delay } from '../../../helper/throttle'
import logger from '../../../service/logger'

let last: {hover: string, drag: string} = {
  hover: '',
  drag: ''
}

const clear = (hover: ComponentizedRow, drag: string) => {
  if (hover.id === last.hover && drag === last.drag) {
    return
  }
  last = { hover: hover.id, drag }
  hover.clearHover(drag)
}

export const target = {
  hover: throttle((hover: ComponentizedRow, monitor: Monitor, component: Object) => {
    const drag = monitor.getItem()

    if (!drag) {
      return
    } else if (drag.id === hover.id) {
      clear(hover, drag.id)
      return
    } else if (!monitor.isOver({ shallow: true })) {
      return
    } else if (hover.ancestors.indexOf(drag.id) > -1) {
      // If hovering over a child of itself
      clear(hover, drag.id)
      return
    } else if (!hover.id) {
      // If hovering over something that isn't a cell or hasn't an id, do nothing. Should be an edge case
      logger.warn('Canceled cell.drop.target.hover: no id given.', hover, drag)
      return
    }

    computeAndDispatchHover(hover, monitor, component, '10x10-no-inline')
  }, delay, { leading: false }),

  canDrop: ({ id, ancestors }: ComponentizedRow, monitor: Monitor) => {
    const item = monitor.getItem()
    return item.id !== id || ancestors.indexOf(item.id) === -1
  },

  drop(hover: ComponentizedRow, monitor: Monitor, component: Object) {
    const drag = monitor.getItem()

    if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
      // If the item drop occurred deeper down the tree, don't do anything
      return
    } else if (hover.ancestors.indexOf(drag.id) > -1) {
      // If hovering over a child of itself
      hover.cancelCellDrag(drag.id)
      return
    } else if (drag.id === hover.id) {
      hover.cancelCellDrag(drag.id)
      return
    }

    computeAndDispatchInsert(hover, monitor, component, '10x10-no-inline')
  }
}

export const connect = (connect: Connector, monitor: Monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({ shallow: true })
})
