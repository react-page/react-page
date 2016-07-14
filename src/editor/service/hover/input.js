import { findDOMNode } from 'react-dom'
import HoverService from 'src/editor/service/hover'
import * as actions from 'src/editor/actions/cell/drag'

const hoverService = new HoverService()

export const computeCurrentDropPosition = (actions, hover, monitor, component, matrix) => {
  const mousePosition = monitor.getClientOffset()
  const componentPosition = findDOMNode(component).getBoundingClientRect()
  const room = {
    height: (componentPosition.bottom - componentPosition.top),
    width: (componentPosition.right - componentPosition.left)
  }
  const mouse = {
    y: (mousePosition.y - componentPosition.top),
    x: (mousePosition.x - componentPosition.left)
  }
  const drag = monitor.getItem()

  return hoverService.hover(drag, hover, actions, { room, mouse, matrix })
}

export const computeAndReturnHoverPosition = (hover, monitor, component, matrix) => computeCurrentDropPosition({
  clear: actions.clearHover,
  above: actions.cellHoverAbove,
  below: actions.cellHoverBelow,
  leftOf: actions.cellHoverLeftOf,
  rightOf: actions.cellHoverRightOf,
  inlineLeft: actions.cellHoverInlineLeft,
  inlineRight: actions.cellHoverInlineRight,
}, hover, monitor, component, matrix)

export const computeAndDispatchInsert = ({
  insertCellAbove: above,
  insertCellBelow: below,
  insertCellLeftOf: leftOf,
  insertCellRightOf: rightOf,
  insertCellLeftInline: inlineLeft,
  insertCellRightInline: inlineRight,
  clearHover: clear,
  ...hover
}, monitor, component, matrix = '10x10') => computeCurrentDropPosition({
  clear,
  above,
  below,
  leftOf,
  rightOf,
  inlineLeft,
  inlineRight
}, hover, monitor, component, matrix)

export const computeAndDispatchHover = ({
  cellHoverAbove: above,
  cellHoverBelow: below,
  cellHoverLeftOf: leftOf,
  cellHoverRightOf: rightOf,
  cellHoverInlineLeft: inlineLeft,
  cellHoverInlineRight: inlineRight,
  clearHover: clear,
  ...hover
}, monitor, component, matrix = '10x10') => {
  computeCurrentDropPosition({
    clear,
    above,
    below,
    leftOf,
    rightOf,
    inlineLeft,
    inlineRight
  }, hover, monitor, component, matrix)
}
