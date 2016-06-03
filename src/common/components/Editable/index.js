import React from 'react'
import {connect} from 'react-redux'
import {CELL, ROW} from 'src/common/items'
import Row from 'src/common/components/Row'
import {rows} from 'src/common/selectors/rows'
import {DropTarget} from 'react-dnd';

const target = {
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // check whether some nested target already handled drop
      console.log('already dropped!')
      return;
    }

    //
    // // Obtain the dragged item
    // const item = monitor.getItem();
    //
    // // You can do something with it
    // ChessActions.movePiece(item.fromPosition, props.position);
    //
    // // You can also do nothing and return a drop result,
    // // which will be available as monitor.getDropResult()
    // // in the drag source's endDrag() method
    console.log('drop done!')
  }
};

const collect = (connect, monitor)=> ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDropTarget: connect.dropTarget(),
  // You can ask the monitor about the current drag state:
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({shallow: true}),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
})

const Editable = ({rows, canDrop, isOver, connectDropTarget}) => {
  return (
    <div>
      { rows.map((row) => <Row ancestors={[row.id]} key={row.id} {...row} />) }
    </div>
  )
}

const mapStateToProps = (state) => ({
  rows: rows(state)
})

export default  connect(mapStateToProps)(DropTarget([ROW, CELL], target, collect)(Editable))
