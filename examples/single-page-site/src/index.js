import { PluginService, defaultLayoutPlugins, defaultContentPlugins } from 'src/editor/service'
import ParallaxPlugin from './plugins/parallax'
import FaIconPlugin from './plugins/fa-icon'
import React from 'react'
import ReactDOM from 'react-dom'
import Editor, { EditableComponent, ControlsComponent } from 'src/editor'
import content from './content.js'

require('react-tap-event-plugin')()

const editor = new Editor({
  plugins: new PluginService([
    ...defaultContentPlugins,
    new FaIconPlugin()
  ], [
    ...defaultLayoutPlugins,
    new ParallaxPlugin()
  ])
})

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
