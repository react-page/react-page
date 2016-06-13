import React, {Component} from "react";
import {Provider} from "react-redux";
import HTML5Backend from "react-dnd-html5-backend";
import {DragDropContext} from "react-dnd";
import Editable from "./components/Editable";
import createStore from "./store";

class Editor extends Component {
  render() {
    return (
      <Provider
        store={createStore(this.props.content)}>
        <Editable />
      </Provider >
    )
  }
}

export default DragDropContext(HTML5Backend)(Editor)
