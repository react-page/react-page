import React, {Component} from "react";
import {connect} from "react-redux";
import {CELL, ROW} from "src/common/items";
import Row from "src/common/components/Row";
import {rows} from "src/common/selectors/rows";
import {mode} from "src/common/selectors/mode";
import {DropTarget} from "react-dnd";
import {createPlaceholders} from "src/common/actions/placeholders";
import {bindActionCreators} from "redux";
import {setMode} from "src/common/actions/mode";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {isLayoutMode} from "src/common/selectors/mode";

import "./editable.css"

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

var FirstChild = React.createClass({
  render: function () {
    var children = React.Children.toArray(this.props.children);
    return children[0] || null;
  }
});

class Editable extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.lastClick = new Date()
    this.state = {
      mouse: {}
    }
  }

  onClick(e) {
    if (this.lastClick.getTime() + 450 > (new Date()).getTime()) {
      this.props.setMode('layout')
      this.setState({
        mouse: {
          x: e.pageX,
          y: e.pageY
        },
        showIndicator: true
      })
      setTimeout(() => this.setState({showIndicator: false}), 300)
      return
    }

    this.props.setMode('edit')
    this.lastClick = new Date()
  }

  render() {
    const {rows, canDrop, isOver, connectDropTarget, isLayoutMode} = this.props
    return (
      <div onClick={this.onClick}>
        {
          <ReactCSSTransitionGroup
            component="div" className="mouse-indicator" transitionName="mouse-indicator"
                                   transitionAppeas={true}
                                   transitionEnterTimeout={200} transitionLeaveTimeout={200}>
            {
              this.state.showIndicator ? (<div style={{ top: this.state.mouse.y, left: this.state.mouse.x }}></div>) : null
            }
          </ReactCSSTransitionGroup>
        }
        { rows.map((row) => <Row level={1} key={row.id} {...row} />) }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  rows: rows(state),
  mode: mode(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createPlaceholders,
  setMode
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget([ROW, CELL], target, collect)(Editable))
