import React from 'react'
import ReactDOM from 'react-dom'

if (process.env.NODE_ENV !== 'production' && process.env.WHY_UPDATE === 'on') {
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React)
}

import Editor, { Editable } from 'ory-editor-core'
import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui'
import slate from 'ory-editor-plugins-slate'
import spacer from 'ory-editor-plugins-spacer'
import divider from 'ory-editor-plugins-divider'
import image from 'ory-editor-plugins-image'
import video from 'ory-editor-plugins-video'
require('react-tap-event-plugin')()

import 'ory-editor-core/lib/index.css'
import 'ory-editor-ui/lib/index.css'

import 'ory-editor-plugins-video/lib/index.css'
import 'ory-editor-plugins-slate/lib/index.css'
import 'ory-editor-plugins-spacer/lib/index.css'
import 'ory-editor-plugins-image/lib/index.css'
import 'ory-editor-plugins-spoiler/lib/index.css'

import parallax from './plugins/parallax'
import faicon from './plugins/fa-icon'

import content from './content'
import './styles.css'

const editor = new Editor({
  plugins: {
    content: [
      slate(),
      spacer,
      image,
      video,
      divider,
      faicon
    ],
    layout: [
      parallax
    ]
  },
  editables: content,
})

const elements = document.querySelectorAll('.editable')
for (const element of elements) {
  ReactDOM.render((
    <Editable
      editor={editor}
      id={element.dataset.id}
      onChange={console.log}
    />
  ), element)
}

ReactDOM.render((
  <div>
    <Trash editor={editor} />
    <DisplayModeToggle editor={editor} />
    <Toolbar editor={editor} />
  </div>
), document.getElementById('controls'))
