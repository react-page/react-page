import React, {Component} from "react";

import "./spoiler.css";

class Spoiler extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hidden: false
    }
  }

  render() {
    return (
      <div className="spoiler">
        <div className="spoiler-control" onClick={() => this.setState({hidden: !this.state.hidden})}>
          xx
        </div>
        <div className={`spoiler-inner${this.state.hidden ? ' spoiler-hidden' : ''}`}>
          <div {...this.props}/>
        </div>
      </div>
    )
  }
}

export default Spoiler