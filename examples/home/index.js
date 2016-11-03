import './index.css'
import Editor from 'src/editor'
import { StaticContent } from './content.js'
import VideoPlugin from './plugins/video'
import ContainerPlugin from './plugins/container'
import { PluginService, defaultLayoutPlugins, defaultContentPlugins } from 'src/editor/service'

const editor = new Editor({
  adapters: [new StaticContent()],
  plugins: new PluginService(defaultContentPlugins, [
    ...defaultLayoutPlugins,
    new VideoPlugin(),
    new ContainerPlugin()
  ])
})

// editor.renderToHtml()

const elements = document.querySelectorAll('.editable')

editor.renderControls()
for (const element of elements) {
  editor.render(element)
}
