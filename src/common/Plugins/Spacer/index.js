import React, {Component} from "react";
import {ResizableBox} from 'react-resizable'
import throttle from "lodash.throttle";

import "./spacer.css"

class EditView extends Component {
  constructor(props) {
    super(props)
    this.onResize = this.onResize.bind(this)
    this.state = {
      height: props.height > 24 ? props.height : 24
    }
  }

  onResize(event, {element, size}) {
    if (size.height < 24) {
      size.height = 24
    }
    this.setState({height: size.height})
    throttle(() => this.props.onChange({height: size.height}), 100, {trailing: false})()
  }

  render() {
    return (
      <div className="spacer">
        <ResizableBox onResize={this.onResize} height={this.state.height}>
          <div />
        </ResizableBox>
      </div>
    )
  }
}

export default EditView