import React from 'react'
import ReactDOM from 'react-dom'
import Editor, { Editable, Controls } from 'src/editor'
import content from './content.js'

const editor = new Editor()
require('react-tap-event-plugin')()

const elements = document.querySelectorAll('.editable')
for (const element of elements) {
  ReactDOM.render((
    <Editable
      editor={editor}
      state={content[element.dataset.id]}
      // onChange={(state) => console.log(state)}
    />
  ), element)
}

ReactDOM.render(<Controls editor={editor} />, document.getElementById('controls'))
