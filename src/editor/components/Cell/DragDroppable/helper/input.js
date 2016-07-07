import { findDOMNode } from 'react-dom'
import throttle from 'lodash.throttle'

const fire = ({ hover, drag, cb, data }) => cb(drag, hover, data)

export const computeCurrentDropPosition = ({
  clear,
  above,
  below,
  leftOf,
  rightOf,
  inlineLeft,
  inlineRight
}, { ancestors = [], ...hover }, monitor, component) => {
  const treshold = 0.45
  const mousePosition = monitor.getClientOffset()
  const componentPosition = findDOMNode(component).getBoundingClientRect()
  const componentHeight = (componentPosition.bottom - componentPosition.top)
  const componentWidth = (componentPosition.right - componentPosition.left)
  const relVer = (mousePosition.y - componentPosition.top) / componentHeight
  const relHor = (mousePosition.x - componentPosition.left) / componentWidth
  const drag = monitor.getItem()

  if (relVer <= treshold || relVer >= 1 - treshold) {
    if (componentPosition.bottom - mousePosition.y > componentHeight / 2) {
      fire({
        cb: above,
        hover,
        drag,
        data: ancestors.length - Math.round((mousePosition.y - componentPosition.top) / (componentHeight * treshold / ancestors.length))
      })
    } else {
      fire({
        cb: below,
        hover,
        drag,
        data: ancestors.length - Math.round((componentPosition.bottom - mousePosition.y) / (componentHeight * treshold / ancestors.length))
      })
    }
  } else if (relHor <= treshold || relHor >= 1 - treshold) {
    if (componentPosition.right - mousePosition.x > componentWidth / 2) {
      fire({
        cb: leftOf,
        hover,
        drag,
        data: ancestors.length - Math.round((mousePosition.x - componentPosition.left) / (componentWidth * treshold / ancestors.length))
      })
    } else {
      fire({
        cb: rightOf,
        hover,
        drag,
        data: ancestors.length - Math.round((componentPosition.right - mousePosition.x) / (componentWidth * treshold / ancestors.length))
      })
    }
  } else {
    fire({cb: clear})
  }
}

export const computeAndDispatchInsert = ({
  insertCellAbove: above,
  insertCellBelow: below,
  insertCellLeftOf: leftOf,
  insertCellRightOf: rightOf,
  insertCellInlineLeft: inlineLeft,
  insertCellInlineRight: inlineRight,
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
