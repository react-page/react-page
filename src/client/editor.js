import React from "react"
import ReactDOM from "react-dom"
import {forEach} from "ramda"
import Editable from "src/common"

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class Editor {
  constructor(config = {
    editables: []
  }) {
    this.options = config
  }

  render(elements = []) {
    forEach((element) => {
      const data = this.options.editables[element.dataset.id] || {rows: []}
      return ReactDOM.render(<Editable content={data}/>, element)
    }, elements)
  }
}

export default Editor