import { findDOMNode } from 'react-dom'

import HoverService from '../hover'

import type { ComponetizedCell } from '../../types/editable'
import type { Vector, Room, Callbacks } from '../../types/hover'
import type { DragSourceMonitor } from 'react-dnd'

const hoverService = new HoverService()

export const computeCurrentDropPosition = (
  actions: Callbacks,
  hover: ComponetizedCell,
  drag: ComponetizedCell,
  monitor: DragSourceMonitor,
  component: Object,
  matrixName: string
) => {
  const mousePosition = monitor.getClientOffset()
  /* eslint-disable react/no-find-dom-node */
  const componentPosition = findDOMNode(component).getBoundingClientRect()
  const room: Room = {
    height: componentPosition.bottom - componentPosition.top,
    width: componentPosition.right - componentPosition.left
  }

  const mouse: Vector = {
    y: mousePosition.y - componentPosition.top,
    x: mousePosition.x - componentPosition.left
  }

  hoverService.hover(drag, hover, actions, { room, mouse, matrix: matrixName })
}

export const computeAndDispatchInsert = (
  {
    insertCellAbove: above,
    insertCellBelow: below,
    insertCellLeftOf: leftOf,
    insertCellRightOf: rightOf,
    insertCellLeftInline: inlineLeft,
    insertCellRightInline: inlineRight,
    clearHover: clear,
    ...hover
  }: ComponetizedCell,
  drag: ComponetizedCell,
  monitor: DragSourceMonitor,
  component: Object,
  matrixName: string = '10x10'
) =>
  computeCurrentDropPosition(
    {
      clear,
      above,
      below,
      leftOf,
      rightOf,
      inlineLeft,
      inlineRight
    },
    hover,
    drag,
    monitor,
    component,
    matrixName
  )

export const computeAndDispatchHover = (
  {
    cellHoverAbove: above,
    cellHoverBelow: below,
    cellHoverLeftOf: leftOf,
    cellHoverRightOf: rightOf,
    cellHoverInlineLeft: inlineLeft,
    cellHoverInlineRight: inlineRight,
    clearHover: clear,
    ...hover
  }: ComponetizedCell,
  drag: ComponetizedCell,
  monitor: DragSourceMonitor,
  component: Object,
  matrixName: string = '10x10'
) =>
  computeCurrentDropPosition(
    {
      clear,
      above,
      below,
      leftOf,
      rightOf,
      inlineLeft,
      inlineRight
    },
    hover,
    drag,
    monitor,
    component,
    matrixName
  )
