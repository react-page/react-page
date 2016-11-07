import React from 'react'
import ReactDOM from 'react-dom'
import Editor, { EditableComponent, ControlsComponent } from 'src/editor'
import content from './content.js'

const editor = new Editor()
editor.injectTapPlugin()

const elements = document.querySelectorAll('.editable')
for (const element of elements) {
  ReactDOM.render((
    <EditableComponent
      editor={editor}
      state={content[element.dataset.id]}
      // onChange={(state) => console.log(state)}
    />
  ), element)
}

ReactDOM.render(<ControlsComponent editor={editor} />, document.getElementById('controls'))
