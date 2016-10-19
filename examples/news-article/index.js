// @flow
import './index.css'
import Editor from 'src/editor'

const editor = new Editor()

editor.renderControls()
editor.render(document.querySelectorAll('.editable'))
