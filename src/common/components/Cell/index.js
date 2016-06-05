import React, {PropTypes} from 'react'
import Row from 'src/common/components/Row'
import {DragSource, DropTarget} from 'react-dnd'
import {CELL} from 'src/common/items'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createStructuredSelector} from 'reselect'
import {hoverCellOverCell, cancelCellDrag, dropCell, dragCell} from 'src/common/actions/cell'
import {rowAncestorHover} from 'src/common/actions/row'
import throttle from 'lodash.throttle'
import {isLayoutMode} from 'src/common/selectors/mode'

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
    // delay drag propagation or risk a bug with react-dnd html5 backend
    setTimeout(() => props.dragCell(props), 50)
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

const inner = ({rows = [], plugin, data, id, path, ...props}) => {
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

  if (!Boolean(plugin)) {
    console.log('Neither rows nor plugin defined in object',{rows, plugin, data, id, path, ...props})
    return <div style={{backgroundColor: 'red'}}>missing plugin</div>
  }

  const {EditView, RenderView} = plugin
  return (
    <div style={{backgroundColor: 'rgba(0,100,100,0.4)', padding: '4px'}}>
      <EditView {...data} id={id}/>
    </div>
  )
}

const PlaceHolder = ({width, isOverCurrent, connectDropTarget}) => {
  const style = {
    float: 'left',
    width,
    minHeight: '18px',
    backgroundColor: isOverCurrent ? 'yellow' : '#31fa41',
    boxShadow: '0 0 2px 2px',
    padding: 0,
    position: 'relative',
    textAlign: 'center',
    verticalAlign: 'middle'
  }
  return connectDropTarget(
    <div {...{style}} />
  )
}

const Cell = ({wrap, isLayoutMode, isOverCurrent, isDragging, isPlaceholder, connectDragSource, connectDropTarget, size, siblings = [], path = [], rows = [], ...data}) => {
  path.push(data.id)
  const cellProps = {
    className: `col-md-${size}`,
    style: {
      width: !isDragging && isLayoutMode ? `calc(${size / 12 * 100}% - 30px)` : null,
      padding: !isDragging && isLayoutMode ? '0 16px' : null,
      visibility: isDragging ? 'hidden' : null,
      background: isOverCurrent && isPlaceholder ? 'yellow' : null
    }
  }

  // only leafs can be dropped onto
  let connect = (e) => connectDragSource(connectDropTarget(e))
  if (rows.length > 0) {
    connect = (e) => (e)
  }

  if (isPlaceholder) {
    return <PlaceHolder {...{width: siblings.length > 0 ? '16px' : '100%',isOverCurrent, connectDropTarget}} />
  }

  if (Boolean(wrap)) {
    const {component: WrapComponent = 'div', props: wrapProps = {}} = wrap
    return connect(
      <div {...cellProps}>
        <WrapComponent {...wrapProps}>
          {inner({...data, rows, path})}
        </WrapComponent>
      </div>
    )
  }

  return connect(<div {...cellProps}>{inner({...data, rows, path})}</div>)
}

Cell.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  hoverCellOverCell: PropTypes.func.isRequired,
  cancelCellDrag: PropTypes.func.isRequired,
  rowAncestorHover: PropTypes.func.isRequired,
  dragCell: PropTypes.func.isRequired,
  dropCell: PropTypes.func.isRequired,
  isLayoutMode: PropTypes.bool.isRequired
}

const mapStateToProps = createStructuredSelector({
  isLayoutMode
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  hoverCellOverCell,
  cancelCellDrag,
  rowAncestorHover,
  dropCell,
  dragCell
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(CELL, cellTarget, dnd.connect)(DragSource(CELL, cellSource, dnd.collect)(Cell)))