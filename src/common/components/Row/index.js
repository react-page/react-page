import React from "react";
import {findDOMNode} from "react-dom";
import Cell from "src/common/components/Cell";
import {DropTarget} from "react-dnd";
import {CELL} from "src/common/items";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {createStructuredSelector} from "reselect";
import {rowAncestorHover} from "src/common/actions/row";
import {isLayoutMode} from "src/common/selectors/mode";

import './row.css'

const gridSize = 12

const rowTarget = {
  // hover: throttle((props, monitor, component) => {
  //   const item = monitor.getItem()
  //
  //   if (item.id === props.id) {
  //     return
  //   } else if (!monitor.isOver({shallow: true})) {
  //     return
  //   } else if (props.isPlaceholder) {
  //     return
  //   } else if (!Boolean(props.id)) {
  //     return
  //   }
  //
  //   const mousePosition =  monitor.getClientOffset()
  //   const domPosition = findDOMNode(component).getBoundingClientRect()
  //   console.log('mouse',mousePosition)
  //   console.log('dom',domPosition)
  //
  //   if (domPosition.bottom - mousePosition.y > (domPosition.bottom - domPosition.top) /2){
  //     console.log('top')
  //   } else {
  //     console.log('bottom')
  //   }
  //
  //   if (domPosition.right - mousePosition.x > (domPosition.right - domPosition.left) /2){
  //     console.log('left')
  //   } else {
  //     console.log('right')
  //   }
  //
  //   //props.rowAncestorHover(item.id, path(props.id))
  // }, 50, {trailing: false}),

  drop(props, monitor, component) {
  }
}

const dnd = {
  connect: (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    //isOverCurrent: monitor.isOver({shallow: true})
  })
}

const inner = ({cells = [], hover, level, isOverCurrent, id, isLayoutMode}) => {
  return (
    <div className="row">
      { cells.map((item) => ({
        ...item,
        size: item.size > 0 ? item.size : Math.floor(gridSize / cells.filter(({isPlaceholder}) => !isPlaceholder).length)
      })).map((cell) => <Cell
        siblings={cells.filter((c) => cell.id !== c.id)}
        parent={id}
        key={cell.id}
        level={level}
        {...cell} />)
      }
    </div>
  )
}

const Row = ({wrap, connectDropTarget, ...data}) => {
  if (Boolean(wrap)) {
    const {component: WrapComponent, props: wrapProps} = wrap
    return connectDropTarget(
      <div className={data.hover ? `editable-row drag-hover drag-hover-${data.hover}` : 'editable-row '}>
        <WrapComponent {...wrapProps}>
          {inner({...data})}
        </WrapComponent>
      </div>
    )
  }

  return connectDropTarget(
    <div className={data.hover ? `editable-row drag-hover drag-hover-${data.hover}` : 'editable-row '}>
      {inner({...data})}
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