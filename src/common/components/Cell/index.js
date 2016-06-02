import React, {PropTypes} from 'react'
import Row from 'src/common/components/Row'
import {DragSource, DropTarget} from 'react-dnd'
import {CELL} from 'src/common/items'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createStructuredSelector} from 'reselect'
import {hoverCellOver} from 'src/common/actions/cell'

const cellTarget = {
  hover(props, monitor, component) {
    const item = monitor.getItem()
    if (item.id === props.id) {
      return
    }

    props.hoverCellOver(props.id, item.id)
  },

  drop(props, monitor, component) {
    const item = monitor.getItem()
    if (item.id === props.id) {
      return
    }
    console.log('dropped!!!', props.id)
  }
}

const cellSource = {
  beginDrag(props) {
    console.log('dargging!!!', props.id)
    return {...props};
  },

  endDrag(props, monitor) {
    console.log('endDrag', props)
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
  if (Boolean(rows)) {
    return (
      <div>{ rows.map((row, position) => <Row key={row.id} {...row} />) }</div>
    )
  }

  const {EditView, RenderView} = plugin
  return (
    <EditView {...data} />
  )
}

const Cell = ({wrap, isDragging, connectDragSource, connectDropTarget, ...data}) => {
  const opacity = isDragging ? 0.4 : 1

  if (Boolean(wrap)) {
    const {component: WrapComponent, props: wrapProps} = wrap
    return (
      connectDragSource(connectDropTarget(
        <div style={{ opacity, cursor: 'move' }}>
          <WrapComponent {...wrapProps}>
            {inner(data)}
          </WrapComponent>
        </div>
      ))
    )
  }

  return connectDragSource(<div style={{opacity}}>{inner(data)}</div>)
}

Cell.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  hoverCellOver: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  hoverCellOver
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(CELL, cellTarget, dnd.connect)(DragSource(CELL, cellSource, dnd.collect)(Cell)))