// @flow
import Editor from 'src/editor'
import { PluginService, defaultLayoutPlugins, defaultContentPlugins } from 'src/editor/service'
import ParallaxPlugin from './plugins/parallax'
import FaIconPlugin from './plugins/fa-icon'
import content from './content.js'

const editor = new Editor({
  plugins: new PluginService([
    ...defaultContentPlugins,
    new FaIconPlugin()
  ], [
    ...defaultLayoutPlugins,
    new ParallaxPlugin()
  ])
})

editor.renderControls()
const elements = document.querySelectorAll('.editable')

editor.renderControls()
for (const element of elements) {
  editor.render(element, content[element.dataset.id])
}
