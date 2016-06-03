import React, {PropTypes} from 'react'
import Row from 'src/common/components/Row'
import {DragSource, DropTarget} from 'react-dnd'
import {CELL} from 'src/common/items'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createStructuredSelector} from 'reselect'
import {hoverCellOverCell, cancelCellDrag} from 'src/common/actions/cell'
import throttle from 'lodash.throttle'

let lastHover = {}

const cellTarget = {
  hover: throttle((props, monitor, component) => {
    const item = monitor.getItem()
    if (props.id === lastHover.id) {
      return
    } else if (item.id === props.id) {
      return
    } else if (!monitor.isOver({shallow: true})) {
      return
    } else if (props.isPlaceholder) {
      return
    } else if (!Boolean(props.id)) {
      return
    }

    lastHover = props
    props.hoverCellOverCell(item.id, props.id)
  }, 50, {trailing: false}),

  drop(props, monitor, component) {
    lastHover = {}
    const item = monitor.getItem()
    if (item.id === props.id) {
      return
    }
  }
}

const cellSource = {
  beginDrag(props) {
    return {...props};
  },

  endDrag(props, monitor) {
    props.cancelCellDrag(props.id)
  }
};

const dnd = {
  connect: (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
  }),
  collect: (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
}

const inner = ({rows, plugin, data}) => {
  if (rows.length) {
    return (
      <div className="col-xs-12">{ rows.map((row, position) => <Row key={row.id} {...row} />) }</div>
    )
  }

  const {EditView, RenderView} = plugin
  return (
    <div>
      <EditView {...data} />
    </div>
  )
}

const Cell = ({wrap, dragging, connectDragSource, connectDropTarget, size, ...data}) => {
  if (dragging) {
    return null
  }

  // only leafs can be dropped onto
  let connect = (e) => connectDragSource(connectDropTarget(e))
  if (data.rows.length > 0) {
    connect = (e) => (e)
  }

  if (Boolean(wrap)) {
    const {component: WrapComponent, props: wrapProps} = wrap
    return connect(
      <div className={`col-md-${size}`}>
        <WrapComponent {...wrapProps}>
          {inner(data)}
        </WrapComponent>
      </div>
    )
  }

  return connect(<div className={`col-md-${size}`}>{inner(data)}</div>)
}

Cell.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  hoverCellOverCell: PropTypes.func.isRequired,
  cancelCellDrag: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  hoverCellOverCell,
  cancelCellDrag
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(CELL, cellTarget, dnd.connect)(DragSource(CELL, cellSource, dnd.collect)(Cell)))