import React from 'react'
import Cell from 'src/common/components/Cell'
import {DragSource, DropTarget} from 'react-dnd'
import {CELL} from 'src/common/items'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createStructuredSelector} from 'reselect'
import {hoverCellOverRow} from 'src/common/actions/row'
import throttle from 'lodash.throttle'

const gridSize = 12

const rowTarget = {
  hover: throttle((props, monitor, component) => {
    const item = monitor.getItem()
    if (item.id === props.id) {
      return
    } else if (props.isPlaceholder) {
      return
    } else if (!Boolean(props.id)) {
      return
    }

    props.hoverCellOverRow(item.id, props.id)
  }, 50, {trailing: false}),

  drop(props, monitor, component) {
  }
}

const dnd = {
  connect: (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
  })
}

const inner = ({cells}) => (
  <div className="row">{
    cells.map((item) => ({
      ...item,
      size: item.size > 0 ? item.size : Math.ceil(gridSize / cells.length)
    })).map((cell) => <Cell key={cell.id} {...cell} />)
  }</div>
)

const Row = ({wrap, connectDropTarget, ...data}) => {
  if (Boolean(wrap)) {
    const {component: WrapComponent, props: wrapProps} = wrap
    return connectDropTarget(
      <WrapComponent {...wrapProps}>
        {inner(data)}
      </WrapComponent>
    )
  }

  return connectDropTarget(
    <div>
      {inner(data)}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  hoverCellOverRow
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(CELL, rowTarget, dnd.connect)(Row))