import React from 'react'
import ReactDOM from 'react-dom'

// The editor core
import Editor, { Editable, createEmptyState } from 'ory-editor-core'
import 'ory-editor-core/lib/index.css'

// The default ui components
import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui'
import 'ory-editor-ui/lib/index.css'

// react-tap-event-plugin is required for material-ui which is used by ory-editor-ui
require('react-tap-event-plugin')()

// The rich text area plugin
import slate from 'ory-editor-plugins-slate'
import 'ory-editor-plugins-slate/lib/index.css'

// The spacer plugin
import spacer from 'ory-editor-plugins-spacer'
import 'ory-editor-plugins-spacer/lib/index.css'

// The image plugin
import image from 'ory-editor-plugins-image'
import 'ory-editor-plugins-image/lib/index.css'

// The video plugin
import video from 'ory-editor-plugins-video'
import 'ory-editor-plugins-video/lib/index.css'

// The spoiler plugin
import spoiler from 'ory-editor-plugins-parallax-background'
import 'ory-editor-plugins-parallax-background/lib/index.css'

// Renders json state to html
import { HTMLRenderer } from 'ory-editor-renderer'

// The divider plugin
import divider from 'ory-editor-plugins-divider'

import content from './content.js'
import './styles.css'

const plugins = {
  content: [slate(), spacer, image, video, divider],
  layout: [spoiler({ defaultPlugin: slate() })]
}

const editor = new Editor({
  plugins,
  editables: [...content, { id: '10', cells: [] }, createEmptyState()],
})

const elements = document.querySelectorAll('.editable')
for (const element of elements) {
  ReactDOM.render((
    <Editable
      editor={editor}
      id={element.dataset.id}
      // onChange={(state) => console.log(state)}
    />
  ), element)
}

ReactDOM.render((
  <div>
    <Trash editor={editor}/>
    <DisplayModeToggle editor={editor}/>
    <Toolbar editor={editor}/>
  </div>
), document.getElementById('controls'))


ReactDOM.render(<HTMLRenderer state={content[0]} plugins={plugins}/>, document.getElementById('editable-static'))
