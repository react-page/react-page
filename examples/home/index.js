import './index.css'
import Editor from 'src/editor'
import { StaticContent } from './content.js'

const editor = new Editor({
  adapters: [new StaticContent()]
})

// editor.renderToHtml()

const elements = document.querySelectorAll('.editable')

editor.renderControls()
for (const element of elements) {
  editor.render(element)
}
