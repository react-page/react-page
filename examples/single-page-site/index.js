// @flow
import './index.css'

const editor = new Ory.Editor()

editor.renderControls()
editor.render(document.querySelectorAll('.editable'))
