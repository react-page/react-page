import React from 'react'
import Cell from 'src/common/components/Cell'
import {DragSource, DropTarget} from 'react-dnd'
import {CELL} from 'src/common/items'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createStructuredSelector} from 'reselect'
import {rowAncestorHover} from 'src/common/actions/row'
import {ancestors} from 'src/common/selectors/rows'
import throttle from 'lodash.throttle'

const gridSize = 12

const rowTarget = {
  hover: throttle((props, monitor, component) => {
    console.log('hover', props.id)
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

    props.rowAncestorHover(item.id, ancestors(props.id))
  }, 50, {trailing: false}),

  drop(props, monitor, component) {
  }
}

const dnd = {
  connect: (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
  })
}

const inner = ({cells, id, path}) => (
  <div className="row">{
    cells.map((item) => ({
      ...item,
      size: item.size > 0 ? item.size : Math.ceil(gridSize / cells.length)
    })).map((cell) => <Cell
      ancestors={path}
      parent={id}
      key={cell.id}
      {...cell} />)
  }</div>
)

const Row = ({wrap, connectDropTarget, ancestors = [], ...data}) => {
  const path = [...ancestors, data.id]
  if (Boolean(wrap)) {
    const {component: WrapComponent, props: wrapProps} = wrap
    return (
      <WrapComponent {...wrapProps}>
        {inner({...data,path})}
      </WrapComponent>
    )
  }

  return (
    <div>
      {inner({...data,path})}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  rowAncestorHover
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(CELL, rowTarget, dnd.connect)(Row))