import React from 'react'
import ReactDOM from 'react-dom'
import Editor, { Editable } from 'ory-editor-core'
import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui'
import content from './content.js'

// ory-editor-plugins-slate is requiring cheerio and webpack fails. but if we require
// cheerio directly here, webpack does not fail.
// import 'cheerio'

// if this is uncommented, webpack will fail with something like:
/*
  Error in C:/workspace/js/editor/packages/plugins/content/slate/~/cheerio/index.js
  Module not found: 'json' in C:\workspace\js\editor\packages\plugins\content\slate\node_modules\cheerio
  @ C:/workspace/js/editor/packages/plugins/content/slate/~/cheerio/index.js 11:18-43
*/
import 'ory-editor-plugins-slate'

import 'ory-editor-styles/lib/index.css'
import 'ory-editor-ui/lib/index.css'

const editor = new Editor({
  plugins: {
    content: [
      //slate()
    ]
  },
  editables: [],
})
require('react-tap-event-plugin')()

// editor.register(content[element.dataset.id])

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

ReactDOM.render((
  <div>
    <Trash editor={editor} />
    <DisplayModeToggle editor={editor} />
    <Toolbar editor={editor} />
  </div>
), document.getElementById('controls'))
