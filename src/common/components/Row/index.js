import React from 'react'
import Cell from 'src/common/components/Cell'
import {DragSource, DropTarget} from 'react-dnd'
import {CELL} from 'src/common/items'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createStructuredSelector} from 'reselect'
import {rowAncestorHover} from 'src/common/actions/row'
import {isLayoutMode} from 'src/common/selectors/mode'
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

    //props.rowAncestorHover(item.id, path(props.id))
  }, 50, {trailing: false}),

  drop(props, monitor, component) {
  }
}

const dnd = {
  connect: (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
  })
}

const inner = ({cells = [], level, id, path, isLayoutMode}) => (
  <div className="row" style={{display: 'flex', backgroundColor: 'rgba(100,100,100,0.4)'}}>
      { cells.map((item) => ({
        ...item,
        size: item.size > 0 ? item.size : Math.floor(gridSize / cells.filter(({isPlaceholder}) => !isPlaceholder).length)
      })).map((cell) => <Cell
        siblings={cells.filter((c) => cell.id !== c.id)}
        path={path}
        parent={id}
        key={cell.id}
        level={level}
        {...cell} />)
      }
  </div>
)

const Row = ({wrap, connectDropTarget, path = [], ...data}) => {
  path.push(data.id)
  if (Boolean(wrap)) {
    const {component: WrapComponent, props: wrapProps} = wrap
    return (
      <WrapComponent {...wrapProps}>
        {inner({...data, path})}
      </WrapComponent>
    )
  }

  return (
    <div>
      {inner({...data, path})}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  isLayoutMode
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  rowAncestorHover
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(CELL, rowTarget, dnd.connect)(Row))