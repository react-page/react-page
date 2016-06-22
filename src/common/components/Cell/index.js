import React, { PropTypes, Component } from "react"
import { findDOMNode } from "react-dom"
import Row from "src/common/components/Row"
import { DragSource, DropTarget } from "react-dnd"
import { CELL } from "src/common/items"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { createStructuredSelector } from "reselect"
import Resizable from "src/common/components/Resizable"
import {
  hoverCellOverCell,
  cancelCellDrag,
  dropCell,
  dragCell,
  focusCell,
  blurCell,
  updateCell,
  resizeCell
} from "src/common/actions/cell"
import { rowAncestorHover } from "src/common/actions/row"
import throttle from "lodash.throttle"
import { isLayoutMode, isEditMode } from "src/common/selectors/mode"
import Dimensions from "react-dimensions"

import "./cell.css"

const computeDropArea = (props, monitor, component) => {
  const treshold = 0.40
  const mousePosition = monitor.getClientOffset()
  const componentPosition = findDOMNode(component).getBoundingClientRect()
  const componentHeight = (componentPosition.bottom - componentPosition.top)
  const componentWidth = (componentPosition.right - componentPosition.left)
  const relVer = ( mousePosition.y - componentPosition.top) / componentHeight
  const relHor = (mousePosition.x - componentPosition.left) / componentWidth

  let position = 'center'
  let level = 0
  if (relVer <= treshold || relVer >= 1 - treshold) {
    if (componentPosition.bottom - mousePosition.y > componentHeight / 2) {
      level = (mousePosition.y - componentPosition.top) / (componentHeight * treshold / props.parents.length)
      position = 'top'
    } else {
      level = (componentPosition.bottom - mousePosition.y) / (componentHeight * treshold / props.parents.length)
      position = 'bottom'
    }
    level = props.parents.length - Math.round(level)
  } else if (relHor <= treshold || relHor >= 1 - treshold) {
    if (componentPosition.right - mousePosition.x > componentWidth / 2) {
      level = (mousePosition.x - componentPosition.left) / (componentWidth * treshold / props.parents.length)
      position = 'left'
    } else {
      level = (componentPosition.right - mousePosition.x) / (componentWidth * treshold / props.parents.length)
      position = 'right'
    }
    level = props.parents.length - Math.round(level)
  }
  return { level, position }
}

const cellTarget = {
  hover: throttle((props, monitor, component) => {
    const item = monitor.getItem()
    if (item.id === props.id) {
      return
    } else if (!monitor.isOver({ shallow: true })) {
      return
    } else if (!Boolean(props.id)) {
      return
    }

    const { position, level } = computeDropArea(props, monitor, component)
    props.hoverCellOverCell({
      item: item,
      hover: props,
      position,
      level
    })
  }, 200, { leading: true, trailing: false }),

  drop(props, monitor, component) {
    const item = monitor.getItem()
    const { position, level } = computeDropArea(props, monitor, component)
    if (item.id === props.id) {
      props.cancelCellDrag(item.id)
    } else {
      props.dropCell({
        hover: props,
        item,
        position,
        level
      })
    }
  }
}

const cellSource = {
  beginDrag(props) {
    props.dragCell(props)
    return { ...props };
  },

  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      return
    }
    props.cancelCellDrag(props.id)
  }
};

const dnd = {
  connect: (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
  }),
  collect: (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })
}

const inner = ({ rows = [], isLayoutMode, level, plugin: Plugin, data, id, path, resizeable = false, readOnly = false, ...props }) => {
  if (rows.length > 0) {
    return (
      <Resizable enabled={resizeable && !isLayoutMode} rowWidth={props.containerWidth} cellWidth={props.size}
                 onChange={(width) => props.resizeCell(id, width)}>
        {
          rows.map((row, position) => (
            <Row
              path={path}
              parent={id}
              key={row.id}
              level={level + 1} {...row} />)
          )
        }
      </Resizable>
    )
  }

  if (!Boolean(Plugin)) {
    console.log('Neither rows nor plugin defined in object', { rows, plugin, data, id, path, ...props })
    return (
      <div style={{backgroundColor: 'red', padding: '16px', margin: '8px', borderRadius: '4px'}}>
        Empty row
      </div>
    )
  }

  return (
    <Resizable enabled={resizeable && !isLayoutMode} rowWidth={props.containerWidth} cellWidth={props.size}
               onChange={(width) => props.resizeCell(id, width)}>
      <Plugin {...data} readOnly={readOnly} id={id} onChange={(newState) => props.updateCell(id, newState)}/>
    </Resizable>
  )
}

class Cell extends Component {
  render() {
    const { ...props } = this.props
    const { wrap, isEditMode, isLayoutMode, hover, isDragging, connectDragSource, connectDropTarget, size, autoSize, rows = [], blurCell, focusCell } = this.props
    const cellProps = {
      blurCell,
      focusCell,
      className: `col-md-${size || autoSize} editable-cell ${isLayoutMode ? 'layout-mode' : ''} ${rows.length === 0 ? 'leaf' : ''} ${wrap ? 'wrap' : ''}`,
      style: {
        opacity: isDragging ? '.3' : '1',
        padding: 0
      }
    }

    if (Boolean(hover)) {
      cellProps.className += ` drag-hover drag-hover-${hover}`
    }

    let connect = (e) => connectDragSource(connectDropTarget(e))

    // disable dnd if we're not in layoutmode
    if (!isEditMode) {
      props.readOnly = true
    }

    // only leafs can be d'n'd
    if (rows.length > 0 || !isLayoutMode) {
      connect = (e) => (e)
    }

    if (wrap && isLayoutMode) {
      // but also allow wrapped cells to be dnd'ed
      connect = (e) => connectDragSource(e)
    }

    if (wrap) {
      const { component: WrapComponent = null, props: wrapProps = {} } = wrap
      return connect(
        <div {...cellProps}>
          <WrapComponent {...wrapProps}>
            {inner({ ...props })}
          </WrapComponent>
        </div>
      )
    }

    return connect(
      <div {...cellProps}>
        {inner({ ...props })}
      </div>
    )
  }
}

Cell.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  isLayoutMode: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  hoverCellOverCell: PropTypes.func.isRequired,
  cancelCellDrag: PropTypes.func.isRequired,
  rowAncestorHover: PropTypes.func.isRequired,
  dragCell: PropTypes.func.isRequired,
  dropCell: PropTypes.func.isRequired,
  blurCell: PropTypes.func.isRequired,
  focusCell: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  wrap: PropTypes.object,
  id: PropTypes.string.isRequired
}

const mapStateToProps = createStructuredSelector({
  isLayoutMode,
  isEditMode
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  hoverCellOverCell,
  cancelCellDrag,
  rowAncestorHover,
  dropCell,
  dragCell,
  focusCell,
  blurCell,
  resizeCell,
  updateCell
}, dispatch)

export default Dimensions()(connect(mapStateToProps, mapDispatchToProps)(DropTarget(CELL, cellTarget, dnd.connect)(DragSource(CELL, cellSource, dnd.collect)(Cell))))