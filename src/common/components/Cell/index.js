import React, {PropTypes} from 'react'
import Row from 'src/common/components/Row'
import {DragSource, DropTarget} from 'react-dnd'
import {CELL} from 'src/common/items'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createStructuredSelector} from 'reselect'
import {hoverCellOverCell, cancelCellDrag} from 'src/common/actions/cell'
import {rowAncestorHover} from 'src/common/actions/row'
import {all, ancestors} from 'src/common/selectors/rows'
import throttle from 'lodash.throttle'

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
    }

    props.hoverCellOverCell(item.id, props.id)
    props.rowAncestorHover(item.id, props.ancestors)
  }, 50, {trailing: false}),

  drop(props, monitor, component) {
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

const inner = ({rows, plugin, data, id, path}) => {
  if (rows.length) {
    return (
      <div className="col-xs-12">{ rows.map((row, position) => <Row
        ancestors={path}
        parent={id}
        key={row.id}
        {...row} />) }</div>
    )
  }

  const {EditView, RenderView} = plugin
  return (
    <div>
      <EditView {...data} />
    </div>
  )
}

const Cell = ({wrap, dragging, connectDragSource, connectDropTarget, size, ancestors = [], ...data}) => {
  const path = [...ancestors, data.id]
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
          {inner({...data,path})}
        </WrapComponent>
      </div>
    )
  }

  return connect(<div className={`col-md-${size}`}>{inner({...data,path})}</div>)
}

Cell.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  hoverCellOverCell: PropTypes.func.isRequired,
  cancelCellDrag: PropTypes.func.isRequired,
  rowAncestorHover:  PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  hoverCellOverCell,
  cancelCellDrag,
  rowAncestorHover
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(CELL, cellTarget, dnd.connect)(DragSource(CELL, cellSource, dnd.collect)(Cell)))