/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *  
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *  
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

// @flow
import throttle from 'lodash.throttle'
import pathOr from 'ramda/src/pathOr'
import {
  computeAndDispatchHover,
  computeAndDispatchInsert
} from '../../../../service/hover/input'
import { delay } from '../../../../helper/throttle'
import logger from '../../../../service/logger'
import {
  isNativeHTMLElementDrag,
  createNativeCellReplacement
} from '../../../../helper/nativeDragHelpers'
import type { DropTargetMonitor, DropTargetConnector } from 'dnd-core'

import type { ComponetizedCell } from '../../../../types/editable'

let last: { hover: string, drag: string } = { hover: '', drag: '' }

const clear = (hover: ComponetizedCell, drag: string) => {
  if (hover.id === last.hover && drag === last.drag) {
    return
  }
  last = { hover: hover.id, drag }
  hover.clearHover()
}

export const target = {
  hover: throttle(
    (
      hover: ComponetizedCell,
      monitor: DropTargetMonitor,
      component: Object
    ) => {
      let drag: ComponetizedCell = monitor.getItem()
      if (!drag) {
        // item undefined, happens when throttle triggers after drop
        return
      }

      if (isNativeHTMLElementDrag(monitor)) {
        drag = createNativeCellReplacement()
      }

      if (drag.id === hover.id) {
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
        logger.warn('Canceled cell drop, no id given.', hover, drag)
        return
      }

      last = { hover: hover.id, drag: drag.id }
      const allowInlineNeighbours = pathOr(
        false,
        ['node', 'content', 'plugin', 'allowInlineNeighbours'],
        hover
      )
      computeAndDispatchHover(
        hover,
        drag,
        monitor,
        component,
        `10x10${allowInlineNeighbours ? '' : '-no-inline'}`
      )
    },
    delay,
    { leading: false }
  ),

  canDrop: (
    { id, ancestors }: ComponetizedCell,
    monitor: DropTargetMonitor
  ) => {
    const item = monitor.getItem()
    return item.id !== id && ancestors.indexOf(item.id) === -1
  },

  drop(hover: ComponetizedCell, monitor: DropTargetMonitor, component: Object) {
    let drag: ComponetizedCell = monitor.getItem()

    if (isNativeHTMLElementDrag(monitor)) {
      const { plugins } = component.props.config
      drag = plugins.createNativePlugin(hover, monitor, component)
    }

    if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
      // If the item drop occurred deeper down the tree, don't do anything
      return
    } else if (drag.id === hover.id) {
      // If the item being dropped on itself do nothing
      hover.cancelCellDrag()
      return
    } else if (hover.ancestors.indexOf(drag.id) > -1) {
      // If hovering over a child of itself, don't propagate further
      hover.cancelCellDrag()
      return
    }

    last = { hover: hover.id, drag: drag.id }
    const allowInlineNeighbours = pathOr(
      false,
      ['node', 'content', 'plugin', 'allowInlineNeighbours'],
      hover
    )
    computeAndDispatchInsert(
      hover,
      drag,
      monitor,
      component,
      `10x10${allowInlineNeighbours ? '' : '-no-inline'}`
    )
  }
}

export const connect = (
  connect: DropTargetConnector,
  monitor: DropTargetMonitor
) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true })
})
