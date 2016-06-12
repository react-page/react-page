import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CELL, ROW} from 'src/common/items'
import Row from 'src/common/components/Row'
import {rows} from 'src/common/selectors/rows'
import {DropTarget} from 'react-dnd'
import {createPlaceholders} from 'src/common/actions/placeholders'
import {bindActionCreators} from 'redux'

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

class Editable extends Component {
  componentDidMount() {
    // this.props.createPlaceholders()
  }

  render() {
    const {rows, canDrop, isOver, connectDropTarget} = this.props
    return (
      <div>
        { rows.map((row) => <Row level={1} key={row.id} {...row} />) }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  rows: rows(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createPlaceholders
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget([ROW, CELL], target, collect)(Editable))
