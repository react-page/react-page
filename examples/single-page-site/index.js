// @flow
import './index.css'

import Editor from 'src/editor'
import { PluginService, defaultLayoutPlugins, defaultContentPlugins } from 'src/editor/service'
import ParallaxPlugin from './plugins/parallax'
import FaIconPlugin from './plugins/fa-icon'
import { StaticContent } from './content.js'

const editor = new Editor({
  adapters: [new StaticContent()],
  plugins: new PluginService([
    ...defaultContentPlugins,
    new FaIconPlugin()
  ], [
    ...defaultLayoutPlugins,
    new ParallaxPlugin()
  ])
})

editor.renderControls()
editor.render(document.querySelectorAll('.editable'))
