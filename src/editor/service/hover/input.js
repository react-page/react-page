import { findDOMNode } from 'react-dom'
import HoverService from 'src/editor/service/hover'

const hoverService = new HoverService()

export const computeCurrentDropPosition = (actions, hover, monitor, component) => {
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

  hoverService.hover(drag, hover, actions, { room, mouse })
}

export const computeAndDispatchInsert = ({
  insertCellAbove: above,
  insertCellBelow: below,
  insertCellLeftOf: leftOf,
  insertCellRightOf: rightOf,
  insertCellLeftInline: inlineLeft,
  insertCellRightInline: inlineRight,
  clearHover: clear,
  ...hover
}, monitor, component) => computeCurrentDropPosition({
  clear,
  above,
  below,
  leftOf,
  rightOf,
  inlineLeft,
  inlineRight
}, hover, monitor, component)

export const computeAndDispatchHover = ({
  cellHoverAbove: above,
  cellHoverBelow: below,
  cellHoverLeftOf: leftOf,
  cellHoverRightOf: rightOf,
  cellHoverInlineLeft: inlineLeft,
  cellHoverInlineRight: inlineRight,
  clearHover: clear,
  ...hover
}, monitor, component) => computeCurrentDropPosition({
  clear,
  above,
  below,
  leftOf,
  rightOf,
  inlineLeft,
  inlineRight
}, hover, monitor, component)
