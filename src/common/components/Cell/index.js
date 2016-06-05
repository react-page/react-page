import React, {PropTypes} from 'react'
import Row from 'src/common/components/Row'
import {DragSource, DropTarget} from 'react-dnd'
import {CELL} from 'src/common/items'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createStructuredSelector} from 'reselect'
import {hoverCellOverCell, cancelCellDrag, dropCell} from 'src/common/actions/cell'
import {rowAncestorHover} from 'src/common/actions/row'
import throttle from 'lodash.throttle'

let lastHover = {}

const cellTarget = {
  hover: throttle((props, monitor, component) => {
    const item = monitor.getItem()
    if (item.id === props.id) {
      return
    } else if (!monitor.isOver({shallow: true})) {
      return
    } else if (props.isPlaceholder) {
      return
    } else if (!Boolean(props.id)) {
      return
    } else if (props.id === lastHover.id) {
      return
    }

    lastHover = props
    props.hoverCellOverCell(item.id, props.id)
    props.rowAncestorHover(item.id, props.path)
  }, 50, {trailing: false}),

  drop(props, monitor, component) {
    const item = monitor.getItem()
    lastHover = {}
    if (item.id === props.id) {
      props.cancelCellDrag(item.id)
      return
    } else if (!props.isPlaceholder) {
      props.cancelCellDrag(item.id)
      return
    }
    props.dropCell(props, item)
  }
}

const cellSource = {
  beginDrag(props) {
    return {...props};
  },

  endDrag(props, monitor) {
    lastHover = {}
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
    isOverCurrent: monitor.isOver({shallow: true}),
  }),
  collect: (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })
}

const inner = ({rows = [], plugin, data, id, path}) => {
  if (rows.length > 0) {
    return (
      <div>
        {
          rows.map((row, position) => <Row
            path={path}
            parent={id}
            key={row.id}
            {...row} />)
        }
      </div>
    )
  }

  const {EditView, RenderView} = plugin
  return (
    <div style={{backgroundColor: 'rgba(0,100,100,0.4)', padding: '4px'}}>
      <EditView {...data} id={id} />
    </div>
  )
}

const Cell = ({wrap, isOverCurrent, isDragging, isPlaceholder, connectDragSource, connectDropTarget, size, path = [], rows = [], ...data}) => {
  path.push(data.id)
  const wrapProps = {
    className: `col-md-${size}`,
    style: {
      display: isDragging ? 'none' : 'block',
      background: isOverCurrent && isPlaceholder ? 'yellow' : 'none'
    }
  }

  // only leafs can be dropped onto
  let connect = (e) => connectDragSource(connectDropTarget(e))
  if (rows.length > 0) {
    connect = (e) => (e)
  }

  if (Boolean(wrap)) {
    const {component: WrapComponent, props: wrapProps} = wrap
    return connect(
      <div {...wrapProps}>
        <WrapComponent {...wrapProps}>
          {inner({...data, rows, path})}
        </WrapComponent>
      </div>
    )
  }

  return connect(<div {...wrapProps}>{inner({...data, rows, path})}</div>)
}

Cell.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  hoverCellOverCell: PropTypes.func.isRequired,
  cancelCellDrag: PropTypes.func.isRequired,
  rowAncestorHover: PropTypes.func.isRequired,
  dropCell: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  hoverCellOverCell,
  cancelCellDrag,
  rowAncestorHover,
  dropCell
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(CELL, cellTarget, dnd.connect)(DragSource(CELL, cellSource, dnd.collect)(Cell)))